import { ShaderNode } from "../../../base";

export default class ModuloNode extends ShaderNode {
    calcConcretePrecision () {
        super.calcConcretePrecision()
    }
    generateCode () {
        let A = this.getInputValue(0);
        let B = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = mod(${A}, ${B});`;
    }
}
