"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewArrivals } from "@/hooks/use-new-arrivals";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";
import { Button } from "@/components/ui/button";

function ProductCardSkeleton() {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[280px]">
      <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-3 p-6 lg:p-7">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

// Helper function to construct full image URL
function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
  const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${baseUrl}${cleanImageUrl}`;
}

export default function NewArrivalsSection() {
  const { data: products, isLoading, isFetching } = useNewArrivals(10);

  // Show loading state
  if (isLoading || isFetching || !products) {
    return (
      <section className="py-16 sm:py-20 lg:py-24">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-[#181411] dark:text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-center mb-4">
            New Arrivals
          </h2>
          <p className="text-[#8c755f] dark:text-white/70 text-base sm:text-lg text-center max-w-2xl mx-auto">
            Discover our latest products across all categories, showcasing innovation and quality.
          </p>
        </div>

        {/* Loading Skeleton */}
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 sm:gap-5 lg:gap-6 overflow-hidden">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Hide entire section if no products found
  if (products.length === 0) {
    return null;
  }

  const productsList = products.map(p => ({ id: p.id, name: p.name }));
  
  // Duplicate products for seamless infinite scroll
  const duplicatedProducts = [...products, ...products];

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="mb-12 lg:mb-16">
        <h2 className="text-[#181411] dark:text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-center mb-4">
          New Arrivals
        </h2>
        <p className="text-[#8c755f] dark:text-white/70 text-base sm:text-lg text-center max-w-2xl mx-auto">
          Discover our latest products across all categories, showcasing innovation and quality.
        </p>
      </div>

      {/* Products Auto-Scrolling Row */}
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-4 sm:gap-5 lg:gap-6 animate-scroll-new-arrivals"
            style={{
              animationDuration: `${products.length * 3}s`
            }}
          >
            {duplicatedProducts.map((product, index) => {
              const imageUrl = getImageUrl(product.imageUrl);
              const sectorSlug = product.sector.slug;

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="group relative flex flex-col rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[280px]"
                >
                  {/* Image Container with Overlay - Clickable Link */}
                  <Link
                    href={`/sectors/${sectorSlug}/products/${product.id}`}
                    className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-900 block"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.imageAlt || product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 280px"
                        unoptimized={imageUrl.includes('localhost') || imageUrl.includes('api.gelilamanufacturingplc.com')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Primary Accent Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col gap-3 p-6 lg:p-7 grow">
                    <Link
                      href={`/sectors/${sectorSlug}/products/${product.id}`}
                      className="flex items-start justify-between gap-3 group/title"
                    >
                      <h3 className="text-[#181411] dark:text-white text-xl font-bold leading-tight group-hover/title:text-primary transition-colors duration-300">
                        {product.name}
                      </h3>
                      <ArrowRight
                        className="size-5 text-primary opacity-0 group-hover/title:opacity-100 -translate-x-2 group-hover/title:translate-x-0 transition-all duration-300 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </Link>
                    <p className="text-[#8c755f] dark:text-white/70 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

