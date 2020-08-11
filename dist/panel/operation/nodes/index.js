"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNode = void 0;
const base_1 = require("../base");
const globby_1 = __importDefault(require("globby"));
const fire_path_1 = __importDefault(require("fire-path"));
let nodePaths = globby_1.default.sync([
    fire_path_1.default.join(__dirname, './**').replace(/\\/g, '/'),
    fire_path_1.default.join(__dirname, '!./index.*').replace(/\\/g, '/'),
]);
let nodes = {};
for (let i = 0; i < nodePaths.length; i++) {
    let nodePath = nodePaths[i];
    let nodeName = fire_path_1.default.basenameNoExt(nodePath);
    nodes[nodeName] = require(nodePath).default;
}
function createNode(data) {
    let type = data.typeInfo;
    let name = type.fullName;
    name = name.replace('UnityEditor.ShaderGraph.', '');
    let ctor = nodes[name];
    if (!ctor) {
        console.warn(`Can not find Node with Name [${name}]`);
        ctor = base_1.ShaderNode;
    }
    return ctor && new ctor(data);
}
exports.createNode = createNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtDQUFxQztBQUNyQyxvREFBNEI7QUFDNUIsMERBQTZCO0FBRzdCLElBQUksU0FBUyxHQUFHLGdCQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3hCLG1CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUNoRCxtQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7Q0FDekQsQ0FBQyxDQUFBO0FBQ0YsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkMsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQy9DO0FBRUQsU0FBZ0IsVUFBVSxDQUFFLElBQVM7SUFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUNyRCxJQUFJLEdBQUcsaUJBQVUsQ0FBQTtLQUNwQjtJQUNELE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFYRCxnQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgZ2xvYmJ5IGZyb20gJ2dsb2JieSc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ2ZpcmUtcGF0aCc7XHJcblxyXG5cclxubGV0IG5vZGVQYXRocyA9IGdsb2JieS5zeW5jKFtcclxuICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLyoqJykucmVwbGFjZSgvXFxcXC9nLCAnLycpLCBcclxuICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICchLi9pbmRleC4qJykucmVwbGFjZSgvXFxcXC9nLCAnLycpLCBcclxuXSlcclxubGV0IG5vZGVzID0ge307XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgbm9kZVBhdGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgbm9kZVBhdGggPSBub2RlUGF0aHNbaV07XHJcbiAgICBsZXQgbm9kZU5hbWUgPSBwYXRoLmJhc2VuYW1lTm9FeHQobm9kZVBhdGgpO1xyXG4gICAgbm9kZXNbbm9kZU5hbWVdID0gcmVxdWlyZShub2RlUGF0aCkuZGVmYXVsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUgKGRhdGE6IGFueSkge1xyXG4gICAgbGV0IHR5cGUgPSBkYXRhLnR5cGVJbmZvO1xyXG4gICAgbGV0IG5hbWUgPSB0eXBlLmZ1bGxOYW1lO1xyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgnVW5pdHlFZGl0b3IuU2hhZGVyR3JhcGguJywgJycpO1xyXG5cclxuICAgIGxldCBjdG9yID0gbm9kZXNbbmFtZV07IFxyXG4gICAgaWYgKCFjdG9yKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBDYW4gbm90IGZpbmQgTm9kZSB3aXRoIE5hbWUgWyR7bmFtZX1dYClcclxuICAgICAgICBjdG9yID0gU2hhZGVyTm9kZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN0b3IgJiYgbmV3IGN0b3IoZGF0YSk7XHJcbn1cclxuIl19