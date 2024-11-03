import { Annotation } from "../store/useImageAnnotationStore";



export const getCategories = async () => {
  const response = await fetch("https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories");
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response;
};

export const getUnalyzedImages = async () => {
  const response = await fetch("https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images");
  if (!response.ok) throw new Error('Failed to fetch unanalyzed images');
  return response;
};

export const postAnnotation = async ({ data: annotation }: { data: Annotation }) => {
  const response = await fetch("https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(annotation),
  });
  if (!response.ok) throw new Error('Failed to post annotation');
  return response
};