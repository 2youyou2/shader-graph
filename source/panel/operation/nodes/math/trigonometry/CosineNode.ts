import { ShaderNode } from "../../../base";

export default class CosineNode extends ShaderNode {
    generateCode () {
        let In = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = cos(${In});`;
    }
}
