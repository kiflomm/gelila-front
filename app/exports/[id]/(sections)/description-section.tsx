import ImageSlideshow from "./image-slideshow";

interface ImageItem {
  url: string;
  alt: string;
}

interface ExportPortfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  images?: ImageItem[];
}

interface DescriptionSectionProps {
  portfolio: ExportPortfolio;
}

export default function DescriptionSection({
  portfolio,
}: DescriptionSectionProps) {
  // Use images array if available, otherwise fallback to single image
  const displayImages =
    portfolio.images && portfolio.images.length > 0
      ? portfolio.images
      : [{ url: portfolio.imageUrl, alt: portfolio.imageAlt }];

  return (
    <section className="w-full py-8 sm:py-12 md:py-16">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 max-w-4xl">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            {portfolio.title}
          </h2>
        </div>
        <div className="pt-2">
          <p className="text-[#424242] dark:text-white/80 text-base sm:text-lg leading-relaxed">
            {portfolio.description}
          </p>
        </div>
        <div className="mt-6 sm:mt-8">
          <ImageSlideshow images={displayImages} />
        </div>
      </div>
    </section>
  );
}
