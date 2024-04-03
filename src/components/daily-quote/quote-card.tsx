"use client";

import { toggleBookmark } from "@/server/bookmarks/actions";
import { QuoteWithBookMark } from "@/server/quotes/models";
import { BookmarkCheckIcon, BookmarkIcon } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import dayjs from "dayjs";
import { Badge } from "../ui/badge";
import { StoryDialog } from "./story-dialog";
import Link from "next/link";

dayjs().format();

const QuoteCard = (props: QuoteWithBookMark) => {
  const {
    id,
    picture_alt,
    picture_link,
    author,
    quote,
    bookmarked,
    created_at,
    bookmarks,
    story,
    headline,
  } = props;
  const { toast } = useToast();

  const { execute, status, optimisticData } = useOptimisticAction(
    toggleBookmark,
    bookmarked,
    () => {
      return !bookmarked;
    },
    {
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
      },
    }
  );

  return (
    <div className="text-center relative w-full md:w-1/2">
      <Link href={`/quote/${id}`}>
        <Image
          src={picture_link}
          alt={picture_alt}
          width={500}
          height={100}
          className="absolute inset-0 object-cover w-full h-full opacity-50 rounded border shadow hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        />
      </Link>

      <div className="flex flex-col p-14 pb-20">
        <blockquote className="italic text-xl font-bold">
          &quot;{quote}&quot;
        </blockquote>
        -<cite>{author}</cite>
      </div>

      <div className="absolute bottom-2 right-2">
        {/* <StoryDialog story={story ?? quote} headline={headline ?? author} /> */}
        <Button
          variant="ghost"
          onClick={() => execute({ quote_id: id })}
          disabled={status === "executing"}
        >
          {optimisticData ? <BookmarkCheckIcon /> : <BookmarkIcon />}
        </Button>
      </div>

      <div className="flex gap-2 absolute bottom-4 left-4 text-sm">
        <Badge>{dayjs(created_at).format("DD.MM.YYYY")}</Badge>
        <Badge>
          <BookmarkIcon size={10} /> {bookmarks.length}
        </Badge>
      </div>
    </div>
  );
};

export default QuoteCard;
