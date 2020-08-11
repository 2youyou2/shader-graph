'use strict';
import path from 'fire-path';
import fs from 'fire-fs';
import ShaderGraph from '../operation/shadergraph';

const globby = require('globby');
const profile = Editor.Profile.load('local://packages/shader-graph.json');

const electron = require('electron')
const projectPath = electron.remote.getGlobal('Editor').Project.path;

export const data = {
    directories: []
};

export const watch = {};

export const computed = {};

export const components = {
};

function convertToProjectRelative (absolutePath: string) {
    if (path.contains(projectPath, absolutePath)) {
        absolutePath = 'db://project/' + path.relative(projectPath, absolutePath)
    }
    return absolutePath;
}

function convertToProjectAbsolute (relativePath: string) {
    if (relativePath.startsWith('db://project/')) {
        relativePath = relativePath.replace('db://project/', '');
        relativePath = path.join(projectPath, relativePath);
    }
    return relativePath;
}

export function init () {
    const storage = profile.get('shader-graph');
    if (storage) {
        for (let key in storage) {
            data[key] = storage[key];
        }
    }

    if (data.directories) {
        data.directories.forEach(d => {
            d.src = convertToProjectAbsolute(d.src);
            d.dst = convertToProjectAbsolute(d.dst);
        })
    }
}

export const methods = {
    saveEdit () {
        const vm: any = this;
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

    onGenerate () {
        data.directories.forEach(data => {
            if (!data.enabled) return;

            let destDir = data.dst;

            let graphDir = data.src;
            ShaderGraph.subgraphPath = graphDir;
            let paths = globby.sync([
                path.join(graphDir, '**/*.shadergraph').replace(/\\/g, '/'),
                path.join(graphDir, '**/*.ShaderGraph').replace(/\\/g, '/')
            ]);

            paths.forEach(graphPath => {
                let relPath = path.relative(graphDir, graphPath);
                let content = ShaderGraph.decode(graphPath);
                let dstPath = path.join(destDir, path.dirname(relPath), path.basenameNoExt(graphPath) + '.effect');
                fs.ensureDirSync(path.dirname(dstPath))
                fs.writeFileSync(dstPath, content);

                relPath = path.relative(projectPath, dstPath);
                let url = 'db://' + relPath;
                Editor.Ipc.sendToAll('refresh-asset', url)
            })
        })
    },

    remove (d) {
        let index = data.directories.indexOf(d);
        if (index !== -1) {
            data.directories.splice(index, 1);
            this.saveEdit();
        }
    },

    onAdd () {
        data.directories.push({
            src: '',
            dst: path.join(projectPath, 'assets'),
            enabled: true,
        })

        this.saveEdit();
    },
};


export function mounted () { }
