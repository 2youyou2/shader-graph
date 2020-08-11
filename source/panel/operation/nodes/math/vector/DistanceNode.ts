import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class DistanceNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;
    generateCode () {
        let A = this.getInputValue(0);
        let B = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = distance(${A}, ${B});`;
    }
}
