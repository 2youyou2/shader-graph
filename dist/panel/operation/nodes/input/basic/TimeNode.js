"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
class TimeNode extends InputNode_1.default {
    generateCode() {
        let Time = this.getOutputSlotWithSlotName('Time');
        let SineTime = this.getOutputSlotWithSlotName('Sine Time');
        let CosineTime = this.getOutputSlotWithSlotName('Cosine Time');
        let DeltaTime = this.getOutputSlotWithSlotName('Delta Time');
        let SmoothDelta = this.getOutputSlotWithSlotName('Smooth Delta');
        let code = '';
        if (Time === null || Time === void 0 ? void 0 : Time.connectSlot) {
            code += `float ${Time.varName} = cc_time.x;`;
        }
        if (SineTime === null || SineTime === void 0 ? void 0 : SineTime.connectSlot) {
            code += `float ${SineTime.varName} = sin(cc_time.x);`;
        }
        if (CosineTime === null || CosineTime === void 0 ? void 0 : CosineTime.connectSlot) {
            code += `float ${CosineTime.varName} = cos(cc_time.x);`;
        }
        if (DeltaTime === null || DeltaTime === void 0 ? void 0 : DeltaTime.connectSlot) {
            code += `float ${DeltaTime.varName} = cc_time.y;`;
        }
        if (SmoothDelta === null || SmoothDelta === void 0 ? void 0 : SmoothDelta.connectSlot) {
            console.warn('Not support smooth delta time');
            code += `float ${SmoothDelta.varName} = cc_time.y;`;
        }
        return code;
    }
}
exports.default = TimeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L2Jhc2ljL1RpbWVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLE1BQXFCLFFBQVMsU0FBUSxtQkFBUztJQUMzQyxZQUFZO1FBQ1IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVqRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixJQUFJLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLEVBQUU7WUFDbkIsSUFBSSxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sZUFBZSxDQUFBO1NBQy9DO1FBQ0QsSUFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsV0FBVyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxTQUFTLFFBQVEsQ0FBQyxPQUFPLG9CQUFvQixDQUFBO1NBQ3hEO1FBQ0QsSUFBSSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxFQUFFO1lBQ3pCLElBQUksSUFBSSxTQUFTLFVBQVUsQ0FBQyxPQUFPLG9CQUFvQixDQUFBO1NBQzFEO1FBQ0QsSUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsV0FBVyxFQUFFO1lBQ3hCLElBQUksSUFBSSxTQUFTLFNBQVMsQ0FBQyxPQUFPLGVBQWUsQ0FBQTtTQUNwRDtRQUNELElBQUksV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFdBQVcsRUFBRTtZQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLFNBQVMsV0FBVyxDQUFDLE9BQU8sZUFBZSxDQUFBO1NBQ3REO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBNUJELDJCQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnB1dE5vZGUgZnJvbSBcIi4uL0lucHV0Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZU5vZGUgZXh0ZW5kcyBJbnB1dE5vZGUge1xyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICBsZXQgVGltZSA9IHRoaXMuZ2V0T3V0cHV0U2xvdFdpdGhTbG90TmFtZSgnVGltZScpO1xyXG4gICAgICAgIGxldCBTaW5lVGltZSA9IHRoaXMuZ2V0T3V0cHV0U2xvdFdpdGhTbG90TmFtZSgnU2luZSBUaW1lJyk7XHJcbiAgICAgICAgbGV0IENvc2luZVRpbWUgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ0Nvc2luZSBUaW1lJyk7XHJcbiAgICAgICAgbGV0IERlbHRhVGltZSA9IHRoaXMuZ2V0T3V0cHV0U2xvdFdpdGhTbG90TmFtZSgnRGVsdGEgVGltZScpO1xyXG4gICAgICAgIGxldCBTbW9vdGhEZWx0YSA9IHRoaXMuZ2V0T3V0cHV0U2xvdFdpdGhTbG90TmFtZSgnU21vb3RoIERlbHRhJyk7XHJcblxyXG4gICAgICAgIGxldCBjb2RlID0gJydcclxuICAgICAgICBpZiAoVGltZT8uY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtUaW1lLnZhck5hbWV9ID0gY2NfdGltZS54O2BcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFNpbmVUaW1lPy5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke1NpbmVUaW1lLnZhck5hbWV9ID0gc2luKGNjX3RpbWUueCk7YFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQ29zaW5lVGltZT8uY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtDb3NpbmVUaW1lLnZhck5hbWV9ID0gY29zKGNjX3RpbWUueCk7YFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoRGVsdGFUaW1lPy5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke0RlbHRhVGltZS52YXJOYW1lfSA9IGNjX3RpbWUueTtgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChTbW9vdGhEZWx0YT8uY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdOb3Qgc3VwcG9ydCBzbW9vdGggZGVsdGEgdGltZScpO1xyXG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke1Ntb290aERlbHRhLnZhck5hbWV9ID0gY2NfdGltZS55O2BcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2RlO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=