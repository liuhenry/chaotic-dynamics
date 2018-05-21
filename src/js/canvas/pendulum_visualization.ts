import Canvas from './canvas';
import { arcArrow } from './utils';


export default class PendulumVisualization extends Canvas {
  simulation: module.PendulumSimulation;
  running: boolean;
  animationID?: number;
  speed: number;
  damping: number;
  driveAmplitude: number;
  driveFrequency: number;

  constructor(canvas: HTMLCanvasElement, simulation: module.PendulumSimulation) {
    super(canvas);
    this.simulation = simulation;
    this.running = false;
    this.speed = 1;
    this.damping = 0;
    this.driveAmplitude = 0;
    this.driveFrequency = 0;
  }

  initialize() {
    this.clearAll();
    this.drawBoundaries();
    this.drawPendulum();
    this.drawPhaseHistory();
    this.drawPoincareSection();

  }

  start() {
    this.running = true;
    this.animationID = this.tick();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animationID as number);
  }

  setSpeed(speed: number) {
    this.speed = speed * 5;
  }

  setParameters(damping: number, driveAmplitude: number, driveFrequency: number) {
    this.damping = damping;
    this.driveAmplitude = driveAmplitude;
    this.driveFrequency = driveFrequency;
    this.simulation.clear_poincare();
  }

  tick(): number | undefined {
    this.clearAll();
    this.drawBoundaries();
    this.drawPhaseHistory();
    this.drawPoincareSection();
    this.drawPendulum();

    this.simulation.tick(this.speed, this.damping, this.driveAmplitude, this.driveFrequency);
    if (this.running) {
      return requestAnimationFrame(() => { this.tick() });
    } else {
      return undefined;
    }
  }

  drawPendulum() {
    const { theta, omega, drive } = this.simulation;
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
    this.ctx.arc(center.x + x * scale, center.y + y * scale, scale/30, 0, 2*Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.strokeStyle = 'black';
    this.ctx.fill();
    this.ctx.stroke();

    // Drive
    const ccw = drive > 0 ? true : false;
    this.ctx.strokeStyle = 'blue';
    this.ctx.fillStyle = 'blue';
    arcArrow(this.ctx, center.x, center.y, scale/2, 0.5*Math.PI, -drive*Math.PI + 0.5*Math.PI, ccw);
  }

  drawPhaseHistory() {
    const center = this.upperRight.center;
    const scale = (this.upperRight.width - 10) / (2*Math.PI);
    const { theta, omega } = this.simulation;

    this.drawAxes(this.upperRight, Math.PI, 0.5*Math.PI);

    this.ctx.beginPath();
    var [lastT, lastO] = [theta, omega];
    for (let i = 1; i < this.simulation.historySize; i++) {
      const [thisT, thisO] = [
        this.simulation.theta_idx(i),
        this.simulation.omega_idx(i)
      ];
      const [x, y] = [thisT * scale + center.x, -thisO * scale + center.y];
      if ((lastO > 0 && thisT - lastT > 0) || (lastO < 0 && thisT - lastT < 0) ) {
        // Dont connect wrapped points
        this.ctx.stroke();
        this.ctx.beginPath();
      }
      [lastT, lastO] = [thisT, thisO];
      if (Canvas.outOfBounds(x, y, this.upperRight)) {
        continue;
      }
      this.drawPhasePoint(x, y, {connect: true});
    }
    this.ctx.stroke();

    const [x, y] = [theta * scale + center.x, -omega * scale + center.y];
    if (!Canvas.outOfBounds(x, y, this.upperRight)) {
      this.drawPhasePoint(x, y, {current: true});
    }
  }

  drawPoincareSection() {
    const center = this.lowerRight.center;
    const scale = (this.lowerRight.width - 10) / (2*Math.PI);
    this.drawAxes(this.lowerRight, Math.PI, 0.5*Math.PI);

    for (let i = 0; i < this.simulation.poincareSize; i++) {
      const [thisT, thisO] = [
        this.simulation.poincare_theta(i),
        this.simulation.poincare_omega(i)
      ];
      const [x, y] = [thisT * scale + center.x, -thisO * scale + center.y];
      if (Canvas.outOfBounds(x, y, this.lowerRight)) {
        continue;
      }
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.lowerRight.width/500, 0, 2*Math.PI);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
    }
    if (this.simulation.poincareSize) {
      const [ theta, omega ] = [
        this.simulation.poincare_theta(0),
        this.simulation.poincare_omega(0)];
      const [x, y] = [theta * scale + center.x, -omega * scale + center.y];
      if (!Canvas.outOfBounds(x, y, this.lowerRight)) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.lowerRight.width/100, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
      }
    }
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