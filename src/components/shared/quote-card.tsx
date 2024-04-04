"use client";

import { toggleBookmark } from "@/server/bookmarks/actions";
import { QuoteWithBookMark } from "@/server/quotes/models";
import { BookmarkCheckIcon, BookmarkIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { Badge } from "../ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  } = props;

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["quotes"],
    mutationFn: () => toggleBookmark({ quote_id: id }),
    onSuccess: ({ data: new_state, serverError }) => {
      if (serverError) {
        toast("Almost there!", {
          description: serverError,
        });
      } else {
        if (new_state) {
          toast("Bookmark set!", {
            description: "You have bookmarked this quote.",
          });
        } else {
          toast("Something went wrong!", {
            description: "You have unbookmarked this quote",
          });
        }
        queryClient.invalidateQueries({ queryKey: ["quotes"] });
        queryClient.invalidateQueries({ queryKey: ["latestQuote"] });
      }
    },
    onError: (error) => {
      toast("Something went wrong!", {
        description: "This should never happen.",
      });
    },
  });

  return (
    <div className="text-center relative w-full md:w-1/2">
      <Image
        src={picture_link}
        alt={picture_alt}
        width={500}
        height={100}
        className="absolute inset-0 object-cover w-full h-full opacity-50 rounded border shadow hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      />

      <div className="flex flex-col p-14 pb-20">
        <blockquote className="italic text-xl font-bold">
          &quot;{quote}&quot;
        </blockquote>
        -<cite>{author}</cite>
      </div>

      <div className="absolute bottom-2 right-2">
        <Button
          variant="ghost"
          onClick={() => mutate()}
          disabled={isPending}
          className="hover:bg-transparent"
        >
          {bookmarked ? <BookmarkCheckIcon /> : <BookmarkIcon />}
        </Button>
      </div>

      <div className="flex gap-2 absolute bottom-4 left-4 text-sm">
        <Badge variant={"default"}>
          {dayjs(created_at).format("DD.MM.YYYY")}
        </Badge>
        <Badge variant={"default"}>
          <BookmarkIcon size={10} /> {bookmarks.length}
        </Badge>
      </div>
    </div>
  );
};

export default QuoteCard;
