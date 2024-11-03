import { useImageAnnotationStore } from "../../store/useImageAnnotationStore";

export function ImageQueue () {

  const { queuedImages, setAnnotationImage, annotation } = useImageAnnotationStore();
  return (
    <div className="image-queue">
      <h2>Next images in queue:</h2>
      <ul className="queue-list">
        {queuedImages.map((item) => (
          <li className="queue-item" key={item.id}>
            <button onClick={() => {
              if (item.id === annotation.imageId) {
                return
              }
              setAnnotationImage(item.id)
            }}>
              <img src={item.url} alt="" />
              Image {item.id}
            </button>

          </li>
        ))}
      </ul>
    </div>
  )
}