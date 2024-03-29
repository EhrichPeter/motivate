import { UnsplashPhoto, UnsplashSearchResponse } from "./models";

export async function getUnsplashPhoto(
  query: string,
  revalidate: number,
  page?: number,
  per_page?: number
): Promise<UnsplashPhoto[]> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=${per_page}&orientation=squarish`,
      { next: { revalidate } }
    );
    const data: UnsplashSearchResponse = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch daily picture");
  }
}
