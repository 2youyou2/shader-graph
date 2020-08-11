"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const MasterNode_1 = __importDefault(require("./MasterNode"));
const utils_1 = require("../../utils");
class UnlitMasterNode extends MasterNode_1.default {
    constructor() {
        super(...arguments);
        this.vsSlotIndices = ['Vertex Position', 'Vertex Normal', 'Vertex Tangent'];
        this.fsSlotIndices = ['Color', 'Alpha', 'AlphaClipThreshold'];
        this.templatePath = path_1.default.join(utils_1.shaderTemplatesDir, 'master/UnlitMasterNode.effect');
    }
}
exports.default = UnlitMasterNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5saXRNYXN0ZXJOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXN0ZXIvVW5saXRNYXN0ZXJOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0RBQXdCO0FBQ3hCLDhEQUFzQztBQUN0Qyx1Q0FBaUQ7QUFFakQsTUFBcUIsZUFBZ0IsU0FBUSxvQkFBVTtJQUF2RDs7UUFDSSxrQkFBYSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDdkUsa0JBQWEsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUV6RCxpQkFBWSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsMEJBQWtCLEVBQUUsK0JBQStCLENBQUMsQ0FBQTtJQUNqRixDQUFDO0NBQUE7QUFMRCxrQ0FLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgTWFzdGVyTm9kZSBmcm9tIFwiLi9NYXN0ZXJOb2RlXCI7XHJcbmltcG9ydCB7IHNoYWRlclRlbXBsYXRlc0RpciB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVubGl0TWFzdGVyTm9kZSBleHRlbmRzIE1hc3Rlck5vZGUge1xyXG4gICAgdnNTbG90SW5kaWNlcyA9IFsnVmVydGV4IFBvc2l0aW9uJywgJ1ZlcnRleCBOb3JtYWwnLCAnVmVydGV4IFRhbmdlbnQnXTtcclxuICAgIGZzU2xvdEluZGljZXMgPSBbJ0NvbG9yJywgJ0FscGhhJywgJ0FscGhhQ2xpcFRocmVzaG9sZCddO1xyXG5cclxuICAgIHRlbXBsYXRlUGF0aCA9IHBhdGguam9pbihzaGFkZXJUZW1wbGF0ZXNEaXIsICdtYXN0ZXIvVW5saXRNYXN0ZXJOb2RlLmVmZmVjdCcpXHJcbn1cclxuIl19