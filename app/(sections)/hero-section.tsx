import Image from "next/image";
import Link from "next/link";
import { homepageApi } from "@/api/homepage";
import heroDataFallback from "@/data/hero.json";

/**
 * Get image URL - handles both external URLs and uploaded files
 */
function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    // Fallback to default image from hero.json
    return heroDataFallback.image.src;
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
  // Fetch homepage config from API
  let homepageConfig;
  try {
    homepageConfig = await homepageApi.getHomepageConfig();
  } catch (error) {
    // Fallback to static data if API fails
    console.error('Failed to fetch homepage config:', error);
    homepageConfig = null;
  }

  // Use API data if available, otherwise fallback to static JSON
  const heroTitle = homepageConfig?.heroTitle || heroDataFallback.title;
  const heroSubtitle = homepageConfig?.heroSubtitle || heroDataFallback.subtitle;
  const heroImageUrl = homepageConfig?.heroImageUrl
    ? getImageUrl(homepageConfig.heroImageUrl)
    : heroDataFallback.image.src;
  const heroImageAlt = homepageConfig?.heroImageAlt || heroDataFallback.image.alt;

  // Unoptimize for API images (both localhost and production API) to avoid upstream 404 errors
  // This bypasses Next.js Image optimization and loads images directly from the API
  const shouldUnoptimize = heroImageUrl.includes('localhost') || heroImageUrl.includes('api.gelilamanufacturingplc.com');

  return (
    <section className="w-full">
      <div className="relative flex min-h-[600px] lg:min-h-[700px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
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
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {heroTitle}
            </h1>
            <h2 className="text-white/90 text-base font-normal leading-normal sm:text-lg">
              {heroSubtitle}
            </h2>
            <div className="mt-4">
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-full shadow-lg text-base font-semibold text-white bg-primary hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
