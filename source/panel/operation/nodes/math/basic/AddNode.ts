import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class AddNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Max;

    generateCode () {
        return `${this.getOutputVarDefine(0)} = ${this.getInputValue(0)} + ${this.getInputValue(1)};`;
    }
}

