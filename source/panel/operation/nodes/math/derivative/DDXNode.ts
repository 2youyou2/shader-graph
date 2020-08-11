import { ShaderNode } from "../../../base";

export default class DDXNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = dFdx(${this.getInputValue(0)});`;
    }
}
