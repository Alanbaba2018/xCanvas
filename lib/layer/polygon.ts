import Polyline from './polyline';
import { GraphType, Vertex } from '../typeof/typeof';
import * as goomath from '../goomath';

export default class Polygon extends Polyline {
  constructor(geo: Vertex[], options: {[k: string]: any} = {}) {
    const defaultOptions = {
      fill: true,
      stroke: true,
      weight: 1,
    };
    super(geo, {...defaultOptions, ...options});
    this.highOptions.fill = typeof this.options.fill === 'undefined' ? true : this.options.fill;
  }
  public getLayerType(): GraphType.POLYGON {
    return GraphType.POLYGON;
  }
  public isPointClosest(p: Vertex): boolean {
    if (this.options.fill || !this.options.strict) {
      const mpolygon: goomath.Polygon = new goomath.Polygon(this.geometry);
      return mpolygon.contain(p);
    } else {
      const mply: goomath.Polyline = new goomath.Polyline(this.geometry);
      const nearestPoint: Vertex = mply.getNearestPoint(p);
      const dis: number = goomath.Base.getDistance(p, nearestPoint);
      return dis <= this.tolerance;
    }
  }
}
