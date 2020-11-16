"use strict";
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
const editor_exports_1 = require("./utils/editor-exports");
/**
 * 插件定义的方法
 * Methods defined by plug-ins
 * 可以在 package.json 里的 contributions 里定义 messages 触发这里的方法
 * And of course, messages can be defined in the contributions section in package.JSON to trigger the method here
 */
exports.methods = {
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            editor_exports_1.Editor.Panel.open('shader-grapgh');
        });
    },
};
/**
 * 启动的时候执行的初始化方法
 * Initialization method performed at startup
 */
exports.load = function () { };
/**
 * 插件被关闭的时候执行的卸载方法
 * Uninstall method performed when the plug-in is closed
 */
exports.unload = function () { };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkRBQWdEO0FBR2hEOzs7OztHQUtHO0FBQ0gsT0FBTyxDQUFDLE9BQU8sR0FBRztJQUNSLElBQUk7O1lBQ04sdUJBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtDQUNKLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxPQUFPLENBQUMsSUFBSSxHQUFHLGNBQVksQ0FBQyxDQUFDO0FBRTdCOzs7R0FHRztBQUNILE9BQU8sQ0FBQyxNQUFNLEdBQUcsY0FBWSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZGl0b3IgfSBmcm9tICcuL3V0aWxzL2VkaXRvci1leHBvcnRzJztcclxuXHJcblxyXG4vKipcclxuICog5o+S5Lu25a6a5LmJ55qE5pa55rOVXHJcbiAqIE1ldGhvZHMgZGVmaW5lZCBieSBwbHVnLWluc1xyXG4gKiDlj6/ku6XlnKggcGFja2FnZS5qc29uIOmHjOeahCBjb250cmlidXRpb25zIOmHjOWumuS5iSBtZXNzYWdlcyDop6blj5Hov5nph4znmoTmlrnms5VcclxuICogQW5kIG9mIGNvdXJzZSwgbWVzc2FnZXMgY2FuIGJlIGRlZmluZWQgaW4gdGhlIGNvbnRyaWJ1dGlvbnMgc2VjdGlvbiBpbiBwYWNrYWdlLkpTT04gdG8gdHJpZ2dlciB0aGUgbWV0aG9kIGhlcmVcclxuICovXHJcbmV4cG9ydHMubWV0aG9kcyA9IHtcclxuICAgIGFzeW5jIG9wZW4oKSB7XHJcbiAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4oJ3NoYWRlci1ncmFwZ2gnKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG4vKipcclxuICog5ZCv5Yqo55qE5pe25YCZ5omn6KGM55qE5Yid5aeL5YyW5pa55rOVXHJcbiAqIEluaXRpYWxpemF0aW9uIG1ldGhvZCBwZXJmb3JtZWQgYXQgc3RhcnR1cFxyXG4gKi9cclxuZXhwb3J0cy5sb2FkID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbi8qKlxyXG4gKiDmj5Lku7booqvlhbPpl63nmoTml7blgJnmiafooYznmoTljbjovb3mlrnms5VcclxuICogVW5pbnN0YWxsIG1ldGhvZCBwZXJmb3JtZWQgd2hlbiB0aGUgcGx1Zy1pbiBpcyBjbG9zZWRcclxuICovXHJcbmV4cG9ydHMudW5sb2FkID0gZnVuY3Rpb24oKSB7fTtcclxuIl19