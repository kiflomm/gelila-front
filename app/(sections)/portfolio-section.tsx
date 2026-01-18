"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePortfolio } from "@/hooks/use-portfolio";

export default function PortfolioSection() {
  const { data: portfolioData, isLoading } = usePortfolio();

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="mb-12 lg:mb-16">
        <h2 className="text-[#181411] dark:text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-center mb-4">
          Our Diverse Portfolio
        </h2>
        <p className="text-[#8c755f] dark:text-white/70 text-base sm:text-lg text-center max-w-2xl mx-auto">
          Exploring excellence across multiple industries, driving innovation
          and quality in every sector we serve.
        </p>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-12 w-full">
            <p className="text-[#8c755f] dark:text-white/70">
              Loading portfolio...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {portfolioData?.sectors?.map((sector) => (
              <Link
                key={sector.id}
                href={`/sectors/${sector.id}`}
                className="group relative flex flex-col rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 w-full"
              >
                {/* Image Container with Overlay */}
                <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-900">
                  {sector.image && (
                    <Image
                      src={sector.image}
                      alt={sector.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={sector.image.includes('localhost') || sector.image.includes('api.gelilamanufacturingplc.com')}
                    />
                  )}
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Primary Accent Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  {/* Learn More Text - Visible on Hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    {/* Orange Line */}
                    <div className="w-16 h-0.5 bg-primary mb-3" />
                    {/* Learn More Text */}
                    <span className="text-primary text-xs font-medium uppercase tracking-wider">
                      LEARN MORE
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-6 lg:p-7 grow">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[#181411] dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {sector.title}
                    </h3>
                    <ArrowRight
                      className="size-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-[#8c755f] dark:text-white/70 text-sm leading-relaxed line-clamp-2">
                    {sector.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Optional: View All Link */}
      <div className="mt-12 text-center">
        <Link
          href="/sectors"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link"
        >
          <span>Explore All Sectors</span>
          <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
