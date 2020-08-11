import TextureAssetNode from "./TextureAssetNode";

export default class CubemapAssetNode extends TextureAssetNode {
    generateCode () {
        return `samplerCube ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}
