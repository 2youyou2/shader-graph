import { ShaderNode } from "../../../base";
import { ConcretePrecisionType, ViewDirectionSpace, PositionSpace } from "../../../type";

export default class ViewDirectionNode extends ShaderNode {
    concretePrecisionType = ConcretePrecisionType.Fixed;

    depVarings: number[] = [PositionSpace.World]

    constructor (data) {
        super(data);

        if (this.data.m_Space === ViewDirectionSpace.Object - ViewDirectionSpace.Object) {
            this.depVarings.push(ViewDirectionSpace.Object);
        }
        else if (this.data.m_Space === ViewDirectionSpace.View - ViewDirectionSpace.Object) {
            this.depVarings.push(ViewDirectionSpace.View);
        }
        else if (this.data.m_Space === ViewDirectionSpace.Tangent - ViewDirectionSpace.Object) {
            console.error('Not support Tangent Normal');
            this.depVarings.push(ViewDirectionSpace.Tangent);
        }
    }

    calcConcretePrecision () {
        this.slots.forEach(slot => {
            slot._concretePrecision = 3;
        })
    }

    generateCode () {
        let name = 'view';
        if (this.data.m_Space === ViewDirectionSpace.Object) {
            name = 'view';
        }
        else if (this.data.m_Space === ViewDirectionSpace.View) {
            name = 'viewView';
        }
        else if (this.data.m_Space === ViewDirectionSpace.Tangent) {
            // name = 'tangentView';
            name = 'worldView';
        }
        else if (this.data.m_Space === ViewDirectionSpace.World) {
            name = 'worldView';
        }
        return `${this.getOutputVarDefine(0)} = ${name};`;
    }
}

