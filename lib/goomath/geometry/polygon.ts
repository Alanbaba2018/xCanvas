import Polyline from './polyline';
import { XY, Vertex } from '../typedef/geometry_type';
import Bound from '../math/bound';
import Base from '../math/base';

export default class Polygon extends Polyline {
  constructor(coordinates: Array<XY | Vertex>) {
    super(coordinates);
    this._cleanData();
  }
  public contain(pt: XY | Vertex): boolean {
    pt = Base.transformPointToArray(pt);
    const bound: Bound = this.getBound();
    if (this.coordinates.length < 4 || !bound.contain(pt)) {
      return false;
    }
    let count: number = 0;
    const {length} = this.coordinates;
    for (let i = 0; i < length - 1; ++i) {
      const curPt: Vertex = this.coordinates[i];
      const nextPt: Vertex = this.coordinates[i + 1];
      if (this._isWithInTrapezoid(pt, curPt, nextPt)) {
        count++;
      }
    }
    return count % 2 === 1;
  }
  private _cleanData() {
    const length: number = this.coordinates.length;
    if (length < 3) {
      console.error('Points contained by polygon is too few');
    } else {
      if (!Base.isSamePoint(this.coordinates[0], this.coordinates[length - 1])) {
        this.coordinates.push(this.coordinates[0]);
      }
    }
  }
  private _isWithInTrapezoid(pt: Vertex, curPt: Vertex, nextPt: Vertex): boolean {
    const maxY: number = Math.max(curPt[1], nextPt[1]);
    const minY: number = Math.min(curPt[1], nextPt[1]);
    return Base.isLeftOfLine(pt, curPt, nextPt) && pt[1] > minY && pt[1] < maxY;
  }
}
