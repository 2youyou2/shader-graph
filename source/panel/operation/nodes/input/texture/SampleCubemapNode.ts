import InputNode from "../InputNode";
import { NormalMapSpace, NormalSpace, ConcretePrecisionType, ViewDirectionSpace } from "../../../type";
import PropertyNode from "../PropertyNode";


export default class SampleTexture2DNode extends InputNode {

    beforeGenreateCode () {
        let viewSlot = this.getSlotWithSlotName('ViewDir');
        if (!viewSlot?.connectSlot) {
            this.depVarings.push(ViewDirectionSpace.Object);
        }
        let normalSlot = this.getSlotWithSlotName('Normal');
        if (!normalSlot?.connectSlot) {
            this.depVarings.push(NormalSpace.Object);
        }
    }

    generateCode () {
        let cubeSlot = this.getSlotWithSlotName('Cube');
        let node = cubeSlot?.connectSlot && cubeSlot?.connectSlot.node as PropertyNode;
        if (!node) {
            return '';
        }

        let V = 'view';
        let N = 'normal';

        let viewSlot = this.getSlotWithSlotName('ViewDir');
        if (viewSlot?.connectSlot) {
            V = viewSlot?.connectSlot.varName;
        }
        let normalSlot = this.getSlotWithSlotName('Normal');
        if (normalSlot?.connectSlot) {
            N = normalSlot?.connectSlot.varName;
        }

        let R = `${this.getOutputVarName(0)}_R`;

        let code = ''
        code += `vec3 ${R} = reflect( -normalize( ${V} ), ${N} );\n`
        code += `${this.getOutputVarDefine(0)} = texture(${node.property?.name}, ${R});\n`
        return code;
    }
}

