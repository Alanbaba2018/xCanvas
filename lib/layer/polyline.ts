import Layer from './layer';
import { GraphType, Vertex } from '../typeof/typeof';
import * as goomath from '../goomath';

export default class Polyline extends Layer {
  protected geometry: Vertex[];
  constructor(geo: Vertex[], options: {[k: string]: any} = {}) {
    super();
    const defaultOptions = {
      stroke: true,
      weight: 2,
    };
    this.setOptions({...defaultOptions, ...options});
    this.highOptions.fill = false;
    this.geometry = this.clearnData(geo);
  }
  public getLayerType(): GraphType {
    return GraphType.POLYLINE;
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
  public setLastVertex(vertex: Vertex) {
    this.geometry.splice(-1, 1, vertex);
    this.updateAll();
  }
  public isPointClosest(p: Vertex): boolean {
    const mply: goomath.Polyline = new goomath.Polyline(this.geometry);
    const nearestPoint: Vertex = mply.getNearestPoint(p);
    const dis: number = goomath.Base.getDistance(p, nearestPoint);
    return dis <= this.tolerance;
  }
}
