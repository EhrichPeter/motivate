import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PhotoCarousel } from "./photos";
import { Quote } from "@/server/quote";
import { UnsplashPhoto } from "@/server/unsplash";
import { Separator } from "@/components/ui/separator";

interface QuoteCardProps {
  quote: Quote;
  photos: UnsplashPhoto[];
}

const QuoteCard = (props: QuoteCardProps) => {
  const { quote, photos } = props;

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Quote of the day</CardTitle>
        <CardDescription>Your daily dose of inspiration</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <blockquote className="italic text-xl font-bold">
          &quot;{quote.q}&quot;
        </blockquote>
        -<cite>{quote.a}</cite>
        <div className="flex justify-center items-center pt-5">
          <PhotoCarousel photos={photos} photoSize={150} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">
          <Bookmark />
        </Button>
      </CardFooter>
    </Card>
  );
  };

  export default QuoteCard;