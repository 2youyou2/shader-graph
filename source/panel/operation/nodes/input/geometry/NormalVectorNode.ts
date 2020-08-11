import { ShaderNode } from "../../../base";
import { ConcretePrecisionType, NormalSpace } from "../../../type";


export default class NormalVectorNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    constructor (data) {
        super(data)

        if (this.data.m_Space === NormalSpace.Object - NormalSpace.Object) {
            this.depVarings.push(NormalSpace.Object);
        }
        else if (this.data.m_Space === NormalSpace.View - NormalSpace.Object) {
            this.depVarings.push(NormalSpace.View);
        }
        else if (this.data.m_Space === NormalSpace.Tangent - NormalSpace.Object) {
            this.depVarings.push(NormalSpace.Tangent);
            console.error('Not support Tangent Normal');
        }
        else if (this.data.m_Space === NormalSpace.World - NormalSpace.Object) {
            this.depVarings.push(NormalSpace.World);
        }
    }

    calcConcretePrecision () {
        this.slots.forEach(slot => {
            slot._concretePrecision = 3;
        })
    }

    generateCode () {
        let name = 'normal';
        if (this.data.m_Space === NormalSpace.Object) {
            name = 'normal';
        }
        else if (this.data.m_Space === NormalSpace.View) {
            name = 'viewNormal';
        }
        else if (this.data.m_Space === NormalSpace.Tangent) {
            // name = 'tangentNormal';
            name = 'worldNormal';
        }
        else if (this.data.m_Space === NormalSpace.World) {
            name = 'worldNormal';
        }
        return `${this.getOutputVarDefine(0)} = ${name};`;
    }
}

