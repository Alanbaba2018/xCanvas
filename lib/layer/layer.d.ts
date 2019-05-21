import Evt from '../core/evt';
import Stage from '../core/stage';
import { GraphType, XY, Vertex } from '../typeof/typeof';
import * as math from '../math/index';
import LayerGroup from './layerGroup';
export default abstract class Layer extends Evt {
    dirtyData: any;
    userCache: boolean;
    readonly id: string;
    readonly options: {
        [k: string]: any;
    };
    highOptions: {
        [k: string]: any;
    };
    type: GraphType;
    protected tolerance: number;
    constructor();
    /**
     * 返回绑定图层的Stage
     */
    getStage(): Stage | undefined;
    /**
     * 返回业务脏数据
     */
    getDirtyData(): any;
    /**
     * 设置图层属性
     * @param options Object
     */
    setOptions(options: {
        [k: string]: any;
    }): void;
    /**
     * 设置图层样式
     * @param options Object
     */
    setStyle(options: {
        [k: string]: any;
    }): void;
    /**
     * 设置
     * @param data any
     */
    setDirtyData(data: any): void;
    /**
     * 高亮图层
     * @param options Object
     */
    highLight(options?: {
        [k: string]: any;
    }): void;
    /**
     * 设置高亮样式
     * @param options 高亮图层style
     */
    setHighlightOptions(options?: {
        [k: string]: any;
    }): void;
    /**
     * 清除高亮
     */
    clearHighLight(): void;
    /**
     * 添加图层到Stage或者Layergroup
     * @param stage Stage
     */
    addTo(stage: Stage | LayerGroup): this;
    /**
     * 添加图层
     * @param stage Stage
     */
    layerAdd(stage: Stage): void;
    /**
     * 将XY对象格式数据转为数组格式
     * @param vertexs Geometry
     */
    clearnData(vertexs: any[]): Vertex[] | Vertex[][];
    /**
     * 转换坐标点数据格式
     * @param vertex 坐标点
     */
    transformVertex(vertex: XY | number[]): number[];
    /**
     * 对象格式转数组格式
     * @param xy XY对象格式坐标点
     */
    transformToArray(xy: XY): number[];
    /**
     * 更新全部图层
     */
    updateAll(): void;
    /**
     * 添加某个图层路径
     */
    addPath(): void;
    /**
     * 删除某个图层
     */
    remove(): void;
    removePath(): void;
    /**
     * 返回图层的Bound
     */
    getBound(): math.Bound;
    /**
     * 返回图层Bound的中心
     */
    getCenter(): Vertex;
    /**
     * 返回图层Bound时候包含待测点
     * @param pos 待测点
     */
    containPoint(pos: Vertex): boolean;
    /**
     * 设置图层渲染器
     * @param stage Stage
     */
    setRender(stage: Stage): void;
    /**
     * 图层是否与Bound相交
     * @param bound Bound
     */
    isIntersectWithBound(bound: math.Bound): boolean;
    isWithinBound(bound: math.Bound): boolean;
    /**
     * 返回图层的类型
     */
    abstract getLayerType(): GraphType;
    /**
     * 返回图层的坐标数据
     */
    abstract getGeometry(): any;
    /**
     * 返回待测点是否在Layer容差范围内
     * @param pos 待测点
     */
    abstract isPointClosest(pos: Vertex, tolerance?: number): boolean;
    /**
     * 克隆layer
     */
    abstract clone(): Layer;
    /**
     * 平移图层
     */
    abstract translate(dx: number, dy: number): void;
}
