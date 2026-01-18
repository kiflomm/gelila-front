import Link from "next/link";
import { homepageApi } from "@/api/homepage";
import { HeroSlider } from "@/components/hero-slider";

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
  // Fetch homepage config from API
  const homepageConfig = await homepageApi.getHomepageConfig();

  const heroTitle = homepageConfig.heroTitle;
  const heroSubtitle = homepageConfig.heroSubtitle;
  
  // Convert heroImages to format expected by HeroSlider
  const heroImages = homepageConfig.heroImages
    ? homepageConfig.heroImages.map((img) => ({
        url: getImageUrl(img.url),
        alt: img.alt || heroTitle,
      }))
    : [];

  return (
    <section className="w-full">
      <div className="relative flex min-h-[600px] lg:min-h-[700px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {heroImages.length > 0 && <HeroSlider images={heroImages} />}
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
