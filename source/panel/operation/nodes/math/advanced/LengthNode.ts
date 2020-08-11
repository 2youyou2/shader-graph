import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class LengthNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    generateCode () {
        return `${this.getOutputVarDefine(0)} = length(${this.getInputValue(0)});`;
    }
}
