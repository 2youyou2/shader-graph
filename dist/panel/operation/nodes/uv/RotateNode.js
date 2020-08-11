"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class RotateNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.depChunks = ['uv'];
    }
    generateCode() {
        let UV;
        if (!this.inputSlots[0].connectSlot) {
            UV = 'v_uv';
        }
        else {
            UV = this.getInputValue(0);
        }
        let Center = this.getInputValue(1);
        let Rotation = this.getInputValue(2);
        return `vec2 ${this.getOutputVarName(0)} = rotateCoordinates(${UV}, ${Center}, ${Rotation});`;
    }
}
exports.default = RotateNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm90YXRlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvdXYvUm90YXRlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUF3QztBQUN4QyxxQ0FBbUQ7QUFFbkQsTUFBcUIsVUFBVyxTQUFRLGlCQUFVO0lBQWxEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztRQUNwRCxjQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQWN0QixDQUFDO0lBWkcsWUFBWTtRQUNSLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ2pDLEVBQUUsR0FBRyxNQUFNLENBQUM7U0FDZjthQUNJO1lBQ0QsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUM7SUFDbEcsQ0FBQztDQUNKO0FBaEJELDZCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vdHlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xyXG4gICAgZGVwQ2h1bmtzID0gWyd1diddXHJcblxyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICBsZXQgVVY7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlucHV0U2xvdHNbMF0uY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgVVYgPSAndl91dic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBVViA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IENlbnRlciA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcclxuICAgICAgICBsZXQgUm90YXRpb24gPSB0aGlzLmdldElucHV0VmFsdWUoMik7XHJcbiAgICAgICAgcmV0dXJuIGB2ZWMyICR7dGhpcy5nZXRPdXRwdXRWYXJOYW1lKDApfSA9IHJvdGF0ZUNvb3JkaW5hdGVzKCR7VVZ9LCAke0NlbnRlcn0sICR7Um90YXRpb259KTtgO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==