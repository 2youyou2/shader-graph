import { ShaderNode } from "../../../base";

export default class SaturateNode extends ShaderNode {
    generateCode () {
        let IN = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = saturate(${IN});`;
    }
}

