import Vector2 from '../math/vector2';
import Bound from '../math/bound';
import { XY, Vertex } from '../typedef/geometry_type';
export default class Line {
    /**
     * 求点到直线的垂足
     * @param pt 目标点
     * @param v0 直线起点
     * @param v1 直线终点
     */
    static getPedalPointOfLine(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex): Vector2;
    /**
     * 返回到线段上最近的点
     * @param p 待测点
     * @param v0 线段起点
     * @param v1 线段终点
     */
    static getNearestPointToSegment(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex): Vertex;
    /**
     * 求点到直线的距离
     * @param pt 目标点
     * @param v0 直线起点
     * @param v1 直线终点
     */
    static getDistanceToLine(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex): number;
    /**
     * 判断点在直线上
     * @param {XY | Vertex} p
     * @param {XY | Vertex} v0
     * @param {XY | Vertex} v1
     * @param {number} tolerance
     */
    static isPointAtLine(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex, tolerance?: number): boolean;
    /**
     * 判断点是否在线段上
     * @param p 待测点
     * @param v0 线段起点
     * @param v1 线段终点
     * @param tolerance 容差
     */
    static isPointAtSegment(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex, tolerance?: number): boolean;
    /**
     * 判断两条直线是否平行(包含共线)
     * @param {XY | Vertex} p0
     * @param {XY | Vertex} p1
     * @param {XY | Vertex} v0
     * @param {XY | Vertex} v1
     */
    static isParalled(p0: XY | Vertex, p1: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex, tolerance?: number): boolean;
    /**
     * 判断两条直线是否共线
     * @param {XY | Vertex} p0
     * @param {XY | Vertex} p1
     * @param {XY | Vertex} v0
     * @param {XY | Vertex} v1
     */
    static isCollinear(p0: XY | Vertex, p1: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex, tolerance?: number): boolean;
    /**
     * 判断两条直线是否相交 Reference
     * @param {XY | Vertex} p0
     * @param {XY | Vertex} p1
     * @param {XY | Vertex} v0
     * @param {XY | Vertex} v1
     */
    static isIntersect(p0: XY | Vertex, p1: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex, tolerance?: number): boolean;
    /**
     * 计算两直线的交点 Reference https://blog.csdn.net/yan456jie/article/details/52469130
     * @param {XY | Vertex} p0
     * @param {XY | Vertex} p1
     * @param {XY | Vertex} v0
     * @param {XY | Vertex} v1
     */
    static getIntersectPt(p0: XY | Vertex, p1: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex): Vector2 | undefined;
    /**
     * 判断两条线段是否相交
     * @param {XY | Vertex} p0
     * @param {XY | Vertex} p1
     * @param {XY | Vertex} v0
     * @param {XY | Vertex} v1
     */
    static isIntersectOfSegment(p0: XY | Vertex, p1: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex, tolerance?: number): boolean;
    v0: Vector2;
    v1: Vector2;
    constructor(v0: XY | Vertex, v1: XY | Vertex);
    /**
     * 获得直线的方向向量
     */
    getDirVector(): Vector2;
    /**
     * 获得直线方向向量的单位向量
     */
    getDirection(): Vector2;
    /**
     * 获得直线的长度
     */
    getLineLength(): number;
    /**
     * 返回线段的Bound
     */
    getBound(): Bound;
    /**
     * 判断点在直线上
     * @param {XY} pt
     * @param {number} tolerance
     */
    isPointAtLine(pt: XY | Vertex, tolerance?: number): boolean;
    /**
     * 判断两条直线是否平行(包含共线)
     * @param {Line} line
     */
    isParalled(line: Line, tolerance?: number): boolean;
    /**
     * 判断两条直线是否共线
     * @param {Line} line
     */
    isCollinear(line: Line, tolerance?: number): boolean;
    /**
     * 判断两条直线是否相交
     * @param {Line} line
     */
    isIntersect(line: Line, tolerance?: number): boolean;
    /**
     * 计算两直线的交点 Reference https://blog.csdn.net/yan456jie/article/details/52469130
     * @param {Line} line
     */
    getIntersectPt(line: Line): Vector2 | undefined;
    /**
     * 判断两条线段是否相交
     * @param {Line} line
     */
    isIntersectOfSegment(line: Line): boolean;
    /**
     * 线段是否与Bound相交
     * @param p0 端点1
     * @param p1 端点2
     */
    isIntersectOfBound(bound: Bound): boolean;
}
