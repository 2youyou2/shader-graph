import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class PowerNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;
    generateCode () {
        return `${this.getOutputVarDefine(0)} = pow(${this.getInputValue(0)}, ${this.getInputValue(1)});`;
    }
}

