import { ShaderNode } from "../../../base";
import { getPrecisionName } from "../../../utils";

export default class InvertColorsNode extends ShaderNode {
    generateCode () {
        let ins = this.inputSlots[0];
        let precision = ins.concretePrecision;

        let inputVarName = ins.varName;
        let code: string = '';
        if (!ins.connectSlot) {
            code += `${getPrecisionName(precision)} ${inputVarName} = ${ins.slotValue};`;
        }
        else {
            inputVarName = ins.connectSlot.varName;
        }

        let value: string;
        if (precision > 1) {
            let values: string[] = []
            values.push(this.data.m_RedChannel ? `1. - ${inputVarName}.r` : `${inputVarName}.r`);
            values.push(this.data.m_GreenChannel ? `1. - ${inputVarName}.g` : `${inputVarName}.g`);
            values.push(this.data.m_BlueChannel ? `1. - ${inputVarName}.b` : `${inputVarName}.b`);
            values.push(this.data.m_AlphaChannel ? `1. - ${inputVarName}.a` : `${inputVarName}.a`);

            values.length = precision;

            value = values.join(', ');
        }
        else {
            value = this.data.m_RedChannel ? `1. - ${inputVarName}` : `${inputVarName}`;
        }

        code += `${getPrecisionName(precision)} ${this.getOutputVarName(0)} = ${getPrecisionName(precision)}(${value});`;
        return code;
    }
}
