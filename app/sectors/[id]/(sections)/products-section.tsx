"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  alt: string;
}

interface Sector {
  id: string;
  name: string;
  title: string;
  products: Product[];
}

interface ProductsSectionProps {
  sector: Sector;
}

function ProductGrid({
  products,
  sectorId,
}: {
  products: Product[];
  sectorId: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/sectors/${sectorId}/products/${product.id}`}
          className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
        >
          {/* Image Container with Overlay */}
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
  );
}

export default function ProductsSection({ sector }: ProductsSectionProps) {
  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-[#212121] dark:text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] mb-2">
          Our Products
        </h2>
        <p className="text-[#6C757D] dark:text-white/70 text-base sm:text-lg leading-relaxed">
          Explore our range of {sector.name.toLowerCase()} products
        </p>
      </div>
      <ProductGrid products={sector.products} sectorId={sector.id} />
    </div>
  );
}
