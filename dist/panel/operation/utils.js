"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrecisionName = exports.getValueConcretePrecision = exports.getValueElementStr = exports.getValueElement = exports.getFloatString = exports.getJsonObject = exports.shaderTemplatesDir = void 0;
const type_1 = require("./type");
const path_1 = __importDefault(require("path"));
exports.shaderTemplatesDir = path_1.default.join(__dirname, '../../../static/shader-templates');
function getJsonObject(str) {
    let content;
    try {
        content = JSON.parse(str);
    }
    catch (err) {
        console.error(err);
    }
    return content;
}
exports.getJsonObject = getJsonObject;
function getFloatString(value) {
    if (typeof value !== 'number') {
        return value;
    }
    let str = value + '';
    if (!str.includes('.')) {
        str += '.';
    }
    return str;
}
exports.getFloatString = getFloatString;
let ValueElements = {
    vector: ['x', 'y', 'z', 'w'],
    color: ['r', 'g', 'b', 'a'],
    mat4: ['e00', 'e01', 'e02', 'e03']
};
function getValueElement(value, index) {
    if (typeof value === 'number') {
        return value;
    }
    let elements;
    if (value.x !== undefined) {
        elements = ValueElements.vector;
    }
    else if (value.r !== undefined) {
        elements = ValueElements.color;
    }
    else if (value.e00 !== undefined) {
        elements = ValueElements.mat4;
    }
    return value[elements[index]] || 0;
}
exports.getValueElement = getValueElement;
function getValueElementStr(value, index) {
    return getFloatString(getValueElement(value, index));
}
exports.getValueElementStr = getValueElementStr;
function getValueConcretePrecision(value) {
    let valueConretePresition = 1;
    if (typeof value === 'object') {
        if (value.w !== undefined || value.a !== undefined) {
            valueConretePresition = 4;
        }
        else if (value.z !== undefined || value.b !== undefined) {
            valueConretePresition = 3;
        }
        else if (value.y !== undefined || value.g !== undefined) {
            valueConretePresition = 2;
        }
        else if (value.m_SerializedTexture !== undefined) {
            valueConretePresition = type_1.TextureConcretePrecision.Texture2D;
        }
        else if (value.m_SerializedCubemap !== undefined) {
            valueConretePresition = type_1.TextureConcretePrecision.TextureCube;
        }
    }
    return valueConretePresition;
}
exports.getValueConcretePrecision = getValueConcretePrecision;
function getPrecisionName(precision) {
    let name = '';
    if (precision === 1) {
        name = 'float';
    }
    else if (precision === 2) {
        name = 'vec2';
    }
    else if (precision === 3) {
        name = 'vec3';
    }
    else if (precision === 4) {
        name = 'vec4';
    }
    else if (precision === type_1.TextureConcretePrecision.Texture2D) {
        name = 'sampler2D';
    }
    else if (precision === type_1.TextureConcretePrecision.TextureCube) {
        name = 'samplerCube';
    }
    return name;
}
exports.getPrecisionName = getPrecisionName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFrRDtBQUNsRCxnREFBd0I7QUFFWCxRQUFBLGtCQUFrQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtDQUFrQyxDQUFDLENBQUE7QUFFMUYsU0FBZ0IsYUFBYSxDQUFFLEdBQVc7SUFDdEMsSUFBSSxPQUFPLENBQUM7SUFDWixJQUFJO1FBQ0EsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0I7SUFDRCxPQUFPLEdBQUcsRUFBRTtRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEI7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBVEQsc0NBU0M7QUFFRCxTQUFnQixjQUFjLENBQUUsS0FBYTtJQUN6QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDcEIsR0FBRyxJQUFJLEdBQUcsQ0FBQztLQUNkO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBVkQsd0NBVUM7QUFFRCxJQUFJLGFBQWEsR0FBRztJQUNoQixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzNCLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztDQUNyQyxDQUFBO0FBRUQsU0FBZ0IsZUFBZSxDQUFFLEtBQW1CLEVBQUUsS0FBYTtJQUMvRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELElBQUksUUFBUSxDQUFDO0lBRWIsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN2QixRQUFRLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztLQUNuQztTQUNJLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDNUIsUUFBUSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7S0FDbEM7U0FDSSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQzlCLFFBQVEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO0tBQ2pDO0lBRUQsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFsQkQsMENBa0JDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUMsS0FBc0IsRUFBRSxLQUFhO0lBQ3BFLE9BQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRkQsZ0RBRUM7QUFFRCxTQUFnQix5QkFBeUIsQ0FBRSxLQUFLO0lBQzVDLElBQUkscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDaEQscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO2FBQ0ksSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNyRCxxQkFBcUIsR0FBRyxDQUFDLENBQUM7U0FDN0I7YUFDSSxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3JELHFCQUFxQixHQUFHLENBQUMsQ0FBQztTQUM3QjthQUNJLElBQUksS0FBSyxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtZQUM5QyxxQkFBcUIsR0FBRywrQkFBd0IsQ0FBQyxTQUFTLENBQUM7U0FDOUQ7YUFDSSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7WUFDOUMscUJBQXFCLEdBQUcsK0JBQXdCLENBQUMsV0FBVyxDQUFDO1NBQ2hFO0tBQ0o7SUFDRCxPQUFPLHFCQUFxQixDQUFDO0FBQ2pDLENBQUM7QUFwQkQsOERBb0JDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUUsU0FBaUI7SUFDL0MsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLElBQUksR0FBRyxPQUFPLENBQUM7S0FDbEI7U0FDSSxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsSUFBSSxHQUFHLE1BQU0sQ0FBQztLQUNqQjtTQUNJLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtRQUN0QixJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQ2pCO1NBQ0ksSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLElBQUksR0FBRyxNQUFNLENBQUM7S0FDakI7U0FDSSxJQUFJLFNBQVMsS0FBSywrQkFBd0IsQ0FBQyxTQUFTLEVBQUU7UUFDdkQsSUFBSSxHQUFHLFdBQVcsQ0FBQztLQUN0QjtTQUNJLElBQUksU0FBUyxLQUFLLCtCQUF3QixDQUFDLFdBQVcsRUFBRTtRQUN6RCxJQUFJLEdBQUcsYUFBYSxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXJCRCw0Q0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24gfSBmcm9tIFwiLi90eXBlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNoYWRlclRlbXBsYXRlc0RpciA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9zdGF0aWMvc2hhZGVyLXRlbXBsYXRlcycpXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SnNvbk9iamVjdCAoc3RyOiBzdHJpbmcpIHtcclxuICAgIGxldCBjb250ZW50O1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb250ZW50ID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmxvYXRTdHJpbmcgKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdHIgPSB2YWx1ZSArICcnO1xyXG4gICAgaWYgKCFzdHIuaW5jbHVkZXMoJy4nKSkge1xyXG4gICAgICAgIHN0ciArPSAnLic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG59XHJcblxyXG5sZXQgVmFsdWVFbGVtZW50cyA9IHtcclxuICAgIHZlY3RvcjogWyd4JywgJ3knLCAneicsICd3J10sXHJcbiAgICBjb2xvcjogWydyJywgJ2cnLCAnYicsICdhJ10sXHJcbiAgICBtYXQ0OiBbJ2UwMCcsICdlMDEnLCAnZTAyJywgJ2UwMyddXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZUVsZW1lbnQgKHZhbHVlOiBhbnkgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGVsZW1lbnRzO1xyXG5cclxuICAgIGlmICh2YWx1ZS54ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBlbGVtZW50cyA9IFZhbHVlRWxlbWVudHMudmVjdG9yO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodmFsdWUuciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZWxlbWVudHMgPSBWYWx1ZUVsZW1lbnRzLmNvbG9yO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodmFsdWUuZTAwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBlbGVtZW50cyA9IFZhbHVlRWxlbWVudHMubWF0NDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWVbZWxlbWVudHNbaW5kZXhdXSB8fCAwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVFbGVtZW50U3RyKHZhbHVlOiBvYmplY3QgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldEZsb2F0U3RyaW5nKGdldFZhbHVlRWxlbWVudCh2YWx1ZSwgaW5kZXgpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlQ29uY3JldGVQcmVjaXNpb24gKHZhbHVlKSB7XHJcbiAgICBsZXQgdmFsdWVDb25yZXRlUHJlc2l0aW9uID0gMTtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlLncgIT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5hICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWVDb25yZXRlUHJlc2l0aW9uID0gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUueiAhPT0gdW5kZWZpbmVkIHx8IHZhbHVlLmIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YWx1ZUNvbnJldGVQcmVzaXRpb24gPSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS55ICE9PSB1bmRlZmluZWQgfHwgdmFsdWUuZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbHVlQ29ucmV0ZVByZXNpdGlvbiA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLm1fU2VyaWFsaXplZFRleHR1cmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YWx1ZUNvbnJldGVQcmVzaXRpb24gPSBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24uVGV4dHVyZTJEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS5tX1NlcmlhbGl6ZWRDdWJlbWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWVDb25yZXRlUHJlc2l0aW9uID0gVGV4dHVyZUNvbmNyZXRlUHJlY2lzaW9uLlRleHR1cmVDdWJlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZUNvbnJldGVQcmVzaXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmVjaXNpb25OYW1lIChwcmVjaXNpb246IG51bWJlcikge1xyXG4gICAgbGV0IG5hbWUgPSAnJztcclxuICAgIGlmIChwcmVjaXNpb24gPT09IDEpIHtcclxuICAgICAgICBuYW1lID0gJ2Zsb2F0JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gMikge1xyXG4gICAgICAgIG5hbWUgPSAndmVjMic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwcmVjaXNpb24gPT09IDMpIHtcclxuICAgICAgICBuYW1lID0gJ3ZlYzMnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJlY2lzaW9uID09PSA0KSB7XHJcbiAgICAgICAgbmFtZSA9ICd2ZWM0JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gVGV4dHVyZUNvbmNyZXRlUHJlY2lzaW9uLlRleHR1cmUyRCkge1xyXG4gICAgICAgIG5hbWUgPSAnc2FtcGxlcjJEJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gVGV4dHVyZUNvbmNyZXRlUHJlY2lzaW9uLlRleHR1cmVDdWJlKSB7XHJcbiAgICAgICAgbmFtZSA9ICdzYW1wbGVyQ3ViZSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmFtZTtcclxufVxyXG4iXX0=