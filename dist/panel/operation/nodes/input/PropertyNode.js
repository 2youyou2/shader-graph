"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class PropertyNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.property = null;
        this.isPropertyNode = true;
        // generateCode () {
        //     return `${this.getOutputVarDefine(0)} = ${this.property?.name};`;
        // }
    }
    searchProperties(properties) {
        this.property = properties.find(p => {
            return p.data.m_Guid.m_GuidSerialized === this.data.m_PropertyGuidSerialized;
        });
        if (this.property) {
            this.property.node = this;
        }
    }
}
exports.default = PropertyNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvcGVydHlOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC9Qcm9wZXJ0eU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBdUQ7QUFDdkQscUNBQW1EO0FBRW5ELE1BQXFCLFlBQWEsU0FBUSxpQkFBVTtJQUFwRDs7UUFDSSwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7UUFDcEQsYUFBUSxHQUF5QixJQUFJLENBQUM7UUFFdEMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFZdEIsb0JBQW9CO1FBQ3BCLHdFQUF3RTtRQUN4RSxJQUFJO0lBQ1IsQ0FBQztJQWJHLGdCQUFnQixDQUFFLFVBQVU7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNMLENBQUM7Q0FLSjtBQW5CRCwrQkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlLCBTaGFkZXJQcm9wZXJ5IH0gZnJvbSBcIi4uLy4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uL3R5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BlcnR5Tm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xyXG4gICAgcHJvcGVydHk6IFNoYWRlclByb3BlcnkgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBpc1Byb3BlcnR5Tm9kZSA9IHRydWU7XHJcblxyXG4gICAgc2VhcmNoUHJvcGVydGllcyAocHJvcGVydGllcykge1xyXG4gICAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0aWVzLmZpbmQocCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmRhdGEubV9HdWlkLm1fR3VpZFNlcmlhbGl6ZWQgPT09IHRoaXMuZGF0YS5tX1Byb3BlcnR5R3VpZFNlcmlhbGl6ZWQ7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eS5ub2RlID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgIC8vICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gJHt0aGlzLnByb3BlcnR5Py5uYW1lfTtgO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG4iXX0=