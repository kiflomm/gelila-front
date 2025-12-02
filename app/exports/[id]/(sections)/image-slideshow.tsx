"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ImageItem {
  url: string;
  alt: string;
}

interface ImageSlideshowProps {
  images: ImageItem[];
  title?: string;
}

export default function ImageSlideshow({ images, title }: ImageSlideshowProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!images || images.length === 0) {
    return null;
  }

  // If only one image, show it without carousel
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-2 ring-primary/10 dark:ring-primary/20 group">
        <Image
          src={images[0].url}
          alt={images[0].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          unoptimized={images[0].url.includes("unsplash.com")}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          {title}
        </h3>
      )}
      <div className="relative group">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            duration: 25,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-900 ring-2 ring-primary/10 dark:ring-primary/20 group-hover:ring-primary/30 dark:group-hover:ring-primary/40 transition-all duration-500">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    unoptimized={image.url.includes("unsplash.com")}
                  />
                  {/* Modern gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 sm:left-4 md:left-6 lg:left-8 h-11 w-11 sm:h-14 sm:w-14 bg-white/95 dark:bg-gray-900/95 hover:bg-white dark:hover:bg-gray-800 border-2 border-primary/30 hover:border-primary shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95" />
          <CarouselNext className="right-3 sm:right-4 md:right-6 lg:right-8 h-11 w-11 sm:h-14 sm:w-14 bg-white/95 dark:bg-gray-900/95 hover:bg-white dark:hover:bg-gray-800 border-2 border-primary/30 hover:border-primary shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95" />
        </Carousel>

        {/* Modern image counter and indicators */}
        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/60 dark:bg-black/80 backdrop-blur-lg rounded-full px-5 py-2.5 sm:px-6 sm:py-3 border border-white/10 shadow-2xl">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`rounded-full transition-all duration-300 hover:scale-125 ${
                  index + 1 === current
                    ? "w-8 h-2.5 bg-primary shadow-lg shadow-primary/50"
                    : "w-2.5 h-2.5 bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Counter text */}
          <span className="text-white text-sm sm:text-base font-semibold ml-1 px-2.5 py-0.5 bg-primary/20 rounded-full">
            {current} / {count}
          </span>
        </div>
      </div>
    </div>
  );
}
