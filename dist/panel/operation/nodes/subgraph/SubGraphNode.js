"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const globby_1 = __importDefault(require("globby"));
const path_1 = __importDefault(require("path"));
const shadergraph_1 = __importDefault(require("../../shadergraph"));
const SubGraphOutputNode_1 = __importDefault(require("./SubGraphOutputNode"));
const PropertyNode_1 = __importDefault(require("../input/PropertyNode"));
const type_1 = require("../../type");
class SubGraphNode extends base_1.ShaderNode {
    constructor(data) {
        super(data);
        this.nodes = [];
        this.nodeMap = new Map;
        this.properties = [];
        this.subgraphOutNode = null;
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        let name = this.data.m_Name;
        let subgraphPath = path_1.default.join(shadergraph_1.default.subgraphPath, `**/${name}.*`).replace(/\\/g, '/');
        let paths = globby_1.default.sync(subgraphPath);
        paths = paths.filter(p => path_1.default.extname(p).toLowerCase() === '.shadersubgraph');
        if (!paths[0]) {
            console.error(`Can not find sub graph with name [${name}]`);
            return;
        }
        let res = shadergraph_1.default.searchNodes(paths[0]);
        if (!res) {
            return;
        }
        let { properties, nodeMap, nodes, edges } = res;
        this.nodes = nodes;
        this.nodeMap = nodeMap;
        this.properties = properties;
        let subgraphOutNode = nodes.find(n => n instanceof SubGraphOutputNode_1.default);
        if (!subgraphOutNode) {
            console.error(`Can not find SubGraphOutputNode for [${name}]`);
            return;
        }
        this.subgraphOutNode = subgraphOutNode;
    }
    excahngeSubGraphOutNode(outputEdgeSlot) {
        var _a, _b;
        let outputNode = this;
        let outputSlot = this.slotsMap.get(outputEdgeSlot.id);
        let subgraphSlot = (_a = this.subgraphOutNode) === null || _a === void 0 ? void 0 : _a.getSlotWithSlotName(outputSlot === null || outputSlot === void 0 ? void 0 : outputSlot.displayName);
        if (subgraphSlot && subgraphSlot.connectSlot) {
            //@ts-ignore
            outputNode = subgraphSlot.connectSlot.node;
            outputEdgeSlot.id = subgraphSlot.connectSlot.id;
            //@ts-ignore
            outputEdgeSlot.nodeUuid = (_b = subgraphSlot.connectSlot.node) === null || _b === void 0 ? void 0 : _b.uuid;
            if (outputNode && subgraphSlot) {
                subgraphSlot.connectSlots.length = 0;
            }
        }
        return outputNode;
    }
    exchangeSubGraphInputNodes() {
        let inputSlots = this.inputSlots;
        let propertyNodes = this.nodes.filter(n => n instanceof PropertyNode_1.default);
        propertyNodes.forEach(node => {
            let propertySlot = node.outputSlots[0];
            let propertyName = propertySlot.displayName;
            let inputSlot = inputSlots.find(slot => slot.displayName === propertyName);
            if (inputSlot) {
                let outputSlot = inputSlot.connectSlot;
                if (outputSlot) {
                    propertySlot.connectSlots.forEach(inputSlotInSubGraph => {
                        var _a;
                        inputSlotInSubGraph.connectSlot = outputSlot;
                        outputSlot.connectSlots = outputSlot.connectSlots.filter(slot => slot === inputSlot);
                        if (outputSlot.node) {
                            (_a = inputSlotInSubGraph.node) === null || _a === void 0 ? void 0 : _a.addDependency(outputSlot.node);
                            //@ts-ignore
                            outputSlot.node.setPriority(inputSlotInSubGraph.node.priority + 1);
                        }
                    });
                    //@ts-ignore
                    inputSlot.connectSlot = null;
                }
                else {
                    propertySlot.connectSlots.forEach(inputSlotInSubGraph => {
                        var _a;
                        inputSlotInSubGraph.connectSlot = inputSlot;
                        // inputSlot.connectSlots.push(inputSlotInSubGraph);
                        if (inputSlot.node) {
                            (_a = inputSlotInSubGraph.node) === null || _a === void 0 ? void 0 : _a.addDependency(this);
                            //@ts-ignore
                            this.setPriority(inputSlotInSubGraph.node.priority + 1);
                        }
                    });
                }
            }
        });
    }
    generateCode() {
        let code = '';
        let inputSlots = this.inputSlots;
        for (let i = 0; i < inputSlots.length; i++) {
            // if (!inputSlots[i].connectSlot) continue;
            code += `${inputSlots[i].varDefine} = ${inputSlots[i].defaultValue};\n`;
        }
        return code;
    }
}
exports.default = SubGraphNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViR3JhcGhOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9zdWJncmFwaC9TdWJHcmFwaE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBbUY7QUFDbkYsb0RBQTJCO0FBQzNCLGdEQUF1QjtBQUN2QixvRUFBNEM7QUFDNUMsOEVBQXNEO0FBQ3RELHlFQUFpRDtBQUNqRCxxQ0FBbUQ7QUFFbkQsTUFBcUIsWUFBYSxTQUFRLGlCQUFVO0lBU2hELFlBQWEsSUFBSTtRQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQVRmLFVBQUssR0FBaUIsRUFBRSxDQUFBO1FBQ3hCLFlBQU8sR0FBNEIsSUFBSSxHQUFHLENBQUE7UUFDMUMsZUFBVSxHQUFvQixFQUFFLENBQUE7UUFFaEMsb0JBQWUsR0FBOEIsSUFBSSxDQUFDO1FBRWxELDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztRQUtoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLFlBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFXLENBQUMsWUFBWSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNGLElBQUksS0FBSyxHQUFHLGdCQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3JDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzlFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWCxPQUFPLENBQUMsS0FBSyxDQUFD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LENBQUM7U0FDM0U7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFwSEQsK0JBb0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSwgU2hhZGVyU2xvdCwgU2hhZGVyUHJvcGVyeSwgU2hhZGVyRWRnZVNsb3QgfSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xyXG5pbXBvcnQgZ2xvYmJ5IGZyb20gJ2dsb2JieSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IFNoYWRlckdyYXBoIGZyb20gXCIuLi8uLi9zaGFkZXJncmFwaFwiO1xyXG5pbXBvcnQgU3ViR3JhcGhPdXRwdXROb2RlIGZyb20gXCIuL1N1YkdyYXBoT3V0cHV0Tm9kZVwiO1xyXG5pbXBvcnQgUHJvcGVydHlOb2RlIGZyb20gXCIuLi9pbnB1dC9Qcm9wZXJ0eU5vZGVcIjtcclxuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uL3R5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YkdyYXBoTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG4gICAgbm9kZXM6IFNoYWRlck5vZGVbXSA9IFtdXHJcbiAgICBub2RlTWFwOiBNYXA8c3RyaW5nLCBTaGFkZXJOb2RlPiA9IG5ldyBNYXBcclxuICAgIHByb3BlcnRpZXM6IFNoYWRlclByb3BlcnlbXSA9IFtdXHJcblxyXG4gICAgc3ViZ3JhcGhPdXROb2RlOiBTdWJHcmFwaE91dHB1dE5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBjb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGRhdGEpIHtcclxuICAgICAgICBzdXBlcihkYXRhKVxyXG5cclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZGF0YS5tX05hbWU7XHJcbiAgICAgICAgbGV0IHN1YmdyYXBoUGF0aCA9IHBhdGguam9pbihTaGFkZXJHcmFwaC5zdWJncmFwaFBhdGgsIGAqKi8ke25hbWV9LipgKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICAgICAgbGV0IHBhdGhzID0gZ2xvYmJ5LnN5bmMoc3ViZ3JhcGhQYXRoKVxyXG4gICAgICAgIHBhdGhzID0gcGF0aHMuZmlsdGVyKHAgPT4gcGF0aC5leHRuYW1lKHApLnRvTG93ZXJDYXNlKCkgPT09ICcuc2hhZGVyc3ViZ3JhcGgnKVxyXG4gICAgICAgIGlmICghcGF0aHNbMF0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ2FuIG5vdCBmaW5kIHN1YiBncmFwaCB3aXRoIG5hbWUgWyR7bmFtZX1dYClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlcyA9IFNoYWRlckdyYXBoLnNlYXJjaE5vZGVzKHBhdGhzWzBdKTtcclxuICAgICAgICBpZiAoIXJlcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgeyBwcm9wZXJ0aWVzLCBub2RlTWFwLCBub2RlcywgZWRnZXMgfSA9IHJlcztcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xyXG4gICAgICAgIHRoaXMubm9kZU1hcCA9IG5vZGVNYXA7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuXHJcbiAgICAgICAgbGV0IHN1YmdyYXBoT3V0Tm9kZSA9IG5vZGVzLmZpbmQobiA9PiBuIGluc3RhbmNlb2YgU3ViR3JhcGhPdXRwdXROb2RlKVxyXG4gICAgICAgIGlmICghc3ViZ3JhcGhPdXROb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENhbiBub3QgZmluZCBTdWJHcmFwaE91dHB1dE5vZGUgZm9yIFske25hbWV9XWApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3ViZ3JhcGhPdXROb2RlID0gc3ViZ3JhcGhPdXROb2RlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleGNhaG5nZVN1YkdyYXBoT3V0Tm9kZSAob3V0cHV0RWRnZVNsb3Q6IFNoYWRlckVkZ2VTbG90KSB7XHJcbiAgICAgICAgbGV0IG91dHB1dE5vZGUgPSB0aGlzIGFzIFNoYWRlck5vZGU7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXRTbG90ID0gdGhpcy5zbG90c01hcC5nZXQob3V0cHV0RWRnZVNsb3QuaWQpO1xyXG4gICAgICAgIGxldCBzdWJncmFwaFNsb3QgPSB0aGlzLnN1YmdyYXBoT3V0Tm9kZT8uZ2V0U2xvdFdpdGhTbG90TmFtZShvdXRwdXRTbG90Py5kaXNwbGF5TmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChzdWJncmFwaFNsb3QgJiYgc3ViZ3JhcGhTbG90LmNvbm5lY3RTbG90KSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBvdXRwdXROb2RlID0gc3ViZ3JhcGhTbG90LmNvbm5lY3RTbG90Lm5vZGU7XHJcbiAgICAgICAgICAgIG91dHB1dEVkZ2VTbG90LmlkID0gc3ViZ3JhcGhTbG90LmNvbm5lY3RTbG90LmlkO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgb3V0cHV0RWRnZVNsb3Qubm9kZVV1aWQgPSBzdWJncmFwaFNsb3QuY29ubmVjdFNsb3Qubm9kZT8udXVpZDtcclxuICAgICAgICAgICAgaWYgKG91dHB1dE5vZGUgJiYgc3ViZ3JhcGhTbG90KSB7XHJcbiAgICAgICAgICAgICAgICBzdWJncmFwaFNsb3QuY29ubmVjdFNsb3RzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGV4Y2hhbmdlU3ViR3JhcGhJbnB1dE5vZGVzICgpIHtcclxuICAgICAgICBsZXQgaW5wdXRTbG90cyA9IHRoaXMuaW5wdXRTbG90cztcclxuXHJcbiAgICAgICAgbGV0IHByb3BlcnR5Tm9kZXMgPSB0aGlzLm5vZGVzLmZpbHRlcihuID0+IG4gaW5zdGFuY2VvZiBQcm9wZXJ0eU5vZGUpO1xyXG4gICAgICAgIHByb3BlcnR5Tm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb3BlcnR5U2xvdCA9IG5vZGUub3V0cHV0U2xvdHNbMF07XHJcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eVNsb3QuZGlzcGxheU5hbWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXRTbG90ID0gaW5wdXRTbG90cy5maW5kKHNsb3QgPT4gc2xvdC5kaXNwbGF5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnB1dFNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRwdXRTbG90ID0gaW5wdXRTbG90LmNvbm5lY3RTbG90O1xyXG4gICAgICAgICAgICAgICAgaWYgKG91dHB1dFNsb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVNsb3QuY29ubmVjdFNsb3RzLmZvckVhY2goaW5wdXRTbG90SW5TdWJHcmFwaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0U2xvdEluU3ViR3JhcGguY29ubmVjdFNsb3QgPSBvdXRwdXRTbG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRTbG90LmNvbm5lY3RTbG90cyA9IG91dHB1dFNsb3QuY29ubmVjdFNsb3RzLmZpbHRlcihzbG90ID0+IHNsb3QgPT09IGlucHV0U2xvdCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dHB1dFNsb3Qubm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRTbG90SW5TdWJHcmFwaC5ub2RlPy5hZGREZXBlbmRlbmN5KG91dHB1dFNsb3Qubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFNsb3Qubm9kZS5zZXRQcmlvcml0eShpbnB1dFNsb3RJblN1YkdyYXBoLm5vZGUucHJpb3JpdHkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRTbG90LmNvbm5lY3RTbG90ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5U2xvdC5jb25uZWN0U2xvdHMuZm9yRWFjaChpbnB1dFNsb3RJblN1YkdyYXBoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRTbG90SW5TdWJHcmFwaC5jb25uZWN0U2xvdCA9IGlucHV0U2xvdCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlucHV0U2xvdC5jb25uZWN0U2xvdHMucHVzaChpbnB1dFNsb3RJblN1YkdyYXBoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dFNsb3QhLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0U2xvdEluU3ViR3JhcGgubm9kZT8uYWRkRGVwZW5kZW5jeSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcmlvcml0eShpbnB1dFNsb3RJblN1YkdyYXBoLm5vZGUucHJpb3JpdHkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XHJcbiAgICAgICAgbGV0IGNvZGUgPSAnJztcclxuICAgICAgICBsZXQgaW5wdXRTbG90cyA9IHRoaXMuaW5wdXRTbG90cztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0U2xvdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gaWYgKCFpbnB1dFNsb3RzW2ldLmNvbm5lY3RTbG90KSBjb250aW51ZTtcclxuICAgICAgICAgICAgY29kZSArPSBgJHtpbnB1dFNsb3RzW2ldLnZhckRlZmluZX0gPSAke2lucHV0U2xvdHNbaV0uZGVmYXVsdFZhbHVlfTtcXG5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29kZTtcclxuICAgIH1cclxufVxyXG4iXX0=