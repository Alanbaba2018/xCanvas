import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';

interface IhotPoint {
  pos: Vertex;
  count: number;
}
export default class HotMap extends Layer {
  public data: IhotPoint[] = [];
  protected geometry: Vertex[] = [];
  constructor(data: IhotPoint[], options: {[k: string]: any} = {}) {
    super();
    const defaultOptions = {
      stroke: true,
      weight: 2,
    };
    this.setOptions({...defaultOptions, ...options});
    this.highOptions.fill = false;
    this.data = data;
    this.geometry = data.map((hotPoint: IhotPoint) => hotPoint.pos);
  }
  public getLayerType(): GraphType {
    return GraphType.HOTMAP;
  }
  public getGeometry(): Vertex[] {
    return this.geometry;
  }
  public setGeometry(geo: Vertex[]) {
    this.geometry = geo;
    this.updateAll();
  }
  public addVertex(vertex: Vertex) {
    this.geometry.push(vertex);
    this.updateAll();
  }
  public isPointClosest(): boolean {
    return false;
  }
}
