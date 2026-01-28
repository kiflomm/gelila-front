"use client";

import Image from "@/components/ui/image";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export interface HeroImage {
  url: string;
  alt: string;
}

interface HeroSliderProps {
  images: HeroImage[];
  autoPlayInterval?: number; // milliseconds, default 5000
  className?: string;
  onApiChange?: (api: CarouselApi | undefined) => void;
  onCurrentChange?: (current: number, count: number) => void;
}

export function HeroSlider({
  images,
  autoPlayInterval = 5000,
  className = "",
  onApiChange,
  onCurrentChange,
}: HeroSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselContentRef = useRef<HTMLDivElement>(null);

  // Helper to check if image should be unoptimized
  const shouldUnoptimize = useCallback((url: string) => {
    return (
      url.includes("/uploads") ||
      url.includes("localhost") ||
      url.includes("api.gelilamanufacturingplc.com") ||
      (!url.startsWith("https://") && !url.startsWith("http://localhost"))
    );
  }, []);

  // Filter out empty URLs - define this early so it can be used in useEffect
  const validImages = images.filter(
    (img) => img.url && img.url.trim() !== ""
  );

  useEffect(() => {
    if (onApiChange) {
      onApiChange(api);
    }
  }, [api, onApiChange]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      const newCount = api.scrollSnapList().length;
      const newCurrent = api.selectedScrollSnap() + 1;
      setCount(newCount);
      setCurrent(newCurrent);
      if (onCurrentChange) {
        onCurrentChange(newCurrent, newCount);
      }
    };

    updateCurrent();
    api.on("select", updateCurrent);
  }, [api, onCurrentChange]);

  // Ensure carousel content has height
  useEffect(() => {
    if (carouselContentRef.current) {
      const carouselContent = carouselContentRef.current.querySelector('[data-slot="carousel-content"]') as HTMLElement;
      const innerFlex = carouselContent?.querySelector('div') as HTMLElement;
      if (carouselContent) {
        carouselContent.style.height = '100%';
      }
      if (innerFlex) {
        innerFlex.style.height = '100%';
      }
    }
  }, [validImages]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || validImages.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      if (!isPaused) {
        api.scrollNext();
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [api, autoPlayInterval, isPaused, validImages.length]);

  if (validImages.length === 0) {
    return null;
  }

  // If only one image, show it without carousel
  if (validImages.length === 1) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <Image
          src={validImages[0].url}
          alt={validImages[0].alt}
          fill
          className="object-cover brightness-75"
          priority
          unoptimized={shouldUnoptimize(validImages[0].url)}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className={`absolute inset-0 group ${className}`}
        style={{ height: '100%', width: '100%', zIndex: 2 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            duration: 15,
          }}
          className="w-full h-full"
        >
          <div ref={carouselContentRef} className="w-full h-full">
            <CarouselContent className="h-full ml-0">
              {validImages.map((image, index) => (
                <CarouselItem 
                  key={`${image.url}-${index}`} 
                  className="pl-0 basis-full h-full"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover brightness-75"
                      unoptimized={shouldUnoptimize(image.url)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          {/* Navigation buttons - visible on mobile, on hover for desktop */}
          <CarouselPrevious 
            className="left-4 sm:left-6 md:left-8 lg:left-10 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 border-2 border-white/30 hover:border-white/50 shadow-lg backdrop-blur-md transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95" 
          />
          <CarouselNext 
            className="right-4 sm:right-6 md:right-8 lg:right-10 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 border-2 border-white/30 hover:border-white/50 shadow-lg backdrop-blur-md transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95" 
          />
        </Carousel>
      </div>
      
      {/* Dot indicators - rendered outside slider container to be above overlay */}
      <div 
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 dark:bg-black/70 backdrop-blur-lg rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/10 shadow-xl z-[2]"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full transition-all duration-300 hover:scale-125 active:scale-110 ${
                index + 1 === current
                  ? "w-6 h-2 sm:w-7 sm:h-2.5 md:w-8 md:h-2.5 bg-primary shadow-lg shadow-primary/50"
                  : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

