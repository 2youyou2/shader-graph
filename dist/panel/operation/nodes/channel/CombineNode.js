"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class CombineNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let slotR = this.getSlotWithSlotName('R');
        let slotG = this.getSlotWithSlotName('G');
        let slotB = this.getSlotWithSlotName('B');
        let slotA = this.getSlotWithSlotName('A');
        let slotRGBA = this.getSlotWithSlotName('RGBA');
        let slotRGB = this.getSlotWithSlotName('RGB');
        let slotRG = this.getSlotWithSlotName('RG');
        let code = '';
        if (slotRGBA && slotRGBA.connectSlot) {
            code += `${slotRGBA === null || slotRGBA === void 0 ? void 0 : slotRGBA.varDefine} = vec4(${slotR === null || slotR === void 0 ? void 0 : slotR.slotValue}, ${slotG === null || slotG === void 0 ? void 0 : slotG.slotValue}, ${slotB === null || slotB === void 0 ? void 0 : slotB.slotValue}, ${slotA === null || slotA === void 0 ? void 0 : slotA.slotValue});\n`;
        }
        if (slotRGB && slotRGB.connectSlot) {
            code += `${slotRGB === null || slotRGB === void 0 ? void 0 : slotRGB.varDefine} = vec3(${slotR === null || slotR === void 0 ? void 0 : slotR.slotValue}, ${slotG === null || slotG === void 0 ? void 0 : slotG.slotValue}, ${slotB === null || slotB === void 0 ? void 0 : slotB.slotValue});\n`;
        }
        if (slotRG && slotRG.connectSlot) {
            code += `${slotRG === null || slotRG === void 0 ? void 0 : slotRG.varDefine} = vec2(${slotR === null || slotR === void 0 ? void 0 : slotR.slotValue}, ${slotG === null || slotG === void 0 ? void 0 : slotG.slotValue});\n`;
        }
        return code;
    }
}
exports.default = CombineNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tYmluZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2NoYW5uZWwvQ29tYmluZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBd0M7QUFDeEMscUNBQW1EO0FBRW5ELE1BQXFCLFdBQVksU0FBUSxpQkFBVTtJQUFuRDs7UUFDSSwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7SUEyQnhELENBQUM7SUF6QkcsWUFBWTtRQUVSLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFFZCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ2xDLElBQUksSUFBSSxHQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxTQUFTLFdBQVcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsS0FBSyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxLQUFLLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxTQUFTLEtBQUssS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsTUFBTSxDQUFDO1NBQ2xJO1FBQ0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNoQyxJQUFJLElBQUksR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUyxXQUFXLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxTQUFTLEtBQUssS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsS0FBSyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxNQUFNLENBQUM7U0FDNUc7UUFDRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQzlCLElBQUksSUFBSSxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLFdBQVcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsS0FBSyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxNQUFNLENBQUM7U0FDdEY7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUE1QkQsOEJBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi9iYXNlXCI7XHJcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSB9IGZyb20gXCIuLi8uLi90eXBlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21iaW5lTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xyXG5cclxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XHJcblxyXG4gICAgICAgIGxldCBzbG90UiA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnUicpO1xyXG4gICAgICAgIGxldCBzbG90RyA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnRycpO1xyXG4gICAgICAgIGxldCBzbG90QiA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnQicpO1xyXG4gICAgICAgIGxldCBzbG90QSA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnQScpO1xyXG5cclxuICAgICAgICBsZXQgc2xvdFJHQkEgPSB0aGlzLmdldFNsb3RXaXRoU2xvdE5hbWUoJ1JHQkEnKTtcclxuICAgICAgICBsZXQgc2xvdFJHQiA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnUkdCJyk7XHJcbiAgICAgICAgbGV0IHNsb3RSRyA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnUkcnKTtcclxuXHJcbiAgICAgICAgbGV0IGNvZGUgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKHNsb3RSR0JBICYmIHNsb3RSR0JBLmNvbm5lY3RTbG90KSB7XHJcbiAgICAgICAgICAgIGNvZGUgKz0gYCR7c2xvdFJHQkE/LnZhckRlZmluZX0gPSB2ZWM0KCR7c2xvdFI/LnNsb3RWYWx1ZX0sICR7c2xvdEc/LnNsb3RWYWx1ZX0sICR7c2xvdEI/LnNsb3RWYWx1ZX0sICR7c2xvdEE/LnNsb3RWYWx1ZX0pO1xcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzbG90UkdCICYmIHNsb3RSR0IuY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgY29kZSArPSBgJHtzbG90UkdCPy52YXJEZWZpbmV9ID0gdmVjMygke3Nsb3RSPy5zbG90VmFsdWV9LCAke3Nsb3RHPy5zbG90VmFsdWV9LCAke3Nsb3RCPy5zbG90VmFsdWV9KTtcXG5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2xvdFJHICYmIHNsb3RSRy5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICBjb2RlICs9IGAke3Nsb3RSRz8udmFyRGVmaW5lfSA9IHZlYzIoJHtzbG90Uj8uc2xvdFZhbHVlfSwgJHtzbG90Rz8uc2xvdFZhbHVlfSk7XFxuYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICB9XHJcbn1cclxuIl19