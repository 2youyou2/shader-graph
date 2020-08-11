"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class RemapNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let In = this.getInputValue(0);
        let InMinMax = this.getInputValue(1);
        let OutMinMax = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = ${OutMinMax}.x + (${In} - ${InMinMax}.x) * (${OutMinMax}.y - ${OutMinMax}.x) / (${InMinMax}.y - ${InMinMax}.x);`;
    }
}
exports.default = RemapNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVtYXBOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXRoL3JhbmdlL1JlbWFwTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBc0Q7QUFFdEQsTUFBcUIsU0FBVSxTQUFRLGlCQUFVO0lBQWpEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztJQVF4RCxDQUFDO0lBTkcsWUFBWTtRQUNSLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sU0FBUyxTQUFTLEVBQUUsTUFBTSxRQUFRLFVBQVUsU0FBUyxRQUFRLFNBQVMsVUFBVSxRQUFRLFFBQVEsUUFBUSxNQUFNLENBQUM7SUFDN0osQ0FBQztDQUNKO0FBVEQsNEJBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWFwTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xyXG5cclxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XHJcbiAgICAgICAgbGV0IEluID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xyXG4gICAgICAgIGxldCBJbk1pbk1heCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcclxuICAgICAgICBsZXQgT3V0TWluTWF4ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSAke091dE1pbk1heH0ueCArICgke0lufSAtICR7SW5NaW5NYXh9LngpICogKCR7T3V0TWluTWF4fS55IC0gJHtPdXRNaW5NYXh9LngpIC8gKCR7SW5NaW5NYXh9LnkgLSAke0luTWluTWF4fS54KTtgO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=