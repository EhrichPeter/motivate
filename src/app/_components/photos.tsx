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

export function PhotoCarousel(
  props: { photos: UnsplashPhoto[]; photoSize: number } 
) {
  const { photos, photoSize } = props;

  return (
    <Carousel className="max-w-xs">
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex justify-center">
              <Image
                src={photo.urls.regular}
                alt={photo.description}
                width={photoSize}
                height={photoSize}
                className="rounded-full shadow-md"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {photos.length > 1 && (
        <>
          <CarouselPrevious />  
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
