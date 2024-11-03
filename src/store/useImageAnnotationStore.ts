import { immer } from "zustand/middleware/immer";
import { create } from "zustand"

type BoundingBoxes = [{
  topLeftX: number,
  topLeftY: number,
  width: number,
  height: number
}]

interface ImageAnnotation {
  queuedImages: { id: number, url: string }[]
  categories: { id: number, name: string }[]
  fetchInitialData: () => void
  annotation: {
    imageId?: number,
    annotations: {
      categoryId?: number,
      boundingBoxes?: BoundingBoxes
    }[]
  },
  setCategory: (id: number) => void,
  setboundingBoxes: (boundingBoxes: BoundingBoxes) => void,
  setAnnotationImage: (id: number) => void,
  discart: () => void
  confirm: () => void
}

export const useImageAnnotationStore = create<ImageAnnotation>()(
  immer((set, get) => ({
    annotation: {
      annotations: []
    },
    queuedImages: [],
    categories: [],
    setCategory (id: number) {
      set((state) => {
        state.annotation.annotations[0] = {
          ...state.annotation.annotations[0],
          categoryId: id
        };
      })
    },
    setboundingBoxes (boundingBoxes: BoundingBoxes) {
      set((state) => {
        state.annotation.annotations[0].boundingBoxes = boundingBoxes
      })
    },
    setAnnotationImage (id: number) {
      set((state => {
        state.annotation = {
          imageId: id,
          annotations: []
        }
      }))
    },
    async fetchInitialData () {
      const [images, categories] = await Promise.all([
        fetch("https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images"),
        fetch("https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories"),
      ]).then(async (res) => {
        return Promise.all(
          res.map(async (data) => await data.json())
        )
      })
      set({
        queuedImages: images,
        categories,
        annotation: {
          imageId: images[0].id,
          annotations: []
        }
      })
    },
    async discart () {
      const response = await fetch(
        "https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotationsd",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(get().annotation)
        }
      );

      if (response.status === 200) {
        set((state) => {
          state.queuedImages = state.queuedImages.filter(({ id }) => id !== state.annotation.imageId)

          state.annotation = {
            annotations: [],
            imageId: state.queuedImages[0].id
          }

        })

      }
    },
    confirm () {
      console.log("confirm")
    },
  }))
);