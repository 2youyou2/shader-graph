import { ShaderNode } from "../../../base";

export default class ClampNode extends ShaderNode {
    generateCode () {
        let In = this.getInputValue(0);
        let min = this.getInputValue(1);
        let max = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = clamp(${In}, ${min}, ${max});`;
    }
}

