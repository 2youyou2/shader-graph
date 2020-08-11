import InputNode from "../InputNode";

export default class BooleanNode extends InputNode {
    generateCode () {
        return `bool ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}

