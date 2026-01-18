import { Button } from "@/components/ui/button";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";
import { HeroSlider } from "@/components/hero-slider";

interface HeroImage {
  url: string;
  alt: string;
}

interface PageConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImages: HeroImage[];
}

interface HeroSectionProps {
  pageConfig: PageConfig | null;
}

export default function HeroSection({ pageConfig }: HeroSectionProps) {
  if (!pageConfig) {
    return null;
  }

  const heroData = pageConfig;

  return (
    <section className="w-full">
      <div className="relative flex min-h-[600px] lg:min-h-[700px] w-screen flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {heroData.heroImages.length > 0 && <HeroSlider images={heroData.heroImages} />}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {heroData.heroTitle}
            </h1>
            <h2 className="text-white/90 text-base font-normal leading-normal sm:text-lg">
              {heroData.heroSubtitle}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <RequestQuoteDialog
              trigger={
                <Button className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!">
                  <span className="truncate">
                    Request Import Quote
                  </span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
