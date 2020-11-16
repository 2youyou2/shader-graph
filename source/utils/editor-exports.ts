
let _global:any = typeof window !== 'undefined' && window;
if (!_global) {
    _global = typeof global !== 'undefined' && global;
}

export const Editor = _global.Editor;
