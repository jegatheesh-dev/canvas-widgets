/**
 * Utility for createing a canvas element with the given attributes
 * @param param0 
 */
export function createCanvas({ className, width, height }: { className?: string; width: number; height: number; }) {
  const canvas = document.createElement("canvas"); 
  canvas.width = width;
  canvas.height = height;
  className && canvas.classList.add(className);
  return canvas;
}

export function resetShadow(ctx: CanvasRenderingContext2D | null) {
  if (ctx) {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }
}

/**
 * Calculate the value for the given percent and the total
 * @param total 
 * @param percent 
 * @returns 
 */
export function percentToVal(total: number, percent: number) {
  return (total / 100) * percent;
}

export function drawPath({ ctx, x1, y1, x2, y2, lineWidth, strokeStyle }: { ctx: CanvasRenderingContext2D | null, x1: number, y1: number, x2: number, y2: number, lineWidth: number, strokeStyle?: string }) {
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
  }
  if (lineWidth) {
    ctx.lineWidth = lineWidth;
  }
  ctx.closePath();
  ctx.stroke();
}
