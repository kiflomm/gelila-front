"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/hero-slider";
import { useCareersPageConfig } from "@/hooks/use-jobs";

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

export default function HeroSection() {
  const { data: pageConfig, isLoading } = useCareersPageConfig();

  // Show nothing while loading or if no config
  if (isLoading || !pageConfig) {
    return null;
  }

  const heroTitle = pageConfig.heroTitle;
  const heroSubtitle = pageConfig.heroSubtitle;
  
  // Convert heroImages to format expected by HeroSlider
  const heroImages = pageConfig.heroImages
    ? pageConfig.heroImages.map((img) => ({
        url: getImageUrl(img.url),
        alt: img.alt || heroTitle,
      }))
    : [];
  
  const buttonText = pageConfig.buttonText || "View Openings";
  const buttonHref = pageConfig.buttonHref || "/careers";

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
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!"
            >
              <Link href={buttonHref}>
                <span className="truncate">{buttonText}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
