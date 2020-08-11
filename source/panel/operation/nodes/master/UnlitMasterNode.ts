import fs from 'fs';
import path from 'path';
import MasterNode from "./MasterNode";
import { shaderTemplatesDir } from '../../utils';

export default class UnlitMasterNode extends MasterNode {
    vsSlotIndices = ['Vertex Position', 'Vertex Normal', 'Vertex Tangent'];
    fsSlotIndices = ['Color', 'Alpha', 'AlphaClipThreshold'];

    templatePath = path.join(shaderTemplatesDir, 'master/UnlitMasterNode.effect')
}
