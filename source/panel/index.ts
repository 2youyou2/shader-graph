'use strict';

import fs, { readFileSync } from 'fs';
import { join } from 'path';

const Vue = require('vue/dist/vue.js');
Vue.config.productionTip = false;
Vue.config.devtools = false;

let panel: any = null;
let $vm: any;
export const style = readFileSync(join(__dirname, '../index.css'), 'utf8');

export const template = readFileSync(join(__dirname, '../../static/template/index.html'), 'utf8');

export const $ = {
    shadergraph: '.shadergraph',
};


export const methods = {};
export const messages = {
    
};

export async function ready(tab: string, params: any) {

    // @ts-ignore
    panel = this;

    const manager = require('./components/manager');
    manager.el = panel.$.shadergraph;
    await manager.init();
   
    $vm = new Vue(manager);
}

// 关闭之前需要获取当前的焦点元素将其焦点丢失以触发 ui 组件的 confirm 事件保存配置
export async function beforeClose() {

}

export async function close() {}
