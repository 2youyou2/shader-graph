import { ShaderNode } from "../../base";
import { ConcretePrecisionType } from "../../type";

export default class CombineNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    generateCode () {

        let slotR = this.getSlotWithSlotName('R');
        let slotG = this.getSlotWithSlotName('G');
        let slotB = this.getSlotWithSlotName('B');
        let slotA = this.getSlotWithSlotName('A');

        let slotRGBA = this.getSlotWithSlotName('RGBA');
        let slotRGB = this.getSlotWithSlotName('RGB');
        let slotRG = this.getSlotWithSlotName('RG');

        let code = '';

        if (slotRGBA && slotRGBA.connectSlot) {
            code += `${slotRGBA?.varDefine} = vec4(${slotR?.slotValue}, ${slotG?.slotValue}, ${slotB?.slotValue}, ${slotA?.slotValue});\n`;
        }
        if (slotRGB && slotRGB.connectSlot) {
            code += `${slotRGB?.varDefine} = vec3(${slotR?.slotValue}, ${slotG?.slotValue}, ${slotB?.slotValue});\n`;
        }
        if (slotRG && slotRG.connectSlot) {
            code += `${slotRG?.varDefine} = vec2(${slotR?.slotValue}, ${slotG?.slotValue});\n`;
        }
        
        return code;
    }
}
