import { ShaderNode } from "../../base";
import { ConcretePrecisionType } from "../../type";

export default class TilingAndOffsetNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;
    
    generateCode () {
        let UV;
        if (!this.inputSlots[0].connectSlot) {
            UV = 'v_uv';
        }
        else {
            UV = this.getInputValue(0);
        }
        let Tiling = this.getInputValue(1);
        let Offset = this.getInputValue(2);
        return `vec2 ${this.getOutputVarName(0)} = ${UV} * ${Tiling} + ${Offset};`;
    }
}
