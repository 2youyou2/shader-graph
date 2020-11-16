import { TextureConcretePrecision } from "./type";
import path from 'path';

export const shaderTemplatesDir = path.join(__dirname, '../../../static/shader-templates')

export function getJsonObject (str: string) {
    let content;
    try {
        content = JSON.parse(str);
    }
    catch (err) {
        console.error(err);
    }
    return content;
}

export function getFloatString (value: number) {
    if (typeof value !== 'number') {
        return value;
    }

    let str = value + '';
    if (!str.includes('.')) {
        str += '.';
    }
    return str;
}

let ValueElements = {
    vector: ['x', 'y', 'z', 'w'],
    color: ['r', 'g', 'b', 'a'],
    mat4: ['e00', 'e01', 'e02', 'e03']
}

export function getValueElement (value: any | number, index: number): number {
    if (typeof value === 'number') {
        return value;
    }

    let elements;

    if (value.x !== undefined) {
        elements = ValueElements.vector;
    }
    else if (value.r !== undefined) {
        elements = ValueElements.color;
    }
    else if (value.e00 !== undefined) {
        elements = ValueElements.mat4;
    }

    return value[elements[index]] || 0;
}

export function getValueElementStr(value: object | number, index: number): string {
    return getFloatString(getValueElement(value, index));
}

export function getValueConcretePrecision (value) {
    let valueConretePresition = 1;
    if (typeof value === 'object') {
        if (value.w !== undefined || value.a !== undefined) {
            valueConretePresition = 4;
        }
        else if (value.z !== undefined || value.b !== undefined) {
            valueConretePresition = 3;
        }
        else if (value.y !== undefined || value.g !== undefined) {
            valueConretePresition = 2;
        }
        else if (value.m_SerializedTexture !== undefined) {
            valueConretePresition = TextureConcretePrecision.Texture2D;
        }
        else if (value.m_SerializedCubemap !== undefined) {
            valueConretePresition = TextureConcretePrecision.TextureCube;
        }
    }
    return valueConretePresition;
}

export function getPrecisionName (precision: number) {
    let name = '';
    if (precision === 1) {
        name = 'float';
    }
    else if (precision === 2) {
        name = 'vec2';
    }
    else if (precision === 3) {
        name = 'vec3';
    }
    else if (precision === 4) {
        name = 'vec4';
    }
    else if (precision === TextureConcretePrecision.Texture2D) {
        name = 'sampler2D';
    }
    else if (precision === TextureConcretePrecision.TextureCube) {
        name = 'samplerCube';
    }
    return name;
}
