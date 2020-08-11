"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeNode_1 = __importDefault(require("./ShapeNode"));
class EllipseNode extends ShapeNode_1.default {
    generateCode() {
        let uv = this.getInputValue(0);
        let width = this.getInputValue(1);
        let height = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = ellipse(${uv}, ${width}, ${height});`;
    }
}
exports.default = EllipseNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxsaXBzZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL3Byb2NlZHVyYWwvc2hhcGUvRWxsaXBzZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBb0M7QUFFcEMsTUFBcUIsV0FBWSxTQUFRLG1CQUFTO0lBQzlDLFlBQVk7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxLQUFLLEtBQUssTUFBTSxJQUFJLENBQUM7SUFDbEYsQ0FBQztDQUNKO0FBUEQsOEJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hhcGVOb2RlIGZyb20gXCIuL1NoYXBlTm9kZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxsaXBzZU5vZGUgZXh0ZW5kcyBTaGFwZU5vZGUge1xyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICBsZXQgdXYgPSB0aGlzLmdldElucHV0VmFsdWUoMCk7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLmdldElucHV0VmFsdWUoMik7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9IGVsbGlwc2UoJHt1dn0sICR7d2lkdGh9LCAke2hlaWdodH0pO2A7XHJcbiAgICB9XHJcbn1cclxuIl19