import { Vertex } from '../typedef/geometry_type';
export default class Bound {
    /**
     * 判断两个Bound是否相交
     * @param bound1 Bound
     * @param bound2 Bound
     */
    static isOverlaped(bound1: Bound, bound2: Bound): boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: any, y: any, width?: number, height?: number);
    /**
     * clone新的bound
     */
    clone(): Bound;
    /**
     * 返回Bound属性
     */
    getBound(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * 获取Bound的中心点
     */
    getCenter(): Vertex;
    /**
     * 获取Bound的东北角点
     */
    getNorthEast(): Vertex;
    /**
     * 获取Bound的西南角坐标
     */
    getSouthWest(): Vertex;
    /**
     * 返回bound的顶点
     */
    getVetexs(): Vertex[];
    /**
     * 判断与另一个Bound是否相交
     * @param bound Bound
     */
    isOverlaped(bound: Bound): boolean;
    /**
     * 点或者bound是否在Bound内
     * @param a
     */
    contain(a: any): boolean;
    /**
     * 扩展union
     * @param bound Bound
     */
    union(bound: Bound): Bound;
    /**
     * 缩放bound
     * @param dx number
     * @param dy number
     */
    expand(dx: number, dy?: number): Bound;
    /**
     * 判断线段是否与Bound相交
     * @param p1 点p1
     * @param p2 点p2
     */
    isIntersectOfSegment(p1: Vertex, p2: Vertex): boolean;
}
