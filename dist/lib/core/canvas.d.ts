import { Vertex } from '../typeof/typeof';
import Circle from '../layer/circle';
import * as math from '../math/index';
import ImageLayer from '../layer/imageLayer';
import Polyline from '../layer/polyline';
import IText from '../layer/text';
import Render from './render';
import Rectangle from '../layer/rectangle';
export default class CanvasHelper {
    retina: number;
    isCache: boolean;
    private readonly canvas;
    private readonly context;
    private w;
    private h;
    private scale;
    private center;
    private bgColor;
    private cache;
    private aliaveCache;
    private readonly render;
    constructor(w: number, h: number, render: Render, scale?: number);
    /**
     * 返回canvas节点
     */
    getCanvasDom(): HTMLCanvasElement;
    /**
     * 返回缩放级别
     */
    getScale(): number;
    /**
     * 返回画布以右上角为基准点的原点屏幕坐标
     */
    getOriginCenter(): Vertex;
    /**
     * 返回画布可视区域的世界坐标Bound
     */
    getViewBound(): math.Bound;
    /**
     * 返回画布各项参数,用于clone
     */
    getDrawStatus(): boolean;
    /**
     * 转换本地坐标为世界坐标(前端显示的坐标)
     * @param evt 以原点为基准点的屏幕坐标
     */
    localToWorldCoordinate(evt: Vertex): Vertex;
    /**
     * 转换世界坐标为以原点为基准点的本地坐标(canvas绘制时的坐标)
     * @param pt 世界坐标
     */
    worldCoordinateToLocal(pt: Vertex): Vertex;
    /**
     * 转换世界坐标为以右上角为基准点的屏幕坐标
     * @param pt 世界坐标
     */
    worldCoordinateToScreen(pt: Vertex): Vertex;
    /**
     * 转换以右上角为基准点的屏幕坐标为世界坐标
     * @param pt 屏幕像素坐标
     */
    screenToWorldCoordinate(pt: Vertex): Vertex;
    /**
     * 计算当前鼠标位置与原点的坐标偏移
     * @param e 事件参数
     */
    getOffset(e: any): number[];
    /**
     * 计算屏幕像素坐标距屏幕中心点的偏移量
     * @param pt 屏幕像素坐标
     */
    getOffsetToScreenCenter(pt: Vertex): Vertex;
    /**
     * 获得屏幕中心世界坐标
     */
    getCenterPoint(): Vertex;
    /**
     * 返回文字的宽度
     * @param layer IText
     */
    measureTextWidth(layer: IText): number;
    /**
     * 返回缓存中的图片
     */
    getCache(): Map<string, HTMLImageElement>;
    /**
     * 将世界坐标距离转换为屏幕像素坐标
     * @param dis number
     */
    transformScreenDistance(dis: number): number;
    /**
     * 设置缓存图片
     * @param cache 图片缓存
     */
    setCache(cache: Map<string, HTMLImageElement>): void;
    /**
     * 设置分辨率
     * @param retina 分辨率
     */
    setRetina(retina: number): void;
    /**
     * 设置画布的背景色
     * @param color 背景颜色代码
     */
    setBackground(color?: string): void;
    /**
     * 设置画布缩放参数
     * @param scale 缩放级别
     */
    setScale(scale: number): void;
    /**
     * 设置画布中心点坐标
     * @param center 画布中心点
     */
    setCenter(center: Vertex): void;
    /**
     * 更新画布的bound
     * @param w 画布宽度（css宽度）
     * @param h 画布高度（css高度
     */
    updateSize(w: number, h: number): void;
    /**
     * 清空所有画布
     */
    clear(): void;
    /**
     * 清空bound区域画布
     * @param bound math.Bound
     */
    clearPart(bound: math.Bound): void;
    /**
     * 开始绘制
     * @param redraw 是否全部重绘(用于是否清空缓存图片)
     */
    startDraw(redraw?: boolean): void;
    /**
     * 结束绘制
     * @param redraw 是否全部重绘(用于是否更新缓存图片)
     */
    endDraw(redraw?: boolean): void;
    /**
     * 绘制圆
     * @param layer Circle图层
     */
    drawCircle(layer: Circle): void;
    /**
     * 绘制线或者面
     * @param layer Polyline图层
     */
    drawPolyline(layer: Polyline): void;
    /**
     * 绘制矩形
     * @param layer Rectangle图层
     */
    drawRectangle(layer: Rectangle): void;
    /**
     * 绘制图片
     * @param layer 图片图层
     */
    drawImage(layer: ImageLayer): Promise<void>;
    /**
     * 绘制文字
     * @param layer 文字图层
     */
    drawText(layer: IText): void;
    /**
     * 返回文字的对应宽度
     * @param text string
     * @param fontStyle string
     */
    getTextWidth(text: string, fontStyle?: string): number;
    /**
     * 设置stroke和fill等参数
     * @param layer Layer图层
     */
    private _fillstroke;
    /**
     * 设置字体参数
     * @param layer Layer图层
     */
    private _setFontStyle;
}
