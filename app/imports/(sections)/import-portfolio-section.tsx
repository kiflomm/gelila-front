import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ImportPortfolio {
  id: string;
  title: string;
  description: string;
  sourceRegion?: string;
  imageUrl: string;
  imageAlt: string;
}

interface ImportPortfolioSectionProps {
  imports: ImportPortfolio[];
}

export default function ImportPortfolioSection({ imports }: ImportPortfolioSectionProps) {
  if (!imports || imports.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-6">
        Our Import Portfolio
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
        {imports.map((portfolio) => (
          <Link
            key={portfolio.id}
            href={`/imports/${portfolio.id}`}
            className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
          >
            {/* Image Container with Overlay */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
              <Image
                src={portfolio.imageUrl || "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2070&auto=format&fit=crop"}
                alt={portfolio.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized={portfolio.imageUrl?.startsWith('http') || portfolio.imageUrl?.startsWith('/uploads')}
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Primary Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5 md:p-6 grow">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <h3 className="text-[#181411] dark:text-white text-base sm:text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                  {portfolio.title}
                </h3>
                <ArrowRight
                  className="size-4 sm:size-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-0.5 sm:mt-1"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[#6c757d] dark:text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-2">
                {portfolio.description}
              </p>
              {portfolio.sourceRegion && (
                <p className="text-[#8c755f] dark:text-white/70 text-xs sm:text-sm font-medium">
                  Source: {portfolio.sourceRegion}
                </p>
              )}

              {/* Decorative Element */}
              <div className="mt-auto pt-2 sm:pt-3 md:pt-4 border-t border-primary/10 dark:border-primary/20">
                <span className="text-[10px] sm:text-xs font-medium text-primary/60 dark:text-primary/40 uppercase tracking-wider">
                  View Details
                </span>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  );
}
