import { ShaderNode } from "../../../base";

export default class SmoothstepNode extends ShaderNode {
    generateCode () {
        let Edge1 = this.getInputValue(0);
        let Edge2 = this.getInputValue(1);
        let In    = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = smoothstep(${Edge1}, ${Edge2}, ${In});`;
    }
}

