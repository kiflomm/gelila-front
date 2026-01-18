import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";
import { HeroSlider } from "@/components/hero-slider";

interface Sector {
  id: string;
  name: string;
  title: string;
  heroDescription?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  images?: Array<{
    url: string;
    alt: string;
  }>;
  products: Array<{
    id: number;
    name: string;
    image: string;
    alt: string;
  }>;
}

interface HeroSectionProps {
  sector: Sector;
}

export default function HeroSection({ sector }: HeroSectionProps) {
  // Use sector's multiple images if available, otherwise fallback to single image or first product image
  const heroImages = sector.images && sector.images.length > 0
    ? sector.images
    : sector.image
    ? [{ url: sector.image, alt: sector.imageAlt || sector.title }]
    : sector.products.length > 0
    ? [{ url: sector.products[0].image, alt: sector.products[0].alt || sector.title }]
    : [];

  const heroAlt = heroImages.length > 0 
    ? heroImages[0].alt 
    : sector.imageAlt || sector.title;

  // Service-based sectors that should show "Contact Us" instead of "Request Quote"
  const serviceBasedSectors = ["bus-transport"];
  const isServiceBased = serviceBasedSectors.includes(sector.id);

  return (
    <section className="w-full">
      <div className="relative flex min-h-[600px] lg:min-h-[700px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden" style={{ position: 'relative' }}>
        {heroImages.length > 0 && (
          heroImages.length > 1 ? (
            <>
              <HeroSlider images={heroImages} autoPlayInterval={3000} />
            </>
          ) : (
            <div className="absolute inset-0 z-0">
              <Image
                src={heroImages[0].url}
                alt={heroImages[0].alt}
                fill
                className="object-cover brightness-75"
                priority
                unoptimized={heroImages[0].url.includes('localhost') || heroImages[0].url.includes('api.gelilamanufacturingplc.com')}
              />
            </div>
          )
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/80 z-[1]" style={{ pointerEvents: 'none' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {sector.title}
            </h1>
            <h2 className="text-white/90 text-base font-normal leading-normal sm:text-lg">
              {sector.heroDescription || sector.description}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {isServiceBased ? (
              <Button
                asChild
                className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!"
              >
                <Link href="/contact">
                  <span className="truncate">Contact Us</span>
                </Link>
              </Button>
            ) : (
              <RequestQuoteDialog
                products={sector.products.map(p => ({ id: p.id, name: p.name }))}
                trigger={
                  <Button className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!">
                    <span className="truncate">Request Quote</span>
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
