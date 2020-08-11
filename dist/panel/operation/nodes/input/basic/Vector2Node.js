"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
class Vector2Node extends InputNode_1.default {
    generateCode() {
        let x = this.getInputValue(0);
        let y = this.getInputValue(1);
        return `vec2 ${this.getOutputVarName(0)} = vec2(${x}, ${y});`;
    }
}
exports.default = Vector2Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjdG9yMk5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L2Jhc2ljL1ZlY3RvcjJOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLE1BQXFCLFdBQVksU0FBUSxtQkFBUztJQUM5QyxZQUFZO1FBQ1IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sUUFBUSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ2xFLENBQUM7Q0FDSjtBQU5ELDhCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0Tm9kZSBmcm9tIFwiLi4vSW5wdXROb2RlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyTm9kZSBleHRlbmRzIElucHV0Tm9kZSB7XHJcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xyXG4gICAgICAgIGxldCB4ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xyXG4gICAgICAgIHJldHVybiBgdmVjMiAke3RoaXMuZ2V0T3V0cHV0VmFyTmFtZSgwKX0gPSB2ZWMyKCR7eH0sICR7eX0pO2A7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==