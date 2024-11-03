import { ReactEventHandler, useLayoutEffect, useRef, useState } from "react";
import { BoundingBoxes, useImageAnnotationStore } from "../../store/useImageAnnotationStore";

type ImageAreaSelectorProps = {
  src: string
}

export function ImageAreaSelector ({ src }: ImageAreaSelectorProps) {
  const { setboundingBoxes } = useImageAnnotationStore();

  const imageRef = useRef<HTMLImageElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [rect, setRect] = useState<DOMRect & {
    naturalWidth: number,
    naturalHeight: number
  } | null>(null);

  useLayoutEffect(() => {
    if (selectionCanvasRef.current) {
      const selectionCanvasContext = selectionCanvasRef.current.getContext("2d");

      if (!selectionCanvasContext) {
        throw new Error(`2d context not supported or canvas already initialized`);
      }
      let origin: { x: number, y: number } | null = null;
      let lastMousePostion: { x: number, y: number } | null = null;

      selectionCanvasRef.current.onmousedown = e => { origin = { x: e.offsetX, y: e.offsetY }; };
      selectionCanvasRef.current.onmousemove = e => {
        if (origin) {
          selectionCanvasContext.strokeStyle = "#ff0000";
          selectionCanvasContext.fillStyle = "rgba(255, 0, 0, 0.15)"
          selectionCanvasContext.clearRect(0, 0, selectionCanvasRef.current!.width, selectionCanvasRef.current!.height);
          selectionCanvasContext.beginPath();
          selectionCanvasContext.fillRect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y);

          selectionCanvasContext.strokeRect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y);
          lastMousePostion = { x: e.offsetX, y: e.offsetY }
        }
      };

      window.onmouseup = () => {

        if (origin && lastMousePostion && rect) {
          const boundingBoxes = {
            topLeftX: Math.max(Math.min(origin.x, lastMousePostion.x), 0),
            topLeftY: Math.max(Math.min(origin.y, lastMousePostion.y), 0),
            height: Math.abs(lastMousePostion.y - origin.y),
            width: Math.abs(lastMousePostion.x - origin.x)
          }
          setboundingBoxes(transformSelectionToOriginalImageSize(boundingBoxes))

        }
        origin = null;
      };


    }
  }, [rect])

  const onImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    setRect(
      Object.assign(e.currentTarget.getBoundingClientRect(),
        {
          naturalWidth: e.currentTarget.naturalWidth,
          naturalHeight: e.currentTarget.naturalHeight
        }
      )
    )
  }

  function transformSelectionToOriginalImageSize (boundingBoxes: BoundingBoxes) {

    Object.entries(boundingBoxes).forEach(([key, value]) => {
      boundingBoxes[key as keyof BoundingBoxes] = Math.round((value * (rect!.naturalWidth / rect!.width)) * 100) / 100
    })

    return boundingBoxes;

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