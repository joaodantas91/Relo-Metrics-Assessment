import { ReactEventHandler, useLayoutEffect, useRef, useState } from "react";

type ImageAreaSelectorProps = {
  src: string
}

export function ImageAreaSelector ({ src }: ImageAreaSelectorProps) {

  const imageRef = useRef<HTMLImageElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (selectionCanvasRef.current) {
      const selectionCanvasContext = selectionCanvasRef.current.getContext("2d");

      if (!selectionCanvasContext) {
        throw new Error(`2d context not supported or canvas already initialized`);
      }
      let origin: { x: number, y: number } | null = null;

      selectionCanvasRef.current.onmousedown = e => { origin = { x: e.offsetX, y: e.offsetY }; };

      window.onmouseup = () => { origin = null; };
      selectionCanvasRef.current.onmousemove = e => {
        if (origin) {
          selectionCanvasContext.strokeStyle = "#ff0000";
          selectionCanvasContext.fillStyle = "rgba(255, 0, 0, 0.15)"
          selectionCanvasContext.clearRect(0, 0, selectionCanvasRef.current!.width, selectionCanvasRef.current!.height);
          selectionCanvasContext.beginPath();
          selectionCanvasContext.fillRect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y);

          selectionCanvasContext.strokeRect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y);
        }
      };
    }
  }, [rect])

  const onImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    setRect(e.currentTarget.getBoundingClientRect())
  }

  return (
    <div className="image-container">
      {src?.length > 0 &&
        <>
          <canvas id="c2" ref={selectionCanvasRef} width={rect?.width} height={rect?.height}></canvas>
          <img
            onLoad={onImageLoad}
            ref={imageRef}
            src={src}
            alt="Placeholder for uploaded image"
          />
        </>
      }

    </div>
  )
}