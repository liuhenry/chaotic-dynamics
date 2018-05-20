import Canvas from './canvas';


export default class PendulumVisualization extends Canvas {
  simulation: module.PendulumSimulation;
  running: boolean;
  animationID?: number;

  constructor(canvas: HTMLCanvasElement, simulation: module.PendulumSimulation) {
    super(canvas);
    this.simulation = simulation;
    this.running = false;
  }

  initialize() {
    this.clearAll();
    this.drawBoundaries();
  }

  start({damping}: {damping: number}) {
    this.running = true;
    this.animationID = this.tick({damping});
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animationID);
  }

  tick({damping}: {damping: number}): number | undefined {
    this.clearLeft();

    this.drawPendulum();
    this.drawPhaseHistory();

    this.simulation.tick(damping);
    if (this.running) {
      return requestAnimationFrame(() => { this.tick({damping}) });
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
    this.clearUpperRight();
    for (let i = this.simulation.historySize; i > 0; i--) {
      this.drawPhasePoint(this.simulation.theta_idx(i), this.simulation.omega_idx(i));
    }
    this.drawPhasePoint(theta, omega, true);
  }

  drawPhasePoint(theta: number, omega: number, current = false) {
    this.ctx.beginPath();
    if (current) {
      this.ctx.strokeStyle = 'black';
      this.ctx.fillStyle = 'black';
      this.ctx.arc(theta * 25 + 650, omega * 25 + 125, 2, 0, 2 * Math.PI);
    } else {
      this.ctx.strokeStyle = 'red';
      this.ctx.fillStyle = 'red';
      this.ctx.arc(theta * 25 + 650, omega * 25 + 125, 0.1, 0, 2 * Math.PI);
    }
    this.ctx.fill();
    this.ctx.stroke();
  }
}