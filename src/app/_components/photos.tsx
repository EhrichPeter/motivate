import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { UnsplashPhoto } from '@/server/unsplash';
import { decode } from 'blurhash';
import Image from 'next/image';

export function PhotoCarousel(
  props: { photos: UnsplashPhoto[]; photoSize: number } 
) {
  const { photos, photoSize } = props;

  return (
    <Carousel className="max-w-xs">
      <CarouselContent>
        {photos.map((photo, index) => {
          const base64Blur = decode(photo.blur_hash, photoSize, photoSize);
          return (
            <CarouselItem key={index}>
              <div className="p-1 flex justify-center">
                <Image
                  src={photo.urls.regular}
                  alt={photo.description}
                  width={photoSize}
                  height={photoSize}
                  className="rounded-full shadow-md"
                  blurDataURL={`data:image/png;base64,${base64Blur}`}
                  placeholder="blur"
                />
              </div>
            </CarouselItem>
          );
        })}
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