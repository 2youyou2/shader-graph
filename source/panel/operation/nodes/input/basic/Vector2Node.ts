import InputNode from "../InputNode";

export default class Vector2Node extends InputNode {
    generateCode () {
        let x = this.getInputValue(0);
        let y = this.getInputValue(1);
        return `vec2 ${this.getOutputVarName(0)} = vec2(${x}, ${y});`;
    }
}

