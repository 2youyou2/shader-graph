'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.messages = void 0;
exports.messages = {
    /**
     * 打开偏好设置面板
     */
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            Editor.Panel.open('shader-grapgh');
        });
    },
};
function load() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.load = load;
function unload() { }
exports.unload = unload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O0FBRUEsUUFBQSxRQUFRLEdBQUc7SUFDcEI7O09BRUc7SUFDRyxJQUFJOztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtDQUNKLENBQUM7QUFFRixTQUFzQixJQUFJOzBEQUFJLENBQUM7Q0FBQTtBQUEvQixvQkFBK0I7QUFFL0IsU0FBZ0IsTUFBTSxLQUFJLENBQUM7QUFBM0Isd0JBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1lc3NhZ2VzID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDlgY/lpb3orr7nva7pnaLmnb9cclxuICAgICAqL1xyXG4gICAgYXN5bmMgb3BlbigpIHtcclxuICAgICAgICBFZGl0b3IuUGFuZWwub3Blbignc2hhZGVyLWdyYXBnaCcpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkKCkge31cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmxvYWQoKSB7fVxyXG4iXX0=