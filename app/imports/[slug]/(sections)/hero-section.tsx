import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";
import { HeroSlider } from "@/components/hero-slider";

interface ImportItem {
  id: string;
  title: string;
  heroDescription?: string;
  description: string;
  sourceRegion: string;
  status?: string;
  image?: string;
  imageAlt?: string;
  images?: Array<{ url: string; alt: string }>;
  products: Array<{
    id: number;
    name: string;
    image: string;
    alt: string;
  }>;
}

interface HeroSectionProps {
  importItem: ImportItem;
}

export default function HeroSection({ importItem }: HeroSectionProps) {
  // Use import's own images, fallback to single image, then to first product image
  const heroImages = importItem.images && importItem.images.length > 0
    ? importItem.images
    : importItem.image
    ? [{ url: importItem.image, alt: importItem.imageAlt || importItem.title }]
    : importItem.products.length > 0
    ? [{ url: importItem.products[0].image, alt: importItem.products[0].alt || importItem.title }]
    : [];

  const heroImage = heroImages.length > 0 ? heroImages[0].url : undefined;
  const heroAlt = heroImages.length > 0 ? heroImages[0].alt : importItem.title;

  return (
    <section className="w-full">
      <div className="relative flex min-h-[600px] lg:min-h-[700px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {heroImages.length > 1 ? (
          <HeroSlider images={heroImages} autoPlayInterval={3000} />
        ) : heroImage ? (
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover brightness-75"
            priority
            unoptimized={heroImage.includes('localhost') || heroImage.includes('api.gelilamanufacturingplc.com')}
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/80 z-[1]" style={{ pointerEvents: 'none' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {importItem.title}
            </h1>
            <h2 className="text-white/90 text-base font-normal leading-normal sm:text-lg">
              {importItem.heroDescription || importItem.description}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <RequestQuoteDialog
              products={importItem.products.map(p => ({ id: p.id, name: p.name }))}
              trigger={
                <Button className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!">
                  <span className="truncate">Request Import Quote</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

