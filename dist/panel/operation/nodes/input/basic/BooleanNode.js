"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
class BooleanNode extends InputNode_1.default {
    generateCode() {
        return `bool ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}
exports.default = BooleanNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbGVhbk5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L2Jhc2ljL0Jvb2xlYW5Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLE1BQXFCLFdBQVksU0FBUSxtQkFBUztJQUM5QyxZQUFZO1FBQ1IsT0FBTyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDMUUsQ0FBQztDQUNKO0FBSkQsOEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5wdXROb2RlIGZyb20gXCIuLi9JbnB1dE5vZGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb2xlYW5Ob2RlIGV4dGVuZHMgSW5wdXROb2RlIHtcclxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBib29sICR7dGhpcy5nZXRPdXRwdXRWYXJOYW1lKDApfSA9ICR7dGhpcy5nZXRJbnB1dFZhbHVlKDApfTtgO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=