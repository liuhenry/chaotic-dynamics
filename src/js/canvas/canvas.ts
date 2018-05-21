interface Area {
  center: {
    x: number,
    y: number
  },
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  left: Area;
  upperRight: Area;
  lowerRight: Area;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    const leftWidth = Math.round(canvas.width * 0.625);
    const rightWidth = this.width - leftWidth;
    this.left = Canvas.calculateArea(0, 0, leftWidth, this.height);
    this.upperRight = Canvas.calculateArea(this.left.right, 0, rightWidth, this.height/2);
    this.lowerRight = Canvas.calculateArea(this.left.right, this.upperRight.bottom, rightWidth, this.height/2);
  }

  static calculateArea(left: number, top: number, width: number, height: number): Area {
    return {
      center: {
        x: left + width/2,
        y: top + height/2,
      },
      top: top,
      bottom: top + height,
      left: left,
      right: left + width,
      width: width,
      height: height,
    };
  }

  static outOfBounds(x: number, y: number, area: Area): boolean {
    if (x > area.right || x < area.left || y > area.bottom || y < area.top) {
      return true;
    } else {
      return false;
    }
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBoundaries() {
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'black';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.moveTo(this.left.right, 0);
    this.ctx.lineTo(this.left.right, this.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.left.right, this.height/2);
    this.ctx.lineTo(this.width, this.height/2);
    this.ctx.stroke();

    this.ctx.font = "20px sans-serif";
    this.ctx.fillText("Phase Portrait", this.upperRight.left + 5, this.upperRight.top + 20);
    this.ctx.fillText("Poincaré Map (ϕ = 0)", this.lowerRight.left + 5, this.lowerRight.top + 20);
  }

  drawAxes(area: Area, size: number, tick: number) {
    const scale = (this.upperRight.width - 10) / (2*size); //symmetric
    const numTicksX = Math.floor(area.width / (2 * tick * scale));
    const numTicksY = Math.floor(area.height / (2 * tick * scale));

    this.ctx.strokeStyle = 'grey';
    this.ctx.fillStyle = 'grey';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.moveTo(area.center.x, area.top);
    this.ctx.lineTo(area.center.x, area.bottom);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(area.left, area.center.y);
    this.ctx.lineTo(area.right, area.center.y);
    this.ctx.stroke();

    for (let i=0; i <= numTicksX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(area.center.x + i*scale*tick, area.center.y + 10);
      this.ctx.lineTo(area.center.x + i*scale*tick, area.center.y - 10);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(area.center.x - i*scale*tick, area.center.y + 10);
      this.ctx.lineTo(area.center.x - i*scale*tick, area.center.y - 10);
      this.ctx.stroke();
    }

    for (let i=0; i <= numTicksY; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(area.center.x + 10, area.center.y + i*scale*tick);
      this.ctx.lineTo(area.center.x - 10, area.center.y + i*scale*tick);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(area.center.x + 10, area.center.y - i*scale*tick);
      this.ctx.lineTo(area.center.x - 10, area.center.y - i*scale*tick);
      this.ctx.stroke();
    }
  }

  clearLeft() {
    this.ctx.clearRect(this.left.left, this.left.top, this.left.width-1, this.height);
  }

  clearUpperRight() {
    this.ctx.clearRect(this.upperRight.left+1, this.upperRight.top, this.upperRight.width-1, this.upperRight.height-1);
  }

  clearLowerRight() {
    this.ctx.clearRect(this.lowerRight.left+1, this.lowerRight.top, this.lowerRight.width-1, this.lowerRight.height-1);
  }

  clearRegions() {
    this.clearLeft();
    this.clearUpperRight();
    this.clearLowerRight();
  }
}