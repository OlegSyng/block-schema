import useCanvas from "../../hooks/useCanvas";

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
  width: number;
  className?: string;
}

function Canvas({ draw, width, className }: CanvasProps) {
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} width={width} height={30} className={className} />;
}

export default Canvas;
