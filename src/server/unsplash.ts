export type UnsplashSearchResponse = {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
};

export type UnsplashPhoto = {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: UnsplashUser;
  current_user_collections: any[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
  };
};

export type UnsplashUser = {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
  };
};

export async function getUnsplashPhoto(query: string, revalidate: number): Promise<UnsplashPhoto> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=1&orientation=squarish`,
      { next: { revalidate } }
    );
    const data: UnsplashSearchResponse = await res.json();
    return data.results[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch daily picture");
  }
}
