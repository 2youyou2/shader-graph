import { ShaderNode } from "../../../base";

export default class NormalizeNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = normalize(${this.getInputValue(0)});`;
    }
}
