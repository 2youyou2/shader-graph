import { ShaderNode } from "../../../base";

export default class ExponentialNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = log(${this.getInputValue(0)});`;
    }
}
