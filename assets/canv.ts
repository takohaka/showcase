import {Vector} from "~/assets/vector";

export class Canv {
  public fps: number = 60;
  private updateCallback: Function;
  private updateCount: number = 0;
  private el: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private _w: number;
  private _h: number;
  private _size: Vector;
  private lastUpdate: number;
  private isStart: boolean;

  constructor(canvasElement: HTMLCanvasElement) {
    this.el = canvasElement;
    this._w = this.el.width = this.el.clientWidth;
    this._h = this.el.height = this.el.clientHeight;
    this.ctx = <CanvasRenderingContext2D> canvasElement.getContext("2d");
    this._w = this.el.width;
    this._h = this.el.height;
  }

  beginPath() {
    this.ctx.beginPath();
    return this;
  }
  closePath() {
    this.ctx.closePath();
    return this;
  }
  moveTo(to: Vector) {
    this.ctx.moveTo(to.x, to.y);
    return this;
  }
  lineTo(to: Vector) {
    this.ctx.lineTo(to.x, to.y);
    return this;
  }
  bezierCurveTo(cp1: Vector, cp2: Vector, to: Vector) {
    this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y);
    return this;
  }
  lineWidth(lineWidth: number) {
    this.ctx.lineWidth = lineWidth;
    return this;
  }
  save() {
    this.ctx.save();
    return this;
  }
  restore() {
    this.ctx.restore();
    return this;
  }
  stroke() {
    this.ctx.stroke();
    return this;
  }
  rect(from: Vector, size: Vector) {
    this.ctx.rect(from.x, from.y, size.w, size.h);
    return this;
  }
  clearRect(from: Vector, size: Vector) {
    this.ctx.clearRect(from.x, from.y, size.w, size.h);
    return this;
  }
  fillRect(from: Vector, size: Vector, fillStyle?: Style) {
    this.ctx.save();
    if (fillStyle) {
      this.ctx.fillStyle = fillStyle;
    }
    this.ctx.fillRect(from.x, from.y, size.w, size.h);
    this.ctx.restore();
    return this;
  }

  clipRect(from: Vector, size: Vector) {
    this
      .beginPath()
      .rect(from, size)
      .closePath()
      .clip()
      // .restore();
    return this;
  }
  clip() {
    this.ctx.clip();
    return this;
  }

  fill() {
    this.ctx.fill();
    return this;
  }

  fillStyle(fillStyle: Style) {
    this.ctx.fillStyle = fillStyle;
    return this;
  }

  strokeStyle(strokeStyle: Style) {
    this.ctx.strokeStyle = strokeStyle;
    return this;
  }

  globalAlpha(alpha: number) {
    this.ctx.globalAlpha = alpha;
    return this;
  }

  onUpdate(callback: (n: number) => void) {
    this.updateCallback = callback;
  }

  fillAll(fillStyle?: Style) {
    this.fillRect(new Vector(0, 0), this.size, fillStyle)
    return this;
  }

  clearAll() {
    this.clearRect(new Vector(0, 0), this.size);
    return this;
  }

  sin(n: number) {
    this
      .beginPath()
      .moveTo(new Vector(0, 0));
    for (let i = 0; i <= this.w; i++) {
      this.ctx.lineTo(i,
        (
          Math.sin(
            (Math.PI * 2 / (
              400 + (800 * ((n === 100 ? 1 : n % 100) / 100))
            )) * (i)
          ) / (
            3 + (8 * ((n === 100 ? 1 : n % 100) / 100))
          ) + 0.5
        ) * this._h
      );
    }
    this
      .lineTo(this.size)
      .lineTo(new Vector(0, this.size.h))
      .fill()
      .closePath();
    return this;
  }

  waveTo(flip: boolean, progress: number) {
    const h = 600;
    const handle = h * 0.8;
    const from = new Vector(
      flip ? this.wp(0 - (8 * progress)) : this.wp(-16 + (8 * progress)),
      flip ? h : 0
    );
    const to = new Vector(
      flip ? this.wp(116 - (8 * progress)) : this.wp(100 + (8 * progress)),
      flip ? 0 : h
    );
    this
      .moveTo(from)
      .bezierCurveTo(
        new Vector(
          from.x + (flip ? 0 : (this.w - progress * this.w)),
          from.y + (flip ? -handle : (progress * handle))
        ),
        new Vector(
          to.x - (flip ? (this.w - progress * this.w) : 0),
          to.y + (flip ? (progress * handle) : -handle)
        ),
        to
      );
    return this;
  }

  waveLine(flip: boolean, progress: number) {
    this
      .beginPath()
      .waveTo(flip, progress)
      .stroke()
      .closePath()
    return this;
  }

  waveFill(flip: boolean, progress: number) {
    this
      .beginPath()
      .waveTo(flip, progress)
      .lineTo(new Vector(this.w, this.h))
      .lineTo(new Vector(0, this.h))
      .closePath()
      .fill()
    return this;
  }

  start() {
    this.isStart = true;
    this.tick();
  }

  stop() {
    this.isStart = false;
  }

  wp(percent: number) {
    return ( this._w * percent ) / 100;
  }

  hp(percent: number) {
    return ( this._h * percent ) / 100;
  }

  context(func: (canv: Canv) => void) {
    this.save();
    func(this);
    this.restore();
    return this;
  }

  get h() {
    return this._h;
  }

  get w() {
    return this._w;
  }

  get size() {
    return this._size ? this._size : this._size = new Vector(this.w, this.h);
  }

  private tick() {
    if (!this.isStart) return;
    const now = Date.now();
    if (!this.lastUpdate || now - this.lastUpdate > 1000 / this.fps) {
      this.lastUpdate = now;
      this.updateCount++;
      this.updateCallback && this.updateCallback(this.updateCount);
    }
    requestAnimationFrame(() => this.tick());
  }

}

export type Style = string | CanvasGradient | CanvasPattern;
