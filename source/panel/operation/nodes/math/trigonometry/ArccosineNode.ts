import { ShaderNode } from "../../../base";

export default class ArccosineNode extends ShaderNode {
    generateCode () {
        let In = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = acos(${In});`;
    }
}
