import Canvas from './canvas';


export default class PendulumVisualization extends Canvas {
  simulation: module.PendulumSimulation;
  running: boolean;
  animationID?: number;
  damping: number;

  constructor(canvas: HTMLCanvasElement, simulation: module.PendulumSimulation) {
    super(canvas);
    this.simulation = simulation;
    this.running = false;
    this.damping = 0;
  }

  initialize() {
    this.clearAll();
    this.drawBoundaries();
  }

  start() {
    this.running = true;
    this.animationID = this.tick();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animationID as number);
  }

  setParameters(damping: number) {
    this.damping = damping;
  }

  tick(): number | undefined {
    this.clearLeft();

    this.drawPendulum();
    this.drawPhaseHistory();

    this.simulation.tick(this.damping);
    if (this.running) {
      return requestAnimationFrame(() => { this.tick() });
    } else {
      return undefined;
    }
  }

  drawPendulum() {
    const { theta, omega } = this.simulation;
    const x = Math.sin(theta);
    const y = Math.cos(theta);
    const center = this.left.center;
    const scale = 300;

    // Line
    this.ctx.beginPath();
    this.ctx.moveTo(center.x, center.y);
    this.ctx.lineTo(center.x + x * scale, center.y + y * scale);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Bob
    this.ctx.beginPath();
    this.ctx.arc(center.x + x * scale, center.y + y * scale, scale/30, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  drawPhaseHistory() {
    const center = this.upperRight.center;
    const scale = (this.upperRight.width - 10) / (4*Math.PI);
    const { theta, omega } = this.simulation;
    this.clearUpperRight();

    this.ctx.beginPath();
    var [lastT, lastO] = [theta, omega];
    for (let i = 1; i < this.simulation.historySize; i++) {
      const [thisT, thisO] = [
        this.simulation.theta_idx(i),
        this.simulation.omega_idx(i)
      ];
      const [x, y] = [thisT * scale + center.x, thisO * scale + center.y];
      if ((lastO > 0 && thisT - lastT > 0) || (lastO < 0 && thisT - lastT < 0) ) {
        // Dont connect wrapped points
        this.ctx.stroke();
        this.ctx.beginPath();
      }
      this.drawPhasePoint(x, y, {connect: true});
      [lastT, lastO] = [thisT, thisO];
    }
    this.ctx.stroke();

    const [x, y] = [theta * scale + center.x, omega * scale + center.y];
    this.drawPhasePoint(x, y, {current: true});
  }

  drawPhasePoint(x: number, y: number, {current = false, connect = false}) {
    const scale = this.upperRight.width / 100;
    if (current) {
      this.ctx.strokeStyle = 'red';
      this.ctx.fillStyle = 'red';
      var size = scale;
    } else {
      this.ctx.strokeStyle = 'black';
      this.ctx.fillStyle = 'black';
      var size = scale/10;
    }
    if (current) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    } else {
      this.ctx.lineWidth = 1;
      this.ctx.lineTo(x, y);
    }

  }
}