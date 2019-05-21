import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import * as math from '../math/index';
export default class Rectangle extends Layer {
    width: number;
    height: number;
    southWest: Vertex;
    constructor(a?: any, b?: any, c?: any, d?: any);
    getGeometry(): math.Bound;
    getLayerType(): GraphType.RECTANGLE;
    /**
     * 返回左上角坐标
     */
    getNorthWest(): Vertex;
    /**
     * 返回左下角坐标
     */
    getSouthWest(): Vertex;
    translate(dx: number, dy: number): void;
    /**
     * 设置矩形的Bound
     * @param bound Bound
     */
    setBound(bound: math.Bound): void;
    /**
     * 设置对角坐标
     * @param corner1 对角坐标1
     * @param corner2 对角坐标2
     */
    setCorner(corner1: Vertex, corner2: Vertex): void;
    isPointClosest(p: Vertex): boolean;
    getNearestPoint(p: Vertex): Vertex;
    /**
     * 图层是否与Bound相交
     * @param bound Bound
     */
    isIntersectWithBound(bound: math.Bound): boolean;
    clone(): Rectangle;
}
