import { UnsplashPhoto } from "@/server/unsplash/models";
import { Quote } from "@/server/quote/models";
import Image from "next/image";

interface QuoteCardProps {
  quote: Quote;
  photo: UnsplashPhoto;
}

const QuoteCard = (props: QuoteCardProps) => {
  const { quote, photo } = props;

  return (
    <div className="text-center relative rounded-xl w-full md:w-1/2">
      <Image
        src={photo.urls.regular}
        alt={photo.description}
        width={500}
        height={100}
        className="absolute inset-0 object-cover w-full h-full opacity-30 rounded-xl"
        blurDataURL={`data:image/png;base64,${photo.blur_hash}`}
        placeholder="blur"
      />

      <div className="flex flex-col p-14">
        <blockquote className="italic text-xl font-bold">
          &quot;{quote.q}&quot;
        </blockquote>
        -<cite>{quote.a}</cite>
      </div>

      {/* <Button variant="ghost">
        <Bookmark />
      </Button> */}
    </div>
  );
};

export default QuoteCard;
