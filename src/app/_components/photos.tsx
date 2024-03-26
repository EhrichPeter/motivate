import * as React from "react";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UnsplashPhoto } from "@/server/unsplash";

export function PhotoCarousel(props: { photos: UnsplashPhoto[] }) {
  const { photos } = props;

  return (
    <Carousel className="max-w-xs">
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex justify-center">
              <Image
                src={photo.urls.regular}
                alt={photo.description}
                width={200}
                height={200}
                className="rounded-full shadow-md"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
