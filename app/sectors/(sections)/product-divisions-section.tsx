"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProductsBySectorId } from "@/hooks/use-sectors";
import { useSectorsData, useActiveSectorFilter } from "@/stores/sectors/sectors-store";
import type { Product } from "@/api/sectors";

function ScrollableProductGrid({
  products,
  sectorSlug,
}: {
  products: Product[];
  sectorSlug: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector("a")?.clientWidth || 0;
    // Get computed gap from container
    const computedStyle = window.getComputedStyle(container);
    const gap = parseFloat(computedStyle.gap) || 16;
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Previous Button - Hidden on mobile, shown on larger screens */}
      <Button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        variant="outline"
        size="icon"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-14 z-10 size-10 md:size-11 lg:size-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Previous products"
      >
        <ChevronLeft className="size-5 md:size-5 lg:size-6 text-primary" />
      </Button>

      {/* Next Button - Hidden on mobile, shown on larger screens */}
      <Button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        variant="outline"
        size="icon"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-14 z-10 size-10 md:size-11 lg:size-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Next products"
      >
        <ChevronRight className="size-5 md:size-5 lg:size-6 text-primary" />
      </Button>

      {/* Scrollable Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 sm:pb-6 px-2 sm:px-4 md:px-4 lg:px-4 xl:px-6 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/sectors/${sectorSlug}/products/${product.id}`}
            className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 shrink-0 w-[280px] sm:w-[300px] md:w-[310px] lg:w-[330px] xl:w-[360px] snap-start"
          >
            {/* Image Container with Overlay */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.imageAlt || product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, (max-width: 1024px) 310px, (max-width: 1280px) 330px, 360px"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Primary Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5 md:p-6 lg:p-7 grow">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <h3 className="text-[#181411] dark:text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <ArrowRight
                  className="size-4 sm:size-5 md:size-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-0.5 sm:mt-1"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[#8c755f] dark:text-white/70 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Decorative Element */}
              <div className="mt-auto pt-2 sm:pt-3 md:pt-4 border-t border-primary/10 dark:border-primary/20">
                <span className="text-[10px] sm:text-xs font-medium text-primary/60 dark:text-primary/40 uppercase tracking-wider">
                  Inquiry
                </span>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
          </Link>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function SectorSection({ sector }: { sector: any }) {
  const { data: products, isLoading } = useProductsBySectorId(sector.id);
  const activeSector = useActiveSectorFilter();

  // Don't show if filtering and this isn't the active sector
  if (activeSector !== null && activeSector !== sector.id) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[280px] h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={`sector-${sector.id}`}
      className="mt-6 sm:mt-8 md:mt-10 lg:mt-12"
    >
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
        <Link
          href={`/sectors/${sector.slug}`}
          className="group flex items-center gap-3 hover:gap-4 transition-all"
        >
          <h3 className="text-[#212121] dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-[-0.015em] group-hover:text-primary transition-colors">
            {sector.title}
          </h3>
          <ArrowRight className="size-5 sm:size-6 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </Link>
      </div>
      <ScrollableProductGrid products={products} sectorSlug={sector.slug} />
    </div>
  );
}

export default function ProductDivisionsSection() {
  const { sectors } = useSectorsData();
  const activeSector = useActiveSectorFilter();

  if (!sectors || sectors.length === 0) {
    return null;
  }

  // Filter sectors if a specific sector is selected
  const displaySectors = activeSector
    ? sectors.filter((s) => s.id === activeSector)
    : sectors;

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4 md:px-6 lg:px-8">
      {displaySectors.map((sector) => (
        <SectorSection
          key={sector.id}
          sector={sector}
        />
      ))}
    </div>
  );
}
