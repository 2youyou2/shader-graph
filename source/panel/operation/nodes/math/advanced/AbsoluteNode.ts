import { ShaderNode, ShaderSlot } from "../../../base";

export default class AbsoluteNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = abs(${this.getInputValue(0)});`;
    }
}
