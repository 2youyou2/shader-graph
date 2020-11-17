import InputNode from "../InputNode";
import { NormalMapSpace, NormalSpace } from "../../../type";

enum TextureType {
    Default,
    Normal
}

enum TextureNormalSpace {
    Tangent,
    Object
}

export default class SampleTexture2DNode extends InputNode {
    constructor (data) {
        super(data);

        if (this.data.m_TextureType === TextureType.Normal && this.data.m_NormalMapSpace === TextureNormalSpace.Tangent) {
            this.depVarings.push(NormalMapSpace, NormalSpace.World)
        }
    }

    generateCode () {
        let texture = this.getSlotWithSlotName('Texture');
        let rgba = this.getSlotWithSlotName('RGBA');

        let rgbaVarName = rgba?.varName;
        let code;
        if (!texture?.connectSlot) {
            code = `vec4 ${rgbaVarName} = vec4(1.);\n`;
        }
        else {
            let uv;
            if (!this.inputSlots[1].connectSlot) {
                uv = 'v_uv';
            }
            else {
                uv = this.getInputValue(1);
            }
            code = `vec4 ${rgbaVarName} = texture(${texture?.connectSlot.varName}, ${uv});\n`;
        }


        if (this.data.m_TextureType === TextureType.Normal && this.data.m_NormalMapSpace === NormalSpace.Tangent) {
            code += `${rgbaVarName}.xyz -= vec3(0.5);\n`;
            code += `${rgbaVarName}.xyz = \n`;
            code += `  ${rgbaVarName}.x * normalize(v_tangent) +\n`;
            code += `  ${rgbaVarName}.y * normalize(v_bitangent) +\n`;
            code += `  ${rgbaVarName}.z * normalize(worldNormal);\n`;
        }

        let r = this.getSlotWithSlotName('R');
        if (r && r.connectSlot) {
            code += `float ${r.varName} = ${rgbaVarName}.r;\n`;
        }
        let g = this.getSlotWithSlotName('G');
        if (g && g.connectSlot) {
            code += `float ${g.varName} = ${rgbaVarName}.g;\n`;
        }
        let b = this.getSlotWithSlotName('B');
        if (b && b.connectSlot) {
            code += `float ${b.varName} = ${rgbaVarName}.b;\n`;
        }
        let a = this.getSlotWithSlotName('A');
        if (a && a.connectSlot) {
            code += `float ${a.varName} = ${rgbaVarName}.a;\n`;
        }

        return code;
    }
}

