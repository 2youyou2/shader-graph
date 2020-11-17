import { Editor } from './utils/editor-exports';

import ShaderGraph from './panel/operation/shadergraph';
import fs from 'fire-fs';
import path from 'path';


/**
 * 插件定义的方法
 * Methods defined by plug-ins
 * 可以在 package.json 里的 contributions 里定义 messages 触发这里的方法
 * And of course, messages can be defined in the contributions section in package.JSON to trigger the method here
 */
exports.methods = {
    async open() {
        Editor.Panel.open('shader-graph');
    },

    async convert (src: string, dst: string, baseDir: string) {
        if (typeof src !== 'string') {
            src = arguments[1];
            dst = arguments[2];
            baseDir = arguments[3];
        }

        if (src === dst) {
            console.error('Can not convert shader graph to the source path.');
            return;
        }


        ShaderGraph.subgraphPath = baseDir;
        let content = ShaderGraph.decode(src);
        fs.ensureDirSync(path.dirname(dst))
        fs.writeFileSync(dst, content);

        let relPath = path.relative(Editor.Project.path, dst);
        let url = 'db://' + relPath;
        await Editor.Message.request('asset-db', 'refresh-asset', url);
    }
};

/**
 * 启动的时候执行的初始化方法
 * Initialization method performed at startup
 */
exports.load = function() {};

/**
 * 插件被关闭的时候执行的卸载方法
 * Uninstall method performed when the plug-in is closed
 */
exports.unload = function() {};
