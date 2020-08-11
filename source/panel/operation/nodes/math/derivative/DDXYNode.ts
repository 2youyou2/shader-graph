import { ShaderNode } from "../../../base";

export default class DDXYNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = abs(dFdx(${this.getInputValue(0)})) + abs(dFdy(${this.getInputValue(0)}));`;
    }
}
