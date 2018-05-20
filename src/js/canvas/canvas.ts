export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBoundaries() {
    this.ctx.beginPath();
    this.ctx.moveTo(500, 0);
    this.ctx.lineTo(500, 500);
    this.ctx.stroke();
  
    this.ctx.beginPath();
    this.ctx.moveTo(500, 250);
    this.ctx.lineTo(800, 250);
    this.ctx.stroke();
  }
  
  clearLeft() {
    this.ctx.clearRect(0, 0, 499, 499);
  }
  
  clearUpperRight() {
    this.ctx.clearRect(501, 0, 299, 249);
  }
  
  clearLowerRight() {
    this.ctx.clearRect(501, 251, 299, 249);
  }
  
  clearRegions() {
    this.clearLeft();
    this.clearUpperRight();
    this.clearLowerRight();
  }
}