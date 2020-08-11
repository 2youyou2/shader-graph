import { ShaderNode } from "../../../base";

export default class SphereMaskNode extends ShaderNode {
    generateCode () {
        let Coords = this.getInputValue(0);
        let Center = this.getInputValue(1);
        let Radius = this.getInputValue(1);
        let Hardness = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = 1 - saturate((distance(${Coords}, ${Center}) - ${Radius}) / (1 - ${Hardness}));`;
    }
}
