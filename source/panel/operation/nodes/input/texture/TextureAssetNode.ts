import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class TextureAssetNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Texture;
}

