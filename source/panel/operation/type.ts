
export enum ConcretePrecisionType {
    Min,
    Max,
    Fixed,
    Texture,
}

export enum TextureConcretePrecision {
    Texture2D = 100,
    TextureCube = 101
}; 


export enum PositionSpace {
    Object = 0,
    View,
    World,
    Tangent,
    AbsoluteWorld
}

export enum NormalSpace {
    Object = 100,
    View,
    World,
    Tangent,
}

export enum ViewDirectionSpace {
    Object = 200,
    View,
    World,
    Tangent,
}

export const NormalMapSpace = 300;
