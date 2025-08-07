export function arcArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  anticlockwise?: boolean
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  ctx.stroke();

  if (startAngle !== endAngle) {
    const scale = radius / 10;
    const ex = Math.cos(endAngle) * radius + x;
    const ey = Math.sin(endAngle) * radius + y;
    const tangentAngle = Math.atan2(x - ex, ey - y);
    let x1, y1, x2, y2;
    if (anticlockwise) {
      x1 = ex - scale * Math.cos(tangentAngle + 0.5);
      y1 = ey - scale * Math.sin(tangentAngle + 0.5);
      x2 = ex - scale * Math.cos(tangentAngle - 0.5);
      y2 = ey - scale * Math.sin(tangentAngle - 0.5);
    } else {
      x1 = ex + scale * Math.cos(tangentAngle + 0.5);
      y1 = ey + scale * Math.sin(tangentAngle + 0.5);
      x2 = ex + scale * Math.cos(tangentAngle - 0.5);
      y2 = ey + scale * Math.sin(tangentAngle - 0.5);
    }
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(ex, ey);
    ctx.fill();
  }
}
