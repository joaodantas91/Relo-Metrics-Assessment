import { useEffect, useMemo } from 'react';
import './App.css'
import { ImageAreaSelector } from './components/ImageAreaSelector'
import { useImageAnnotationStore } from './store/useImageAnnotationStore'
import { ImageQueue } from './components/ImageQueueSelector';
import { CategorySelector } from './components/CategorySelector';

function App () {
  const { fetchInitialData, annotation, queuedImages, confirm, discart } = useImageAnnotationStore();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData])

  useEffect(() => {
    console.log(annotation);
  }, [annotation])

  const selectingImageUrl = useMemo(() => {
    return queuedImages.filter(img => img.id === annotation.imageId)[0]?.url
  }, [annotation.imageId, queuedImages])

  return (
    <><div className="main-content">
      <h1>Image Analyzer</h1>
      <div className="analyzer-container">

        <ImageAreaSelector src={selectingImageUrl} />

        <div className="sidebar">


          <CategorySelector />

          <div className="buttons">

            <button
              type="button"
              onClick={() => {
                discart()
              }}
            >
              Discard
            </button>

            <button
              type="button"
              disabled={
                annotation.annotations[0]?.categoryId === undefined ||
                !annotation.annotations[0].boundingBoxes ||
                !(annotation.annotations[0].boundingBoxes.length > 0)
              }
              onClick={() => {
                confirm()
              }}
            >Confirm</button>
          </div>
        </div>
      </div>
      <ImageQueue />
    </div>
    </>
  )
}

export default App
