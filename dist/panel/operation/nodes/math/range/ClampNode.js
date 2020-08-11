"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class ClampNode extends base_1.ShaderNode {
    generateCode() {
        let In = this.getInputValue(0);
        let min = this.getInputValue(1);
        let max = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = clamp(${In}, ${min}, ${max});`;
    }
}
exports.default = ClampNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xhbXBOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXRoL3JhbmdlL0NsYW1wTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUUzQyxNQUFxQixTQUFVLFNBQVEsaUJBQVU7SUFDN0MsWUFBWTtRQUNSLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztJQUMzRSxDQUFDO0NBQ0o7QUFQRCw0QkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhbXBOb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XHJcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xyXG4gICAgICAgIGxldCBJbiA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcclxuICAgICAgICBsZXQgbWluID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xyXG4gICAgICAgIGxldCBtYXggPSB0aGlzLmdldElucHV0VmFsdWUoMik7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9IGNsYW1wKCR7SW59LCAke21pbn0sICR7bWF4fSk7YDtcclxuICAgIH1cclxufVxyXG5cclxuIl19