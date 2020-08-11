"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class UVNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    calcConcretePrecision() {
        this.slots.forEach(slot => {
            slot._concretePrecision = 2;
        });
    }
    generateCode() {
        let uvName = 'v_uv';
        if (this.data.m_OutputChannel) {
            uvName = `v_uv${this.data.m_OutputChannel}`;
        }
        return `${this.getOutputVarDefine(0)} = ${uvName};`;
    }
}
exports.default = UVNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVZOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC9nZW9tZXRyeS9VVk5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFDM0Msd0NBQXNEO0FBRXRELE1BQXFCLE1BQU8sU0FBUSxpQkFBVTtJQUE5Qzs7UUFDSSwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7SUFleEQsQ0FBQztJQWJHLHFCQUFxQjtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMzQixNQUFNLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUFoQkQseUJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XHJcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVVk5vZGUgZXh0ZW5kcyBTaGFkZXJOb2RlIHtcclxuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5GaXhlZDtcclxuXHJcbiAgICBjYWxjQ29uY3JldGVQcmVjaXNpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgc2xvdC5fY29uY3JldGVQcmVjaXNpb24gPSAyO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICBsZXQgdXZOYW1lID0gJ3ZfdXYnO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubV9PdXRwdXRDaGFubmVsKSB7XHJcbiAgICAgICAgICAgIHV2TmFtZSA9IGB2X3V2JHt0aGlzLmRhdGEubV9PdXRwdXRDaGFubmVsfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSAke3V2TmFtZX07YDtcclxuICAgIH1cclxufVxyXG5cclxuIl19