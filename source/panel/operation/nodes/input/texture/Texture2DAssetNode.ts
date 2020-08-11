import TextureAssetNode from "./TextureAssetNode";

export default class Texture2DAssetNode extends TextureAssetNode {
    generateCode () {
        return `sampler2D ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}
