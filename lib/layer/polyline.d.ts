import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import { Bound } from '../math/index';
export default class Polyline extends Layer {
    protected geometry: Vertex[] | Vertex[][];
    constructor(geo: Vertex[] | Vertex[][], options?: {
        [k: string]: any;
    });
    clone(): Polyline;
    getLayerType(): GraphType;
    getGeometry(): Vertex[] | Vertex[][];
    setGeometry(geo: Vertex[] | Vertex[][]): void;
    addVertex(vertex: Vertex): void;
    translate(dx: number, dy: number): void;
    isMutiLine(): boolean;
    setLastVertex(vertex: Vertex): void;
    getMinDistance(p: Vertex): number;
    getNearestPoint(p: Vertex): Vertex;
    isPointClosest(p: Vertex, tolerance?: number): boolean;
    isIntersectWithBound(bound: Bound): boolean;
}
