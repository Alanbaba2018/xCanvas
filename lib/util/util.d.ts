import { XY } from '../typeof/typeof';
export default class Util {
    static createID(): string;
    static transformToXY(coord: number[]): XY;
    static transformToArray(xy: XY): number[];
    static transformToXYPath(path: number[][]): XY[];
    static transformToArrayPath(path: XY[]): number[][];
    static loadImageByBlob(url: string): Promise<any>;
    static downLoadByBase64String(base64: string, fileName?: string): void;
    static dimension_Array(arr: any[]): number;
}
