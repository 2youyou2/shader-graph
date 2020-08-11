import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class MultiplyNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Max;
    
    generateCode () {
        let a = this.getInputValue(0);
        let b = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = ${a} * ${b};`;
    }
}

