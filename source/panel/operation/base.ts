import { getJsonObject, getFloatString, getValueElement, getValueElementStr, getValueConcretePrecision, getPrecisionName } from "./utils";
import { relative } from "path";
import { ConcretePrecisionType, TextureConcretePrecision } from "./type";

export class ShaderPropery {
    type = {};
    data: any = {}

    name = '';
    node: ShaderNode | null = null;

    constructor (obj: any) {
        this.type = obj.type;
        this.data = getJsonObject(obj.JSONnodeData);

        this.name = this.data.m_Name;
        this.name = this.name.replace(/ /g, '_');
    }

    get defaultValue () {
        return this.data.m_Value;
    }

    get concretePrecision () {
        return getValueConcretePrecision(this.defaultValue);
    }
}



export class ShaderNode {
    type = {};
    data: any = {}

    priority = 0;
    uuid = '';
    slots: ShaderSlot[] = [];
    slotsMap: Map<number, ShaderSlot> = new Map;

    deps: ShaderNode[] = []

    depChunks: string[] = []
    depVarings: number[] = []

    isMasterNode = false;
    isPropertyNode = false;
    concretePrecisionType = ConcretePrecisionType.Min;
    fixedConcretePrecision = 0;

    // subgraphNode: SubGraphNode | null = null;

    constructor (data: any) {
        this.type = data.typeInfo;
        this.data = getJsonObject(data.JSONnodeData);

        this.uuid = this.data.m_GuidSerialized;
        this.slots = this.data.m_SerializableSlots.map(d => {
            let slot = new ShaderSlot(d, this);
            this.slotsMap.set(slot.id, slot);
            return slot;
        });
    }
    
    beforeGenreateCode () {
    }

    addDependency (dep) {
        if (dep === this) {
            return;
        }
        if (!this.deps.includes(dep)) {
            this.deps.push(dep);
        }
    }

    calcConcretePrecision () {
        if (this.fixedConcretePrecision > 0) {
            this.slots.forEach(slot => {
                slot._concretePrecision = this.fixedConcretePrecision;
            })
        }
        if (this.concretePrecisionType !== ConcretePrecisionType.Fixed) {
            let finalPrecision: number = 1;
            if (this.concretePrecisionType === ConcretePrecisionType.Min) {
                finalPrecision = 999;
                this.inputSlots.forEach(slot => {
                    let concretePrecision = slot.concretePrecision;
                    if (slot.connectSlot) {
                        concretePrecision = slot.connectSlot.concretePrecision;
                    }
                    finalPrecision = Math.min(finalPrecision, concretePrecision);
                })
            }
            else if (this.concretePrecisionType === ConcretePrecisionType.Max) {
                finalPrecision = -999;
                this.inputSlots.forEach(slot => {
                    let concretePrecision = slot.concretePrecision;
                    if (slot.connectSlot) {
                        concretePrecision = slot.connectSlot.concretePrecision;
                    }
                    finalPrecision = Math.max(finalPrecision, concretePrecision);
                })
            }
            else if (this.concretePrecisionType === ConcretePrecisionType.Texture) {
                finalPrecision = TextureConcretePrecision.Texture2D;
            }
            else {
                console.error('Not supported ConcretePrecisionType : ' + this.concretePrecisionType);
            }

            this.slots.forEach(slot => {
                slot._concretePrecision = finalPrecision;
            })
        }
    }

    setPriority (priority) {
        this.priority = Math.max(priority, this.priority);
        for (let i = 0; i < this.deps.length; i++) {
            this.deps[i].setPriority(this.priority + 1);
        }
    }

    get outputSlots () {
        return this.slots.filter(s => s.type === ShaderSlotType.Output);
    }

    get inputSlots () {
        return this.slots.filter(s => s.type === ShaderSlotType.Input);
    }

    getSlotWithSlotName (name) {
        return this.slots.find(s => s.displayName === name);
    }
    getOutputSlotWithSlotName (name) {
        return this.outputSlots.find(s => s.displayName === name);
    }
    getOutputVarName (idx) {
        return this.outputSlots[idx].varName;
    }
    getOutputVarDefine (idx) {
        return this.outputSlots[idx].varDefine;
    }
    getInputValue (idx) {
        return this.inputSlots[idx].slotValue;
    }

    generateCode () {
        return '';
    }
}

let _GlobalShaderSlotID_ = 0;
export function resetGlobalShaderSlotID () {
    _GlobalShaderSlotID_ = 0;
}

export enum ShaderSlotType {
    Input,
    Output
}

export class ShaderSlot {
    typeInfo = {};
    data: any = {}

    id = 0;

    globalID = 0;
    displayName = '';

    get connectSlot () {
        return this.connectSlots[0];
    };
    set connectSlot (v) {
        this.connectSlots.length = 0;
        if (v) {
            this.connectSlots[0] = v;
        }
    }
    connectSlots: ShaderSlot[] = [];

    node: ShaderNode | undefined = undefined;

    type = ShaderSlotType.Input;

    constructor (obj: any, node: ShaderNode) {
        this.typeInfo = obj.typeInfo;
        this.data = getJsonObject(obj.JSONnodeData);

        this.type = this.data.m_SlotType as ShaderSlotType;

        this.node = node;

        this.id = this.data.m_Id;
        this.globalID = _GlobalShaderSlotID_++;
        this.displayName = this.data.m_DisplayName;
    }

    get varName () {
        if (this.node?.isPropertyNode) {
            return this.node.property.name;
        }
        return 'var_' + this.globalID;
    }

    get varDefine () {
        let name = getPrecisionName(this.concretePrecision);
        if (name) {
            name += ' ';
        }
        return name + this.varName;
    }

    get defaultValue () {
        let defaultValue = this.data.m_Value;

        let x = getFloatString(defaultValue.x);
        let y = getFloatString(defaultValue.y);
        let z = getFloatString(defaultValue.z);
        let w = getFloatString(defaultValue.w);

        let result = getFloatString(defaultValue);
        if (typeof defaultValue === 'object') {
            if (defaultValue.w !== undefined) {
                result = `vec4(${x}, ${y}, ${z}, ${w})`;
            }
            else if (defaultValue.z !== undefined) {
                result = `vec3(${x}, ${y}, ${z})`;
            }
            else if (defaultValue.y !== undefined) {
                result = `vec2(${x}, ${y})`;
            }
        }

        return result;
    }

    get slotValue () {
        let valueConretePresition = this.defaultConcretePrecision;
        let selfConcretePresition = this.concretePrecision;
        let defaultValue = this.data.m_Value;

        let x = getValueElementStr(defaultValue, 0);
        let y = getValueElementStr(defaultValue, 1);
        let z = getValueElementStr(defaultValue, 2);
        let w = getValueElementStr(defaultValue, 3);

        if (typeof defaultValue !== 'object') {
            x = getFloatString(defaultValue);
        }


        let result = '{{value}}';
        if (selfConcretePresition === 2) {
            result = `vec2({{value}})`
        }
        else if (selfConcretePresition === 3) {
            result = `vec3({{value}})`
        }
        else if (selfConcretePresition === 4) {
            result = `vec4({{value}})`
        }
        let value = '';

        if (!this.connectSlot) {
            valueConretePresition = getValueConcretePrecision(defaultValue);

            let values = [x, y, z, w];
            let concreteValues: any[] = [];
            for (let i = 0; i < selfConcretePresition; i++) {
                concreteValues.push(values[i] === undefined ? 0 : values[i]);
            }
            value = concreteValues.join(', ')
        }
        else {
            valueConretePresition = this.connectSlot.concretePrecision;

            value = this.connectSlot.varName;
            if (selfConcretePresition !== valueConretePresition) {
                if (selfConcretePresition < valueConretePresition) {
                    if (selfConcretePresition === 1) {
                        value += '.x';
                    }
                    else if (selfConcretePresition === 2) {
                        value += '.xy';
                    }
                    else if (selfConcretePresition === 3) {
                        value += '.xyz';
                    }
                }
                else {
                    if (valueConretePresition !== 1) {
                        let dif = selfConcretePresition - valueConretePresition;
                        let difValues: any[] = []
                        for (let i = 0; i < dif; i++) {
                            difValues.push('0.');
                        }
                        value += ', ' + difValues.join(', ')
                    }
                    // if (dif === 1) {
                    //     value += `, ${x}`;
                    // }
                    // else if (dif === 2) {
                    //     value += `, ${x}, ${y}`;
                    // }
                    // else if (dif === 3) {
                    //     value += `, ${x}, ${y}, ${z}`;
                    // }
                }
            }
        }

        result = result.replace('{{value}}', value);

        return result;
    }

    get defaultConcretePrecision () {
        let concretePrecision = 1;

        let value = this.data.m_Value;
        if (typeof value === 'object') {
            if (value.w !== undefined) {
                concretePrecision = 4;
            }
            else if (value.z !== undefined) {
                concretePrecision = 3;
            }
            else if (value.y !== undefined) {
                concretePrecision = 2;
            }
        }

        return concretePrecision;
    }

    _concretePrecision = -1;
    get concretePrecision () {
        if (this._concretePrecision === -1) {
            let value = this.data.m_Value;
            if (value === undefined) {
                if (this.node?.isPropertyNode) {
                    value = this.node.property.data.m_Value;
                }
            }
            if (value === undefined) {
                console.error('Slot Value is undefined, concrete precision maybe wrong.');
            }
            this._concretePrecision = getValueConcretePrecision(value);
        }
        return this._concretePrecision;
    }
}

export class ShaderEdgeSlot {
    id = 0;
    nodeUuid = '';

    set (data: any) {
        this.id = data.m_SlotId;
        this.nodeUuid = data.m_NodeGUIDSerialized;
    }
}

export class ShaderEdge {
    type = {};
    data: any = {}

    input: ShaderEdgeSlot = new ShaderEdgeSlot;
    output: ShaderEdgeSlot = new ShaderEdgeSlot;

    constructor (data: any) {
        this.type = data.typeInfo;
        this.data = getJsonObject(data.JSONnodeData);

        this.input.set(this.data.m_InputSlot);
        this.output.set(this.data.m_OutputSlot);
    }
}