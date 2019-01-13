import Stage from '../core/stage';
import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import * as goomath from '../goomath';
import IText from './text';


export default class LayerGroup extends Layer {
  private layers: Map<string, Layer> = new Map();
  constructor(layers: Layer[], options: {[k: string]: any} = {}) {
    super();
    const defaultOptions = {
      strict: true,
    };
    this.setOptions({...defaultOptions, ...options});
    for (const layer of layers) {
      this.layers.set(layer.id, layer);
    }
  }
  public getLayerType(): GraphType.GROUP {
    return GraphType.GROUP;
  }
  public getGeometry() {
    if (this.layers.size === 0) {
      return;
    }
    const bounds: goomath.Bound[] = [];
    for (const [, layer] of this.layers) {
      const bound = layer.getBound();
      bounds[0] = bounds.length > 0 ? bounds[0].expand(bound) : bound;
    }
    return bounds[0];
  }
  /**
   * 返回所有子图层
   */
  public getLayers() {
    return Array.from(this.layers.values());
  }
  /**
   * 遍历图层
   * @param callback callback
   */
  public eachLayer(callback?: any) {
    const layers = this.getLayers();
    for (let i = 0; i < layers.length; i++) {
      if (callback) {
        callback(layers[i], i, layers);
      }
    }
  }
  /**
   * 设置子图层的渲染器
   * @param stage Stage
   */
  public setRender(stage: Stage) {
    this.options._stage = stage;
    this.options._render = stage.render;
    this.eachLayer((layer: Layer) => {
      layer.options._stage = stage;
      layer.options._render = stage.render;
      if (layer instanceof IText) {
        layer.fixContent();
      }
    });
  }
  public addLayer(layer: Layer) {
    this.layers.set(layer.id, layer);
    this.updateAll();
  }
  /**
   * 删除图层
   * @param layer Layer
   */
  public removeLayer(layer: Layer) {
    this.layers.delete(layer.id);
    this.updateAll();
  }
  public isPointClosest(pos: Vertex): boolean {
    for (const [, layer] of this.layers) {
      if (layer.isPointClosest(pos)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 高亮图层
   * @param options Object
   */
  public highLight(options: {[k: string]: any} = {}) {
    const defaultOptions = {
      fill: true,
      fillColor: '#0FFFFF',
      color: '#0FFFFF',
    };
    for (const [, layer] of this.layers) {
      layer.highLight({...defaultOptions, ...options});
    }
    (this.options._stage as Stage).addHighLightLayer(this);
  }
}
