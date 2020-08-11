import { ShaderNode } from "../../../base";

export default class FloorNode extends ShaderNode {
    generateCode () {
        let In = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = floor(${In});`;
    }
}

