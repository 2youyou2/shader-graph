import InputNode from "../InputNode";
import { ConcretePrecisionType } from "../../../type";
import { getFloatString } from "../../../utils";

export default class SliderNode extends InputNode {
    fixedConcretePrecision = 1;

    generateCode () {
        let slot = this.slots[0];
        let value = getFloatString(this.data.m_Value.x);
        return `${slot.varDefine} = ${value};`;
    }
}

