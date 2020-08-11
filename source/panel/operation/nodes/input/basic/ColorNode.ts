import InputNode from "../InputNode";

export default class ColorNode extends InputNode {
    fixedConcretePrecision = 4;

    generateCode () {
        let r, g, b, a;
        if (this.inputSlots.length !== 0) {
            r = this.getInputValue(0);
            g = this.getInputValue(1);
            b = this.getInputValue(2);
            a = this.getInputValue(3);
        }
        else {
            let color = this.data.m_Color.color;
            r = color.r;
            g = color.g;
            b = color.b;
            a = color.a;
        }
        
        return `vec4 ${this.getOutputVarName(0)} = vec4(${r}, ${g}, ${b}, ${a});`;
    }
}

