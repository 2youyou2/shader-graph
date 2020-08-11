import { ShaderNode, ShaderSlot, ShaderPropery } from "../../base";
import fs from 'fs';
import path from 'path';
import ShaderGraph from "../../shadergraph";
import { ConcretePrecisionType, TextureConcretePrecision, NormalSpace, NormalMapSpace, ViewDirectionSpace, PositionSpace } from "../../type";
import { shaderTemplatesDir } from "../../utils";

function findConnectNodes (slot: ShaderSlot, nodes: ShaderNode[]) {
    if (!slot.connectSlot) return;

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
        })
    }
}

export default class MasterNode extends ShaderNode {

    vsSlotIndices: string[] = [];
    fsSlotIndices: string[] = [];

    templatePath = '';

    isMasterNode = true;
    concretePrecisionType = ConcretePrecisionType.Fixed;

    properties: ShaderPropery[] = [];

    getConnectNodes (slotIndices: string[]) {
        let inputSlots: ShaderSlot[] = [];
        slotIndices.forEach(name => {
            let slot = this.getSlotWithSlotName(name)
            if (slot) {
                inputSlots.push(slot)
            }
        });

        let nodes: ShaderNode[] = [];
        inputSlots.forEach(slot => {
            findConnectNodes(slot, nodes);
        })

        nodes.sort((a, b) => b.priority - a.priority);
        return nodes;
    }

    generateVsCode () {
        let code: string[] = ['\n'];

        let nodes = this.getConnectNodes(this.vsSlotIndices);
        nodes.forEach(node => {
            node.generateCode().split('\n').forEach(c => {
                code.push('    ' + c);
            });
        })


        return code.join('\n');
    }

    generateFsCode () {
        let code: string[] = ['\n'];

        let nodes = this.getConnectNodes(this.fsSlotIndices);
        nodes.forEach(node => {
            node.generateCode().split('\n').forEach(c => {
                c += ` // ${node.constructor.name}`
                code.push('    ' + c);
            });
        })

        return code.join('\n');
    }

    generatePropertiesCode () {
        let uniform = '\n';
        let mtl = '\n'
        let uniformSampler = '';

        let properties = this.properties;
        properties.sort((a, b) => {
            return b.concretePrecision - a.concretePrecision;
        })

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

            let concretePrecision = p.node?.outputSlots[0].concretePrecision;

            if (concretePrecision === 1) {
                precision = 'float';
                mtlValue = `${value}`
            }
            else if (concretePrecision === 2) {
                precision = 'vec2';
                mtlValue = `[${x}, ${y}]`
            }
            else if (concretePrecision === 3) {
                precision = 'vec4';
                mtlValue = `[${x}, ${y}, ${z}, 0]`
            }
            else if (concretePrecision === 4) {
                precision = 'vec4';
                mtlValue = `[${x}, ${y}, ${z},  ${w}]`
            }
            else if (concretePrecision === TextureConcretePrecision.Texture2D) {
                precision = 'sampler2D'
                mtlValue = 'white'
            }
            else if (concretePrecision === TextureConcretePrecision.TextureCube) {
                precision = 'samplerCube'
                mtlValue = 'white'
            }

            let editorStr = isColor ? `, editor: { type: color }` : ''

            if (concretePrecision < TextureConcretePrecision.Texture2D) {
                uniform += `    ${precision} ${p.name};\n`;
                blockUniformCount++;
            }
            else {
                uniformSampler += `  uniform ${precision} ${p.name};\n`;
            }
            mtl += `        ${p.name}: { value: ${mtlValue} ${editorStr}}\n`
        })

        if (blockUniformCount === 0) {
            uniform += '    vec4 empty_value;\n'
        }

        return {
            uniform,
            uniformSampler,
            mtl,
        };
    }

    replaceChunks (code) {
        let depChunks: string[] = ['common'];
        let allNodes = ShaderGraph.allNodes;
        for (let i = 0; i < allNodes.length; i++) {
            for (let j = 0; j < allNodes[i].length; j++) {
                let node = allNodes[i][j];
                for (let k = 0; k < node.depChunks.length; k++) {
                    if (!depChunks.includes(node.depChunks[k])) {
                        depChunks.push(node.depChunks[k])
                    }
                }
            }
        }

        let chunkIncludes = '\n';
        let chunks = '\n';
        depChunks.forEach(chunkName => {
            let chunkPath = path.join(shaderTemplatesDir, `chunks/${chunkName}.chunk`);
            let chunk = fs.readFileSync(chunkPath, 'utf-8');
            if (!chunk) {
                console.error(`Can not find chunk with path [${chunkPath}]`)
                return;
            }
            chunks += chunk + '\n';
            chunkIncludes += `  #include <shader_graph_${chunkName}>\n`;
        })

        code = code.replace('{{chunks}}', chunks);
        code = code.replace('{{vs_chunks}}', chunkIncludes);
        code = code.replace('{{fs_chunks}}', chunkIncludes);

        return code;
    }

    generateVarings (code) {
        let depVarings: number[] = []
        let allNodes = ShaderGraph.allNodes;
        allNodes.forEach(nodes => {
            nodes.forEach(node => {
                node.depVarings.forEach(varing => {
                    if (!depVarings.includes(varing)) {
                        depVarings.push(varing);
                    }
                })
            })
        })

        let vs_varing_define: string[] = ['']
        let vs_varing: string[] = ['']
        let fs_varing_define: string[] = ['']
        let fs_varing: string[] = ['']


        if (depVarings.includes(NormalSpace.World) || depVarings.includes(NormalSpace.View) || depVarings.includes(NormalSpace.Tangent) || depVarings.includes(NormalMapSpace)) {
            vs_varing.push('vec3 worldNormal = normalize((matWorldIT * vec4(normal, 0.0)).xyz);');
        }
        if (depVarings.includes(NormalSpace.View)) {
            vs_varing.push('vec3 viewNormal = normalize((cc_matView * vec4(worldNormal, 0.0)).xyz);')
        }
        if (depVarings.includes(NormalSpace.Tangent) || depVarings.includes(NormalMapSpace)) {
            vs_varing.push('v_tangent = normalize((matWorld * vec4(tangent.xyz, 0.0)).xyz);')
            vs_varing.push('v_bitangent = cross(worldNormal, v_tangent) * tangent.w;')

            vs_varing_define.push('out vec3 v_tangent;')
            vs_varing_define.push('out vec3 v_bitangent;')

            fs_varing_define.push('in vec3 v_tangent;')
            fs_varing_define.push('in vec3 v_bitangent;')
        }

        if (depVarings.includes(ViewDirectionSpace.World) || depVarings.includes(ViewDirectionSpace.View) || depVarings.includes(ViewDirectionSpace.Object)) {
            vs_varing.push('vec3 worldView = cc_cameraPos.xyz - worldPosition.xyz;')
        }
        if (depVarings.includes(ViewDirectionSpace.View)) {
            vs_varing.push('vec3 viewView = (cc_matView * vec4(worldView, 0.0))).xyz;')
        }
        if (depVarings.includes(ViewDirectionSpace.Object)) {
            vs_varing.push('vec3 view = (matWorldIT * vec4(worldView, 0.0)).xyz;')
        }

        depVarings.forEach(varing => {
            if (varing === PositionSpace.Object) {
                vs_varing_define.push('out vec3 v_pos;')
                vs_varing.push('v_pos = position.xyz;');
                fs_varing_define.push('in vec3 v_pos;');
                fs_varing.push('vec4 position = vec4(v_pos, 1.);');
            }
            else if (varing === PositionSpace.View) {
                vs_varing_define.push('out vec3 v_viewPos;')
                vs_varing.push('v_viewPos = viewPosition.xyz;');
                fs_varing_define.push('in vec3 v_viewPos;');
                fs_varing.push('vec4 viewPosition = vec4(v_viewPos, 1.);');
            }
            else if (varing === PositionSpace.World || varing === PositionSpace.AbsoluteWorld) {
                vs_varing_define.push('out vec3 v_worldPos;')
                vs_varing.push('v_worldPos = worldPosition.xyz;');
                fs_varing_define.push('in vec3 v_worldPos;');
                fs_varing.push('vec4 worldPosition = vec4(v_worldPos, 1.);');
            }
            else if (varing === PositionSpace.Tangent) {
                
            }
            else if (varing === NormalSpace.Object) {
                vs_varing_define.push('out vec3 v_normal;')
                vs_varing.push('v_normal = normal;');
                fs_varing_define.push('in vec3 v_normal;');
                fs_varing.push('vec3 normal = v_normal;');
            }
            else if (varing === NormalSpace.View) {
                vs_varing_define.push('out vec3 v_viewNormal;')
                vs_varing.push('v_viewNormal = viewNormal;');
                fs_varing_define.push('in vec3 v_viewNormal;');
                fs_varing.push('vec3 viewNormal = v_viewNormal;');
            }
            else if (varing === NormalSpace.World) {
                vs_varing_define.push('out vec3 v_worldNormal;')
                vs_varing.push('v_worldNormal = worldNormal;');
                fs_varing_define.push('in vec3 v_worldNormal;');
                fs_varing.push('vec3 worldNormal = v_worldNormal;');
            }
            else if (varing === NormalSpace.Tangent) {
                
            }
            else if (varing === ViewDirectionSpace.Object) {
                vs_varing_define.push('out vec3 v_view;')
                vs_varing.push('v_view = view;');
                fs_varing_define.push('in vec3 v_view;');
                fs_varing.push('vec3 view = v_view;');
            }
            else if (varing === ViewDirectionSpace.View) {
                vs_varing_define.push('out vec3 v_viewView;')
                vs_varing.push('v_viewView = viewView;');
                fs_varing_define.push('in vec3 v_viewView;');
                fs_varing.push('vec3 viewView = v_viewView;');
            }
            else if (varing === ViewDirectionSpace.World) {
                vs_varing_define.push('out vec3 v_worldView;')
                vs_varing.push('v_worldView = worldView;');
                fs_varing_define.push('in vec3 v_worldView;');
                fs_varing.push('vec3 worldView = v_worldView;');
            }
            else if (varing === ViewDirectionSpace.Tangent) {
                
            }
        })

        code = code.replace('{{vs_varing_define}}', vs_varing_define.map(d => '  ' + d).join('\n'))
        code = code.replace('{{vs_varing}}', vs_varing.map(d => '    ' + d).join('\n'))
        
        code = code.replace('{{fs_varing_define}}', fs_varing_define.map(d => '  ' + d).join('\n'))
        code = code.replace('{{fs_varing}}', fs_varing.map(d => '    ' + d).join('\n'))

        return code;
    }

    generateCode () {
        let code = fs.readFileSync(this.templatePath, 'utf-8');

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
        })
        
        vertexSlotNames.forEach(name => {
            var tempName = `slot_${name.replace(/ /g, '_')}`;
            let value = '';
            let reg = new RegExp(`{{${tempName} *=* *(.*)}}`);
            let res = reg.exec(code);
            if (res) {
                value = res[1];
            }
            code = code.replace(reg, value);
        })

        return code;
    }
}
