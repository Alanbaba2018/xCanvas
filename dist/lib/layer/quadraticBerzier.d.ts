import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import * as math from '../math/index';
export default class QuadraticBerzier extends Layer {
    private p0;
    private p1;
    private cp;
    constructor(start: Vertex, cp: Vertex, end: Vertex, options?: {
        [k: string]: any;
    });
    getLayerType(): GraphType;
    clone(): QuadraticBerzier;
    /**
     * 几何方程计算太难，用高次拟合法来暴力求解
     */
    isPointClosest(p: Vertex, tolerance?: number): boolean;
    getGeometry(): Vertex[];
    setGeometry(start: Vertex, cp: Vertex, end: Vertex): void;
    translate(dx: number, dy: number): void;
    getBound(): math.Bound;
    private getFactors;
}
