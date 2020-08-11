import { ShaderNode } from "../../../base";

export default class DDYNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = dFdy(${this.getInputValue(0)});`;
    }
}
