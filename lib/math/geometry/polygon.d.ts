import Polyline from './polyline';
import { XY, Vertex } from '../typedef/geometry_type';
export default class Polygon extends Polyline {
    constructor(coordinates: Vertex[] | Vertex[][]);
    /**
     * isPointAtPolygon
      p: Vertex,
      coords: Vertex[]
    */
    isPointAtPolygon(p: Vertex, coords: Vertex[]): boolean;
    contain(pt: XY | Vertex, tolerance?: number): boolean;
    private _cleanData;
    private _isWithInTrapezoid;
}
