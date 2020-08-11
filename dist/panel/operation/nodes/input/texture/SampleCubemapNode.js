"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
const type_1 = require("../../../type");
class SampleTexture2DNode extends InputNode_1.default {
    beforeGenreateCode() {
        let viewSlot = this.getSlotWithSlotName('ViewDir');
        if (!(viewSlot === null || viewSlot === void 0 ? void 0 : viewSlot.connectSlot)) {
            this.depVarings.push(type_1.ViewDirectionSpace.Object);
        }
        let normalSlot = this.getSlotWithSlotName('Normal');
        if (!(normalSlot === null || normalSlot === void 0 ? void 0 : normalSlot.connectSlot)) {
            this.depVarings.push(type_1.NormalSpace.Object);
        }
    }
    generateCode() {
        var _a;
        let cubeSlot = this.getSlotWithSlotName('Cube');
        let node = (cubeSlot === null || cubeSlot === void 0 ? void 0 : cubeSlot.connectSlot) && (cubeSlot === null || cubeSlot === void 0 ? void 0 : cubeSlot.connectSlot.node);
        if (!node) {
            return '';
        }
        let V = 'view';
        let N = 'normal';
        let viewSlot = this.getSlotWithSlotName('ViewDir');
        if (viewSlot === null || viewSlot === void 0 ? void 0 : viewSlot.connectSlot) {
            V = viewSlot === null || viewSlot === void 0 ? void 0 : viewSlot.connectSlot.varName;
        }
        let normalSlot = this.getSlotWithSlotName('Normal');
        if (normalSlot === null || normalSlot === void 0 ? void 0 : normalSlot.connectSlot) {
            N = normalSlot === null || normalSlot === void 0 ? void 0 : normalSlot.connectSlot.varName;
        }
        let R = `${this.getOutputVarName(0)}_R`;
        let code = '';
        code += `vec3 ${R} = reflect( -normalize( ${V} ), ${N} );\n`;
        code += `${this.getOutputVarDefine(0)} = texture(${(_a = node.property) === null || _a === void 0 ? void 0 : _a.name}, ${R});\n`;
        return code;
    }
}
exports.default = SampleTexture2DNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FtcGxlQ3ViZW1hcE5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L3RleHR1cmUvU2FtcGxlQ3ViZW1hcE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2REFBcUM7QUFDckMsd0NBQXVHO0FBSXZHLE1BQXFCLG1CQUFvQixTQUFRLG1CQUFTO0lBRXRELGtCQUFrQjtRQUNkLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLEVBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBQSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHlCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELElBQUksRUFBQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFBLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxZQUFZOztRQUNSLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLElBQUksR0FBRyxDQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxXQUFXLE1BQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBQyxJQUFvQixDQUFBLENBQUM7UUFDL0UsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7UUFFakIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsRUFBRTtZQUN2QixDQUFDLEdBQUcsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDckM7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsSUFBSSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxFQUFFO1lBQ3pCLENBQUMsR0FBRyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFeEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2IsSUFBSSxJQUFJLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO1FBQzVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsY0FBYyxNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQTtRQUNsRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF2Q0Qsc0NBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0Tm9kZSBmcm9tIFwiLi4vSW5wdXROb2RlXCI7XHJcbmltcG9ydCB7IE5vcm1hbE1hcFNwYWNlLCBOb3JtYWxTcGFjZSwgQ29uY3JldGVQcmVjaXNpb25UeXBlLCBWaWV3RGlyZWN0aW9uU3BhY2UgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZVwiO1xyXG5pbXBvcnQgUHJvcGVydHlOb2RlIGZyb20gXCIuLi9Qcm9wZXJ0eU5vZGVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTYW1wbGVUZXh0dXJlMkROb2RlIGV4dGVuZHMgSW5wdXROb2RlIHtcclxuXHJcbiAgICBiZWZvcmVHZW5yZWF0ZUNvZGUgKCkge1xyXG4gICAgICAgIGxldCB2aWV3U2xvdCA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnVmlld0RpcicpO1xyXG4gICAgICAgIGlmICghdmlld1Nsb3Q/LmNvbm5lY3RTbG90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVwVmFyaW5ncy5wdXNoKFZpZXdEaXJlY3Rpb25TcGFjZS5PYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9ybWFsU2xvdCA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnTm9ybWFsJyk7XHJcbiAgICAgICAgaWYgKCFub3JtYWxTbG90Py5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlcFZhcmluZ3MucHVzaChOb3JtYWxTcGFjZS5PYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xyXG4gICAgICAgIGxldCBjdWJlU2xvdCA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnQ3ViZScpO1xyXG4gICAgICAgIGxldCBub2RlID0gY3ViZVNsb3Q/LmNvbm5lY3RTbG90ICYmIGN1YmVTbG90Py5jb25uZWN0U2xvdC5ub2RlIGFzIFByb3BlcnR5Tm9kZTtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IFYgPSAndmlldyc7XHJcbiAgICAgICAgbGV0IE4gPSAnbm9ybWFsJztcclxuXHJcbiAgICAgICAgbGV0IHZpZXdTbG90ID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdWaWV3RGlyJyk7XHJcbiAgICAgICAgaWYgKHZpZXdTbG90Py5jb25uZWN0U2xvdCkge1xyXG4gICAgICAgICAgICBWID0gdmlld1Nsb3Q/LmNvbm5lY3RTbG90LnZhck5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub3JtYWxTbG90ID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdOb3JtYWwnKTtcclxuICAgICAgICBpZiAobm9ybWFsU2xvdD8uY29ubmVjdFNsb3QpIHtcclxuICAgICAgICAgICAgTiA9IG5vcm1hbFNsb3Q/LmNvbm5lY3RTbG90LnZhck5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgUiA9IGAke3RoaXMuZ2V0T3V0cHV0VmFyTmFtZSgwKX1fUmA7XHJcblxyXG4gICAgICAgIGxldCBjb2RlID0gJydcclxuICAgICAgICBjb2RlICs9IGB2ZWMzICR7Un0gPSByZWZsZWN0KCAtbm9ybWFsaXplKCAke1Z9ICksICR7Tn0gKTtcXG5gXHJcbiAgICAgICAgY29kZSArPSBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSB0ZXh0dXJlKCR7bm9kZS5wcm9wZXJ0eT8ubmFtZX0sICR7Un0pO1xcbmBcclxuICAgICAgICByZXR1cm4gY29kZTtcclxuICAgIH1cclxufVxyXG5cclxuIl19