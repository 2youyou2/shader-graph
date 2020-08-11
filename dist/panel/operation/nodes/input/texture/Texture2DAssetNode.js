"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextureAssetNode_1 = __importDefault(require("./TextureAssetNode"));
class Texture2DAssetNode extends TextureAssetNode_1.default {
    generateCode() {
        return `sampler2D ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}
exports.default = Texture2DAssetNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dHVyZTJEQXNzZXROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC90ZXh0dXJlL1RleHR1cmUyREFzc2V0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBFQUFrRDtBQUVsRCxNQUFxQixrQkFBbUIsU0FBUSwwQkFBZ0I7SUFDNUQsWUFBWTtRQUNSLE9BQU8sYUFBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQy9FLENBQUM7Q0FDSjtBQUpELHFDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHR1cmVBc3NldE5vZGUgZnJvbSBcIi4vVGV4dHVyZUFzc2V0Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dHVyZTJEQXNzZXROb2RlIGV4dGVuZHMgVGV4dHVyZUFzc2V0Tm9kZSB7XHJcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xyXG4gICAgICAgIHJldHVybiBgc2FtcGxlcjJEICR7dGhpcy5nZXRPdXRwdXRWYXJOYW1lKDApfSA9ICR7dGhpcy5nZXRJbnB1dFZhbHVlKDApfTtgO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==