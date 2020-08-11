import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class GradientNoiseNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    depChunks = ['noise']

    generateCode () {
        let uv = this.getInputValue(0);
        let scale = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = gradientNoise(${uv}, ${scale});`;
    }
}
