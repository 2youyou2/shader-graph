'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mounted = exports.methods = exports.init = exports.components = exports.computed = exports.watch = exports.data = void 0;
const fire_path_1 = __importDefault(require("fire-path"));
const fire_fs_1 = __importDefault(require("fire-fs"));
const shadergraph_1 = __importDefault(require("../operation/shadergraph"));
const globby = require('globby');
const profile = Editor.Profile.load('local://packages/shader-graph.json');
const electron = require('electron');
const projectPath = electron.remote.getGlobal('Editor').Project.path;
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
    const storage = profile.get('shader-graph');
    if (storage) {
        for (let key in storage) {
            exports.data[key] = storage[key];
        }
    }
    if (exports.data.directories) {
        exports.data.directories.forEach(d => {
            d.src = convertToProjectAbsolute(d.src);
            d.dst = convertToProjectAbsolute(d.dst);
        });
    }
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
        profile.set('shader-graph', {
            directories: directories,
        });
        profile.save();
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
                Editor.Ipc.sendToAll('refresh-asset', url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9wYW5lbC9jb21wb25lbnRzL21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7QUFDYiwwREFBNkI7QUFDN0Isc0RBQXlCO0FBQ3pCLDJFQUFtRDtBQUVuRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUUxRSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDcEMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUV4RCxRQUFBLElBQUksR0FBRztJQUNoQixXQUFXLEVBQUUsRUFBRTtDQUNsQixDQUFDO0FBRVcsUUFBQSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBRVgsUUFBQSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBRWQsUUFBQSxVQUFVLEdBQUcsRUFDekIsQ0FBQztBQUVGLFNBQVMsd0JBQXdCLENBQUUsWUFBb0I7SUFDbkQsSUFBSSxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLEVBQUU7UUFDMUMsWUFBWSxHQUFHLGVBQWUsR0FBRyxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUE7S0FDNUU7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyx3QkFBd0IsQ0FBRSxZQUFvQjtJQUNuRCxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDMUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FB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Q0FBQyxtQkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2dCQUN2QyxpQkFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRW5DLE9BQU8sR0FBRyxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLElBQUksR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUM5QyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ0wsSUFBSSxLQUFLLEdBQUcsWUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDZCxZQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxZQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNsQixHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxtQkFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0osQ0FBQztBQUdGLFNBQWdCLE9BQU8sS0FBTSxDQUFDO0FBQTlCLDBCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHBhdGggZnJvbSAnZmlyZS1wYXRoJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZpcmUtZnMnO1xyXG5pbXBvcnQgU2hhZGVyR3JhcGggZnJvbSAnLi4vb3BlcmF0aW9uL3NoYWRlcmdyYXBoJztcclxuXHJcbmNvbnN0IGdsb2JieSA9IHJlcXVpcmUoJ2dsb2JieScpO1xyXG5jb25zdCBwcm9maWxlID0gRWRpdG9yLlByb2ZpbGUubG9hZCgnbG9jYWw6Ly9wYWNrYWdlcy9zaGFkZXItZ3JhcGguanNvbicpO1xyXG5cclxuY29uc3QgZWxlY3Ryb24gPSByZXF1aXJlKCdlbGVjdHJvbicpXHJcbmNvbnN0IHByb2plY3RQYXRoID0gZWxlY3Ryb24ucmVtb3RlLmdldEdsb2JhbCgnRWRpdG9yJykuUHJvamVjdC5wYXRoO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGEgPSB7XHJcbiAgICBkaXJlY3RvcmllczogW11cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB3YXRjaCA9IHt9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXB1dGVkID0ge307XHJcblxyXG5leHBvcnQgY29uc3QgY29tcG9uZW50cyA9IHtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnRUb1Byb2plY3RSZWxhdGl2ZSAoYWJzb2x1dGVQYXRoOiBzdHJpbmcpIHtcclxuICAgIGlmIChwYXRoLmNvbnRhaW5zKHByb2plY3RQYXRoLCBhYnNvbHV0ZVBhdGgpKSB7XHJcbiAgICAgICAgYWJzb2x1dGVQYXRoID0gJ2RiOi8vcHJvamVjdC8nICsgcGF0aC5yZWxhdGl2ZShwcm9qZWN0UGF0aCwgYWJzb2x1dGVQYXRoKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic29sdXRlUGF0aDtcclxufVxyXG5cclxuZnVuY3Rpb24gY29udmVydFRvUHJvamVjdEFic29sdXRlIChyZWxhdGl2ZVBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKCdkYjovL3Byb2plY3QvJykpIHtcclxuICAgICAgICByZWxhdGl2ZVBhdGggPSByZWxhdGl2ZVBhdGgucmVwbGFjZSgnZGI6Ly9wcm9qZWN0LycsICcnKTtcclxuICAgICAgICByZWxhdGl2ZVBhdGggPSBwYXRoLmpvaW4ocHJvamVjdFBhdGgsIHJlbGF0aXZlUGF0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVsYXRpdmVQYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gcHJvZmlsZS5nZXQoJ3NoYWRlci1ncmFwaCcpO1xyXG4gICAgaWYgKHN0b3JhZ2UpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RvcmFnZSkge1xyXG4gICAgICAgICAgICBkYXRhW2tleV0gPSBzdG9yYWdlW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRhLmRpcmVjdG9yaWVzKSB7XHJcbiAgICAgICAgZGF0YS5kaXJlY3Rvcmllcy5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICAgICAgICBkLnNyYyA9IGNvbnZlcnRUb1Byb2plY3RBYnNvbHV0ZShkLnNyYyk7XHJcbiAgICAgICAgICAgIGQuZHN0ID0gY29udmVydFRvUHJvamVjdEFic29sdXRlKGQuZHN0KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWV0aG9kcyA9IHtcclxuICAgIHNhdmVFZGl0ICgpIHtcclxuICAgICAgICBjb25zdCB2bTogYW55ID0gdGhpcztcclxuICAgICAgICBsZXQgZGlyZWN0b3JpZXMgPSB2bS5kaXJlY3Rvcmllcy5tYXAoZCA9PiB7XHJcbiAgICAgICAgICAgIGQgPSBPYmplY3QuYXNzaWduKHt9LCBkKTtcclxuXHJcbiAgICAgICAgICAgIGQuc3JjID0gY29udmVydFRvUHJvamVjdFJlbGF0aXZlKGQuc3JjKTtcclxuICAgICAgICAgICAgZC5kc3QgPSBjb252ZXJ0VG9Qcm9qZWN0UmVsYXRpdmUoZC5kc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb2ZpbGUuc2V0KCdzaGFkZXItZ3JhcGgnLCB7XHJcbiAgICAgICAgICAgIGRpcmVjdG9yaWVzOiBkaXJlY3RvcmllcyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBwcm9maWxlLnNhdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25HZW5lcmF0ZSAoKSB7XHJcbiAgICAgICAgZGF0YS5kaXJlY3Rvcmllcy5mb3JFYWNoKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEuZW5hYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlc3REaXIgPSBkYXRhLmRzdDtcclxuXHJcbiAgICAgICAgICAgIGxldCBncmFwaERpciA9IGRhdGEuc3JjO1xyXG4gICAgICAgICAgICBTaGFkZXJHcmFwaC5zdWJncmFwaFBhdGggPSBncmFwaERpcjtcclxuICAgICAgICAgICAgbGV0IHBhdGhzID0gZ2xvYmJ5LnN5bmMoW1xyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGdyYXBoRGlyLCAnKiovKi5zaGFkZXJncmFwaCcpLnJlcGxhY2UoL1xcXFwvZywgJy8nKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihncmFwaERpciwgJyoqLyouU2hhZGVyR3JhcGgnKS5yZXBsYWNlKC9cXFxcL2csICcvJylcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBwYXRocy5mb3JFYWNoKGdyYXBoUGF0aCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVsUGF0aCA9IHBhdGgucmVsYXRpdmUoZ3JhcGhEaXIsIGdyYXBoUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IFNoYWRlckdyYXBoLmRlY29kZShncmFwaFBhdGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRzdFBhdGggPSBwYXRoLmpvaW4oZGVzdERpciwgcGF0aC5kaXJuYW1lKHJlbFBhdGgpLCBwYXRoLmJhc2VuYW1lTm9FeHQoZ3JhcGhQYXRoKSArICcuZWZmZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBmcy5lbnN1cmVEaXJTeW5jKHBhdGguZGlybmFtZShkc3RQYXRoKSlcclxuICAgICAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0UGF0aCwgY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVsUGF0aCA9IHBhdGgucmVsYXRpdmUocHJvamVjdFBhdGgsIGRzdFBhdGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdkYjovLycgKyByZWxQYXRoO1xyXG4gICAgICAgICAgICAgICAgRWRpdG9yLklwYy5zZW5kVG9BbGwoJ3JlZnJlc2gtYXNzZXQnLCB1cmwpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlIChkKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gZGF0YS5kaXJlY3Rvcmllcy5pbmRleE9mKGQpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgZGF0YS5kaXJlY3Rvcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVFZGl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkFkZCAoKSB7XHJcbiAgICAgICAgZGF0YS5kaXJlY3Rvcmllcy5wdXNoKHtcclxuICAgICAgICAgICAgc3JjOiAnJyxcclxuICAgICAgICAgICAgZHN0OiBwYXRoLmpvaW4ocHJvamVjdFBhdGgsICdhc3NldHMnKSxcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnNhdmVFZGl0KCk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3VudGVkICgpIHsgfVxyXG4iXX0=