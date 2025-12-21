"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";
import { Button } from "@/components/ui/button";
import { useSectors } from "@/hooks/use-sectors";
import navigationData from "@/data/navigation.json";
import { getImageUrl } from "@/app/news/[slug]/utils";

interface ProductDivisionsSectionProps {
  activeSector: string | null;
}

function ProductGrid({
  products,
  sectorId,
}: {
  products: Array<{
    id: number;
    name: string;
    description: string;
    imageUrl: string | null;
    imageAlt: string | null;
  }>;
  sectorId: string;
}) {
  if (!products || products.length === 0) {
    return null;
  }

  // Prepare products list for RequestQuoteDialog
  const productsList = products.map((p) => ({
    id: p.id,
    name: p.name,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {products.map((product) => {
        const productImage = product.imageUrl ? getImageUrl(product.imageUrl) : null;
        
        return (
          <div
            key={product.id}
            className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
          >
            {/* Image Container with Overlay - Clickable Link */}
            <Link
              href={`/sectors/${sectorId}/products/${product.id}`}
              className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900 block"
            >
              {productImage ? (
                <Image
                  src={productImage}
                  alt={product.imageAlt || product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={productImage.startsWith('http') || productImage.startsWith('/uploads')}
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
            <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5 md:p-6 lg:p-7 grow">
              <Link
                href={`/sectors/${sectorId}/products/${product.id}`}
                className="flex items-start justify-between gap-2 sm:gap-3 group/title"
              >
                <h3 className="text-[#181411] dark:text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight group-hover/title:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <ArrowRight
                  className="size-4 sm:size-5 md:size-5 text-primary opacity-0 group-hover/title:opacity-100 -translate-x-2 group-hover/title:translate-x-0 transition-all duration-300 shrink-0 mt-0.5 sm:mt-1"
                  aria-hidden="true"
                />
              </Link>
              <p className="text-[#8c755f] dark:text-white/70 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Request Quote Button */}
              <div className="mt-auto pt-2 sm:pt-3 md:pt-4 border-t border-primary/10 dark:border-primary/20" onClick={(e) => e.stopPropagation()}>
                <RequestQuoteDialog
                  products={productsList}
                  defaultProductId={product.id}
                  trigger={
                    <Button
                      variant="outline"
                      className="w-full text-[10px] sm:text-xs font-medium text-primary/60 dark:text-primary/40 hover:text-primary dark:hover:text-primary hover:bg-primary/5 border-primary/20"
                    >
                      Request Quote
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}

export default function ProductDivisionsSection({
  activeSector,
}: ProductDivisionsSectionProps) {
  const { data: sectors, isLoading } = useSectors();

  // Get sector grouping from navigation data
  const sectorSections = navigationData.dropdowns.sectors.sections;

  // Create a map of sector slugs to their full data
  const sectorsMap = new Map(
    sectors?.map((sector) => [sector.slug, sector]) || []
  );

  // Group sectors by category
  const groupedSectors = sectorSections.map((section) => {
    const sectorsInSection = section.items
      .map((item) => {
        // Extract sector slug from href (e.g., "/sectors/footwear" -> "footwear")
        const sectorSlug = item.href.replace("/sectors/", "");
        const sector = sectorsMap.get(sectorSlug);
        return sector;
      })
      .filter((sector) => sector !== undefined);

    return {
      title: section.title,
      sectors: sectorsInSection,
    };
  });

  // Filter sectors if a specific sector is selected
  let displayGroups = groupedSectors;
  if (activeSector) {
    displayGroups = groupedSectors
      .map((group) => ({
        ...group,
        sectors: group.sectors.filter((sector) => sector.slug === activeSector),
      }))
      .filter((group) => group.sectors.length > 0);
  }

  if (isLoading || !sectors || sectors.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4 md:px-6 lg:px-8">
      {displayGroups.map((group, groupIndex) => (
        <div
          key={group.title}
          className={groupIndex > 0 ? "mt-10 sm:mt-12 md:mt-16 lg:mt-20" : ""}
        >
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 md:px-6">
            <h2 className="text-[#212121] dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.015em]">
              {group.title}
            </h2>
          </div>

          {/* Sectors in this group */}
          {group.sectors.map((sector, sectorIndex) => (
            <div
              key={sector.slug}
              id={`sector-${sector.slug}`}
              className={
                sectorIndex > 0 ? "mt-6 sm:mt-8 md:mt-10 lg:mt-12" : ""
              }
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
              <ProductGrid
                products={sector.products}
                sectorId={sector.slug}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
