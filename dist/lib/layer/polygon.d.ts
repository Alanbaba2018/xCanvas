import Polyline from './polyline';
import { GraphType, Vertex } from '../typeof/typeof';
export default class Polygon extends Polyline {
    constructor(geo: Vertex[] | Vertex[][], options?: {
        [k: string]: any;
    });
    getLayerType(): GraphType.POLYGON;
    isPointClosest(p: Vertex, tolerance?: number): boolean;
}
