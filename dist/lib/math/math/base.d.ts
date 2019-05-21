import { XY, Vertex } from '../typedef/geometry_type';
import Vector2 from '../math/vector2';
import Bound from './bound';
export default class Base {
    static isZero(n: number, tolerance?: number): boolean;
    static isSamePoint(pt1: any, pt2: any): boolean;
    static getDistance(p1: Vertex, p2: Vertex): number;
    static getSquareDistance(pt1: Vertex, pt2: Vertex): number;
    static transformPointToArray(pt: any): Vertex;
    static transformPointToXY(pt: any): XY;
    static transformPointsToArray(pts: any): Vertex[];
    static transformPointsToXY(pts: any): XY[];
    /**
     * 返回点集的Bound
     * @param pts 点集
     */
    static getBoundOfPoints(pts: Vertex[]): Bound;
    /**
     * 返回p1到p2的向量
     * @param p1 点p1
     * @param p2 点p2
     */
    static getDirectionVec(p1: Vertex, p2: Vertex): Vector2;
    static isLeftOfLine(pt: Vertex, v1: Vertex, v2: Vertex): boolean;
    /**
     * 判断向量vec1、vec2是否在基准向量base的两侧
     * @param {Vector2} base
     * @param {Vector2} vec1
     * @param {Vector2} vec2
     */
    static isBothSide(base: Vector2, vec1: Vector2, vec2: Vector2): boolean;
}
