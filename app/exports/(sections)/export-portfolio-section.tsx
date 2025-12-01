import Image from "next/image";
import exportPortfolioData from "@/data/export-portfolio.json";

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
          <div key={portfolio.id} className="flex flex-col gap-3 pb-3 group">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={portfolio.imageUrl}
                alt={portfolio.imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="text-[#181411] dark:text-white text-base font-medium leading-normal">
                {portfolio.title}
              </p>
              <p className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                {portfolio.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
