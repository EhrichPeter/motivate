"use client";

import { toggleBookmark } from "@/server/bookmarks/actions";
import { QuoteWithBookMark } from "@/server/quotes/models";
import { BookmarkCheckIcon, BookmarkIcon } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";


const QuoteCard = (props: QuoteWithBookMark) => {
  const { id, picture_alt, picture_link, author, quote, bookmarked } = props;
  const { toast } = useToast();

  const { execute, status, optimisticData } = useOptimisticAction(toggleBookmark, bookmarked, () => { return !bookmarked }, {
    onSuccess: (new_is_bookmarked) => {
      if (new_is_bookmarked) {
        toast({
          variant: "default",
          title: "Bookmark set!",
          description: "You have bookmarked this quote.",
        });
      } else {
        toast({
          variant: "default",
          title: "Bookmark removed!",
          description: "You have removed the bookmark from this quote.",
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.serverError}`,
      });
    }
  });

  return (
    <div className="text-center relative rounded-xl w-full md:w-1/2 border shadow-lg">
      <Image
        src={picture_link}
        alt={picture_alt}
        width={500}
        height={100}
        className="absolute inset-0 object-cover w-full h-full opacity-50 rounded-xl"
      />

      <div className="flex flex-col p-14">
        <blockquote className="italic text-xl font-bold">
          &quot;{quote}&quot;
        </blockquote>
        -<cite>{author}</cite>
      </div>

      <Button variant="ghost" className="absolute bottom-2 right-2" onClick={() => execute({ quote_id: id })} disabled={status === "executing"}>
        {optimisticData ? <BookmarkCheckIcon /> : <BookmarkIcon />}
      </Button>
    </div>
  );
};

export default QuoteCard;
