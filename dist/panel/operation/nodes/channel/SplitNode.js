"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class SplitNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let Value = this.getInputValue(0);
        let code = '';
        let slotR = this.getOutputSlotWithSlotName('R');
        let slotG = this.getOutputSlotWithSlotName('G');
        let slotB = this.getOutputSlotWithSlotName('B');
        let slotA = this.getOutputSlotWithSlotName('A');
        if (slotR && slotR.connectSlot) {
            code += `float ${slotR === null || slotR === void 0 ? void 0 : slotR.varName} = ${Value}.r;\n`;
        }
        if (slotG && slotG.connectSlot) {
            code += `float ${slotG === null || slotG === void 0 ? void 0 : slotG.varName} = ${Value}.g;\n`;
        }
        if (slotB && slotB.connectSlot) {
            code += `float ${slotB === null || slotB === void 0 ? void 0 : slotB.varName} = ${Value}.b;\n`;
        }
        if (slotA && slotA.connectSlot) {
            code += `float ${slotA === null || slotA === void 0 ? void 0 : slotA.varName} = ${Value}.a;\n`;
        }
        return code;
    }
}
exports.default = SplitNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BsaXROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9jaGFubmVsL1NwbGl0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUF3QztBQUN4QyxxQ0FBbUQ7QUFFbkQsTUFBcUIsU0FBVSxTQUFRLGlCQUFVO0lBQWpEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztJQXVCeEQsQ0FBQztJQXJCRyxZQUFZO1FBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBeEJELDRCQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vdHlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BsaXROb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XHJcbiAgICBjb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XHJcblxyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICBsZXQgVmFsdWUgPSB0aGlzLmdldElucHV0VmFsdWUoMCk7XHJcbiAgICAgICAgbGV0IGNvZGUgPSAnJztcclxuICAgICAgICBsZXQgc2xvdFIgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ1InKTtcclxuICAgICAgICBsZXQgc2xvdEcgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ0cnKTtcclxuICAgICAgICBsZXQgc2xvdEIgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ0InKTtcclxuICAgICAgICBsZXQgc2xvdEEgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ0EnKTtcclxuICAgICAgICBpZiAoc2xvdFIgJiYgc2xvdFIuY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtzbG90Uj8udmFyTmFtZX0gPSAke1ZhbHVlfS5yO1xcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzbG90RyAmJiBzbG90Ry5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke3Nsb3RHPy52YXJOYW1lfSA9ICR7VmFsdWV9Lmc7XFxuYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNsb3RCICYmIHNsb3RCLmNvbm5lY3RTbG90KSB7XHJcbiAgICAgICAgICAgIGNvZGUgKz0gYGZsb2F0ICR7c2xvdEI/LnZhck5hbWV9ID0gJHtWYWx1ZX0uYjtcXG5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2xvdEEgJiYgc2xvdEEuY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtzbG90QT8udmFyTmFtZX0gPSAke1ZhbHVlfS5hO1xcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2RlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==