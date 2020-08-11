import { ShaderNode } from "../../../base";

export default class Arctangent2Node extends ShaderNode {
    generateCode () {
        let a = this.getInputValue(0);
        let b = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = atan2(${a}, ${b});`;
    }
}
