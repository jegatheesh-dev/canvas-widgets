import { createCanvas, drawPath, percentToVal, resetShadow } from "./utils";

export function createClock({ containerId, width, height, className = "" }: { containerId: string; width: number; height: number; className?: string; }) {
  const container = document.getElementById(containerId); // returned value can either be a HTMLElement or null;
  if (container) {
    const canvas = createCanvas({ width, height, className });
    container.append(canvas);
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;

    function draw() {
      const RAD = CANVAS_WIDTH / 3; // radius of the clock
      const X = CANVAS_WIDTH / 2;
      const Y = CANVAS_WIDTH / 2;
      const RAIL_WIDTH = percentToVal(CANVAS_WIDTH, 3.33);
      ctx.beginPath();
      ctx.arc(X, Y, RAD, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.shadowColor = "rgba(98, 207, 255, 0.54)";
      ctx.shadowBlur = 50;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 20;
      ctx.fillStyle = "#fff";
      ctx.closePath();
      ctx.fill();

      resetShadow(ctx);

      // x = radius * cos(degrees), y = radius * sin(degrees)
      for (let i = 1; i <= 60; i++) {
        const IS_HIGHLIGHT = (i % 3) === 0;
        const IS_HOUR = (i % 5) === 0;
        ctx.beginPath();
        ctx.moveTo(
          ((RAD - RAIL_WIDTH) * Math.cos(((Math.PI * 2) / 60) * i)) + X,
          ((RAD - RAIL_WIDTH) * Math.sin(((Math.PI * 2) / 60) * i)) + Y
        );
        ctx.lineTo(
          (IS_HOUR ? (IS_HIGHLIGHT ? percentToVal(RAD, 80) : percentToVal(RAD, 80)) : percentToVal(RAD, 85)) * Math.cos(((Math.PI * 2) / 60) * i) + X,
          (IS_HOUR ? (IS_HIGHLIGHT ? percentToVal(RAD, 80) : percentToVal(RAD, 80)) : percentToVal(RAD, 85)) * Math.sin(((Math.PI * 2) / 60) * i) + Y
        );
        ctx.strokeStyle = IS_HOUR ? (IS_HIGHLIGHT ? "black" : "black") : "grey";
        ctx.lineWidth =  IS_HOUR ? (IS_HIGHLIGHT ? percentToVal(CANVAS_WIDTH, 1) : percentToVal(CANVAS_WIDTH, 1)) : percentToVal(CANVAS_WIDTH, 0.5);
        ctx.closePath();
        ctx.stroke();
      }
      const date = new Date();
      const hrs = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();

      // small hand
      {
        const oneHrInRadian = (Math.PI * 2) / 12;
        const oneMinInRadian = oneHrInRadian / 60;
        drawPath({
          ctx,
          x1: X,
          y1: Y,
          x2: (percentToVal(RAD, 45) * Math.cos(((oneHrInRadian * hrs) + (oneMinInRadian * min)) - (oneHrInRadian * 3))) + X,
          y2: (percentToVal(RAD, 45) * Math.sin(((oneHrInRadian * hrs) + (oneMinInRadian * min)) - (oneHrInRadian * 3))) + Y,
          strokeStyle: "grey",
          lineWidth: percentToVal(CANVAS_WIDTH, 1.5)
        });
      }

      // long hand
      {
        const oneMinInRadian = (Math.PI * 2) / 60;
        drawPath({
          ctx,
          x1: X,
          y1: Y,
          x2: (percentToVal(RAD, 60) * Math.cos((oneMinInRadian * min) - (oneMinInRadian * 15))) + X,
          y2: (percentToVal(RAD, 60) * Math.sin((oneMinInRadian * min) - (oneMinInRadian * 15))) + Y,
          strokeStyle: "grey",
          lineWidth: percentToVal(CANVAS_WIDTH, 1.5)
        });

        ctx.beginPath();
        ctx.arc(X, Y, percentToVal(RAD, 8), 0, Math.PI * 2);
        ctx.fillStyle = "grey";
        ctx.closePath();
        ctx.fill();
      }

      // seconds hand
      {
        const oneSecInRadian = (Math.PI * 2) / 60;
        drawPath({
          ctx,
          x1: X + (percentToVal(RAD, 15) * Math.cos(Math.PI + ((oneSecInRadian * sec) - (oneSecInRadian * 15)))),
          y1: Y + (percentToVal(RAD, 15) * Math.sin(Math.PI + ((oneSecInRadian * sec) - (oneSecInRadian * 15)))),
          x2: X + (percentToVal(RAD, 70) * Math.cos((oneSecInRadian * sec) - (oneSecInRadian * 15))),
          y2: Y + (percentToVal(RAD, 70) * Math.sin((oneSecInRadian * sec) - (oneSecInRadian * 15))),
          strokeStyle: "orange",
          lineWidth: percentToVal(CANVAS_WIDTH, 1)
        });

        ctx.beginPath();
        ctx.arc(X, Y, percentToVal(RAD, 4), 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.closePath();
        ctx.fill();
      }
    }
    draw();
    setInterval(() => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      draw();
    }, 1000)
  }

  return false;
}

export default createClock;
