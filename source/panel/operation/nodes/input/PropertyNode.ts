import { ShaderNode, ShaderPropery } from "../../base";
import { ConcretePrecisionType } from "../../type";

export default class PropertyNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;
    property: ShaderPropery | null = null;

    isPropertyNode = true;

    searchProperties (properties) {
        this.property = properties.find(p => {
            return p.data.m_Guid.m_GuidSerialized === this.data.m_PropertyGuidSerialized;
        })

        if (this.property) {
            this.property.node = this;
        }
    }

    // generateCode () {
    //     return `${this.getOutputVarDefine(0)} = ${this.property?.name};`;
    // }
}

