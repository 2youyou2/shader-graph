import { ShaderNode } from "../../../base";

export default class RoundNode extends ShaderNode {
    generateCode () {
        let In = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = floor(${In} + 0.5);`;
    }
}

