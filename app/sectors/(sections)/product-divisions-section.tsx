"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";

interface ProductDivisionsSectionProps {
  activeSector: string | null;
}

function ScrollableProductGrid({
  products,
  sectorId,
}: {
  products: Array<{
    id: number;
    name: string;
    description: string;
    image: string;
    alt: string;
  }>;
  sectorId: string;
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
    const gap = 24; // gap-6 = 1.5rem = 24px
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Previous Button */}
      <Button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 size-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Previous products"
      >
        <ChevronLeft className="size-6 text-primary" />
      </Button>

      {/* Next Button */}
      <Button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 size-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Next products"
      >
        <ChevronRight className="size-6 text-primary" />
      </Button>

      {/* Scrollable Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-14"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/sectors/${sectorId}/products/${product.id}`}
            className="group relative flex flex-col rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 shrink-0 w-[320px] sm:w-[360px] lg:w-[380px]"
          >
            {/* Image Container with Overlay */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 380px"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Primary Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-6 lg:p-7 grow">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[#181411] dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <ArrowRight
                  className="size-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[#8c755f] dark:text-white/70 text-sm leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Decorative Element */}
              <div className="mt-auto pt-4 border-t border-primary/10 dark:border-primary/20">
                <span className="text-xs font-medium text-primary/60 dark:text-primary/40 uppercase tracking-wider">
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

export default function ProductDivisionsSection({
  activeSector,
}: ProductDivisionsSectionProps) {
  const filteredSectors = activeSector
    ? productsData.sectors.filter((sector) => sector.id === activeSector)
    : productsData.sectors;

  return (
    <div className="mt-8">
      {filteredSectors.map((sector) => (
        <div key={sector.id} id={`sector-${sector.id}`} className="mt-12 first:mt-0">
          <h2 className="text-[#212121] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] px-4 pb-6">
            {sector.title}
          </h2>
          <ScrollableProductGrid products={sector.products} sectorId={sector.id} />
        </div>
      ))}
    </div>
  );
}
