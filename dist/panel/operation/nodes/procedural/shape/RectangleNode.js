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
        return `${this.getOutputVarDefine(0)} = rect(${uv}, ${width}, ${height});`;
    }
}
exports.default = RectangleNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvcHJvY2VkdXJhbC9zaGFwZS9SZWN0YW5nbGVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW9DO0FBRXBDLE1BQXFCLGFBQWMsU0FBUSxtQkFBUztJQUVoRCxZQUFZO1FBQ1IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxLQUFLLE1BQU0sSUFBSSxDQUFDO0lBQy9FLENBQUM7Q0FDSjtBQVJELGdDQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoYXBlTm9kZSBmcm9tIFwiLi9TaGFwZU5vZGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZU5vZGUgZXh0ZW5kcyBTaGFwZU5vZGUge1xyXG4gICAgXHJcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xyXG4gICAgICAgIGxldCB1diA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcclxuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgyKTtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gcmVjdCgke3V2fSwgJHt3aWR0aH0sICR7aGVpZ2h0fSk7YDtcclxuICAgIH1cclxufVxyXG4iXX0=