import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class RandomRangeNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;
    
    generateCode () {
        let seed = this.getInputValue(0);
        let min = this.getInputValue(1);
        let max = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = randomRange(${seed}, ${min}, ${max});`;
    }
}

