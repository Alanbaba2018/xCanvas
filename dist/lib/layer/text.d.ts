import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import * as math from '../math/index';
export default class IText extends Layer {
    text: string;
    content: Array<{
        text: string;
        width: number;
    }>;
    protected geometry: Vertex;
    constructor(geo: Vertex, text: string, options?: {
        [k: string]: any;
    });
    getLayerType(): GraphType;
    getGeometry(): Vertex;
    /**
     * 返回文字的Bound
     */
    getBound(): math.Bound;
    /**
     * 返回文字的轮廓线
     */
    computeOutline(): Vertex[];
    /**
     * 设置文字内容
     * @param text string
     */
    setText(text: string): void;
    translate(dx: number, dy: number): void;
    isPointClosest(pos: Vertex): boolean;
    /**
     * 对文字进行重新编排
     */
    fixContent(): void;
    /**
     * 返回字体大小
     */
    getFontSize(): number;
    isIntersectWithBound(bound: math.Bound): boolean;
    clone(): IText;
}
