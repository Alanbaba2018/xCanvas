import Layer from './layer';
import { GraphType, Vertex} from '../typeof/typeof';
import * as goomath from '../goomath';

export default class Circle extends Layer {
  protected geometry: Vertex;
  protected radius: number = 0;
  constructor(geo: Vertex, radius: number, options: {[k: string]: any}) {
    super();
    this.setOptions(options);
    this.geometry = geo;
    this.radius = radius;
  }
  public getLayerType(): GraphType {
    return GraphType.CIRCLE;
  }
  public getGeometry(): Vertex {
    return this.geometry;
  }
  public getRadius(): number {
    return this.radius;
  }
  public getBound(): goomath.Bound {
    return new goomath.Bound(this.geometry[0] - this.radius, this.geometry[1] - this.radius, this.radius * 2, this.radius * 2);
  }
  public setGeometry(geo: number[]) {
    this.geometry = geo;
    this.updateAll();
  }
  public setRadius(radius: number) {
    this.radius = radius;
    this.updateAll();
  }
  public isPointClosest(pt: Vertex): boolean {
    if (this.options.fill || !this.options.strict) {
      return goomath.Base.getSquareDistance(pt, this.geometry) <= this.radius ** 2;
    } else {
      const distance: number = goomath.Base.getDistance(pt, this.geometry);
      return goomath.Base.isZero(distance - this.tolerance);
    }
  }
}
