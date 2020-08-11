import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class RemapNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    generateCode () {
        let In = this.getInputValue(0);
        let InMinMax = this.getInputValue(1);
        let OutMinMax = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = ${OutMinMax}.x + (${In} - ${InMinMax}.x) * (${OutMinMax}.y - ${OutMinMax}.x) / (${InMinMax}.y - ${InMinMax}.x);`;
    }
}

