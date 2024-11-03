import { immer } from "zustand/middleware/immer";
import { create } from "zustand"
import { getCategories, getUnalyzedImages, postAnnotation } from "../services/annotationService";

export type BoundingBoxes = {
  topLeftX: number,
  topLeftY: number,
  width: number,
  height: number
}

export type Annotation = {
  imageId?: number,
  annotations: {
    categoryId?: number,
    boundingBoxes?: BoundingBoxes[]
  }[]
}

interface ImageAnnotation {
  queuedImages: { id: number, url: string }[]
  categories: { id: number, name: string }[]
  fetchInitialData: () => void
  annotation: Annotation
  setCategory: (id: number) => void
  setboundingBoxes: (boundingBoxes: BoundingBoxes) => void
  setAnnotationImage: (id: number) => void
  discart: () => void
  confirm: () => void
  removeActualImageAnnotation: () => void
  setNewImageAnnotation: () => void
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
        state.annotation.annotations[0] = {
          ...state.annotation.annotations[0],
          boundingBoxes: [boundingBoxes]
        }
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
        getUnalyzedImages(),
        getCategories()
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
      const annotation = get().annotation;
      if (annotation.imageId === undefined) {
        return;
      }
      const response = await postAnnotation({ data: annotation })

      if (response.status === 200) {
        get().removeActualImageAnnotation()
        get().setNewImageAnnotation();
      }
    },
    async confirm () {
      const annotation = get().annotation;
      if (annotation.imageId === undefined) {
        return;
      }

      const response = await postAnnotation({ data: annotation })

      if (response.status === 200) {
        get().removeActualImageAnnotation()
        get().setNewImageAnnotation();
      }
    },

    removeActualImageAnnotation () {
      set((state) => {
        state.queuedImages = state.queuedImages.filter(({ id }) => id !== state.annotation.imageId);
      })
    },

    setNewImageAnnotation () {
      set((state) => {
        state.annotation = {
          annotations: [],
          imageId: state.queuedImages.length >= 1 ? state.queuedImages[0].id : undefined
        }
      })
    }
  }))
);