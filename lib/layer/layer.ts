import Evt from '../core/evt';
import Stage from '../core/stage';
import Util from '../util/util';
import { GraphType, XY, Vertex } from '../typeof/typeof';
import * as goomath from '../goomath';
import LayerGroup from './layerGroup';

export default abstract class Layer extends Evt {
  public userCache: boolean = true;
  public readonly id: string;
  public readonly options: {
    type: GraphType,
    [k: string]: any,
  };
  public highOptions: {
    [k: string]: any,
  } = {
    fill: true,
    fillColor: '#0FFFFF',
    color: '#0FFFFF',
  };
  protected tolerance: number = 5;
  constructor() {
    super();
    this.id = Util.createID();
    this.options = {
      type: this.getLayerType(),
      stroke: true,
      color: '#3388ff',
      weight: 1,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: null,
      dashOffset: null,
      fill: false,
      fillColor: null,
      fillOpacity: 1,
      fillRule: 'evenodd',
      strict: true,
    };
  }
  /**
   * 设置图层属性
   * @param options Object
   */
  public setOptions(options: {[k: string]: any}) {
    Object.keys(options).forEach((k: string) => {
      this.options[k] = options[k];
    });
  }
  /**
   * 设置图层样式
   * @param options Object
   */
  public setStyle(options: {[k: string]: any}) {
    this.setOptions(options);
    this.updateAll();
  }
  /**
   * 高亮图层
   * @param options Object
   */
  public highLight(options: {[k: string]: any} = {}) {
    this.highOptions = {...this.highOptions, ...options};
    (this.options._stage as Stage).addHighLightLayer(this);
  }
  /**
   * 清除高亮
   */
  public clearHighLight() {
    (this.options._stage as Stage).clearHighLightLayer(this);
  }
  /**
   * 添加图层到Stage或者Layergroup
   * @param stage Stage
   */
  public addTo(stage: Stage | LayerGroup) {
    stage.addLayer(this);
    return this;
  }
  /**
   * 添加图层
   * @param stage Stage
   */
  public layerAdd(stage: Stage) {
    this.setRender(stage);
    this.options._render.addDraw(this);
    this.fire('loaded', {layer: this, sourceTarget: stage.container});
    stage.fire('layerAdd', {layer: this});
  }
  /**
   * 将XY对象格式数据转为数组格式
   * @param vertexs Geometry
   */
  public clearnData(vertexs: any[]): number[][] {
    const pts: number[][] = [];
    for (const vertex of vertexs) {
      pts.push(this.transformVertex(vertex));
    }
    return pts;
  }
  /**
   * 转换坐标点数据格式
   * @param vertex 坐标点
   */
  public transformVertex(vertex: XY | number[]): number[] {
    if (!Array.isArray(vertex)) {
      return this.transformToArray(vertex);
    } else {
      return vertex;
    }
  }
  /**
   * 对象格式转数组格式
   * @param xy XY对象格式坐标点
   */
  public transformToArray(xy: XY): number[] {
    return [xy.x, xy.y];
  }
  /**
   * 更新全部图层
   */
  public updateAll() {
    if (this.options._render) {
      this.options._render.redraw();
    }
  }
  /**
   * 添加某个图层路径
   */
  public addPath() {
    if (this.options._render) {
      this.options._render.addDraw(this);
    }
  }
  /**
   * 删除某个图层
   */
  public remove() {
    this.updateAll();
    this.fire('removed', {layer: this});
    this.options._stage.removeLayer(this);
  }
  public removePath() {
    const bound = this.getBound();
    this.options._render.clearBoundPath(bound);
  }
  /**
   * 返回图层的Bound
   */
  public getBound(): goomath.Bound {
    const geometry = this.getGeometry();
    if (geometry instanceof goomath.Bound) {
      return geometry;
    }
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    if (Array.isArray(geometry[0])) {
      for (const vertex of geometry) {
        minX = Math.min(minX, vertex[0]);
        minY = Math.min(minY, vertex[1]);
        maxX = Math.max(maxX, vertex[0]);
        maxY = Math.max(maxY, vertex[1]);
      }
    }
    return new goomath.Bound(minX, minY, maxX - minX, maxY - minY);
  }
  /**
   * 返回图层Bound的中心
   */
  public getCenter(): Vertex {
    const bound = this.getBound();
    return bound.getCenter();
  }
  /**
   * 返回图层Bound时候包含待测点
   * @param pos 待测点
   */
  public containPoint(pos: Vertex): boolean {
    const bound: goomath.Bound = this.getBound();
    return bound.contain(pos);
  }
  /**
   * 设置图层渲染器
   * @param stage Stage
   */
  public setRender(stage: Stage) {
    this.options._stage = stage;
    this.options._render = stage.render;
  }
  /**
   * 返回图层的类型
   */
  public abstract getLayerType(): GraphType;
  /**
   * 返回图层的坐标数据
   */
  public abstract getGeometry(): any;
  /**
   * 返回待测点是否在Layer容差范围内
   * @param pos 待测点
   */
  public abstract isPointClosest(pos: Vertex): boolean;
}
