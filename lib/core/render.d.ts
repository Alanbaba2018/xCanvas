import CanvasHelper from './canvas';
import { Vertex } from '../typeof/typeof';
import Stage from './stage';
import Layer from '../layer/layer';
import LayerGroup from '../layer/layerGroup';
import * as math from '../math/index';
export default class Render {
    private renderAll;
    private peddingLayers;
    private stage;
    private canvasHelper;
    private cacheHelper;
    private isBatching;
    constructor(w: number, h: number, stage: Stage);
    /**
     * 更新画布长宽
     * @param w 画布宽度
     * @param h 画布高度
     */
    resize(w: number, h: number): void;
    /**
     * 获得画布中心的世界坐标
     */
    getCenter(): Vertex;
    /**
     * 返回鼠标位置的世界坐标
     * @param pos 屏幕像素坐标
     */
    getPos(pos: Vertex): Vertex;
    /**
     * 返回canvas dom实例
     */
    getCanvasDom(): HTMLCanvasElement;
    /**
     * 返回缓存canvas dom实例
     */
    getCacheCanvasDom(): HTMLCanvasElement;
    /**
     * 返回canvas实例类
     */
    getCanvasHelper(): CanvasHelper;
    /**
     * 返回cacheCanvas实例类
     */
    getCacheHelper(): CanvasHelper;
    /**
     * 返回当前视口画布的Bound坐标
     */
    getBound(): math.Bound;
    /**
     * 设置批处理状态，减少重绘次数
     * @param status Boolean
     */
    setBatch(status: boolean): void;
    /**
     * 返回加载所有图层的画布canvas
     * @param options 渲染参数
     */
    cloneCanvas(options?: {
        [k: string]: any;
    }): Promise<HTMLCanvasElement>;
    /**
     * 绘制图层路径
     * @param layer Layer
     */
    drawPath(layer: Layer, canvasHelper?: CanvasHelper): void;
    /**
     * 用于绘制图层组
     * @param layer Group图层
     */
    drawGroup(layer: LayerGroup, canvasHelper: CanvasHelper): void;
    /**
     * 在缓存canvas画布上渲染高亮图层
     */
    renderCacheCanvas(): void;
    /**
     * 添加图层路径
     * @param layer Layer
     */
    addDraw(layer: Layer): void;
    /**
     * 画布重绘
     */
    redraw(): void;
    /**
     * 设置画布缩放参数
     * @param scale 画布缩放参数
     */
    setZoom(scale: number): void;
    /**
     * 设置画布中心和缩放
     * @param center 画布中心(世界坐标)
     * @param zoom 缩放参数
     */
    setCenter(center: Vertex, zoom: number): void;
    updateCacheCanvas(): void;
    /**
     * 清除指定Bound的画布区域
     * @param bound math.Bound
     */
    clearBoundPath(bound: math.Bound): void;
    /**
     * 删除待加载的图层
     * @param layer Layer
     */
    deletePeddingLayer(layer: Layer): void;
    /**
     * 添加待加载的图层
     * @param id String
     */
    setPeddingLayer(id: string): void;
    /**
     * 设置是否渲染全部图层
     * @param bool boolean
     */
    protected _setRederAll(bool: boolean): void;
}
