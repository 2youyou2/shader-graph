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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mounted = exports.methods = exports.init = exports.components = exports.computed = exports.watch = exports.data = void 0;
const fire_path_1 = __importDefault(require("fire-path"));
const fire_fs_1 = __importDefault(require("fire-fs"));
const shadergraph_1 = __importDefault(require("../operation/shadergraph"));
const editor_exports_1 = require("../../utils/editor-exports");
const globby = require('globby');
const projectPath = editor_exports_1.Editor.Project.path;
exports.data = {
    directories: []
};
exports.watch = {};
exports.computed = {};
exports.components = {};
function convertToProjectRelative(absolutePath) {
    if (fire_path_1.default.contains(projectPath, absolutePath)) {
        absolutePath = 'db://project/' + fire_path_1.default.relative(projectPath, absolutePath);
    }
    return absolutePath;
}
function convertToProjectAbsolute(relativePath) {
    if (relativePath.startsWith('db://project/')) {
        relativePath = relativePath.replace('db://project/', '');
        relativePath = fire_path_1.default.join(projectPath, relativePath);
    }
    return relativePath;
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.data.directories = (yield editor_exports_1.Editor.Profile.getConfig('shader-graph', 'directories')) || [];
        exports.data.directories.forEach(d => {
            d.src = convertToProjectAbsolute(d.src);
            d.dst = convertToProjectAbsolute(d.dst);
        });
    });
}
exports.init = init;
exports.methods = {
    saveEdit() {
        const vm = this;
        let directories = vm.directories.map(d => {
            d = Object.assign({}, d);
            d.src = convertToProjectRelative(d.src);
            d.dst = convertToProjectRelative(d.dst);
            return d;
        });
        editor_exports_1.Editor.Profile.setConfig('shader-graph', 'directories', directories);
    },
    onGenerate() {
        exports.data.directories.forEach(data => {
            if (!data.enabled)
                return;
            let destDir = data.dst;
            let graphDir = data.src;
            shadergraph_1.default.subgraphPath = graphDir;
            let paths = globby.sync([
                fire_path_1.default.join(graphDir, '**/*.shadergraph').replace(/\\/g, '/'),
                fire_path_1.default.join(graphDir, '**/*.ShaderGraph').replace(/\\/g, '/')
            ]);
            paths.forEach(graphPath => {
                let relPath = fire_path_1.default.relative(graphDir, graphPath);
                let content = shadergraph_1.default.decode(graphPath);
                let dstPath = fire_path_1.default.join(destDir, fire_path_1.default.dirname(relPath), fire_path_1.default.basenameNoExt(graphPath) + '.effect');
                fire_fs_1.default.ensureDirSync(fire_path_1.default.dirname(dstPath));
                fire_fs_1.default.writeFileSync(dstPath, content);
                relPath = fire_path_1.default.relative(projectPath, dstPath);
                let url = 'db://' + relPath;
                editor_exports_1.Editor.Message.request('asset-db', 'refresh-asset', url);
            });
        });
    },
    remove(d) {
        let index = exports.data.directories.indexOf(d);
        if (index !== -1) {
            exports.data.directories.splice(index, 1);
            this.saveEdit();
        }
    },
    onAdd() {
        exports.data.directories.push({
            src: '',
            dst: fire_path_1.default.join(projectPath, 'assets'),
            enabled: true,
        });
        this.saveEdit();
    },
};
function mounted() { }
exports.mounted = mounted;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9wYW5lbC9jb21wb25lbnRzL21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFDYiwwREFBNkI7QUFDN0Isc0RBQXlCO0FBQ3pCLDJFQUFtRDtBQUNuRCwrREFBb0Q7QUFFcEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sV0FBVyxHQUFHLHVCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQVEzQixRQUFBLElBQUksR0FBRztJQUNoQixXQUFXLEVBQUUsRUFBc0I7Q0FDdEMsQ0FBQztBQUVXLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUVYLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVkLFFBQUEsVUFBVSxHQUFHLEVBQ3pCLENBQUM7QUFFRixTQUFTLHdCQUF3QixDQUFFLFlBQW9CO0lBQ25ELElBQUksbUJBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFFO1FBQzFDLFlBQVksR0FBRyxlQUFlLEdBQUcsbUJBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFBO0tBQzVFO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQVMsd0JBQXdCLENBQUUsWUFBb0I7SUFDbkQsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQzFDLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxZQUFZLEdBQUcsbUJBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ3ZEO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQXNCLElBQUk7O1FB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R0FBRyxDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNMLElBQUksS0FBSyxHQUFHLFlBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsWUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0QsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDbEIsR0FBRyxFQUFFLEVBQUU7WUFDUCxHQUFHLEVBQUUsbUJBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNKLENBQUM7QUFHRixTQUFnQixPQUFPLEtBQU0sQ0FBQztBQUE5QiwwQkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ2ZpcmUtcGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmaXJlLWZzJztcclxuaW1wb3J0IFNoYWRlckdyYXBoIGZyb20gJy4uL29wZXJhdGlvbi9zaGFkZXJncmFwaCc7XHJcbmltcG9ydCB7IEVkaXRvciB9IGZyb20gJy4uLy4uL3V0aWxzL2VkaXRvci1leHBvcnRzJztcclxuXHJcbmNvbnN0IGdsb2JieSA9IHJlcXVpcmUoJ2dsb2JieScpO1xyXG5cclxuY29uc3QgcHJvamVjdFBhdGggPSBFZGl0b3IuUHJvamVjdC5wYXRoO1xyXG5cclxuaW50ZXJmYWNlIERpcmVjdG9ydHlQYWlyIHtcclxuICAgIGVuYWJsZWQ6IGJvb2xlYW4sXHJcbiAgICBzcmM6IHN0cmluZyxcclxuICAgIGRzdDogc3RyaW5nLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGF0YSA9IHtcclxuICAgIGRpcmVjdG9yaWVzOiBbXSBhcyBEaXJlY3RvcnR5UGFpcltdXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgd2F0Y2ggPSB7fTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb21wdXRlZCA9IHt9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudHMgPSB7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjb252ZXJ0VG9Qcm9qZWN0UmVsYXRpdmUgKGFic29sdXRlUGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAocGF0aC5jb250YWlucyhwcm9qZWN0UGF0aCwgYWJzb2x1dGVQYXRoKSkge1xyXG4gICAgICAgIGFic29sdXRlUGF0aCA9ICdkYjovL3Byb2plY3QvJyArIHBhdGgucmVsYXRpdmUocHJvamVjdFBhdGgsIGFic29sdXRlUGF0aClcclxuICAgIH1cclxuICAgIHJldHVybiBhYnNvbHV0ZVBhdGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnRUb1Byb2plY3RBYnNvbHV0ZSAocmVsYXRpdmVQYXRoOiBzdHJpbmcpIHtcclxuICAgIGlmIChyZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnZGI6Ly9wcm9qZWN0LycpKSB7XHJcbiAgICAgICAgcmVsYXRpdmVQYXRoID0gcmVsYXRpdmVQYXRoLnJlcGxhY2UoJ2RiOi8vcHJvamVjdC8nLCAnJyk7XHJcbiAgICAgICAgcmVsYXRpdmVQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCByZWxhdGl2ZVBhdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlbGF0aXZlUGF0aDtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQgKCkge1xyXG4gICAgZGF0YS5kaXJlY3RvcmllcyA9IGF3YWl0IEVkaXRvci5Qcm9maWxlLmdldENvbmZpZygnc2hhZGVyLWdyYXBoJywgJ2RpcmVjdG9yaWVzJykgfHwgW107XHJcblxyXG4gICAgZGF0YS5kaXJlY3Rvcmllcy5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICAgIGQuc3JjID0gY29udmVydFRvUHJvamVjdEFic29sdXRlKGQuc3JjKTtcclxuICAgICAgICBkLmRzdCA9IGNvbnZlcnRUb1Byb2plY3RBYnNvbHV0ZShkLmRzdCk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWV0aG9kcyA9IHtcclxuICAgIHNhdmVFZGl0ICgpIHtcclxuICAgICAgICBjb25zdCB2bTogYW55ID0gdGhpcztcclxuICAgICAgICBsZXQgZGlyZWN0b3JpZXMgPSB2bS5kaXJlY3Rvcmllcy5tYXAoZCA9PiB7XHJcbiAgICAgICAgICAgIGQgPSBPYmplY3QuYXNzaWduKHt9LCBkKTtcclxuXHJcbiAgICAgICAgICAgIGQuc3JjID0gY29udmVydFRvUHJvamVjdFJlbGF0aXZlKGQuc3JjKTtcclxuICAgICAgICAgICAgZC5kc3QgPSBjb252ZXJ0VG9Qcm9qZWN0UmVsYXRpdmUoZC5kc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIEVkaXRvci5Qcm9maWxlLnNldENvbmZpZygnc2hhZGVyLWdyYXBoJywgJ2RpcmVjdG9yaWVzJywgZGlyZWN0b3JpZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkdlbmVyYXRlICgpIHtcclxuICAgICAgICBkYXRhLmRpcmVjdG9yaWVzLmZvckVhY2goZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5lbmFibGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVzdERpciA9IGRhdGEuZHN0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGdyYXBoRGlyID0gZGF0YS5zcmM7XHJcbiAgICAgICAgICAgIFNoYWRlckdyYXBoLnN1YmdyYXBoUGF0aCA9IGdyYXBoRGlyO1xyXG4gICAgICAgICAgICBsZXQgcGF0aHMgPSBnbG9iYnkuc3luYyhbXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZ3JhcGhEaXIsICcqKi8qLnNoYWRlcmdyYXBoJykucmVwbGFjZSgvXFxcXC9nLCAnLycpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGdyYXBoRGlyLCAnKiovKi5TaGFkZXJHcmFwaCcpLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZ3JhcGhQYXRoID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShncmFwaERpciwgZ3JhcGhQYXRoKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gU2hhZGVyR3JhcGguZGVjb2RlKGdyYXBoUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHN0UGF0aCA9IHBhdGguam9pbihkZXN0RGlyLCBwYXRoLmRpcm5hbWUocmVsUGF0aCksIHBhdGguYmFzZW5hbWVOb0V4dChncmFwaFBhdGgpICsgJy5lZmZlY3QnKTtcclxuICAgICAgICAgICAgICAgIGZzLmVuc3VyZURpclN5bmMocGF0aC5kaXJuYW1lKGRzdFBhdGgpKVxyXG4gICAgICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkc3RQYXRoLCBjb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShwcm9qZWN0UGF0aCwgZHN0UGF0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gJ2RiOi8vJyArIHJlbFBhdGg7XHJcbiAgICAgICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdyZWZyZXNoLWFzc2V0JywgdXJsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmUgKGQpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBkYXRhLmRpcmVjdG9yaWVzLmluZGV4T2YoZCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBkYXRhLmRpcmVjdG9yaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUVkaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQWRkICgpIHtcclxuICAgICAgICBkYXRhLmRpcmVjdG9yaWVzLnB1c2goe1xyXG4gICAgICAgICAgICBzcmM6ICcnLFxyXG4gICAgICAgICAgICBkc3Q6IHBhdGguam9pbihwcm9qZWN0UGF0aCwgJ2Fzc2V0cycpLFxyXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZUVkaXQoKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50ZWQgKCkgeyB9XHJcbiJdfQ==