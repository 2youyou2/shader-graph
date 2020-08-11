import { ShaderNode } from "../../../base";

export default class TriangleWaveNode extends ShaderNode {
    generateCode () {
        let In = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = 2.0 * abs( 2. * (${In} - floor(0.5 + ${In})) ) - 1.0;`;
    }
}
