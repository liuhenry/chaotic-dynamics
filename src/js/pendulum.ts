import * as CanvasUtils from './canvas/utils';

function tick(canvas: HTMLCanvasElement, s: module.Simulation): void {
  const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
  const canw = canvas.width;
  const canh = canvas.height;
  
  const {theta, omega} = s;
  console.log('tick');
  if (theta == null || omega == null) {
    throw("Mission simulation properties!");
  }
  
  CanvasUtils.clearAll(ctx);
  
  // Phase diagram, upper right
  ctx.beginPath();
  ctx.arc(theta * 25 + 650, omega * 25 + 125, 1, 0, 2*Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.strokeStyle = 'red';
  ctx.stroke();

  CanvasUtils.drawPendulum(ctx, Math.sin(theta), Math.cos(theta));
  s.tick();
  
  requestAnimationFrame(() => { tick(canvas, s) });
}

(window as any).Module = {
  onRuntimeInitialized(): void {
    const canvas1 = <HTMLCanvasElement> document.getElementById('canvas1');
    CanvasUtils.prepCanvas(canvas1);

    const p1 = new (window as any).Module.DampedPendulum(45 * Math.PI / 180);
    tick(canvas1, p1);
  }
};