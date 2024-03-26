import { getDailyQuote } from "@/server/quote";
import { getUnsplashPhoto } from "@/server/unsplash";
import Image from "next/image";

export default async function Page() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photo = await getUnsplashPhoto(quote.q, HOUR);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div id="content" className="my-auto">
        <div className="text-center">
          <blockquote className="italic text-2xl font-bold">
            &quot;{quote.q}&quot;
          </blockquote>
          -<cite>{quote.a}</cite>
        </div>
        <div className="flex justify-center mt-8"> {/* Add margin top */}
          <Image
            src={photo.urls.regular}
            alt={photo.description}
            width={300}
            height={300}
            className="rounded-full shadow-xl"
          />
        </div>
      </div>

      <footer className="mt-auto text-center text-sm text-gray-500 m-10 md:m-24">
        <p>
          Inspirational quotes provided by{" "}
          <a className="underline" href="https://zenquotes.io/" target="_blank">
            ZenQuotes API
          </a>
        </p>
        <p>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Peter Ehrich
        </p>
      </footer>
    </main>
  );
}
