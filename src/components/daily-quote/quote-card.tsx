"use client";

import { toggleBookmark } from "@/server/bookmarks/actions";
import { toggleBookMarkSchema } from "@/server/bookmarks/models";
import { Quote } from "@/server/quotes/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bookmark } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type toggleBookMarkType = z.infer<typeof toggleBookMarkSchema>;

const QuoteCard = (props: Quote) => {
  const { id, picture_alt, picture_link, author, quote } = props;
  const { toast } = useToast();

  const { handleSubmit } = useForm<toggleBookMarkType>({ resolver: zodResolver(toggleBookMarkSchema), defaultValues: { quote_id: id } });
  const { execute } = useAction(toggleBookmark, {
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
  },
  );

  const onSubmit = handleSubmit(async ({ quote_id }) => {
    execute({ quote_id });
  })

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

      <form onSubmit={onSubmit}>
        <Button variant="ghost" className="absolute bottom-2 right-2">
          <Bookmark />
        </Button>
      </form>

    </div>
  );
};

export default QuoteCard;
