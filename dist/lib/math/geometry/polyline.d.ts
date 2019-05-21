import { XY, Vertex } from '../typedef/geometry_type';
import Bound from '../math/bound';
export default class Polyline {
    readonly coordinates: Vertex[] | Vertex[][];
    constructor(coordinates: Vertex[] | Vertex[][]);
    getBound(): Bound;
    getNearestPoint(p: XY | Vertex): Vertex;
    protected transformToArray(coordinates: Array<XY | Vertex>): Vertex[];
}
