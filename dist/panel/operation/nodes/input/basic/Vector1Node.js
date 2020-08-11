"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
class Vector1Node extends InputNode_1.default {
    generateCode() {
        return `float ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}
exports.default = Vector1Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjdG9yMU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L2Jhc2ljL1ZlY3RvcjFOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLE1BQXFCLFdBQVksU0FBUSxtQkFBUztJQUM5QyxZQUFZO1FBQ1IsT0FBTyxTQUFTLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDM0UsQ0FBQztDQUNKO0FBSkQsOEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5wdXROb2RlIGZyb20gXCIuLi9JbnB1dE5vZGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjFOb2RlIGV4dGVuZHMgSW5wdXROb2RlIHtcclxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBmbG9hdCAke3RoaXMuZ2V0T3V0cHV0VmFyTmFtZSgwKX0gPSAke3RoaXMuZ2V0SW5wdXRWYWx1ZSgwKX07YDtcclxuICAgIH1cclxufVxyXG5cclxuIl19