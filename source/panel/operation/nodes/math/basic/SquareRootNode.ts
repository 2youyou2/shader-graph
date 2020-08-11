import { ShaderNode } from "../../../base";

export default class SquareRootNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarDefine(0)} = sqrt(${this.getInputValue(0)}, ${this.getInputValue(1)});`;
    }
}

