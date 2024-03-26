import { getDailyQuote } from "@/server/quote";
import { getUnsplashPhoto } from "@/server/unsplash";
import { PhotoCarousel } from "./_components/photos";

export default async function Page() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 10);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div id="content" className="my-auto m-10">
        <div className="text-center">
          <blockquote className="italic text-2xl font-bold">
            &quot;{quote.q}&quot;
          </blockquote>
          -<cite>{quote.a}</cite>
        </div>
        <div className="flex justify-center m-10"> 
          <PhotoCarousel photos={photos} />
        </div>
      </div>
    </main>
  );
}
