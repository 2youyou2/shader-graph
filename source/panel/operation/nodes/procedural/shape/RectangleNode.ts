import ShapeNode from "./ShapeNode";

export default class RectangleNode extends ShapeNode {
    
    generateCode () {
        let uv = this.getInputValue(0);
        let width = this.getInputValue(1);
        let height = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = rect(${uv}, ${width}, ${height});`;
    }
}
