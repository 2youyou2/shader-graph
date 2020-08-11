"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
const utils_1 = require("../../../utils");
class SliderNode extends InputNode_1.default {
    constructor() {
        super(...arguments);
        this.fixedConcretePrecision = 1;
    }
    generateCode() {
        let slot = this.slots[0];
        let value = utils_1.getFloatString(this.data.m_Value.x);
        return `${slot.varDefine} = ${value};`;
    }
}
exports.default = SliderNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvaW5wdXQvYmFzaWMvU2xpZGVyTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUFxQztBQUVyQywwQ0FBZ0Q7QUFFaEQsTUFBcUIsVUFBVyxTQUFRLG1CQUFTO0lBQWpEOztRQUNJLDJCQUFzQixHQUFHLENBQUMsQ0FBQztJQU8vQixDQUFDO0lBTEcsWUFBWTtRQUNSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsc0JBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsTUFBTSxLQUFLLEdBQUcsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFSRCw2QkFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnB1dE5vZGUgZnJvbSBcIi4uL0lucHV0Tm9kZVwiO1xyXG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZVwiO1xyXG5pbXBvcnQgeyBnZXRGbG9hdFN0cmluZyB9IGZyb20gXCIuLi8uLi8uLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyTm9kZSBleHRlbmRzIElucHV0Tm9kZSB7XHJcbiAgICBmaXhlZENvbmNyZXRlUHJlY2lzaW9uID0gMTtcclxuXHJcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xyXG4gICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1swXTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBnZXRGbG9hdFN0cmluZyh0aGlzLmRhdGEubV9WYWx1ZS54KTtcclxuICAgICAgICByZXR1cm4gYCR7c2xvdC52YXJEZWZpbmV9ID0gJHt2YWx1ZX07YDtcclxuICAgIH1cclxufVxyXG5cclxuIl19