import { Quote } from "@/server/quotes/models";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const QuoteCard = (props: Quote) => {
  const { picture_alt, picture_link, author, quote } = props;

  return (
    <div className="text-center relative rounded-xl w-full md:w-1/2 border shadow-lg">
      <Image
        src={picture_link}
        alt={picture_alt}
        width={500}
        height={100}
        className="absolute inset-0 object-cover w-full h-full opacity-30 rounded-xl"
      />

      <div className="flex flex-col p-14">
        <blockquote className="italic text-xl font-bold">
          &quot;{quote}&quot;
        </blockquote>
        -<cite>{author}</cite>
      </div>

      <Button variant="ghost" className="absolute bottom-2 right-1">
        <Bookmark />
      </Button>
    </div>
  );
};

export default QuoteCard;
