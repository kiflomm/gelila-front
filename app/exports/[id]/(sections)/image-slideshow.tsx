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

  // Helper to check if image should be unoptimized (uploaded images from backend)
  const shouldUnoptimize = (url: string) => {
    return url.includes('/uploads') || 
           url.includes('localhost') || 
           url.includes('unsplash.com') ||
           !url.startsWith('https://') && !url.startsWith('http://localhost');
  };

  // If only one image, show it without carousel
  if (images.length === 1) {
    // Skip if URL is empty
    if (!images[0].url || images[0].url.trim() === '') {
      return null;
    }
    return (
      <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-2 ring-primary/10 dark:ring-primary/20 group">
        <Image
          src={images[0].url}
          alt={images[0].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          unoptimized={shouldUnoptimize(images[0].url) || images[0].url.includes('api.gelilamanufacturingplc.com')}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-[#181411] dark:text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
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
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
            {images
              .filter((image) => image.url && image.url.trim() !== '') // Filter out empty URLs
              .map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-1 sm:pl-2 md:pl-4 basis-full"
              >
                <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gray-100 dark:bg-gray-900 ring-1 sm:ring-2 ring-primary/10 dark:ring-primary/20 group-hover:ring-primary/30 dark:group-hover:ring-primary/40 transition-all duration-500">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    unoptimized={shouldUnoptimize(image.url) || image.url.includes('api.gelilamanufacturingplc.com')}
                  />
                  {/* Modern gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation buttons - visible on mobile, enhanced on hover for desktop */}
          <CarouselPrevious className="left-2 sm:left-3 md:left-4 lg:left-6 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 lg:h-14 lg:w-14 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-primary/30 hover:border-primary shadow-lg sm:shadow-xl backdrop-blur-md transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 touch-manipulation" />
          <CarouselNext className="right-2 sm:right-3 md:right-4 lg:right-6 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 lg:h-14 lg:w-14 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-primary/30 hover:border-primary shadow-lg sm:shadow-xl backdrop-blur-md transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 touch-manipulation" />
        </Carousel>

        {/* Modern image counter and indicators - mobile optimized */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-3 bg-black/70 dark:bg-black/80 backdrop-blur-lg rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 border border-white/10 shadow-xl sm:shadow-2xl">
          {/* Dot indicators - larger and more touch-friendly on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`rounded-full transition-all duration-300 hover:scale-125 active:scale-110 touch-manipulation ${
                  index + 1 === current
                    ? "w-6 h-2 sm:w-7 sm:h-2.5 md:w-8 md:h-2.5 bg-primary shadow-lg shadow-primary/50"
                    : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/60 hover:bg-white/80 active:bg-white/90"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Counter text - responsive sizing */}
          <span className="text-white text-xs sm:text-sm md:text-base font-semibold ml-0.5 sm:ml-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 bg-primary/20 rounded-full whitespace-nowrap">
            {current} / {count}
          </span>
        </div>
      </div>
    </div>
  );
}
