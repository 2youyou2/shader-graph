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
exports.style = fs_1.readFileSync(path_1.join(__dirname, '../index.css'), 'utf8');
exports.template = fs_1.readFileSync(path_1.join(__dirname, '../../static/template/index.html'), 'utf8');
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
        yield manager.init();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvcGFuZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7QUFFYiwyQkFBc0M7QUFDdEMsK0JBQTRCO0FBRTVCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztBQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFFNUIsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDO0FBQ3RCLElBQUksR0FBUSxDQUFDO0FBQ0EsUUFBQSxLQUFLLEdBQUcsaUJBQVksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRTlELFFBQUEsUUFBUSxHQUFHLGlCQUFZLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxrQ0FBa0MsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRXJGLFFBQUEsQ0FBQyxHQUFHO0lBQ2IsV0FBVyxFQUFFLGNBQWM7Q0FDOUIsQ0FBQztBQUdXLFFBQUEsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUEsUUFBUSxHQUFHLEVBRXZCLENBQUM7QUFFRixTQUFzQixLQUFLLENBQUMsR0FBVyxFQUFFLE1BQVc7O1FBRWhELGFBQWE7UUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNqQyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVyQixHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUFBO0FBVkQsc0JBVUM7QUFFRCxpREFBaUQ7QUFDakQsU0FBc0IsV0FBVzs7SUFFakMsQ0FBQztDQUFBO0FBRkQsa0NBRUM7QUFFRCxTQUFzQixLQUFLOzBEQUFJLENBQUM7Q0FBQTtBQUFoQyxzQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgZnMsIHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcblxyXG5jb25zdCBWdWUgPSByZXF1aXJlKCd2dWUvZGlzdC92dWUuanMnKTtcclxuVnVlLmNvbmZpZy5wcm9kdWN0aW9uVGlwID0gZmFsc2U7XHJcblZ1ZS5jb25maWcuZGV2dG9vbHMgPSBmYWxzZTtcclxuXHJcbmxldCBwYW5lbDogYW55ID0gbnVsbDtcclxubGV0ICR2bTogYW55O1xyXG5leHBvcnQgY29uc3Qgc3R5bGUgPSByZWFkRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi9pbmRleC5jc3MnKSwgJ3V0ZjgnKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IHJlYWRGaWxlU3luYyhqb2luKF9fZGlybmFtZSwgJy4uLy4uL3N0YXRpYy90ZW1wbGF0ZS9pbmRleC5odG1sJyksICd1dGY4Jyk7XHJcblxyXG5leHBvcnQgY29uc3QgJCA9IHtcclxuICAgIHNoYWRlcmdyYXBoOiAnLnNoYWRlcmdyYXBoJyxcclxufTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgbWV0aG9kcyA9IHt9O1xyXG5leHBvcnQgY29uc3QgbWVzc2FnZXMgPSB7XHJcbiAgICBcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkeSh0YWI6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBwYW5lbCA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgbWFuYWdlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYW5hZ2VyJyk7XHJcbiAgICBtYW5hZ2VyLmVsID0gcGFuZWwuJC5zaGFkZXJncmFwaDtcclxuICAgIGF3YWl0IG1hbmFnZXIuaW5pdCgpO1xyXG4gICBcclxuICAgICR2bSA9IG5ldyBWdWUobWFuYWdlcik7XHJcbn1cclxuXHJcbi8vIOWFs+mXreS5i+WJjemcgOimgeiOt+WPluW9k+WJjeeahOeEpueCueWFg+e0oOWwhuWFtueEpueCueS4ouWkseS7peinpuWPkSB1aSDnu4Tku7bnmoQgY29uZmlybSDkuovku7bkv53lrZjphY3nva5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJlZm9yZUNsb3NlKCkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsb3NlKCkge31cclxuIl19