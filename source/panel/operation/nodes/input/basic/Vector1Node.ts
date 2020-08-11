import InputNode from "../InputNode";

export default class Vector1Node extends InputNode {
    generateCode () {
        return `float ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}

