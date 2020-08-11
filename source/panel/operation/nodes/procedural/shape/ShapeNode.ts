import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class ShapeNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    depChunks = ['shape']
}
