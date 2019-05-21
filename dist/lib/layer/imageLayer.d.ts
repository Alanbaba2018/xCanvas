import Layer from './layer';
import { GraphType } from '../typeof/typeof';
import * as math from '../math/index';
import { Vertex } from '../math/typedef/geometry_type';
export default class ImageLayer extends Layer {
    url: string;
    accesible: boolean;
    x: number;
    y: number;
    private width;
    private height;
    constructor(url: string, x: number, y: number, width?: number, height?: number, options?: {
        [k: string]: string;
    });
    getLayerType(): GraphType;
    getGeometry(): math.Bound;
    setImage(url: string, width?: number, height?: number): void;
    loadImageData(): Promise<any>;
    translate(dx: number, dy: number): void;
    isPointClosest(p: Vertex): boolean;
    isWithinBound(bound: math.Bound): boolean;
    isIntersectWithBound(bound: math.Bound): boolean;
    clone(): ImageLayer;
    private _setImage;
}
