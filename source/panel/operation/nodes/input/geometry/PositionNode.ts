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
        let name = 'v_pos';
        if (this.data.m_Space === PositionSpace.Object) {
            name = 'v_pos';
        }
        else if (this.data.m_Space === PositionSpace.View) {
            name = 'v_viewPos';
        }
        else if (this.data.m_Space === PositionSpace.Tangent) {
            // name = 'v_tangentPos';
            name = 'v_worldPos';
        }
        else if (this.data.m_Space === PositionSpace.World) {
            name = 'v_worldPos';
        }
        else if (this.data.m_Space === PositionSpace.AbsoluteWorld) {
            name = 'v_worldPos';
        }
        return `${this.getOutputVarDefine(0)} = ${name};`;
    }
}

