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
            editor_exports_1.Editor.Panel.open('shader-graph');
        });
    },
    convert(src, dst, baseDir) {
        return __awaiter(this, arguments, void 0, function* () {
            if (typeof src !== 'string') {
                src = arguments[1];
                dst = arguments[2];
                baseDir = arguments[3];
            }
            if (src === dst) {
                console.error('Can not convert shader graph to the source path.');
                return;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQWdEO0FBRWhELGdGQUF3RDtBQUN4RCxzREFBeUI7QUFDekIsZ0RBQXdCO0FBR3hCOzs7OztHQUtHO0FBQ0gsT0FBTyxDQUFDLE9BQU8sR0FBRztJQUNSLElBQUk7O1lBQ04sdUJBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLE9BQWU7O1lBQ3BELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUN6QixHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFCO1lBRUQsSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztnQkFDbEUsT0FBTzthQUNWO1lBR0QscUJBQVcsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQ25DLElBQUksT0FBTyxHQUFHLHFCQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLGlCQUFFLENBQUMsYUFBYSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxpQkFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFL0IsSUFBSSxPQUFPLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEQsSUFBSSxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM1QixNQUFNLHVCQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLENBQUM7S0FBQTtDQUNKLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxPQUFPLENBQUMsSUFBSSxHQUFHLGNBQVksQ0FBQyxDQUFDO0FBRTdCOzs7R0FHRztBQUNILE9BQU8sQ0FBQyxNQUFNLEdBQUcsY0FBWSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZGl0b3IgfSBmcm9tICcuL3V0aWxzL2VkaXRvci1leHBvcnRzJztcclxuXHJcbmltcG9ydCBTaGFkZXJHcmFwaCBmcm9tICcuL3BhbmVsL29wZXJhdGlvbi9zaGFkZXJncmFwaCc7XHJcbmltcG9ydCBmcyBmcm9tICdmaXJlLWZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5cclxuLyoqXHJcbiAqIOaPkuS7tuWumuS5ieeahOaWueazlVxyXG4gKiBNZXRob2RzIGRlZmluZWQgYnkgcGx1Zy1pbnNcclxuICog5Y+v5Lul5ZyoIHBhY2thZ2UuanNvbiDph4znmoQgY29udHJpYnV0aW9ucyDph4zlrprkuYkgbWVzc2FnZXMg6Kem5Y+R6L+Z6YeM55qE5pa55rOVXHJcbiAqIEFuZCBvZiBjb3Vyc2UsIG1lc3NhZ2VzIGNhbiBiZSBkZWZpbmVkIGluIHRoZSBjb250cmlidXRpb25zIHNlY3Rpb24gaW4gcGFja2FnZS5KU09OIHRvIHRyaWdnZXIgdGhlIG1ldGhvZCBoZXJlXHJcbiAqL1xyXG5leHBvcnRzLm1ldGhvZHMgPSB7XHJcbiAgICBhc3luYyBvcGVuKCkge1xyXG4gICAgICAgIEVkaXRvci5QYW5lbC5vcGVuKCdzaGFkZXItZ3JhcGgnKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgY29udmVydCAoc3JjOiBzdHJpbmcsIGRzdDogc3RyaW5nLCBiYXNlRGlyOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHNyYyAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgc3JjID0gYXJndW1lbnRzWzFdO1xyXG4gICAgICAgICAgICBkc3QgPSBhcmd1bWVudHNbMl07XHJcbiAgICAgICAgICAgIGJhc2VEaXIgPSBhcmd1bWVudHNbM107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3JjID09PSBkc3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ2FuIG5vdCBjb252ZXJ0IHNoYWRlciBncmFwaCB0byB0aGUgc291cmNlIHBhdGguJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBTaGFkZXJHcmFwaC5zdWJncmFwaFBhdGggPSBiYXNlRGlyO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gU2hhZGVyR3JhcGguZGVjb2RlKHNyYyk7XHJcbiAgICAgICAgZnMuZW5zdXJlRGlyU3luYyhwYXRoLmRpcm5hbWUoZHN0KSlcclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRzdCwgY29udGVudCk7XHJcblxyXG4gICAgICAgIGxldCByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShFZGl0b3IuUHJvamVjdC5wYXRoLCBkc3QpO1xyXG4gICAgICAgIGxldCB1cmwgPSAnZGI6Ly8nICsgcmVsUGF0aDtcclxuICAgICAgICBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdyZWZyZXNoLWFzc2V0JywgdXJsKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiDlkK/liqjnmoTml7blgJnmiafooYznmoTliJ3lp4vljJbmlrnms5VcclxuICogSW5pdGlhbGl6YXRpb24gbWV0aG9kIHBlcmZvcm1lZCBhdCBzdGFydHVwXHJcbiAqL1xyXG5leHBvcnRzLmxvYWQgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuLyoqXHJcbiAqIOaPkuS7tuiiq+WFs+mXreeahOaXtuWAmeaJp+ihjOeahOWNuOi9veaWueazlVxyXG4gKiBVbmluc3RhbGwgbWV0aG9kIHBlcmZvcm1lZCB3aGVuIHRoZSBwbHVnLWluIGlzIGNsb3NlZFxyXG4gKi9cclxuZXhwb3J0cy51bmxvYWQgPSBmdW5jdGlvbigpIHt9O1xyXG4iXX0=