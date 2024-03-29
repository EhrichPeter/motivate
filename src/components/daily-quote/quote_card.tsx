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
import { Separator } from "@/components/ui/separator";
import { UnsplashPhoto } from "@/server/unsplash/models";
import { Quote } from "@/server/quote/models";

interface QuoteCardProps {
  quote: Quote;
  photos: UnsplashPhoto[];
  title: string;
  description: string;
}

const QuoteCard = (props: QuoteCardProps) => {
  const { quote, photos, title, description } = props;

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
