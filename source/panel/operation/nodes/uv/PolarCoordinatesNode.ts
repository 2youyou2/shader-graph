import { ShaderNode } from "../../base";
import { ConcretePrecisionType } from "../../type";

export default class PolarCoordinatesNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;
    depChunks = ['uv']

    generateCode () {
        let UV;
        if (!this.inputSlots[0].connectSlot) {
            UV = 'v_uv';
        }
        else {
            UV = this.getInputValue(0);
        }
        let Center = this.getInputValue(1);
        let RadialScale = this.getInputValue(2);
        let LengthScale = this.getInputValue(2);
        return `vec2 ${this.getOutputVarName(0)} = polarCoordinates(${UV}, ${Center}, ${RadialScale}, ${LengthScale});`;
    }
}
