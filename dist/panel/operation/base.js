"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderEdge = exports.ShaderEdgeSlot = exports.VertexPositionSlot = exports.ShaderSlot = exports.ShaderSlotType = exports.resetGlobalShaderSlotID = exports.ShaderNode = exports.ShaderPropery = void 0;
const utils_1 = require("./utils");
const type_1 = require("./type");
class ShaderPropery {
    constructor(obj) {
        this.type = {};
        this.data = {};
        this.displayName = '';
        this.referenceName = '';
        this.node = null;
        this.type = obj.type;
        this.data = utils_1.getJsonObject(obj.JSONnodeData);
        this.displayName = this.data.m_Name;
        this.displayName = this.displayName.replace(/ /g, '_');
        this.referenceName = this.data.m_OverrideReferenceName || this.displayName;
    }
    get defaultValue() {
        return this.data.m_Value;
    }
    get concretePrecision() {
        return utils_1.getValueConcretePrecision(this.defaultValue);
    }
}
exports.ShaderPropery = ShaderPropery;
class ShaderNode {
    // subgraphNode: SubGraphNode | null = null;
    constructor(data) {
        this.type = {};
        this.data = {};
        this.priority = 0;
        this.uuid = '';
        this.slots = [];
        this.slotsMap = new Map;
        this.deps = [];
        this.depChunks = [];
        this.depVarings = [];
        this.isMasterNode = false;
        this.isPropertyNode = false;
        this.concretePrecisionType = type_1.ConcretePrecisionType.Min;
        this.fixedConcretePrecision = 0;
        this.type = data.typeInfo;
        this.data = utils_1.getJsonObject(data.JSONnodeData);
        this.uuid = this.data.m_GuidSerialized;
        this.slots = this.data.m_SerializableSlots.map(d => {
            let slot = ShaderSlot.create(d, this);
            this.slotsMap.set(slot.id, slot);
            return slot;
        });
    }
    beforeGenreateCode() {
    }
    addDependency(dep) {
        if (dep === this) {
            return;
        }
        if (!this.deps.includes(dep)) {
            this.deps.push(dep);
        }
    }
    calcConcretePrecision() {
        if (this.fixedConcretePrecision > 0) {
            this.slots.forEach(slot => {
                slot._concretePrecision = this.fixedConcretePrecision;
            });
        }
        if (this.concretePrecisionType !== type_1.ConcretePrecisionType.Fixed) {
            let finalPrecision = 1;
            if (this.concretePrecisionType === type_1.ConcretePrecisionType.Min) {
                finalPrecision = 999;
                this.inputSlots.forEach(slot => {
                    let concretePrecision = slot.concretePrecision;
                    if (slot.connectSlot) {
                        concretePrecision = slot.connectSlot.concretePrecision;
                    }
                    finalPrecision = Math.min(finalPrecision, concretePrecision);
                });
            }
            else if (this.concretePrecisionType === type_1.ConcretePrecisionType.Max) {
                finalPrecision = -999;
                this.inputSlots.forEach(slot => {
                    let concretePrecision = slot.concretePrecision;
                    if (slot.connectSlot) {
                        concretePrecision = slot.connectSlot.concretePrecision;
                    }
                    finalPrecision = Math.max(finalPrecision, concretePrecision);
                });
            }
            else if (this.concretePrecisionType === type_1.ConcretePrecisionType.Texture) {
                finalPrecision = type_1.TextureConcretePrecision.Texture2D;
            }
            else {
                console.error('Not supported ConcretePrecisionType : ' + this.concretePrecisionType);
            }
            this.slots.forEach(slot => {
                slot._concretePrecision = finalPrecision;
            });
        }
    }
    setPriority(priority) {
        this.priority = Math.max(priority, this.priority);
        for (let i = 0; i < this.deps.length; i++) {
            this.deps[i].setPriority(this.priority + 1);
        }
    }
    get outputSlots() {
        return this.slots.filter(s => s.type === ShaderSlotType.Output);
    }
    get inputSlots() {
        return this.slots.filter(s => s.type === ShaderSlotType.Input);
    }
    getSlotWithSlotName(name) {
        return this.slots.find(s => s.displayName === name);
    }
    getOutputSlotWithSlotName(name) {
        return this.outputSlots.find(s => s.displayName === name);
    }
    getOutputVarName(idx) {
        return this.outputSlots[idx].varName;
    }
    getOutputVarDefine(idx) {
        return this.outputSlots[idx].varDefine;
    }
    getInputValue(idx) {
        return this.inputSlots[idx].slotValue;
    }
    generateCode() {
        return '';
    }
}
exports.ShaderNode = ShaderNode;
let _GlobalShaderSlotID_ = 0;
function resetGlobalShaderSlotID() {
    _GlobalShaderSlotID_ = 0;
}
exports.resetGlobalShaderSlotID = resetGlobalShaderSlotID;
var ShaderSlotType;
(function (ShaderSlotType) {
    ShaderSlotType[ShaderSlotType["Input"] = 0] = "Input";
    ShaderSlotType[ShaderSlotType["Output"] = 1] = "Output";
})(ShaderSlotType = exports.ShaderSlotType || (exports.ShaderSlotType = {}));
class ShaderSlot {
    constructor(typeInfo, data, node) {
        this.typeInfo = {};
        this.data = {};
        this.id = 0;
        this.globalID = 0;
        this.displayName = '';
        this.connectSlots = [];
        this.node = undefined;
        this.type = ShaderSlotType.Input;
        this._concretePrecision = -1;
        this.typeInfo = typeInfo;
        this.data = data;
        this.type = this.data.m_SlotType;
        this.node = node;
        this.id = this.data.m_Id;
        this.globalID = _GlobalShaderSlotID_++;
        this.displayName = this.data.m_DisplayName;
    }
    static create(obj, node) {
        let typeInfo = obj.typeInfo;
        let data = utils_1.getJsonObject(obj.JSONnodeData);
        if (data.m_DisplayName === 'Vertex Position') {
            return new VertexPositionSlot(typeInfo, data, node);
        }
        return new ShaderSlot(typeInfo, data, node);
    }
    get connectSlot() {
        return this.connectSlots[0];
    }
    ;
    set connectSlot(v) {
        this.connectSlots.length = 0;
        if (v) {
            this.connectSlots[0] = v;
        }
    }
    get varName() {
        var _a;
        if ((_a = this.node) === null || _a === void 0 ? void 0 : _a.isPropertyNode) {
            return this.node.property.referenceName;
        }
        return 'var_' + this.globalID;
    }
    get varDefine() {
        let name = utils_1.getPrecisionName(this.concretePrecision);
        if (name) {
            name += ' ';
        }
        return name + this.varName;
    }
    get defaultValue() {
        let defaultValue = this.data.m_Value;
        let x = utils_1.getFloatString(defaultValue.x);
        let y = utils_1.getFloatString(defaultValue.y);
        let z = utils_1.getFloatString(defaultValue.z);
        let w = utils_1.getFloatString(defaultValue.w);
        let result = utils_1.getFloatString(defaultValue);
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
    get slotValue() {
        let valueConretePresition = this.defaultConcretePrecision;
        let selfConcretePresition = this.concretePrecision;
        let defaultValue = this.data.m_Value;
        let x = utils_1.getValueElementStr(defaultValue, 0);
        let y = utils_1.getValueElementStr(defaultValue, 1);
        let z = utils_1.getValueElementStr(defaultValue, 2);
        let w = utils_1.getValueElementStr(defaultValue, 3);
        if (typeof defaultValue !== 'object') {
            x = utils_1.getFloatString(defaultValue);
        }
        let result = '{{value}}';
        if (selfConcretePresition === 2) {
            result = `vec2({{value}})`;
        }
        else if (selfConcretePresition === 3) {
            result = `vec3({{value}})`;
        }
        else if (selfConcretePresition === 4) {
            result = `vec4({{value}})`;
        }
        let value = '';
        if (!this.connectSlot) {
            valueConretePresition = utils_1.getValueConcretePrecision(defaultValue);
            let values = [x, y, z, w];
            let concreteValues = [];
            for (let i = 0; i < selfConcretePresition; i++) {
                concreteValues.push(values[i] === undefined ? 0 : values[i]);
            }
            value = concreteValues.join(', ');
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
                        let difValues = [];
                        for (let i = 0; i < dif; i++) {
                            difValues.push('0.');
                        }
                        value += ', ' + difValues.join(', ');
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
    get defaultConcretePrecision() {
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
    get concretePrecision() {
        var _a;
        if (this._concretePrecision === -1) {
            let value = this.data.m_Value;
            if (value === undefined) {
                if ((_a = this.node) === null || _a === void 0 ? void 0 : _a.isPropertyNode) {
                    value = this.node.property.data.m_Value;
                }
            }
            if (value === undefined) {
                console.error('Slot Value is undefined, concrete precision maybe wrong.');
            }
            this._concretePrecision = utils_1.getValueConcretePrecision(value);
        }
        return this._concretePrecision;
    }
}
exports.ShaderSlot = ShaderSlot;
class VertexPositionSlot extends ShaderSlot {
    get concretePrecision() {
        return 3;
    }
    get slotValue() {
        let value = super.slotValue;
        return `vec4(${value}, 1.)`;
    }
}
exports.VertexPositionSlot = VertexPositionSlot;
class ShaderEdgeSlot {
    constructor() {
        this.id = 0;
        this.nodeUuid = '';
    }
    set(data) {
        this.id = data.m_SlotId;
        this.nodeUuid = data.m_NodeGUIDSerialized;
    }
}
exports.ShaderEdgeSlot = ShaderEdgeSlot;
class ShaderEdge {
    constructor(data) {
        this.type = {};
        this.data = {};
        this.input = new ShaderEdgeSlot;
        this.output = new ShaderEdgeSlot;
        this.type = data.typeInfo;
        this.data = utils_1.getJsonObject(data.JSONnodeData);
        this.input.set(this.data.m_InputSlot);
        this.output.set(this.data.m_OutputSlot);
    }
}
exports.ShaderEdge = ShaderEdge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBMEk7QUFFMUksaUNBQXlFO0FBR3pFLE1BQWEsYUFBYTtJQVV0QixZQUFhLEdBQVE7UUFUckIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFNBQUksR0FBUSxFQUFFLENBQUE7UUFFZCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUduQixTQUFJLEdBQXNCLElBQUksQ0FBQztRQUczQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQy9FLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLGlCQUFpQjtRQUNqQixPQUFPLGlDQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUEzQkQsc0NBMkJDO0FBSUQsTUFBYSxVQUFVO0lBbUJuQiw0Q0FBNEM7SUFFNUMsWUFBYSxJQUFTO1FBcEJ0QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsU0FBSSxHQUFRLEVBQUUs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QUM7Q0FDSjtBQVRELGdEQVNDO0FBR0QsTUFBYSxjQUFjO0lBQTNCO1FBQ0ksT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFNbEIsQ0FBQztJQUpHLEdBQUcsQ0FBRSxJQUFTO1FBQ1YsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQzlDLENBQUM7Q0FDSjtBQVJELHdDQVFDO0FBRUQsTUFBYSxVQUFVO0lBT25CLFlBQWEsSUFBUztRQU50QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsU0FBSSxHQUFRLEVBQUUsQ0FBQTtRQUVkLFVBQUssR0FBbUIsSUFBSSxjQUFjLENBQUM7UUFDM0MsV0FBTSxHQUFtQixJQUFJLGNBQWMsQ0FBQztRQUd4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNKO0FBZEQsZ0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRKc29uT2JqZWN0LCBnZXRGbG9hdFN0cmluZywgZ2V0VmFsdWVFbGVtZW50LCBnZXRWYWx1ZUVsZW1lbnRTdHIsIGdldFZhbHVlQ29uY3JldGVQcmVjaXNpb24sIGdldFByZWNpc2lvbk5hbWUgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyByZWxhdGl2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSwgVGV4dHVyZUNvbmNyZXRlUHJlY2lzaW9uIH0gZnJvbSBcIi4vdHlwZVwiO1xyXG5pbXBvcnQgUHJvcGVydHlOb2RlIGZyb20gJy4vbm9kZXMvaW5wdXQvUHJvcGVydHlOb2RlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJQcm9wZXJ5IHtcclxuICAgIHR5cGUgPSB7fTtcclxuICAgIGRhdGE6IGFueSA9IHt9XHJcblxyXG4gICAgZGlzcGxheU5hbWUgPSAnJztcclxuICAgIHJlZmVyZW5jZU5hbWUgPSAnJztcclxuXHJcblxyXG4gICAgbm9kZTogU2hhZGVyTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChvYmo6IGFueSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IG9iai50eXBlO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGdldEpzb25PYmplY3Qob2JqLkpTT05ub2RlRGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzcGxheU5hbWUgPSB0aGlzLmRhdGEubV9OYW1lO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU5hbWUgPSB0aGlzLmRpc3BsYXlOYW1lLnJlcGxhY2UoLyAvZywgJ18nKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZlcmVuY2VOYW1lID0gdGhpcy5kYXRhLm1fT3ZlcnJpZGVSZWZlcmVuY2VOYW1lIHx8IHRoaXMuZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRWYWx1ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5tX1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb25jcmV0ZVByZWNpc2lvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlQ29uY3JldGVQcmVjaXNpb24odGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJOb2RlIHtcclxuICAgIHR5cGUgPSB7fTtcclxuICAgIGRhdGE6IGFueSA9IHt9XHJcblxyXG4gICAgcHJpb3JpdHkgPSAwO1xyXG4gICAgdXVpZCA9ICcnO1xyXG4gICAgc2xvdHM6IFNoYWRlclNsb3RbXSA9IFtdO1xyXG4gICAgc2xvdHNNYXA6IE1hcDxudW1iZXIsIFNoYWRlclNsb3Q+ID0gbmV3IE1hcDtcclxuXHJcbiAgICBkZXBzOiBTaGFkZXJOb2RlW10gPSBbXVxyXG5cclxuICAgIGRlcENodW5rczogc3RyaW5nW10gPSBbXVxyXG4gICAgZGVwVmFyaW5nczogbnVtYmVyW10gPSBbXVxyXG5cclxuICAgIGlzTWFzdGVyTm9kZSA9IGZhbHNlO1xyXG4gICAgaXNQcm9wZXJ0eU5vZGUgPSBmYWxzZTtcclxuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5NaW47XHJcbiAgICBmaXhlZENvbmNyZXRlUHJlY2lzaW9uID0gMDtcclxuXHJcbiAgICAvLyBzdWJncmFwaE5vZGU6IFN1YkdyYXBoTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGVJbmZvO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGdldEpzb25PYmplY3QoZGF0YS5KU09Obm9kZURhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLnV1aWQgPSB0aGlzLmRhdGEubV9HdWlkU2VyaWFsaXplZDtcclxuICAgICAgICB0aGlzLnNsb3RzID0gdGhpcy5kYXRhLm1fU2VyaWFsaXphYmxlU2xvdHMubWFwKGQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2xvdCA9IFNoYWRlclNsb3QuY3JlYXRlKGQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNsb3RzTWFwLnNldChzbG90LmlkLCBzbG90KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNsb3Q7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmVmb3JlR2VucmVhdGVDb2RlICgpIHtcclxuICAgIH1cclxuXHJcbiAgICBhZGREZXBlbmRlbmN5IChkZXApIHtcclxuICAgICAgICBpZiAoZGVwID09PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmRlcHMuaW5jbHVkZXMoZGVwKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlcHMucHVzaChkZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYWxjQ29uY3JldGVQcmVjaXNpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpeGVkQ29uY3JldGVQcmVjaXNpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIHNsb3QuX2NvbmNyZXRlUHJlY2lzaW9uID0gdGhpcy5maXhlZENvbmNyZXRlUHJlY2lzaW9uO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25jcmV0ZVByZWNpc2lvblR5cGUgIT09IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5GaXhlZCkge1xyXG4gICAgICAgICAgICBsZXQgZmluYWxQcmVjaXNpb246IG51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9PT0gQ29uY3JldGVQcmVjaXNpb25UeXBlLk1pbikge1xyXG4gICAgICAgICAgICAgICAgZmluYWxQcmVjaXNpb24gPSA5OTk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0U2xvdHMuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29uY3JldGVQcmVjaXNpb24gPSBzbG90LmNvbmNyZXRlUHJlY2lzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbG90LmNvbm5lY3RTbG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNyZXRlUHJlY2lzaW9uID0gc2xvdC5jb25uZWN0U2xvdC5jb25jcmV0ZVByZWNpc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxQcmVjaXNpb24gPSBNYXRoLm1pbihmaW5hbFByZWNpc2lvbiwgY29uY3JldGVQcmVjaXNpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9PT0gQ29uY3JldGVQcmVjaXNpb25UeXBlLk1heCkge1xyXG4gICAgICAgICAgICAgICAgZmluYWxQcmVjaXNpb24gPSAtOTk5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFNsb3RzLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbmNyZXRlUHJlY2lzaW9uID0gc2xvdC5jb25jcmV0ZVByZWNpc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2xvdC5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jcmV0ZVByZWNpc2lvbiA9IHNsb3QuY29ubmVjdFNsb3QuY29uY3JldGVQcmVjaXNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsUHJlY2lzaW9uID0gTWF0aC5tYXgoZmluYWxQcmVjaXNpb24sIGNvbmNyZXRlUHJlY2lzaW9uKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jb25jcmV0ZVByZWNpc2lvblR5cGUgPT09IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5UZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBmaW5hbFByZWNpc2lvbiA9IFRleHR1cmVDb25jcmV0ZVByZWNpc2lvbi5UZXh0dXJlMkQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdOb3Qgc3VwcG9ydGVkIENvbmNyZXRlUHJlY2lzaW9uVHlwZSA6ICcgKyB0aGlzLmNvbmNyZXRlUHJlY2lzaW9uVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIHNsb3QuX2NvbmNyZXRlUHJlY2lzaW9uID0gZmluYWxQcmVjaXNpb247XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFByaW9yaXR5IChwcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBNYXRoLm1heChwcmlvcml0eSwgdGhpcy5wcmlvcml0eSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kZXBzW2ldLnNldFByaW9yaXR5KHRoaXMucHJpb3JpdHkgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG91dHB1dFNsb3RzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zbG90cy5maWx0ZXIocyA9PiBzLnR5cGUgPT09IFNoYWRlclNsb3RUeXBlLk91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0U2xvdHMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RzLmZpbHRlcihzID0+IHMudHlwZSA9PT0gU2hhZGVyU2xvdFR5cGUuSW5wdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RXaXRoU2xvdE5hbWUgKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zbG90cy5maW5kKHMgPT4gcy5kaXNwbGF5TmFtZSA9PT0gbmFtZSk7XHJcbiAgICB9XHJcbiAgICBnZXRPdXRwdXRTbG90V2l0aFNsb3ROYW1lIChuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0U2xvdHMuZmluZChzID0+IHMuZGlzcGxheU5hbWUgPT09IG5hbWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0T3V0cHV0VmFyTmFtZSAoaWR4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0U2xvdHNbaWR4XS52YXJOYW1lO1xyXG4gICAgfVxyXG4gICAgZ2V0T3V0cHV0VmFyRGVmaW5lIChpZHgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXRTbG90c1tpZHhdLnZhckRlZmluZTtcclxuICAgIH1cclxuICAgIGdldElucHV0VmFsdWUgKGlkeCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0U2xvdHNbaWR4XS5zbG90VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBfR2xvYmFsU2hhZGVyU2xvdElEXyA9IDA7XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldEdsb2JhbFNoYWRlclNsb3RJRCAoKSB7XHJcbiAgICBfR2xvYmFsU2hhZGVyU2xvdElEXyA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNoYWRlclNsb3RUeXBlIHtcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJTbG90IHtcclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlIChvYmo6IGFueSwgbm9kZTogU2hhZGVyTm9kZSkge1xyXG4gICAgICAgIGxldCB0eXBlSW5mbyA9IG9iai50eXBlSW5mbztcclxuICAgICAgICBsZXQgZGF0YSA9IGdldEpzb25PYmplY3Qob2JqLkpTT05ub2RlRGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm1fRGlzcGxheU5hbWUgPT09ICdWZXJ0ZXggUG9zaXRpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVydGV4UG9zaXRpb25TbG90KHR5cGVJbmZvLCBkYXRhLCBub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgU2hhZGVyU2xvdCh0eXBlSW5mbywgZGF0YSwgbm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHlwZUluZm8gPSB7fTtcclxuICAgIGRhdGE6IGFueSA9IHt9XHJcblxyXG4gICAgaWQgPSAwO1xyXG5cclxuICAgIGdsb2JhbElEID0gMDtcclxuICAgIGRpc3BsYXlOYW1lID0gJyc7XHJcblxyXG4gICAgZ2V0IGNvbm5lY3RTbG90ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0U2xvdHNbMF07XHJcbiAgICB9O1xyXG4gICAgc2V0IGNvbm5lY3RTbG90ICh2KSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0U2xvdHMubGVuZ3RoID0gMDtcclxuICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RTbG90c1swXSA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29ubmVjdFNsb3RzOiBTaGFkZXJTbG90W10gPSBbXTtcclxuXHJcbiAgICBub2RlOiBTaGFkZXJOb2RlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIHR5cGUgPSBTaGFkZXJTbG90VHlwZS5JbnB1dDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAodHlwZUluZm86IGFueSwgZGF0YTogYW55LCBub2RlOiBTaGFkZXJOb2RlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlSW5mbyA9IHR5cGVJbmZvO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZGF0YS5tX1Nsb3RUeXBlIGFzIFNoYWRlclNsb3RUeXBlO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gdGhpcy5kYXRhLm1fSWQ7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxJRCA9IF9HbG9iYWxTaGFkZXJTbG90SURfKys7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TmFtZSA9IHRoaXMuZGF0YS5tX0Rpc3BsYXlOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YXJOYW1lICgpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlPy5pc1Byb3BlcnR5Tm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMubm9kZSBhcyBQcm9wZXJ0eU5vZGUpLnByb3BlcnR5IS5yZWZlcmVuY2VOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJ3Zhcl8nICsgdGhpcy5nbG9iYWxJRDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFyRGVmaW5lICgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IGdldFByZWNpc2lvbk5hbWUodGhpcy5jb25jcmV0ZVByZWNpc2lvbik7XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgbmFtZSArPSAnICc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lICsgdGhpcy52YXJOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0VmFsdWUgKCkge1xyXG4gICAgICAgIGxldCBkZWZhdWx0VmFsdWUgPSB0aGlzLmRhdGEubV9WYWx1ZTtcclxuXHJcbiAgICAgICAgbGV0IHggPSBnZXRGbG9hdFN0cmluZyhkZWZhdWx0VmFsdWUueCk7XHJcbiAgICAgICAgbGV0IHkgPSBnZXRGbG9hdFN0cmluZyhkZWZhdWx0VmFsdWUueSk7XHJcbiAgICAgICAgbGV0IHogPSBnZXRGbG9hdFN0cmluZyhkZWZhdWx0VmFsdWUueik7XHJcbiAgICAgICAgbGV0IHcgPSBnZXRGbG9hdFN0cmluZyhkZWZhdWx0VmFsdWUudyk7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBnZXRGbG9hdFN0cmluZyhkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlLncgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYHZlYzQoJHt4fSwgJHt5fSwgJHt6fSwgJHt3fSlgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRlZmF1bHRWYWx1ZS56ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGB2ZWMzKCR7eH0sICR7eX0sICR7en0pYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkZWZhdWx0VmFsdWUueSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBgdmVjMigke3h9LCAke3l9KWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNsb3RWYWx1ZSAoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlQ29ucmV0ZVByZXNpdGlvbiA9IHRoaXMuZGVmYXVsdENvbmNyZXRlUHJlY2lzaW9uO1xyXG4gICAgICAgIGxldCBzZWxmQ29uY3JldGVQcmVzaXRpb24gPSB0aGlzLmNvbmNyZXRlUHJlY2lzaW9uO1xyXG4gICAgICAgIGxldCBkZWZhdWx0VmFsdWUgPSB0aGlzLmRhdGEubV9WYWx1ZTtcclxuXHJcbiAgICAgICAgbGV0IHggPSBnZXRWYWx1ZUVsZW1lbnRTdHIoZGVmYXVsdFZhbHVlLCAwKTtcclxuICAgICAgICBsZXQgeSA9IGdldFZhbHVlRWxlbWVudFN0cihkZWZhdWx0VmFsdWUsIDEpO1xyXG4gICAgICAgIGxldCB6ID0gZ2V0VmFsdWVFbGVtZW50U3RyKGRlZmF1bHRWYWx1ZSwgMik7XHJcbiAgICAgICAgbGV0IHcgPSBnZXRWYWx1ZUVsZW1lbnRTdHIoZGVmYXVsdFZhbHVlLCAzKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHggPSBnZXRGbG9hdFN0cmluZyhkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSAne3t2YWx1ZX19JztcclxuICAgICAgICBpZiAoc2VsZkNvbmNyZXRlUHJlc2l0aW9uID09PSAyKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGB2ZWMyKHt7dmFsdWV9fSlgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGZDb25jcmV0ZVByZXNpdGlvbiA9PT0gMykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBgdmVjMyh7e3ZhbHVlfX0pYFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZWxmQ29uY3JldGVQcmVzaXRpb24gPT09IDQpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gYHZlYzQoe3t2YWx1ZX19KWBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICB2YWx1ZUNvbnJldGVQcmVzaXRpb24gPSBnZXRWYWx1ZUNvbmNyZXRlUHJlY2lzaW9uKGRlZmF1bHRWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gW3gsIHksIHosIHddO1xyXG4gICAgICAgICAgICBsZXQgY29uY3JldGVWYWx1ZXM6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZkNvbmNyZXRlUHJlc2l0aW9uOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbmNyZXRlVmFsdWVzLnB1c2godmFsdWVzW2ldID09PSB1bmRlZmluZWQgPyAwIDogdmFsdWVzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IGNvbmNyZXRlVmFsdWVzLmpvaW4oJywgJylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlQ29ucmV0ZVByZXNpdGlvbiA9IHRoaXMuY29ubmVjdFNsb3QuY29uY3JldGVQcmVjaXNpb247XHJcblxyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29ubmVjdFNsb3QudmFyTmFtZTtcclxuICAgICAgICAgICAgaWYgKHNlbGZDb25jcmV0ZVByZXNpdGlvbiAhPT0gdmFsdWVDb25yZXRlUHJlc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZkNvbmNyZXRlUHJlc2l0aW9uIDwgdmFsdWVDb25yZXRlUHJlc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGZDb25jcmV0ZVByZXNpdGlvbiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSAnLngnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxmQ29uY3JldGVQcmVzaXRpb24gPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gJy54eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGZDb25jcmV0ZVByZXNpdGlvbiA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSAnLnh5eic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlQ29ucmV0ZVByZXNpdGlvbiAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gc2VsZkNvbmNyZXRlUHJlc2l0aW9uIC0gdmFsdWVDb25yZXRlUHJlc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmVmFsdWVzOiBhbnlbXSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZlZhbHVlcy5wdXNoKCcwLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9ICcsICcgKyBkaWZWYWx1ZXMuam9pbignLCAnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGlmID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZhbHVlICs9IGAsICR7eH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIChkaWYgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWUgKz0gYCwgJHt4fSwgJHt5fWA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYgKGRpZiA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB2YWx1ZSArPSBgLCAke3h9LCAke3l9LCAke3p9YDtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCd7e3ZhbHVlfX0nLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRDb25jcmV0ZVByZWNpc2lvbiAoKSB7XHJcbiAgICAgICAgbGV0IGNvbmNyZXRlUHJlY2lzaW9uID0gMTtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kYXRhLm1fVmFsdWU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLncgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29uY3JldGVQcmVjaXNpb24gPSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnogIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29uY3JldGVQcmVjaXNpb24gPSAzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29uY3JldGVQcmVjaXNpb24gPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uY3JldGVQcmVjaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbmNyZXRlUHJlY2lzaW9uID0gLTE7XHJcbiAgICBnZXQgY29uY3JldGVQcmVjaXNpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25jcmV0ZVByZWNpc2lvbiA9PT0gLTEpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kYXRhLm1fVmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlPy5pc1Byb3BlcnR5Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKHRoaXMubm9kZSBhcyBQcm9wZXJ0eU5vZGUpLnByb3BlcnR5IS5kYXRhLm1fVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Nsb3QgVmFsdWUgaXMgdW5kZWZpbmVkLCBjb25jcmV0ZSBwcmVjaXNpb24gbWF5YmUgd3JvbmcuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY29uY3JldGVQcmVjaXNpb24gPSBnZXRWYWx1ZUNvbmNyZXRlUHJlY2lzaW9uKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmNyZXRlUHJlY2lzaW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmVydGV4UG9zaXRpb25TbG90IGV4dGVuZHMgU2hhZGVyU2xvdCB7XHJcbiAgICBnZXQgY29uY3JldGVQcmVjaXNpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzbG90VmFsdWUgKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHN1cGVyLnNsb3RWYWx1ZTtcclxuICAgICAgICByZXR1cm4gYHZlYzQoJHt2YWx1ZX0sIDEuKWA7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyRWRnZVNsb3Qge1xyXG4gICAgaWQgPSAwO1xyXG4gICAgbm9kZVV1aWQgPSAnJztcclxuXHJcbiAgICBzZXQgKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLm1fU2xvdElkO1xyXG4gICAgICAgIHRoaXMubm9kZVV1aWQgPSBkYXRhLm1fTm9kZUdVSURTZXJpYWxpemVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyRWRnZSB7XHJcbiAgICB0eXBlID0ge307XHJcbiAgICBkYXRhOiBhbnkgPSB7fVxyXG5cclxuICAgIGlucHV0OiBTaGFkZXJFZGdlU2xvdCA9IG5ldyBTaGFkZXJFZGdlU2xvdDtcclxuICAgIG91dHB1dDogU2hhZGVyRWRnZVNsb3QgPSBuZXcgU2hhZGVyRWRnZVNsb3Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZUluZm87XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZ2V0SnNvbk9iamVjdChkYXRhLkpTT05ub2RlRGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQuc2V0KHRoaXMuZGF0YS5tX0lucHV0U2xvdCk7XHJcbiAgICAgICAgdGhpcy5vdXRwdXQuc2V0KHRoaXMuZGF0YS5tX091dHB1dFNsb3QpO1xyXG4gICAgfVxyXG59Il19