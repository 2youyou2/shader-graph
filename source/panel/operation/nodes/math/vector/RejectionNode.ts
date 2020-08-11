import { ShaderNode } from "../../../base";

export default class DistanceNode extends ShaderNode {
    generateCode () {
        let A = this.getInputValue(0);
        let B = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = ${A} - (${B} * dot(${A}, ${B}) / dot(${B}, ${B}));`;
    }
}
