import { findOneById } from "@/server/quotes/queries";
import QuoteCard from "@/components/daily-quote/quote-card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function Post({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const quote = await findOneById(Number(id));

  return (
    <main className="flex min-h-screen flex-col items-center container py-4">
      <div className="fixed left-5 top-5">
        <Link href="/">
          <Button variant={"ghost"}>
            <ChevronLeftIcon className="h-6 w-6" />
            <p>Back</p>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-16 pt-16 w-full">
        <QuoteCard {...quote} />
        <div className="w-full md:w-1/2">
          <h1 className="text-xl font-bold">{quote.headline}</h1>
          <p>{quote.story}</p>
        </div>
      </div>
    </main>
  );
}
