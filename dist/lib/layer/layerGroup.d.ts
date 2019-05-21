import Stage from '../core/stage';
import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import * as math from '../math/index';
export default class LayerGroup extends Layer {
    private layers;
    constructor(layers: Layer[], options?: {
        [k: string]: any;
    });
    getLayerType(): GraphType.GROUP;
    getGeometry(): math.Bound | undefined;
    /**
     * 返回所有子图层
     */
    getLayers(): Layer[];
    /**
     * 根据条件返回子图层
     * @param filter 筛选函数
     */
    getLayer(filter: any): Layer | undefined;
    /**
     * 遍历图层
     * @param callback callback
     */
    eachLayer(callback?: any): void;
    /**
     * 设置子图层的渲染器
     * @param stage Stage
     */
    setSubRender(stage: Stage): void;
    addLayer(layer: Layer): void;
    /**
     * 删除图层
     * @param layer Layer
     */
    removeLayer(layer: Layer): void;
    translate(dx: number, dy: number): void;
    isPointClosest(pos: Vertex, tolerance?: number): boolean;
    isIntersectWithBound(bound: math.Bound): boolean;
    /**
     * 高亮图层
     * @param options Object
     */
    highLight(): void;
    clone(): LayerGroup;
}
