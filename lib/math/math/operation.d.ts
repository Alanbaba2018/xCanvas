import { XY } from '../typedef/geometry_type';
export default class Operation {
    static degreeToRadius(angle: number): number;
    static radiusToDegree(rad: number): number;
    static getDotMultiply(v0: XY, v1: XY): number;
    static getCrossMultiply(v0: XY, v1: XY): number;
}
