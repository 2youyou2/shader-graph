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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_exports_1 = require("./utils/editor-exports");
const shadergraph_1 = __importDefault(require("./panel/operation/shadergraph"));
const fire_fs_1 = __importDefault(require("fire-fs"));
const path_1 = __importDefault(require("path"));
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
    convert(src, dst, baseDir) {
        return __awaiter(this, void 0, void 0, function* () {
            shadergraph_1.default.subgraphPath = baseDir;
            let content = shadergraph_1.default.decode(src);
            fire_fs_1.default.ensureDirSync(path_1.default.dirname(dst));
            fire_fs_1.default.writeFileSync(dst, content);
            let relPath = path_1.default.relative(editor_exports_1.Editor.Project.path, dst);
            let url = 'db://' + relPath;
            yield editor_exports_1.Editor.Message.request('asset-db', 'refresh-asset', url);
        });
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQWdEO0FBRWhELGdGQUF3RDtBQUN4RCxzREFBeUI7QUFDekIsZ0RBQXdCO0FBR3hCOzs7OztHQUtHO0FBQ0gsT0FBTyxDQUFDLE9BQU8sR0FBRztJQUNSLElBQUk7O1lBQ04sdUJBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLE9BQWU7O1lBQ3BELHFCQUFXLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUNuQyxJQUFJLE9BQU8sR0FBRyxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxpQkFBRSxDQUFDLGFBQWEsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbkMsaUJBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRS9CLElBQUksT0FBTyxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsdUJBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELElBQUksR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDNUIsTUFBTSx1QkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRSxDQUFDO0tBQUE7Q0FDSixDQUFDO0FBRUY7OztHQUdHO0FBQ0gsT0FBTyxDQUFDLElBQUksR0FBRyxjQUFZLENBQUMsQ0FBQztBQUU3Qjs7O0dBR0c7QUFDSCxPQUFPLENBQUMsTUFBTSxHQUFHLGNBQVksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSAnLi91dGlscy9lZGl0b3ItZXhwb3J0cyc7XHJcblxyXG5pbXBvcnQgU2hhZGVyR3JhcGggZnJvbSAnLi9wYW5lbC9vcGVyYXRpb24vc2hhZGVyZ3JhcGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZmlyZS1mcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDmj5Lku7blrprkuYnnmoTmlrnms5VcclxuICogTWV0aG9kcyBkZWZpbmVkIGJ5IHBsdWctaW5zXHJcbiAqIOWPr+S7peWcqCBwYWNrYWdlLmpzb24g6YeM55qEIGNvbnRyaWJ1dGlvbnMg6YeM5a6a5LmJIG1lc3NhZ2VzIOinpuWPkei/memHjOeahOaWueazlVxyXG4gKiBBbmQgb2YgY291cnNlLCBtZXNzYWdlcyBjYW4gYmUgZGVmaW5lZCBpbiB0aGUgY29udHJpYnV0aW9ucyBzZWN0aW9uIGluIHBhY2thZ2UuSlNPTiB0byB0cmlnZ2VyIHRoZSBtZXRob2QgaGVyZVxyXG4gKi9cclxuZXhwb3J0cy5tZXRob2RzID0ge1xyXG4gICAgYXN5bmMgb3BlbigpIHtcclxuICAgICAgICBFZGl0b3IuUGFuZWwub3Blbignc2hhZGVyLWdyYXBnaCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBjb252ZXJ0IChzcmM6IHN0cmluZywgZHN0OiBzdHJpbmcsIGJhc2VEaXI6IHN0cmluZykge1xyXG4gICAgICAgIFNoYWRlckdyYXBoLnN1YmdyYXBoUGF0aCA9IGJhc2VEaXI7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBTaGFkZXJHcmFwaC5kZWNvZGUoc3JjKTtcclxuICAgICAgICBmcy5lbnN1cmVEaXJTeW5jKHBhdGguZGlybmFtZShkc3QpKVxyXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0LCBjb250ZW50KTtcclxuXHJcbiAgICAgICAgbGV0IHJlbFBhdGggPSBwYXRoLnJlbGF0aXZlKEVkaXRvci5Qcm9qZWN0LnBhdGgsIGRzdCk7XHJcbiAgICAgICAgbGV0IHVybCA9ICdkYjovLycgKyByZWxQYXRoO1xyXG4gICAgICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3JlZnJlc2gtYXNzZXQnLCB1cmwpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOWQr+WKqOeahOaXtuWAmeaJp+ihjOeahOWIneWni+WMluaWueazlVxyXG4gKiBJbml0aWFsaXphdGlvbiBtZXRob2QgcGVyZm9ybWVkIGF0IHN0YXJ0dXBcclxuICovXHJcbmV4cG9ydHMubG9hZCA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4vKipcclxuICog5o+S5Lu26KKr5YWz6Zet55qE5pe25YCZ5omn6KGM55qE5Y246L295pa55rOVXHJcbiAqIFVuaW5zdGFsbCBtZXRob2QgcGVyZm9ybWVkIHdoZW4gdGhlIHBsdWctaW4gaXMgY2xvc2VkXHJcbiAqL1xyXG5leHBvcnRzLnVubG9hZCA9IGZ1bmN0aW9uKCkge307XHJcbiJdfQ==