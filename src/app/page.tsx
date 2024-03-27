import { getDailyQuote } from "@/server/quote";
import { getUnsplashPhoto } from "@/server/unsplash";
import { PhotoCarousel } from "./_components/photos";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { QuoteIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Header from "./_components/header";

export default async function Page() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div id="content" className="my-auto m-10">
        <div className="text-center">
          <blockquote className="italic text-xl font-bold">
            &quot;{quote.q}&quot;
          </blockquote>
          -<cite>{quote.a}</cite>
        </div>
        <div className="flex justify-center items-center m-10">
          <PhotoCarousel photos={photos} photoSize={150} />
        </div>
      </div>
    </main>
  );
}
