import { Vertex, GraphType } from '../typeof/typeof';
import Layer from '../layer/layer';
import Circle from '../layer/circle';
import * as goomath from '../goomath';
import ImageLayer from '../layer/imageLayer';
import LayerGroup from '../layer/layerGroup';
import Polyline from '../layer/polyline';
import IText from '../layer/text';
import HotMap from '../layer/hotMap';
import Render from './render';

export default class CanvasHelper {
  public retina: number = 1;
  public isCache: boolean = false;
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private w: number = 0;
  private h: number = 0;
  private scale: number;
  private center: Vertex = [0, 0];
  private cache: Map<string, HTMLImageElement>;
  private aliaveCache: Map<string, HTMLImageElement>;
  private readonly render: Render;
  constructor(w: number, h: number, render: Render, scale: number = 1) {
    this.render = render;
    this.retina = window.devicePixelRatio || 1;
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.scale = scale;
    this.cache = new Map();
    this.aliaveCache = new Map();
    this.updateSize(w, h);
  }
  /**
   * 返回canvas节点
   */
  public getCanvasDom(): HTMLCanvasElement {
    return this.canvas;
  }
  /**
   * 返回缩放级别
   */
  public getScale(): number {
    return this.scale;
  }
  /**
   * 返回画布以右上角为基准点的原点屏幕坐标
   */
  public getOriginCenter(): Vertex {
    return this.center;
  }
  /**
   * 返回画布可视区域的世界坐标Bound
   */
  public getViewBound(): goomath.Bound {
    const leftBottom = this.screenToWorldCoordinate([0, this.h]);
    const rightTop = this.screenToWorldCoordinate([this.w, 0]);
    return new goomath.Bound(leftBottom[0], leftBottom[1], rightTop[0] - leftBottom[0], rightTop[1] - leftBottom[1]);
  }
  /**
   * 返回画布各项参数,用于clone
   */
  public getDrawStatus(): boolean {
    return true;
  }
  /**
   * 转换本地坐标为世界坐标(前端显示的坐标)
   * @param evt 以原点为基准点的屏幕坐标
   */
  public localToWorldCoordinate(evt: Vertex): Vertex {
    return [evt[0] / this.retina, -evt[1] / this.retina];
  }
  /**
   * 转换世界坐标为以原点为基准点的本地坐标(canvas绘制时的坐标)
   * @param pt 世界坐标
   */
  public worldCoordinateToLocal(pt: Vertex): Vertex {
    return [(pt[0] * this.retina) + 0.5, (-pt[1] * this.retina) + 0.5];
  }
  /**
   * 转换世界坐标为以右上角为基准点的屏幕坐标
   * @param pt 世界坐标
   */
  public worldCoordinateToScreen(pt: Vertex): Vertex {
    return [this.center[0] / this.retina + pt[0] * this.scale, this.center[1] / this.retina - pt[1] * this.scale];
  }
  /**
   * 转换以右上角为基准点的屏幕坐标为世界坐标
   * @param pt 屏幕像素坐标
   */
  public screenToWorldCoordinate(pt: Vertex): Vertex {
    return [(pt[0] - this.center[0] / this.retina) / this.scale, (this.center[1] / this.retina - pt[1]) / this.scale];
  }
  /**
   * 计算当前鼠标位置与原点的坐标偏移
   * @param e 事件参数
   */
  public getOffset(e: any): number[] {
    return [(e.offsetX * this.retina - this.center[0]) / this.scale,
      (this.center[1] - e.offsetY * this.retina) / this.scale];
  }
  /**
   * 计算屏幕像素坐标距屏幕中心点的偏移量
   * @param pt 屏幕像素坐标
   */
  public getOffsetToScreenCenter(pt: Vertex): Vertex {
    return [pt[0] * this.retina - this.w / 2, pt[1] * this.retina - this.h / 2];
  }
  /**
   * 获得屏幕中心世界坐标
   */
  public getCenterPoint(): Vertex {
    return this.screenToWorldCoordinate([this.w / 2 / this.retina, this.h / 2 / this.retina]);
  }
  /**
   * 返回文字的宽度
   * @param layer IText
   */
  public measureTextWidth(layer: IText): number {
    if (layer.options && layer.options.font) {
      this.context.font = layer.options.font;
    }
    return this.context.measureText(layer.text).width;
  }
  /**
   * 返回缓存中的图片
   */
  public getCache(): Map<string, HTMLImageElement> {
    return this.cache;
  }
  /**
   * 将世界坐标距离转换为屏幕像素坐标
   * @param dis number
   */
  public transformScreenDistance(dis: number): number {
    return dis / this.scale / this.retina;
  }
  /**
   * 设置缓存图片
   * @param cache 图片缓存
   */
  public setCache(cache: Map<string, HTMLImageElement>) {
    this.cache = cache;
  }
  /**
   * 设置分辨率
   * @param retina 分辨率
   */
  public setRetina(retina: number) {
    this.retina = retina;
  }
  /**
   * 设置画布的背景色
   * @param color 背景颜色代码
   */
  public setBackground(color?: string) {
    this.context.clearRect(0, 0, this.w, this.h);
    // this.context.fillStyle = color || this.bgColor;
    // this.context.fillRect(0, 0, this.w, this.h);
  }
  /**
   * 设置画布缩放参数
   * @param scale 缩放级别
   */
  public setScale(scale: number) {
    this.scale = scale;
  }
  /**
   * 设置画布中心点坐标
   * @param center 画布中心点
   */
  public setCenter(center: Vertex) {
    this.center = center;
  }
  /**
   * 更新画布的bound
   * @param w 画布宽度（css宽度）
   * @param h 画布高度（css高度
   */
  public updateSize(w: number, h: number) {
    this.w = w * this.retina;
    this.h = h * this.retina;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.center = [this.w / 2, this.h / 2];
  }
  /**
   * 清空所有画布
   */
  public clear() {
    this.context.clearRect(0, 0, this.w, this.h);
  }
  /**
   * 清空bound区域画布
   * @param bound goomath.Bound
   */
  public clearPart(bound: goomath.Bound) {
    const screenPt = this.worldCoordinateToScreen([bound.x, bound.y + bound.height]);
    this.context.clearRect(screenPt[0] - 1, screenPt[1] - 1, bound.width * this.scale + 1, bound.height * this.scale + 1);
  }
  /**
   * 开始绘制
   * @param redraw 是否全部重绘(用于是否清空缓存图片)
   */
  public startDraw(redraw?: boolean) {
    this.context.save();
    this.context.translate(this.center[0], this.center[1]);
    this.context.scale(this.scale, this.scale);
    if (redraw) {
      this.aliaveCache.clear();
    }
  }
  /**
   * 结束绘制
   * @param redraw 是否全部重绘(用于是否更新缓存图片)
   */
  public endDraw(redraw?: boolean) {
    this.context.restore();
    if (redraw) {
      this.cache = new Map(this.aliaveCache);
    }
  }
  /**
   * 绘制圆
   * @param layer Circle图层
   */
  public drawCircle(layer: Circle) {
    const center = layer.getGeometry();
    const radius = layer.getRadius();
    this.context.beginPath();
    const localPt = this.worldCoordinateToLocal(center);
    this.context.arc(localPt[0], localPt[1], radius * this.retina, 0, Math.PI * 2);
    this._fillstroke(layer);
  }
  /**
   * 绘制线或者面
   * @param layer Polyline图层
   */
  public drawPolyline(layer: Polyline) {
    const geo: any = layer.getGeometry();
    if (geo.length === 0) {
      return;
    }
    this.context.beginPath();
    for (let i = 0; i < geo.length; i++) {
      const vertex = this.worldCoordinateToLocal(geo[i]);
      this.context[i ? 'lineTo' : 'moveTo'](vertex[0], vertex[1]);
    }
    if (layer.options.type === GraphType.POLYGON) {
      this.context.closePath();
    }
    this._fillstroke(layer);
  }
  /**
   * 绘制图片
   * @param layer 图片图层
   */
  public async drawImage(layer: ImageLayer) {
    if (!layer.accesible) {
      return;
    }
    if (this.cache.has(layer.url)) {
      this.render.deletePeddingLayer(layer);
      const imageData = this.cache.get(layer.url) as HTMLImageElement;
      this.aliaveCache.set(layer.url, imageData);
      const bound = layer.getGeometry();
      const position = this.worldCoordinateToLocal([bound.x, bound.y + bound.height]);
      this.context.drawImage(imageData, position[0], position[1], bound.width * this.retina, bound.height * this.retina);
    } else {
      this.render.setPeddingLayer(layer.id);
      const image = await layer.loadImageData();
      this.cache.set(layer.url, image);
      this.render.redraw();
    }
  }
  /**
   * 用于绘制图层组
   * @param layer Group图层
   */
  public drawGroup(layer: LayerGroup) {
    const layers = layer.getLayers();
    for (const glayer of layers) {
      const type = glayer.getLayerType();
      switch (type) {
        case GraphType.CIRCLE:
          this.drawCircle(glayer as Circle);
          break;
        case GraphType.POLYLINE:
        case GraphType.POLYGON:
          this.drawPolyline(glayer as Polyline);
          break;
        case GraphType.IMAGE:
          this.drawImage(glayer as ImageLayer);
          break;
        case GraphType.TEXT:
          this.drawText(glayer as IText);
          break;
      }
    }
  }
  /**
   * 绘制文字
   * @param layer 文字图层
   */
  public drawText(layer: IText) {
    this._setFontStyle(layer);
    const pos: Vertex = layer.getGeometry();
    const localPt = this.worldCoordinateToLocal(pos);
    const content: string[] = layer.content.map((item) => item.text);
    const fontSize = layer.getFontSize();
    const space: number = layer.options.verticleSpace;
    const len: number = layer.content.length;
    for (let i = 0; i < len; i++) {
      let y: number = 0;
      if (layer.options.baseLine === 'bottom') {
        y = localPt[1] - (len - i - 1) * (fontSize + space);
      } else if (layer.options.baseLine === 'middle') {
        y = localPt[1] - ((len - 1) / 2 - i) * (fontSize + space);
      } else {
        y = localPt[1] + (fontSize + space) * i;
      }
      if (layer.options.fill) {
        this.context.fillText(content[i], localPt[0], y);
      } else if (layer.options.stroke) {
        this.context.strokeText(content[i], localPt[0], y);
      }
    }
  }
  public drawHotMap(layer: HotMap) {
    const data = layer.data;
    data.sort((a, b) => a.count - b.count);
    const min: number = data[0].count;
    const max: number = data[data.length - 1].count;
    const range: number = max - min;
    for (const hotPoint of data) {
      const alpha = hotPoint.count / range;
      this.context.globalAlpha = alpha;
      this.context.beginPath();
      const position = this.worldCoordinateToLocal(hotPoint.pos);
      const gradient = this.context.createRadialGradient(position[0], position[1], 0, position[0], position[1], hotPoint.count);
      gradient.addColorStop(0, 'rgba(0,0,0,1)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      this.context.fillStyle = gradient;
      this.context.arc(position[0], position[1], hotPoint.count, 0, Math.PI * 2);
      this.context.fill();
    }
    const palette = this._getPalette();
    const img = this.context.getImageData(0, 0, this.w, this.h);
    const imageData = img.data;
    for (let i = 3; i < imageData.length; i += 4) {
      const alpha = imageData[i];
      const offset = alpha * 4;
      if (!offset) {
        continue;
      }
      imageData[i - 3] = palette[offset];
      imageData[i - 2] = palette[offset + 1];
      imageData[i - 1] = palette[offset + 2];
    }
    this.context.putImageData(img, 0, 0, 0, 0, this.w, this.h)
  }
  /**
   * 返回文字的对应宽度
   * @param text string
   * @param fontStyle string
   */
  public getTextWidth(text: string, fontStyle?: string): number {
    this.context.save();
    if (fontStyle) {
      this.context.font = fontStyle;
    }
    const width = this.context.measureText(text).width;
    this.context.restore();
    return width;
  }
  private _getPalette() {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    const gradient = ctx.createLinearGradient(0, 0, 256, 1);
    gradient.addColorStop(0.25, 'rgb(0,0,255)');
    gradient.addColorStop(0.55, 'rgb(0,255,0)');
    gradient.addColorStop(0.85, 'rgb(255,255,0)');
    gradient.addColorStop(1.0, 'rgb(255,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 1);
    return ctx.getImageData(0, 0, 256, 1).data;
  }
  /**
   * 设置stroke和fill等参数
   * @param layer Layer图层
   */
  private _fillstroke(layer: Layer) {
    const options = this.isCache ? {...layer.options, ...layer.highOptions} : layer.options;
    if (options.fill) {
      this.context.globalAlpha = options.fillOpacity;
      this.context.fillStyle = options.fillColor || options.color;
      this.context.fill(options.fillRule || 'evenodd');
    }
    if (options.stroke && options.weight !== 0) {
      if (this.context.setLineDash) {
        this.context.setLineDash(layer.options && layer.options.dashArray || []);
      }
      this.context.globalAlpha = options.opacity;
      this.context.lineWidth = options.weight * this.retina;
      this.context.strokeStyle = options.color;
      this.context.lineCap = options.lineCap;
      this.context.lineJoin = options.lineJoin;
      this.context.stroke();
    }
  }
  /**
   * 设置字体参数
   * @param layer Layer图层
   */
  private _setFontStyle(layer: Layer) {
    const options = this.isCache ? {...layer.options, ...layer.highOptions} : layer.options;
    if (options.font) {
      this.context.font = options.font.replace(/\d+px/, ($1: string) => {
          return +$1.slice(0, $1.length - 2) * this.retina + 'px';
      });
    }
    if (options.fill) {
      this.context.fillStyle = this.isCache ? layer.highOptions.fillColor || layer.highOptions.color : layer.options.fillColor || layer.options.color;
    }
    if (options.stroke) {
      this.context.strokeStyle = this.isCache ? layer.highOptions.color : layer.options.color;
    }
    this.context.textAlign = options.textAlign;
    this.context.textBaseline = options.baseLine;
  }
}
