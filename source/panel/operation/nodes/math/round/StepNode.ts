import { ShaderNode } from "../../../base";

export default class StepNode extends ShaderNode {
    generateCode () {
        let edge = this.getInputValue(0);
        let In = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = step(${edge}, ${In});`;
    }
}
