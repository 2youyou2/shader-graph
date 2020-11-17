import { ShaderNode } from "../../../base";
import { ConcretePrecisionType, PositionSpace } from "../../../type";


export default class PositionNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    constructor (data) {
        super(data)

        if (this.data.m_Space === PositionSpace.Object - PositionSpace.Object) {
            this.depVarings.push(PositionSpace.Object);
        }
        else if (this.data.m_Space === PositionSpace.View - PositionSpace.Object) {
            this.depVarings.push(PositionSpace.View);
        }
        else if (this.data.m_Space === PositionSpace.Tangent - PositionSpace.Object) {
            console.error('Not support Tangent Position');
            this.depVarings.push(PositionSpace.Tangent);
        }
        else if (this.data.m_Space === PositionSpace.World - PositionSpace.Object) {
            this.depVarings.push(PositionSpace.World);
        }
        else if (this.data.m_Space === PositionSpace.AbsoluteWorld - PositionSpace.Object) {
            this.depVarings.push(PositionSpace.AbsoluteWorld);
        }
    }

    calcConcretePrecision () {
        this.slots.forEach(slot => {
            slot._concretePrecision = 3;
        })
    }

    generateCode () {
        let name = 'position.xyz';
        if (this.data.m_Space === PositionSpace.Object) {
            name = 'position.xyz';
        }
        else if (this.data.m_Space === PositionSpace.View) {
            name = 'viewPosition.xyz';
        }
        else if (this.data.m_Space === PositionSpace.Tangent) {
            // name = 'v_tangentPos';
            name = 'worldPosition.xyz';
        }
        else if (this.data.m_Space === PositionSpace.World) {
            name = 'worldPosition.xyz';
        }
        else if (this.data.m_Space === PositionSpace.AbsoluteWorld) {
            name = 'worldPosition.xyz';
        }
        return `${this.getOutputVarDefine(0)} = ${name};`;
    }
}

