"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeNode_1 = __importDefault(require("./ShapeNode"));
class RectangleNode extends ShapeNode_1.default {
    generateCode() {
        let uv = this.getInputValue(0);
        let width = this.getInputValue(1);
        let height = this.getInputValue(2);
        let radius = this.getInputValue(3);
        return `${this.getOutputVarDefine(0)} = reoundRect(${uv}, ${width}, ${height}, ${radius});`;
    }
}
exports.default = RectangleNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91bmRlZFJlY3RhbmdsZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL3Byb2NlZHVyYWwvc2hhcGUvUm91bmRlZFJlY3RhbmdsZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBb0M7QUFFcEMsTUFBcUIsYUFBYyxTQUFRLG1CQUFTO0lBQ2hELFlBQVk7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEtBQUssS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLElBQUksQ0FBQztJQUNoRyxDQUFDO0NBQ0o7QUFSRCxnQ0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGFwZU5vZGUgZnJvbSBcIi4vU2hhcGVOb2RlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGVOb2RlIGV4dGVuZHMgU2hhcGVOb2RlIHtcclxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XHJcbiAgICAgICAgbGV0IHV2ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSB0aGlzLmdldElucHV0VmFsdWUoMyk7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9IHJlb3VuZFJlY3QoJHt1dn0sICR7d2lkdGh9LCAke2hlaWdodH0sICR7cmFkaXVzfSk7YDtcclxuICAgIH1cclxufVxyXG4iXX0=