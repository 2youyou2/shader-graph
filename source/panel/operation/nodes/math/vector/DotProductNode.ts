import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class DotProductNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;
    generateCode () {
        let A = this.getInputValue(0);
        let B = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = dot(${A}, ${B});`;
    }
}
