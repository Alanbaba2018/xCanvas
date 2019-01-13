import { Vertex } from '../typedef/geometry_type';

export default class Bound {
  /**
   * 判断两个Bound是否相交
   * @param bound1 Bound
   * @param bound2 Bound
   */
  public static isOverlaped(bound1: Bound, bound2: Bound): boolean {
    return bound1.isOverlaped(bound2);
  }
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  constructor(x: number, y: number, width: number = 0, height: number = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  /**
   * 返回Bound属性
   */
  public getBound() {
    return {x: this.x, y: this.y, width: this.width, height: this.height};
  }
  /**
   * 获取Bound的中心点
   */
  public getCenter(): Vertex {
    return [this.x + this.width / 2, this.y + this.height / 2];
  }
  /**
   * 返回bound的顶点
   */
  public getVetexs(): Vertex[] {
    return [[this.x, this.y], [this.x, this.y + this.height], [this.x + this.width, this.y + this.height], [this.x + this.width, this.y]];
  }
  /**
   * 判断与另一个Bound是否相交
   * @param bound Bound
   */
  public isOverlaped(bound: Bound): boolean {
    const center0 = this.getCenter();
    const center1 = bound.getCenter();
    return Math.abs(center1[0] - center0[0]) < (this.width + bound.width) / 2 &&
      Math.abs(center1[1] - center0[1]) < (this.height + bound.height) / 2;
  }
  /**
   * 点是否在Bound内
   * @param pt Number[]
   */
  public contain(pt: Vertex ): boolean {
    return pt[0] > this.x && pt[1] > this.y && pt[0] < (this.x + this.width) && pt[1] < (this.y + this.height);
  }
  /**
   * 扩展Bound
   * @param bound Bound
   */
  public expand(bound: Bound): Bound {
    const minX = Math.min(this.x, bound.x);
    const minY = Math.min(this.y, bound.y);
    const maxX = Math.max(this.x + this.width, bound.x + bound.width);
    const maxY = Math.max(this.y + this.height, bound.y + bound.height);
    this.x = minX;
    this.y = minY;
    this.width = maxX - minX;
    this.height = maxY - minY;
    return this;
  }
}
