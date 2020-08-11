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
exports.close = exports.beforeClose = exports.ready = exports.messages = exports.methods = exports.$ = exports.template = exports.style = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const Vue = require('vue/dist/vue.js');
Vue.config.productionTip = false;
Vue.config.devtools = false;
let panel = null;
let $vm;
exports.style = fs_1.readFileSync(path_1.join(__dirname, '../index.css'));
exports.template = fs_1.readFileSync(path_1.join(__dirname, '../../static/template/index.html'));
exports.$ = {
    shadergraph: '.shadergraph',
};
exports.methods = {};
exports.messages = {};
function ready(tab, params) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        panel = this;
        const manager = require('./components/manager');
        manager.el = panel.$.shadergraph;
        manager.init();
        $vm = new Vue(manager);
    });
}
exports.ready = ready;
// 关闭之前需要获取当前的焦点元素将其焦点丢失以触发 ui 组件的 confirm 事件保存配置
function beforeClose() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.beforeClose = beforeClose;
function close() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.close = close;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvcGFuZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7QUFFYiwyQkFBc0M7QUFDdEMsK0JBQTRCO0FBRTVCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztBQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFFNUIsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDO0FBQ3RCLElBQUksR0FBUSxDQUFDO0FBQ0EsUUFBQSxLQUFLLEdBQUcsaUJBQVksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFFdEQsUUFBQSxRQUFRLEdBQUcsaUJBQVksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztBQUU3RSxRQUFBLENBQUMsR0FBRztJQUNiLFdBQVcsRUFBRSxjQUFjO0NBQzlCLENBQUM7QUFHVyxRQUFBLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDYixRQUFBLFFBQVEsR0FBRyxFQUV2QixDQUFDO0FBRUYsU0FBc0IsS0FBSyxDQUFDLEdBQVcsRUFBRSxNQUFXOztRQUVoRCxhQUFhO1FBQ2IsS0FBSyxHQUFHLElBQUksQ0FBQztRQUViLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDakMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWYsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FBQTtBQVZELHNCQVVDO0FBRUQsaURBQWlEO0FBQ2pELFNBQXNCLFdBQVc7O0lBRWpDLENBQUM7Q0FBQTtBQUZELGtDQUVDO0FBRUQsU0FBc0IsS0FBSzswREFBSSxDQUFDO0NBQUE7QUFBaEMsc0JBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGZzLCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcclxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgVnVlID0gcmVxdWlyZSgndnVlL2Rpc3QvdnVlLmpzJyk7XHJcblZ1ZS5jb25maWcucHJvZHVjdGlvblRpcCA9IGZhbHNlO1xyXG5WdWUuY29uZmlnLmRldnRvb2xzID0gZmFsc2U7XHJcblxyXG5sZXQgcGFuZWw6IGFueSA9IG51bGw7XHJcbmxldCAkdm06IGFueTtcclxuZXhwb3J0IGNvbnN0IHN0eWxlID0gcmVhZEZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCAnLi4vaW5kZXguY3NzJykpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gcmVhZEZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vc3RhdGljL3RlbXBsYXRlL2luZGV4Lmh0bWwnKSk7XHJcblxyXG5leHBvcnQgY29uc3QgJCA9IHtcclxuICAgIHNoYWRlcmdyYXBoOiAnLnNoYWRlcmdyYXBoJyxcclxufTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgbWV0aG9kcyA9IHt9O1xyXG5leHBvcnQgY29uc3QgbWVzc2FnZXMgPSB7XHJcbiAgICBcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkeSh0YWI6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBwYW5lbCA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgbWFuYWdlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYW5hZ2VyJyk7XHJcbiAgICBtYW5hZ2VyLmVsID0gcGFuZWwuJC5zaGFkZXJncmFwaDtcclxuICAgIG1hbmFnZXIuaW5pdCgpO1xyXG4gICBcclxuICAgICR2bSA9IG5ldyBWdWUobWFuYWdlcik7XHJcbn1cclxuXHJcbi8vIOWFs+mXreS5i+WJjemcgOimgeiOt+WPluW9k+WJjeeahOeEpueCueWFg+e0oOWwhuWFtueEpueCueS4ouWkseS7peinpuWPkSB1aSDnu4Tku7bnmoQgY29uZmlybSDkuovku7bkv53lrZjphY3nva5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJlZm9yZUNsb3NlKCkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsb3NlKCkge31cclxuIl19