import { Vertex } from '../../typeof/typeof';
export default class Vector2 {
    static lerp(vec1: Vector2, vec2: Vector2, lerp: number): Vector2;
    x: number;
    y: number;
    constructor(a: any, b?: number);
    add(vector2: Vector2): Vector2;
    substract(vector2: Vector2): Vector2;
    normalize(): Vector2;
    clone(): Vector2;
    rotate(angle: number): Vector2;
    scale(scale_x: number, scale_y?: number): Vector2;
    getSquareLength(): number;
    getModelLength(): number;
    toArray(): Vertex;
}
