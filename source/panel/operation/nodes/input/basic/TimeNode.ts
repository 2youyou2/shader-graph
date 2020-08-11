import InputNode from "../InputNode";

export default class TimeNode extends InputNode {
    generateCode () {
        let Time = this.getOutputSlotWithSlotName('Time');
        let SineTime = this.getOutputSlotWithSlotName('Sine Time');
        let CosineTime = this.getOutputSlotWithSlotName('Cosine Time');
        let DeltaTime = this.getOutputSlotWithSlotName('Delta Time');
        let SmoothDelta = this.getOutputSlotWithSlotName('Smooth Delta');

        let code = ''
        if (Time?.connectSlot) {
            code += `float ${Time.varName} = cc_time.x;`
        }
        if (SineTime?.connectSlot) {
            code += `float ${SineTime.varName} = sin(cc_time.x);`
        }
        if (CosineTime?.connectSlot) {
            code += `float ${CosineTime.varName} = cos(cc_time.x);`
        }
        if (DeltaTime?.connectSlot) {
            code += `float ${DeltaTime.varName} = cc_time.y;`
        }
        if (SmoothDelta?.connectSlot) {
            console.warn('Not support smooth delta time');
            code += `float ${SmoothDelta.varName} = cc_time.y;`
        }

        return code;
    }
}

