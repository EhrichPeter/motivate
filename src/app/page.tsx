import { getDailyQuote } from "@/server/quote";
import { getUnsplashPhoto } from "@/server/unsplash";
import { PhotoCarousel } from "./_components/photos";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { QuoteIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Page() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="fixed top-0 left-0 w-full z-10 h-12 border">
        <div className="flex container h-full items-center justify-between">
          <div className="flex items-center gap-2">
            <QuoteIcon size={24} />
            <h1 className="text-xl font-bold">quote</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/EhrichPeter/motivate"
              target="_blank" // Add target="_blank" to open link in new window
            >
              <GitHubLogoIcon height={24} width={24} />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

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
