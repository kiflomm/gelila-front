import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";
import { sectorsApi } from "@/api/sectors";

/**
 * Get image URL - handles both external URLs and uploaded files
 */
function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return "";
  }

  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If it's a relative path starting with /uploads, use backend URL directly
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const baseUrl = apiBaseUrl.replace('/api/v1', '');

  return imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
}

export default async function HeroSection() {
  let pageConfig;
  try {
    pageConfig = await sectorsApi.getPageConfig();
  } catch (error) {
    // API endpoint may not exist yet
    console.error('Failed to fetch sectors page config:', error);
    return null;
  }

  const heroTitle = pageConfig.heroTitle;
  const heroSubtitle = pageConfig.heroSubtitle;
  const heroImageUrl = pageConfig.heroImageUrl
    ? getImageUrl(pageConfig.heroImageUrl)
    : "";
  const heroImageAlt = pageConfig.heroImageAlt || heroTitle;

  const shouldUnoptimize = heroImageUrl.includes('localhost') || heroImageUrl.includes('api.gelilamanufacturingplc.com');

  return (
    <section className="w-full">
      <div className="relative flex min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] w-screen flex-col gap-4 sm:gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={heroImageAlt}
            fill
            className="object-cover brightness-75"
            priority
            unoptimized={shouldUnoptimize}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-3 sm:gap-4 text-left max-w-3xl">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              {heroTitle}
            </h1>
            <h2 className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
              {heroSubtitle}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <RequestQuoteDialog
              trigger={
                <Button className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!">
                  <span className="truncate">
                    Request Quote
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
