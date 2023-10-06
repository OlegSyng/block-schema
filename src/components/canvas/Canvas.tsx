import useCanvas from "../../hooks/useCanvas";
import classes from "./Canvas.module.css";

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
  width: number;
  className?: string;
}

function Canvas({ draw, width, className }: CanvasProps) {
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} width={width} height={30} className={classes.container} />;
}

export default Canvas;
