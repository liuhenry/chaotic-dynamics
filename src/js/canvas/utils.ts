

export function prepCanvas(canvas: HTMLCanvasElement): void {
  const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
  ctx.clearRect(0, 0, 800, 500);

  ctx.beginPath();
  ctx.moveTo(500, 0);
  ctx.lineTo(500, 500);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(500, 250);
  ctx.lineTo(800, 250);
  ctx.stroke();
}

export function clearLeft(ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, 499, 499);
}

export function clearUpperRight(ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(501, 0, 299, 249);
}

export function clearLowerRight(ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(501, 251, 299, 249);
}

export function clearAll(ctx: CanvasRenderingContext2D): void {
  clearLeft(ctx);
  clearUpperRight(ctx);
  clearLowerRight(ctx);
}

export function drawPendulum(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.beginPath();
  ctx.moveTo(250, 200);
  ctx.lineTo(250 + x * 150, 200 + y * 150);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(250 + x * 150, 200 + y * 150, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
}
