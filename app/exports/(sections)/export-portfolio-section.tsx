import Image from "next/image";
import Link from "next/link";
import exportPortfolioData from "@/data/export-portfolio.json";
import { ArrowRight } from "lucide-react";

interface ExportPortfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const exportPortfolios: ExportPortfolio[] =
  exportPortfolioData.exportPortfolios;

export default function ExportPortfolioSection() {
  return (
    <section className="py-12">
      <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-6">
        Our Export Portfolio
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4">
        {exportPortfolios.map((portfolio) => (
          <Link
            key={portfolio.id}
            href={`/exports/${portfolio.id}`}
            className="flex flex-col gap-3 pb-3 group cursor-pointer"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={portfolio.imageUrl}
                alt={portfolio.imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-[#181411] dark:text-white text-base font-medium leading-normal group-hover:text-primary transition-colors">
                  {portfolio.title}
                </p>
                <p className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                  {portfolio.description}
                </p>
              </div>
              <ArrowRight
                className="size-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-0.5"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
