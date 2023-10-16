import React, { useState, useEffect } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

type DragProps = {
  onDragMove: (event: PointerEvent<HTMLDivElement>) => void;
  style: CSSProperties;
  children: ReactNode;
};

function Drag({ onDragMove, style, children }: DragProps) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handlePointerUpGlobal: EventListener = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handlePointerMoveGlobal: EventListener = (event) => {
      if (isDragging) {
        onDragMove(event as unknown as PointerEvent<HTMLDivElement>);
      }
    };

    window.addEventListener("pointerup", handlePointerUpGlobal);
    window.addEventListener("pointermove", handlePointerMoveGlobal);

    return () => {
      window.removeEventListener("pointerup", handlePointerUpGlobal);
      window.removeEventListener("pointermove", handlePointerMoveGlobal);
    };
  }, [isDragging, onDragMove]);

  function handlePointerDown() {
    setIsDragging(true);
  }

  return (
    <div onPointerDown={handlePointerDown} style={style}>
      {children}
    </div>
  );
}

export default Drag;
