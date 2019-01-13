import Layer from './layer';
import { GraphType } from '../typeof/typeof';
import Util from '../util/util';
import * as goomath from '../goomath';

export default class ImageLayer extends Layer {
  public url: string;
  public accesible: boolean = true;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  constructor(url: string, x: number, y: number, width?: number, height?: number) {
    super();
    this.url = url;
    this.x = x;
    this.y = y;
    this.width = width || -1;
    this.height = height || -1;
  }
  public getLayerType() {
    return GraphType.IMAGE;
  }
  public getGeometry(): goomath.Bound {
    return new goomath.Bound(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
  public async loadImageData(): Promise<any> {
    const src: string = await Util.loadImageByBlob(this.url);
    const image: HTMLImageElement = new Image();
    // image.setAttribute('crossOrigin', 'anonymous');
    image.src = URL.createObjectURL(src);
    const self = this;
    return new Promise((resolve, reject) => {
      image.addEventListener('load', () => {
        self._setImage(image);
        resolve(image);
      });
      image.addEventListener('error', () => {
        self.accesible = false;
        reject('image is not found');
      });
    });
  }
  public isPointClosest(): boolean {
    return false;
  }
  private _setImage(image: HTMLImageElement) {
    if (this.width === -1 || this.height === -1) {
      this.width = image.width;
      this.height = image.height;
    }
  }
}
