import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import * as math from '../math/index';
export default class Circle extends Layer {
    protected geometry: Vertex;
    protected radius: number;
    constructor(geo: Vertex, radius: number, options: {
        [k: string]: any;
    });
    getLayerType(): GraphType;
    getGeometry(): Vertex;
    getCenter(): Vertex;
    getRadius(): number;
    getBound(): math.Bound;
    setGeometry(geo: number[]): void;
    setRadius(radius: number): void;
    contain(p: Vertex): boolean;
    translate(dx: number, dy: number): void;
    isPointClosest(pt: Vertex, tolerance?: number): boolean;
    getNearestPoint(p: Vertex): Vertex;
    isIntersectWithBound(bound: math.Bound): boolean;
    clone(): Circle;
}
