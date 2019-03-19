import { XY, Vertex } from '../typedef/geometry_type';
import Bound from '../math/bound';
import Base from '../math/base';
import Line from './line';

export default class Polyline {
  public readonly coordinates: Vertex[];
  constructor(coordinates: Array<XY | Vertex>) {
    this.coordinates = this.transformToArray(coordinates);
  }
  public getBound(): Bound {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    for (const coordinate of this.coordinates) {
      minX = Math.min(minX, coordinate[0]);
      minY = Math.min(minY, coordinate[1]);
      maxX = Math.max(maxX, coordinate[0]);
      maxY = Math.max(maxY, coordinate[1]);
    }
    return new Bound(minX, minY, maxX - minX, maxY - minY);
  }
  public getNearestPoint(p: XY | Vertex) {
    p = Base.transformPointToArray(p);
    const nearestPoints: Array<{dis: number, pos: Vertex}> = [];
    for (let i = 0; i < this.coordinates.length - 1; i++) {
      const pos = Line.getNearestPointToSegment(p, this.coordinates[i], this.coordinates[i + 1]);
      const dis = Base.getSquareDistance(p, pos);
      nearestPoints.push({dis, pos});
    }
    nearestPoints.sort((a, b) => {
      return a.dis - b.dis;
    });
    return nearestPoints[0].pos;
  }
  protected transformToArray(coordinates: Array<XY | Vertex>): Vertex[] {
    return Base.transformPointsToArray(coordinates);
  }
}
