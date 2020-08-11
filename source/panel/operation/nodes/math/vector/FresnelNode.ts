import { ShaderNode } from "../../../base";

export default class FresnelNode extends ShaderNode {
    generateCode () {
        let Normal = this.getInputValue(0);
        let ViewDir = this.getInputValue(1);
        let Power = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = pow((1.0 - saturate(dot(normalize(${Normal}), normalize(${ViewDir})))), ${Power});`;
    }
}
