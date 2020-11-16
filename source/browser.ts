import { Editor } from './utils/editor-exports';


/**
 * 插件定义的方法
 * Methods defined by plug-ins
 * 可以在 package.json 里的 contributions 里定义 messages 触发这里的方法
 * And of course, messages can be defined in the contributions section in package.JSON to trigger the method here
 */
exports.methods = {
    async open() {
        Editor.Panel.open('shader-grapgh');
    },
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
