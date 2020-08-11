import { ShaderNode } from "../../../base";

export default class MaximumNode extends ShaderNode {
    generateCode () {
        let a = this.getInputValue(0);
        let b = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = max(${a}, ${b});`;
    }
}

