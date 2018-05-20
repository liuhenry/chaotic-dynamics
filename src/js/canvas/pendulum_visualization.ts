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

    // Line
    this.ctx.beginPath();
    this.ctx.moveTo(250, 200);
    this.ctx.lineTo(250 + x * 150, 200 + y * 150);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    // Bob
    this.ctx.beginPath();
    this.ctx.arc(250 + x * 150, 200 + y * 150, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  drawPhaseHistory() {
    const { theta, omega } = this.simulation;
    const [x, y] = [theta * 25 + 650, omega * 25 + 125];
    this.clearUpperRight();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    for (let i = 1; i < this.simulation.historySize; i++) {
      const [x, y] = [
        this.simulation.theta_idx(i) * 25 + 650,
        this.simulation.omega_idx(i) * 25 + 125
      ];
      this.drawPhasePoint(x, y, {connect: true});
    }
    this.ctx.stroke();
    this.drawPhasePoint(x, y, {current: true});
  }

  drawPhasePoint(x: number, y: number, {current = false, connect = false}) {
    if (current) {
      this.ctx.strokeStyle = 'black';
      this.ctx.fillStyle = 'black';
      var size = 2;
    } else {
      this.ctx.strokeStyle = 'red';
      this.ctx.fillStyle = 'red';
      var size = 0.1;
    }
    if (current) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    } else {
      this.ctx.lineTo(x, y);
    }

  }
}