import Canvas from './canvas';

export default class Splittable extends Canvas {

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