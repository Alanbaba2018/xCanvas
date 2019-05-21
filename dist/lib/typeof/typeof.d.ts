export interface XY {
    x: number;
    y: number;
}
export interface Vertex {
    [k: number]: number;
}
export interface EventData {
    target: any;
    sourceTarget: any;
    [k: string]: any;
}
export declare enum GraphType {
    POINT = "POINT",
    POLYLINE = "POLYLINE",
    POLYGON = "POLYGON",
    CIRCLE = "CIRCLE",
    RECTANGLE = "RECTANGLE",
    IMAGE = "IMAGE",
    GROUP = "GROUP",
    TEXT = "TEXT"
}
export declare enum TextAlign {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}
export declare enum BaseLine {
    TOP = "top",
    MIDDLE = "middle",
    BOTTOM = "bottom"
}
