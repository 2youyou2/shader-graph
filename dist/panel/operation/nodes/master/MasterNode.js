"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shadergraph_1 = __importDefault(require("../../shadergraph"));
const type_1 = require("../../type");
const utils_1 = require("../../utils");
function findConnectNodes(slot, nodes) {
    if (!slot.connectSlot)
        return;
    let connectNode = slot.connectSlot.node;
    if (connectNode) {
        if (!nodes.includes(connectNode)) {
            nodes.push(connectNode);
        }
        else {
            return;
        }
        connectNode.inputSlots.forEach(slot => {
            findConnectNodes(slot, nodes);
        });
    }
}
class MasterNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.vsSlotIndices = [];
        this.fsSlotIndices = [];
        this.templatePath = '';
        this.isMasterNode = true;
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.properties = [];
    }
    getConnectNodes(slotIndices) {
        let inputSlots = [];
        slotIndices.forEach(name => {
            let slot = this.getSlotWithSlotName(name);
            if (slot) {
                inputSlots.push(slot);
            }
        });
        let nodes = [];
        inputSlots.forEach(slot => {
            findConnectNodes(slot, nodes);
        });
        nodes.sort((a, b) => b.priority - a.priority);
        return nodes;
    }
    generateVsCode() {
        let code = ['\n'];
        let nodes = this.getConnectNodes(this.vsSlotIndices);
        nodes.forEach(node => {
            node.generateCode().split('\n').forEach(c => {
                code.push('    ' + c);
            });
        });
        return code.join('\n');
    }
    generateFsCode() {
        let code = ['\n'];
        let nodes = this.getConnectNodes(this.fsSlotIndices);
        nodes.forEach(node => {
            node.generateCode().split('\n').forEach(c => {
                c += ` // ${node.constructor.name}`;
                code.push('    ' + c);
            });
        });
        return code.join('\n');
    }
    generatePropertiesCode() {
        let uniform = '\n';
        let mtl = '\n';
        let uniformSampler = '';
        let properties = this.properties;
        properties.sort((a, b) => {
            return b.concretePrecision - a.concretePrecision;
        });
        let blockUniformCount = 0;
        properties.forEach(p => {
            let precision = '';
            let mtlValue = '';
            let value = p.defaultValue;
            let isColor = value.r !== undefined;
            let x = isColor ? value.r : value.x;
            let y = isColor ? value.g : value.y;
            let z = isColor ? value.b : value.z;
            let w = isColor ? value.a : value.w;
            let concretePrecision = p.node.outputSlots[0].concretePrecision;
            if (concretePrecision === 1) {
                precision = 'float';
                mtlValue = `${value}`;
            }
            else if (concretePrecision === 2) {
                precision = 'vec2';
                mtlValue = `[${x}, ${y}]`;
            }
            else if (concretePrecision === 3) {
                precision = 'vec4';
                mtlValue = `[${x}, ${y}, ${z}, 0]`;
            }
            else if (concretePrecision === 4) {
                precision = 'vec4';
                mtlValue = `[${x}, ${y}, ${z},  ${w}]`;
            }
            else if (concretePrecision === type_1.TextureConcretePrecision.Texture2D) {
                precision = 'sampler2D';
                mtlValue = 'white';
            }
            else if (concretePrecision === type_1.TextureConcretePrecision.TextureCube) {
                precision = 'samplerCube';
                mtlValue = 'white';
            }
            let editorStr = isColor ? `, editor: { type: color }` : '';
            if (concretePrecision < type_1.TextureConcretePrecision.Texture2D) {
                uniform += `    ${precision} ${p.name};\n`;
                blockUniformCount++;
            }
            else {
                uniformSampler += `  uniform ${precision} ${p.name};\n`;
            }
            mtl += `        ${p.name}: { value: ${mtlValue} ${editorStr}}\n`;
        });
        if (blockUniformCount === 0) {
            uniform += '    vec4 empty_value;\n';
        }
        return {
            uniform,
            uniformSampler,
            mtl,
        };
    }
    replaceChunks(code) {
        let depChunks = ['common'];
        let allNodes = shadergraph_1.default.allNodes;
        for (let i = 0; i < allNodes.length; i++) {
            for (let j = 0; j < allNodes[i].length; j++) {
                let node = allNodes[i][j];
                for (let k = 0; k < node.depChunks.length; k++) {
                    if (!depChunks.includes(node.depChunks[k])) {
                        depChunks.push(node.depChunks[k]);
                    }
                }
            }
        }
        let chunkIncludes = '\n';
        let chunks = '\n';
        depChunks.forEach(chunkName => {
            let chunkPath = path_1.default.join(utils_1.shaderTemplatesDir, `chunks/${chunkName}.chunk`);
            let chunk = fs_1.default.readFileSync(chunkPath, 'utf-8');
            if (!chunk) {
                console.error(`Can not find chunk with path [${chunkPath}]`);
                return;
            }
            chunks += chunk + '\n';
            chunkIncludes += `  #include <shader_graph_${chunkName}>\n`;
        });
        code = code.replace('{{chunks}}', chunks);
        code = code.replace('{{vs_chunks}}', chunkIncludes);
        code = code.replace('{{fs_chunks}}', chunkIncludes);
        return code;
    }
    generateVarings(code) {
        let depVarings = [];
        let allNodes = shadergraph_1.default.allNodes;
        allNodes.forEach(nodes => {
            nodes.forEach(node => {
                node.depVarings.forEach(varing => {
                    // 
                    if (varing === type_1.PositionSpace.AbsoluteWorld) {
                        varing = type_1.PositionSpace.World;
                    }
                    if (!depVarings.includes(varing)) {
                        depVarings.push(varing);
                    }
                });
            });
        });
        let vs_varing_define = [''];
        let vs_varing = [''];
        let fs_varing_define = [''];
        let fs_varing = [''];
        if (depVarings.includes(type_1.NormalSpace.World) || depVarings.includes(type_1.NormalSpace.View) || depVarings.includes(type_1.NormalSpace.Tangent) || depVarings.includes(type_1.NormalMapSpace)) {
            vs_varing.push('vec3 worldNormal = normalize((matWorldIT * vec4(normal, 0.0)).xyz);');
        }
        if (depVarings.includes(type_1.NormalSpace.View)) {
            vs_varing.push('vec3 viewNormal = normalize((cc_matView * vec4(worldNormal, 0.0)).xyz);');
        }
        if (depVarings.includes(type_1.NormalSpace.Tangent) || depVarings.includes(type_1.NormalMapSpace)) {
            vs_varing.push('v_tangent = normalize((matWorld * vec4(tangent.xyz, 0.0)).xyz);');
            vs_varing.push('v_bitangent = cross(worldNormal, v_tangent) * tangent.w;');
            vs_varing_define.push('out vec3 v_tangent;');
            vs_varing_define.push('out vec3 v_bitangent;');
            fs_varing_define.push('in vec3 v_tangent;');
            fs_varing_define.push('in vec3 v_bitangent;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.World) || depVarings.includes(type_1.ViewDirectionSpace.View) || depVarings.includes(type_1.ViewDirectionSpace.Object)) {
            vs_varing.push('vec3 worldView = cc_cameraPos.xyz - worldPosition.xyz;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.View)) {
            vs_varing.push('vec3 viewView = (cc_matView * vec4(worldView, 0.0))).xyz;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.Object)) {
            vs_varing.push('vec3 view = (matWorldIT * vec4(worldView, 0.0)).xyz;');
        }
        depVarings.forEach(varing => {
            if (varing === type_1.PositionSpace.Object) {
                vs_varing_define.push('out vec3 v_pos;');
                vs_varing.push('v_pos = position.xyz;');
                fs_varing_define.push('in vec3 v_pos;');
                fs_varing.push('vec4 position = vec4(v_pos, 1.);');
            }
            else if (varing === type_1.PositionSpace.View) {
                vs_varing_define.push('out vec3 v_viewPos;');
                vs_varing.push('v_viewPos = viewPosition.xyz;');
                fs_varing_define.push('in vec3 v_viewPos;');
                fs_varing.push('vec4 viewPosition = vec4(v_viewPos, 1.);');
            }
            else if (varing === type_1.PositionSpace.World || varing === type_1.PositionSpace.AbsoluteWorld) {
                vs_varing_define.push('out vec3 v_worldPos;');
                vs_varing.push('v_worldPos = worldPosition.xyz;');
                fs_varing_define.push('in vec3 v_worldPos;');
                fs_varing.push('vec4 worldPosition = vec4(v_worldPos, 1.);');
            }
            else if (varing === type_1.PositionSpace.Tangent) {
            }
            else if (varing === type_1.NormalSpace.Object) {
                vs_varing_define.push('out vec3 v_normal;');
                vs_varing.push('v_normal = normal;');
                fs_varing_define.push('in vec3 v_normal;');
                fs_varing.push('vec3 normal = v_normal;');
            }
            else if (varing === type_1.NormalSpace.View) {
                vs_varing_define.push('out vec3 v_viewNormal;');
                vs_varing.push('v_viewNormal = viewNormal;');
                fs_varing_define.push('in vec3 v_viewNormal;');
                fs_varing.push('vec3 viewNormal = v_viewNormal;');
            }
            else if (varing === type_1.NormalSpace.World) {
                vs_varing_define.push('out vec3 v_worldNormal;');
                vs_varing.push('v_worldNormal = worldNormal;');
                fs_varing_define.push('in vec3 v_worldNormal;');
                fs_varing.push('vec3 worldNormal = v_worldNormal;');
            }
            else if (varing === type_1.NormalSpace.Tangent) {
            }
            else if (varing === type_1.ViewDirectionSpace.Object) {
                vs_varing_define.push('out vec3 v_view;');
                vs_varing.push('v_view = view;');
                fs_varing_define.push('in vec3 v_view;');
                fs_varing.push('vec3 view = v_view;');
            }
            else if (varing === type_1.ViewDirectionSpace.View) {
                vs_varing_define.push('out vec3 v_viewView;');
                vs_varing.push('v_viewView = viewView;');
                fs_varing_define.push('in vec3 v_viewView;');
                fs_varing.push('vec3 viewView = v_viewView;');
            }
            else if (varing === type_1.ViewDirectionSpace.World) {
                vs_varing_define.push('out vec3 v_worldView;');
                vs_varing.push('v_worldView = worldView;');
                fs_varing_define.push('in vec3 v_worldView;');
                fs_varing.push('vec3 worldView = v_worldView;');
            }
            else if (varing === type_1.ViewDirectionSpace.Tangent) {
            }
        });
        code = code.replace('{{vs_varing_define}}', vs_varing_define.map(d => '  ' + d).join('\n'));
        code = code.replace('{{vs_varing}}', vs_varing.map(d => '    ' + d).join('\n'));
        code = code.replace('{{fs_varing_define}}', fs_varing_define.map(d => '  ' + d).join('\n'));
        code = code.replace('{{fs_varing}}', fs_varing.map(d => '    ' + d).join('\n'));
        return code;
    }
    generateCode() {
        let code = fs_1.default.readFileSync(this.templatePath, 'utf-8');
        code = this.generateVarings(code);
        const vsCode = this.generateVsCode();
        const fsCode = this.generateFsCode();
        code = code.replace('{{vs}}', vsCode);
        code = code.replace('{{fs}}', fsCode);
        code = this.replaceChunks(code);
        if (!this.properties || this.properties.length === 0) {
            code = code.replace(/properties: &props/g, '');
            code = code.replace(/properties: \*props/g, '');
        }
        let props = this.generatePropertiesCode();
        code = code.replace('{{properties}}', props.uniform);
        code = code.replace('{{properties_sampler}}', props.uniformSampler);
        code = code.replace('{{properties_mtl}}', props.mtl);
        // old shader graph version do not have vertex slots
        let vertexSlotNames = ['Vertex Position', 'Vertex Normal', 'Vertex Tangent', 'Position'];
        this.inputSlots.forEach(slot => {
            var tempName = `slot_${slot.displayName.replace(/ /g, '_')}`;
            let value;
            if (vertexSlotNames.includes(slot.displayName) || slot.displayName === 'Normal') {
                if (slot.connectSlot) {
                    value = slot.slotValue;
                }
            }
            else {
                value = slot.slotValue;
            }
            let reg = new RegExp(`{{${tempName} *=* *(.*)}}`);
            if (value === undefined) {
                let res = reg.exec(code);
                if (res) {
                    value = res[1];
                }
            }
            code = code.replace(reg, value);
        });
        vertexSlotNames.forEach(name => {
            var tempName = `slot_${name.replace(/ /g, '_')}`;
            let value = '';
            let reg = new RegExp(`{{${tempName} *=* *(.*)}}`);
            let res = reg.exec(code);
            if (res) {
                value = res[1];
            }
            code = code.replace(reg, value);
        });
        return code;
    }
}
exports.default = MasterNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFzdGVyTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWFzdGVyL01hc3Rlck5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBbUU7QUFDbkUsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QixvRUFBNEM7QUFDNUMscUNBQTZJO0FBQzdJLHVDQUFpRDtBQUVqRCxTQUFTLGdCQUFnQixDQUFFLElBQWdCLEVBQUUsS0FBbUI7SUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1FBQUUsT0FBTztJQUU5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxJQUFJLFdBQVcsRUFBRTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDM0I7YUFDSTtZQUNELE9BQU87U0FDVjtRQUVELFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQTtLQUNMO0FBQ0wsQ0FBQztBQUVELE1BQXFCLFVBQVcsU0FBUSxpQkFBVTtJQUFsRDs7UUFFSSxrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQUU3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQiwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7UUFFcEQsZUFBVSxHQUFvQixFQUFFLENBQUM7SUF1VnJDLENBQUM7SUFyVkcsZUFBZSxDQUFFLFdBQXFCO1FBQ2xDLElBQUksVUFBVSxHQUFpQixF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Q0FBQyxDQUFDO2dCQUN6QixJQUFJLEdBQUcsRUFBRTtvQkFDTCxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQjthQUNKO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBRUYsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixJQUFJLFFBQVEsR0FBRyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDakQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxRQUFRLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtZQUNELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQWpXRCw2QkFpV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlLCBTaGFkZXJTbG90LCBTaGFkZXJQcm9wZXJ5IH0gZnJvbSBcIi4uLy4uL2Jhc2VcIjtcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBTaGFkZXJHcmFwaCBmcm9tIFwiLi4vLi4vc2hhZGVyZ3JhcGhcIjtcclxuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlLCBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24sIE5vcm1hbFNwYWNlLCBOb3JtYWxNYXBTcGFjZSwgVmlld0RpcmVjdGlvblNwYWNlLCBQb3NpdGlvblNwYWNlIH0gZnJvbSBcIi4uLy4uL3R5cGVcIjtcclxuaW1wb3J0IHsgc2hhZGVyVGVtcGxhdGVzRGlyIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiBmaW5kQ29ubmVjdE5vZGVzIChzbG90OiBTaGFkZXJTbG90LCBub2RlczogU2hhZGVyTm9kZVtdKSB7XHJcbiAgICBpZiAoIXNsb3QuY29ubmVjdFNsb3QpIHJldHVybjtcclxuXHJcbiAgICBsZXQgY29ubmVjdE5vZGUgPSBzbG90LmNvbm5lY3RTbG90Lm5vZGU7XHJcbiAgICBpZiAoY29ubmVjdE5vZGUpIHtcclxuICAgICAgICBpZiAoIW5vZGVzLmluY2x1ZGVzKGNvbm5lY3ROb2RlKSkge1xyXG4gICAgICAgICAgICBub2Rlcy5wdXNoKGNvbm5lY3ROb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbm5lY3ROb2RlLmlucHV0U2xvdHMuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgZmluZENvbm5lY3ROb2RlcyhzbG90LCBub2Rlcyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFzdGVyTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG5cclxuICAgIHZzU2xvdEluZGljZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBmc1Nsb3RJbmRpY2VzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIHRlbXBsYXRlUGF0aCA9ICcnO1xyXG5cclxuICAgIGlzTWFzdGVyTm9kZSA9IHRydWU7XHJcbiAgICBjb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XHJcblxyXG4gICAgcHJvcGVydGllczogU2hhZGVyUHJvcGVyeVtdID0gW107XHJcblxyXG4gICAgZ2V0Q29ubmVjdE5vZGVzIChzbG90SW5kaWNlczogc3RyaW5nW10pIHtcclxuICAgICAgICBsZXQgaW5wdXRTbG90czogU2hhZGVyU2xvdFtdID0gW107XHJcbiAgICAgICAgc2xvdEluZGljZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLmdldFNsb3RXaXRoU2xvdE5hbWUobmFtZSlcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0U2xvdHMucHVzaChzbG90KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBub2RlczogU2hhZGVyTm9kZVtdID0gW107XHJcbiAgICAgICAgaW5wdXRTbG90cy5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICBmaW5kQ29ubmVjdE5vZGVzKHNsb3QsIG5vZGVzKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBub2Rlcy5zb3J0KChhLCBiKSA9PiBiLnByaW9yaXR5IC0gYS5wcmlvcml0eSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlVnNDb2RlICgpIHtcclxuICAgICAgICBsZXQgY29kZTogc3RyaW5nW10gPSBbJ1xcbiddO1xyXG5cclxuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLmdldENvbm5lY3ROb2Rlcyh0aGlzLnZzU2xvdEluZGljZXMpO1xyXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2VuZXJhdGVDb2RlKCkuc3BsaXQoJ1xcbicpLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlLnB1c2goJyAgICAnICsgYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gY29kZS5qb2luKCdcXG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUZzQ29kZSAoKSB7XHJcbiAgICAgICAgbGV0IGNvZGU6IHN0cmluZ1tdID0gWydcXG4nXTtcclxuXHJcbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5nZXRDb25uZWN0Tm9kZXModGhpcy5mc1Nsb3RJbmRpY2VzKTtcclxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBub2RlLmdlbmVyYXRlQ29kZSgpLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYyArPSBgIC8vICR7bm9kZS5jb25zdHJ1Y3Rvci5uYW1lfWBcclxuICAgICAgICAgICAgICAgIGNvZGUucHVzaCgnICAgICcgKyBjKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvZGUuam9pbignXFxuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVQcm9wZXJ0aWVzQ29kZSAoKSB7XHJcbiAgICAgICAgbGV0IHVuaWZvcm0gPSAnXFxuJztcclxuICAgICAgICBsZXQgbXRsID0gJ1xcbidcclxuICAgICAgICBsZXQgdW5pZm9ybVNhbXBsZXIgPSAnJztcclxuXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXM7XHJcbiAgICAgICAgcHJvcGVydGllcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLmNvbmNyZXRlUHJlY2lzaW9uIC0gYS5jb25jcmV0ZVByZWNpc2lvbjtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgYmxvY2tVbmlmb3JtQ291bnQgPSAwO1xyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcmVjaXNpb24gPSAnJztcclxuICAgICAgICAgICAgbGV0IG10bFZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgbGV0IGlzQ29sb3IgPSB2YWx1ZS5yICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCB4ID0gaXNDb2xvciA/IHZhbHVlLnIgOiB2YWx1ZS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGlzQ29sb3IgPyB2YWx1ZS5nIDogdmFsdWUueTtcclxuICAgICAgICAgICAgbGV0IHogPSBpc0NvbG9yID8gdmFsdWUuYiA6IHZhbHVlLno7XHJcbiAgICAgICAgICAgIGxldCB3ID0gaXNDb2xvciA/IHZhbHVlLmEgOiB2YWx1ZS53O1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbmNyZXRlUHJlY2lzaW9uID0gcC5ub2RlIS5vdXRwdXRTbG90c1swXS5jb25jcmV0ZVByZWNpc2lvbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25jcmV0ZVByZWNpc2lvbiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uID0gJ2Zsb2F0JztcclxuICAgICAgICAgICAgICAgIG10bFZhbHVlID0gYCR7dmFsdWV9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmNyZXRlUHJlY2lzaW9uID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gPSAndmVjMic7XHJcbiAgICAgICAgICAgICAgICBtdGxWYWx1ZSA9IGBbJHt4fSwgJHt5fV1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29uY3JldGVQcmVjaXNpb24gPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9ICd2ZWM0JztcclxuICAgICAgICAgICAgICAgIG10bFZhbHVlID0gYFske3h9LCAke3l9LCAke3p9LCAwXWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb25jcmV0ZVByZWNpc2lvbiA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uID0gJ3ZlYzQnO1xyXG4gICAgICAgICAgICAgICAgbXRsVmFsdWUgPSBgWyR7eH0sICR7eX0sICR7en0sICAke3d9XWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb25jcmV0ZVByZWNpc2lvbiA9PT0gVGV4dHVyZUNvbmNyZXRlUHJlY2lzaW9uLlRleHR1cmUyRCkge1xyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uID0gJ3NhbXBsZXIyRCdcclxuICAgICAgICAgICAgICAgIG10bFZhbHVlID0gJ3doaXRlJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmNyZXRlUHJlY2lzaW9uID09PSBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24uVGV4dHVyZUN1YmUpIHtcclxuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9ICdzYW1wbGVyQ3ViZSdcclxuICAgICAgICAgICAgICAgIG10bFZhbHVlID0gJ3doaXRlJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZWRpdG9yU3RyID0gaXNDb2xvciA/IGAsIGVkaXRvcjogeyB0eXBlOiBjb2xvciB9YCA6ICcnXHJcblxyXG4gICAgICAgICAgICBpZiAoY29uY3JldGVQcmVjaXNpb24gPCBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24uVGV4dHVyZTJEKSB7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtICs9IGAgICAgJHtwcmVjaXNpb259ICR7cC5uYW1lfTtcXG5gO1xyXG4gICAgICAgICAgICAgICAgYmxvY2tVbmlmb3JtQ291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm1TYW1wbGVyICs9IGAgIHVuaWZvcm0gJHtwcmVjaXNpb259ICR7cC5uYW1lfTtcXG5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG10bCArPSBgICAgICAgICAke3AubmFtZX06IHsgdmFsdWU6ICR7bXRsVmFsdWV9ICR7ZWRpdG9yU3RyfX1cXG5gXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKGJsb2NrVW5pZm9ybUNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHVuaWZvcm0gKz0gJyAgICB2ZWM0IGVtcHR5X3ZhbHVlO1xcbidcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVuaWZvcm0sXHJcbiAgICAgICAgICAgIHVuaWZvcm1TYW1wbGVyLFxyXG4gICAgICAgICAgICBtdGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXBsYWNlQ2h1bmtzIChjb2RlKSB7XHJcbiAgICAgICAgbGV0IGRlcENodW5rczogc3RyaW5nW10gPSBbJ2NvbW1vbiddO1xyXG4gICAgICAgIGxldCBhbGxOb2RlcyA9IFNoYWRlckdyYXBoLmFsbE5vZGVzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhbGxOb2Rlc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBhbGxOb2Rlc1tpXVtqXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbm9kZS5kZXBDaHVua3MubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlcENodW5rcy5pbmNsdWRlcyhub2RlLmRlcENodW5rc1trXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwQ2h1bmtzLnB1c2gobm9kZS5kZXBDaHVua3Nba10pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2h1bmtJbmNsdWRlcyA9ICdcXG4nO1xyXG4gICAgICAgIGxldCBjaHVua3MgPSAnXFxuJztcclxuICAgICAgICBkZXBDaHVua3MuZm9yRWFjaChjaHVua05hbWUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2h1bmtQYXRoID0gcGF0aC5qb2luKHNoYWRlclRlbXBsYXRlc0RpciwgYGNodW5rcy8ke2NodW5rTmFtZX0uY2h1bmtgKTtcclxuICAgICAgICAgICAgbGV0IGNodW5rID0gZnMucmVhZEZpbGVTeW5jKGNodW5rUGF0aCwgJ3V0Zi04Jyk7XHJcbiAgICAgICAgICAgIGlmICghY2h1bmspIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENhbiBub3QgZmluZCBjaHVuayB3aXRoIHBhdGggWyR7Y2h1bmtQYXRofV1gKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNodW5rcyArPSBjaHVuayArICdcXG4nO1xyXG4gICAgICAgICAgICBjaHVua0luY2x1ZGVzICs9IGAgICNpbmNsdWRlIDxzaGFkZXJfZ3JhcGhfJHtjaHVua05hbWV9PlxcbmA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3tjaHVua3N9fScsIGNodW5rcyk7XHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3t2c19jaHVua3N9fScsIGNodW5rSW5jbHVkZXMpO1xyXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoJ3t7ZnNfY2h1bmtzfX0nLCBjaHVua0luY2x1ZGVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVWYXJpbmdzIChjb2RlKSB7XHJcbiAgICAgICAgbGV0IGRlcFZhcmluZ3M6IG51bWJlcltdID0gW11cclxuICAgICAgICBsZXQgYWxsTm9kZXMgPSBTaGFkZXJHcmFwaC5hbGxOb2RlcztcclxuICAgICAgICBhbGxOb2Rlcy5mb3JFYWNoKG5vZGVzID0+IHtcclxuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZGVwVmFyaW5ncy5mb3JFYWNoKHZhcmluZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmluZyA9PT0gUG9zaXRpb25TcGFjZS5BYnNvbHV0ZVdvcmxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmluZyA9IFBvc2l0aW9uU3BhY2UuV29ybGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlcFZhcmluZ3MuaW5jbHVkZXModmFyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBWYXJpbmdzLnB1c2godmFyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCB2c192YXJpbmdfZGVmaW5lOiBzdHJpbmdbXSA9IFsnJ11cclxuICAgICAgICBsZXQgdnNfdmFyaW5nOiBzdHJpbmdbXSA9IFsnJ11cclxuICAgICAgICBsZXQgZnNfdmFyaW5nX2RlZmluZTogc3RyaW5nW10gPSBbJyddXHJcbiAgICAgICAgbGV0IGZzX3ZhcmluZzogc3RyaW5nW10gPSBbJyddXHJcblxyXG5cclxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhOb3JtYWxTcGFjZS5Xb3JsZCkgfHwgZGVwVmFyaW5ncy5pbmNsdWRlcyhOb3JtYWxTcGFjZS5WaWV3KSB8fCBkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlRhbmdlbnQpIHx8IGRlcFZhcmluZ3MuaW5jbHVkZXMoTm9ybWFsTWFwU3BhY2UpKSB7XHJcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2ZWMzIHdvcmxkTm9ybWFsID0gbm9ybWFsaXplKChtYXRXb3JsZElUICogdmVjNChub3JtYWwsIDAuMCkpLnh5eik7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlZpZXcpKSB7XHJcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2ZWMzIHZpZXdOb3JtYWwgPSBub3JtYWxpemUoKGNjX21hdFZpZXcgKiB2ZWM0KHdvcmxkTm9ybWFsLCAwLjApKS54eXopOycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlRhbmdlbnQpIHx8IGRlcFZhcmluZ3MuaW5jbHVkZXMoTm9ybWFsTWFwU3BhY2UpKSB7XHJcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X3RhbmdlbnQgPSBub3JtYWxpemUoKG1hdFdvcmxkICogdmVjNCh0YW5nZW50Lnh5eiwgMC4wKSkueHl6KTsnKVxyXG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndl9iaXRhbmdlbnQgPSBjcm9zcyh3b3JsZE5vcm1hbCwgdl90YW5nZW50KSAqIHRhbmdlbnQudzsnKVxyXG5cclxuICAgICAgICAgICAgdnNfdmFyaW5nX2RlZmluZS5wdXNoKCdvdXQgdmVjMyB2X3RhbmdlbnQ7JylcclxuICAgICAgICAgICAgdnNfdmFyaW5nX2RlZmluZS5wdXNoKCdvdXQgdmVjMyB2X2JpdGFuZ2VudDsnKVxyXG5cclxuICAgICAgICAgICAgZnNfdmFyaW5nX2RlZmluZS5wdXNoKCdpbiB2ZWMzIHZfdGFuZ2VudDsnKVxyXG4gICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl9iaXRhbmdlbnQ7JylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKFZpZXdEaXJlY3Rpb25TcGFjZS5Xb3JsZCkgfHwgZGVwVmFyaW5ncy5pbmNsdWRlcyhWaWV3RGlyZWN0aW9uU3BhY2UuVmlldykgfHwgZGVwVmFyaW5ncy5pbmNsdWRlcyhWaWV3RGlyZWN0aW9uU3BhY2UuT2JqZWN0KSkge1xyXG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndmVjMyB3b3JsZFZpZXcgPSBjY19jYW1lcmFQb3MueHl6IC0gd29ybGRQb3NpdGlvbi54eXo7JylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRlcFZhcmluZ3MuaW5jbHVkZXMoVmlld0RpcmVjdGlvblNwYWNlLlZpZXcpKSB7XHJcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2ZWMzIHZpZXdWaWV3ID0gKGNjX21hdFZpZXcgKiB2ZWM0KHdvcmxkVmlldywgMC4wKSkpLnh5ejsnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhWaWV3RGlyZWN0aW9uU3BhY2UuT2JqZWN0KSkge1xyXG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndmVjMyB2aWV3ID0gKG1hdFdvcmxkSVQgKiB2ZWM0KHdvcmxkVmlldywgMC4wKSkueHl6OycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXBWYXJpbmdzLmZvckVhY2godmFyaW5nID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhcmluZyA9PT0gUG9zaXRpb25TcGFjZS5PYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIHZzX3ZhcmluZ19kZWZpbmUucHVzaCgnb3V0IHZlYzMgdl9wb3M7JylcclxuICAgICAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X3BvcyA9IHBvc2l0aW9uLnh5ejsnKTtcclxuICAgICAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X3BvczsnKTtcclxuICAgICAgICAgICAgICAgIGZzX3ZhcmluZy5wdXNoKCd2ZWM0IHBvc2l0aW9uID0gdmVjNCh2X3BvcywgMS4pOycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhcmluZyA9PT0gUG9zaXRpb25TcGFjZS5WaWV3KSB7XHJcbiAgICAgICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfdmlld1BvczsnKVxyXG4gICAgICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfdmlld1BvcyA9IHZpZXdQb3NpdGlvbi54eXo7Jyk7XHJcbiAgICAgICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl92aWV3UG9zOycpO1xyXG4gICAgICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzQgdmlld1Bvc2l0aW9uID0gdmVjNCh2X3ZpZXdQb3MsIDEuKTsnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YXJpbmcgPT09IFBvc2l0aW9uU3BhY2UuV29ybGQgfHwgdmFyaW5nID09PSBQb3NpdGlvblNwYWNlLkFic29sdXRlV29ybGQpIHtcclxuICAgICAgICAgICAgICAgIHZzX3ZhcmluZ19kZWZpbmUucHVzaCgnb3V0IHZlYzMgdl93b3JsZFBvczsnKVxyXG4gICAgICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfd29ybGRQb3MgPSB3b3JsZFBvc2l0aW9uLnh5ejsnKTtcclxuICAgICAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X3dvcmxkUG9zOycpO1xyXG4gICAgICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzQgd29ybGRQb3NpdGlvbiA9IHZlYzQodl93b3JsZFBvcywgMS4pOycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhcmluZyA9PT0gUG9zaXRpb25TcGFjZS5UYW5nZW50KSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YXJpbmcgPT09IE5vcm1hbFNwYWNlLk9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgdnNfdmFyaW5nX2RlZmluZS5wdXNoKCdvdXQgdmVjMyB2X25vcm1hbDsnKVxyXG4gICAgICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfbm9ybWFsID0gbm9ybWFsOycpO1xyXG4gICAgICAgICAgICAgICAgZnNfdmFyaW5nX2RlZmluZS5wdXNoKCdpbiB2ZWMzIHZfbm9ybWFsOycpO1xyXG4gICAgICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzMgbm9ybWFsID0gdl9ub3JtYWw7Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmFyaW5nID09PSBOb3JtYWxTcGFjZS5WaWV3KSB7XHJcbiAgICAgICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfdmlld05vcm1hbDsnKVxyXG4gICAgICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfdmlld05vcm1hbCA9IHZpZXdOb3JtYWw7Jyk7XHJcbiAgICAgICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl92aWV3Tm9ybWFsOycpO1xyXG4gICAgICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzMgdmlld05vcm1hbCA9IHZfdmlld05vcm1hbDsnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YXJpbmcgPT09IE5vcm1hbFNwYWNlLldvcmxkKSB7XHJcbiAgICAgICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfd29ybGROb3JtYWw7JylcclxuICAgICAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X3dvcmxkTm9ybWFsID0gd29ybGROb3JtYWw7Jyk7XHJcbiAgICAgICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl93b3JsZE5vcm1hbDsnKTtcclxuICAgICAgICAgICAgICAgIGZzX3ZhcmluZy5wdXNoKCd2ZWMzIHdvcmxkTm9ybWFsID0gdl93b3JsZE5vcm1hbDsnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YXJpbmcgPT09IE5vcm1hbFNwYWNlLlRhbmdlbnQpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhcmluZyA9PT0gVmlld0RpcmVjdGlvblNwYWNlLk9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgdnNfdmFyaW5nX2RlZmluZS5wdXNoKCdvdXQgdmVjMyB2X3ZpZXc7JylcclxuICAgICAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X3ZpZXcgPSB2aWV3OycpO1xyXG4gICAgICAgICAgICAgICAgZnNfdmFyaW5nX2RlZmluZS5wdXNoKCdpbiB2ZWMzIHZfdmlldzsnKTtcclxuICAgICAgICAgICAgICAgIGZzX3ZhcmluZy5wdXNoKCd2ZWMzIHZpZXcgPSB2X3ZpZXc7Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmFyaW5nID09PSBWaWV3RGlyZWN0aW9uU3BhY2UuVmlldykge1xyXG4gICAgICAgICAgICAgICAgdnNfdmFyaW5nX2RlZmluZS5wdXNoKCdvdXQgdmVjMyB2X3ZpZXdWaWV3OycpXHJcbiAgICAgICAgICAgICAgICB2c192YXJpbmcucHVzaCgndl92aWV3VmlldyA9IHZpZXdWaWV3OycpO1xyXG4gICAgICAgICAgICAgICAgZnNfdmFyaW5nX2RlZmluZS5wdXNoKCdpbiB2ZWMzIHZfdmlld1ZpZXc7Jyk7XHJcbiAgICAgICAgICAgICAgICBmc192YXJpbmcucHVzaCgndmVjMyB2aWV3VmlldyA9IHZfdmlld1ZpZXc7Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmFyaW5nID09PSBWaWV3RGlyZWN0aW9uU3BhY2UuV29ybGQpIHtcclxuICAgICAgICAgICAgICAgIHZzX3ZhcmluZ19kZWZpbmUucHVzaCgnb3V0IHZlYzMgdl93b3JsZFZpZXc7JylcclxuICAgICAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X3dvcmxkVmlldyA9IHdvcmxkVmlldzsnKTtcclxuICAgICAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X3dvcmxkVmlldzsnKTtcclxuICAgICAgICAgICAgICAgIGZzX3ZhcmluZy5wdXNoKCd2ZWMzIHdvcmxkVmlldyA9IHZfd29ybGRWaWV3OycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhcmluZyA9PT0gVmlld0RpcmVjdGlvblNwYWNlLlRhbmdlbnQpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3t2c192YXJpbmdfZGVmaW5lfX0nLCB2c192YXJpbmdfZGVmaW5lLm1hcChkID0+ICcgICcgKyBkKS5qb2luKCdcXG4nKSlcclxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e3ZzX3ZhcmluZ319JywgdnNfdmFyaW5nLm1hcChkID0+ICcgICAgJyArIGQpLmpvaW4oJ1xcbicpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoJ3t7ZnNfdmFyaW5nX2RlZmluZX19JywgZnNfdmFyaW5nX2RlZmluZS5tYXAoZCA9PiAnICAnICsgZCkuam9pbignXFxuJykpXHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3tmc192YXJpbmd9fScsIGZzX3ZhcmluZy5tYXAoZCA9PiAnICAgICcgKyBkKS5qb2luKCdcXG4nKSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICBsZXQgY29kZSA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLnRlbXBsYXRlUGF0aCwgJ3V0Zi04Jyk7XHJcblxyXG4gICAgICAgIGNvZGUgPSB0aGlzLmdlbmVyYXRlVmFyaW5ncyhjb2RlKTtcclxuXHJcbiAgICAgICAgY29uc3QgdnNDb2RlID0gdGhpcy5nZW5lcmF0ZVZzQ29kZSgpO1xyXG4gICAgICAgIGNvbnN0IGZzQ29kZSA9IHRoaXMuZ2VuZXJhdGVGc0NvZGUoKTtcclxuXHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3t2c319JywgdnNDb2RlKTtcclxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e2ZzfX0nLCBmc0NvZGUpO1xyXG5cclxuICAgICAgICBjb2RlID0gdGhpcy5yZXBsYWNlQ2h1bmtzKGNvZGUpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMucHJvcGVydGllcyB8fCB0aGlzLnByb3BlcnRpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL3Byb3BlcnRpZXM6ICZwcm9wcy9nLCAnJyk7XHJcbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL3Byb3BlcnRpZXM6IFxcKnByb3BzL2csICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcm9wcyA9IHRoaXMuZ2VuZXJhdGVQcm9wZXJ0aWVzQ29kZSgpO1xyXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoJ3t7cHJvcGVydGllc319JywgcHJvcHMudW5pZm9ybSk7XHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3twcm9wZXJ0aWVzX3NhbXBsZXJ9fScsIHByb3BzLnVuaWZvcm1TYW1wbGVyKTtcclxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e3Byb3BlcnRpZXNfbXRsfX0nLCBwcm9wcy5tdGwpOyBcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gb2xkIHNoYWRlciBncmFwaCB2ZXJzaW9uIGRvIG5vdCBoYXZlIHZlcnRleCBzbG90c1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhTbG90TmFtZXMgPSBbJ1ZlcnRleCBQb3NpdGlvbicsICdWZXJ0ZXggTm9ybWFsJywgJ1ZlcnRleCBUYW5nZW50JywgJ1Bvc2l0aW9uJ107XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRTbG90cy5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdGVtcE5hbWUgPSBgc2xvdF8ke3Nsb3QuZGlzcGxheU5hbWUucmVwbGFjZSgvIC9nLCAnXycpfWA7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHZlcnRleFNsb3ROYW1lcy5pbmNsdWRlcyhzbG90LmRpc3BsYXlOYW1lKSB8fCBzbG90LmRpc3BsYXlOYW1lID09PSAnTm9ybWFsJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3QuY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHNsb3Quc2xvdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzbG90LnNsb3RWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHJlZyA9IG5ldyBSZWdFeHAoYHt7JHt0ZW1wTmFtZX0gKj0qICooLiopfX1gKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSByZWcuZXhlYyhjb2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlc1sxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlZywgdmFsdWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmVydGV4U2xvdE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wTmFtZSA9IGBzbG90XyR7bmFtZS5yZXBsYWNlKC8gL2csICdfJyl9YDtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGxldCByZWcgPSBuZXcgUmVnRXhwKGB7eyR7dGVtcE5hbWV9ICo9KiAqKC4qKX19YCk7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSByZWcuZXhlYyhjb2RlKTtcclxuICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSByZXNbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZWcsIHZhbHVlKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gY29kZTtcclxuICAgIH1cclxufVxyXG4iXX0=