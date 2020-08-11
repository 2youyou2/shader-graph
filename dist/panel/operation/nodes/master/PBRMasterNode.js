"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const MasterNode_1 = __importDefault(require("./MasterNode"));
const utils_1 = require("../../utils");
const type_1 = require("../../type");
class PBRMasterNode extends MasterNode_1.default {
    constructor(data) {
        super(data);
        this.vsSlotIndices = ['Vertex Position', 'Vertex Normal', 'Vertex Tangent'];
        this.fsSlotIndices = ['Albedo', 'Normal', 'Emission', 'Metallic', 'Smoothness', 'Occlusion', 'Alpha', 'AlphaClipThreshold'];
        this.templatePath = path_1.default.join(utils_1.shaderTemplatesDir, 'master/PBRMasterNode.effect');
        this.depVarings = [type_1.PositionSpace.World, type_1.NormalSpace.World];
    }
}
exports.default = PBRMasterNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUEJSTWFzdGVyTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWFzdGVyL1BCUk1hc3Rlck5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsOERBQXNDO0FBQ3RDLHVDQUFpRDtBQUNqRCxxQ0FBd0Q7QUFFeEQsTUFBcUIsYUFBYyxTQUFRLG9CQUFVO0lBUWpELFlBQWEsSUFBSTtRQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQVJmLGtCQUFhLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxrQkFBYSxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFdkgsaUJBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLDBCQUFrQixFQUFFLDZCQUE2QixDQUFDLENBQUM7UUFFNUUsZUFBVSxHQUFHLENBQUMsb0JBQWEsQ0FBQyxLQUFLLEVBQUUsa0JBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUlyRCxDQUFDO0NBQ0o7QUFYRCxnQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgTWFzdGVyTm9kZSBmcm9tIFwiLi9NYXN0ZXJOb2RlXCI7XHJcbmltcG9ydCB7IHNoYWRlclRlbXBsYXRlc0RpciB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IHsgTm9ybWFsU3BhY2UsIFBvc2l0aW9uU3BhY2UgfSBmcm9tICcuLi8uLi90eXBlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBCUk1hc3Rlck5vZGUgZXh0ZW5kcyBNYXN0ZXJOb2RlIHtcclxuICAgIHZzU2xvdEluZGljZXMgPSBbJ1ZlcnRleCBQb3NpdGlvbicsICdWZXJ0ZXggTm9ybWFsJywgJ1ZlcnRleCBUYW5nZW50J107XHJcbiAgICBmc1Nsb3RJbmRpY2VzID0gWydBbGJlZG8nLCAnTm9ybWFsJywgJ0VtaXNzaW9uJywgJ01ldGFsbGljJywgJ1Ntb290aG5lc3MnLCAnT2NjbHVzaW9uJywgJ0FscGhhJywgJ0FscGhhQ2xpcFRocmVzaG9sZCddO1xyXG5cclxuICAgIHRlbXBsYXRlUGF0aCA9IHBhdGguam9pbihzaGFkZXJUZW1wbGF0ZXNEaXIsICdtYXN0ZXIvUEJSTWFzdGVyTm9kZS5lZmZlY3QnKTtcclxuXHJcbiAgICBkZXBWYXJpbmdzID0gW1Bvc2l0aW9uU3BhY2UuV29ybGQsIE5vcm1hbFNwYWNlLldvcmxkXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoZGF0YSlcclxuICAgIH1cclxufVxyXG4iXX0=