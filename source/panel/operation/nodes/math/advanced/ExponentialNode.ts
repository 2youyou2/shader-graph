import { ShaderNode } from "../../../base";

export default class ExponentialNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = exp(${this.getInputValue(0)});`;
    }
}
