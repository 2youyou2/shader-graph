import { ShaderNode } from "../../../base";

export default class MinimumNode extends ShaderNode {
    generateCode () {
        let a = this.getInputValue(0);
        let b = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = min(${a}, ${b});`;
    }
}

