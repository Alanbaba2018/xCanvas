import Evt from './evt';
import Render from './render';
import { Vertex } from '../typeof/typeof';
import Layer from '../layer/layer';
import * as math from '../math/index';
interface Options {
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    zoomChange?: number;
}
export default class Stage extends Evt {
    options: {
        [k: string]: any;
    };
    readonly container: HTMLDivElement;
    readonly render: Render;
    private draggEnable;
    private center;
    private zoom;
    private minZoom;
    private maxZoom;
    private zoomChange;
    private amination;
    private readonly layers;
    private readonly highLightLayers;
    constructor(id: string, options?: Options);
    /**
     * 返回所有图层
     */
    getLayers(filter?: any): Layer[];
    /**
     * 返回满足条件的第一个图层
     * @param filter 过滤函数
     */
    getLayer(filter: any): Layer | undefined;
    /**
     * 返回所有高亮的图层
     */
    getHighLightLayers(): Layer[];
    /**
     * 返回当前缩放级别
     */
    getZoom(): number;
    /**
     * 返回画布中心点的世界坐标
     */
    getCenter(): Vertex;
    /**
     * 返回最小缩放级别
     */
    getMinzoom(): number;
    /**
     * 返回最大缩放级别
     */
    getMaxZoom(): number;
    /**
     * 返回当前视口的Bound
     */
    getBound(): math.Bound;
    /**
     * 将世界坐标转换成屏幕坐标
     * @param pt 世界坐标
     */
    transferWorldCoordinateToScreen(pt: Vertex): Vertex;
    /**
     * 返回包含所有图层的画布图片
     * @param options 渲染参数
     */
    getAllLayerImage(options?: {
        [k: string]: any;
    }): Promise<string>;
    /**
     * 返回当前视口的画布图片
     */
    getViewImage(): string;
    /**
     * 根据坐标点返回选中的图层
     * @param pos Vertex
     */
    getLayersByPosition(pos: Vertex): Layer[];
    /**
     * 根据坐标点返回选中的图层
     * @param pos Vertex
     */
    getLayerByPosition(pos: Vertex, tolerance?: number): Layer | undefined;
    /**
     * 查找与矩形相交的图层
     * @param bound Bound
     * @param intersect 图层与bound相交或者包含在bound
     */
    getLayersByBound(bound: math.Bound, intersect?: boolean): Layer[];
    /**
     * 返回屏幕像素距离
     * @param dis number
     */
    getScreenDistance(dis: number): number;
    /**
     * 添加图层
     * @param layer Layer
     */
    addLayer(layer: Layer): this;
    /**
     * 是否包含某个图层
     * @param layer Layer
     */
    hasLayer(layer: Layer): boolean;
    /**
     * 删除某个图层
     * @param layer Layer
     */
    removeLayer(layer: Layer): this | undefined;
    /**
     * 删除某些图层
     * @param layers 图层组
     */
    removeLayers(layers: Layer[]): void;
    /**
     * 清空图层
     */
    clearAllLayers(): void;
    /**
     * 清除高亮图层
     */
    clearHighLightLayer(layer?: Layer): void;
    /**
     * 添加高亮图层
     */
    addHighLightLayer(layer: Layer): void;
    /**
     * 高亮图层
     */
    hilightLayers(): void;
    /**
     * 遍历图层
     * @param callback 回调函数
     */
    eachLayer(callback: any): void;
    /**
     * 清空事件监听
     */
    clearAllEvents(): void;
    /**
     * 缩放
     * @param zoom 缩放级别
     */
    setZoom(zoom: number): void;
    /**
     * 放大
     */
    zoomIn(): void;
    /**
     * 缩小
     */
    zoomOut(): void;
    /**
     * 添加图片缓存
     * @param images
     */
    addImagesCache(images: string[]): void;
    /**
     * 定位
     * @param center 定位点
     * @param zoom 缩放级别
     */
    setView(center: Vertex, zoom?: number): void;
    /**
     * 缩放视图窗口至目标Bound
     * @param bound 缩放的Bound
     */
    fitBound(bound: math.Bound): void;
    /**
     * 强制重新渲染
     */
    forceRender(center?: Vertex): void;
    /**
     * 开启pan功能
     */
    enableDrag(): void;
    /**
     * 关闭pan功能
     */
    disableDrag(): void;
    /**
     * 更新画布尺寸
     */
    updateSize(): void;
    /**
     * 开启批处理
     */
    startBatch(): void;
    /**
     * 关闭批处理
     */
    endBatch(): void;
    /**
     * 移动画布到新的位置
     * @param targetCenter 新的中心点
     * @param targetZoom 新的缩放等级
     */
    private _render;
    /**
     * 开启动画移动
     * @param stepX x步距
     * @param stepY y步距
     * @param zoomChange zoom步距
     * @param filter 停止动画函数
     */
    private _amination;
    /**
     * 设置stage初始化参数
     * @param options options参数
     */
    protected _setOptions(options?: Options): void;
    /**
     * 格式化缩放级别参数
     * @param zoom 缩放级别
     */
    private _getValidateZoom;
    /**
     * 监听页面尺寸变化
     */
    private _resize;
    /**
     * 初始化canvas dom元素
     */
    private _initContainer;
    /**
     * 初始化画布事件监听
     */
    private _initEvents;
    /**
     * 画布缩放事件
     */
    private _zoom;
    /**
     * 画布平移事件
     */
    private _pan;
    /**
     * 监听画布的事件
     * @param type 事件类型
     * @param fn 响应函数
     */
    private _listenerEvent;
    /**
     * 分发监听事件
     */
    private _eventHandler;
    /**
     * 响应监听事件
     * @param evt 事件类型
     * @param data 回调参数
     */
    private _fireEvent;
    /**
     * 查找事件监听目标
     * @param evt 事件类型
     * @param pos 鼠标事件的坐标
     */
    private _findEventTargets;
    /**
     * 处理浏览器之间事件的兼容性
     * @param evt 事件类型
     */
    private _formatDOMEvent;
    /**
     * 格式化事件类型
     * @param evt 事件类型
     */
    private _validEventType;
}
export {};
