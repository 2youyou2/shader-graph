import { ShaderNode } from "../../../base";

export default class RejectionNode extends ShaderNode {
    generateCode () {
        let In = this.getInputValue(0);
        let Normal = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = reflect(${In}, ${Normal});`;
    }
}
