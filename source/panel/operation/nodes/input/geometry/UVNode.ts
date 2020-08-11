import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class UVNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    calcConcretePrecision () {
        this.slots.forEach(slot => {
            slot._concretePrecision = 2;
        })
    }

    generateCode () {
        let uvName = 'v_uv';
        if (this.data.m_OutputChannel) {
            uvName = `v_uv${this.data.m_OutputChannel}`;
        }
        return `${this.getOutputVarDefine(0)} = ${uvName};`;
    }
}

