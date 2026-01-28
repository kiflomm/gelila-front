import Image from "@/components/ui/image";
import { aboutApi } from "@/api/about";
import pageHeadingDataFallback from "@/data/about-page-heading.json";
import { HeroSlider } from "@/components/hero-slider";

/**
 * Get image URL - handles both external URLs and uploaded files
 */
function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    // Fallback to default image from JSON
    return pageHeadingDataFallback.image.src;
  }

  // If it's already a full URL, return as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // If it's a relative path starting with /uploads, use backend URL directly
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const baseUrl = apiBaseUrl.replace("/api/v1", "");

  return imageUrl.startsWith("/") ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
}

export default async function PageHeadingSection() {
  // Fetch about config from API
  let aboutConfig;
  try {
    aboutConfig = await aboutApi.getAboutConfig();
  } catch (error) {
    // Fallback to static data if API fails
    console.error("Failed to fetch about config:", error);
    aboutConfig = null;
  }

  // Use API data if available, otherwise fallback to static JSON
  const title =
    aboutConfig?.pageHeadingTitle || pageHeadingDataFallback.title;
  const description =
    aboutConfig?.pageHeadingDescription ||
    pageHeadingDataFallback.description;
  
  // Get page heading images - prefer multiple images, fallback to single image, then fallback to static data
  const pageHeadingImages = aboutConfig?.pageHeadingImageUrls && aboutConfig.pageHeadingImageUrls.length > 0
    ? aboutConfig.pageHeadingImageUrls.map((url, index) => ({
        url: getImageUrl(url),
        alt: aboutConfig.pageHeadingImageAlts?.[index] || title || pageHeadingDataFallback.image.alt,
      }))
    : aboutConfig?.pageHeadingImageUrl
    ? [{ url: getImageUrl(aboutConfig.pageHeadingImageUrl), alt: aboutConfig.pageHeadingImageAlt || title || pageHeadingDataFallback.image.alt }]
    : [{ url: pageHeadingDataFallback.image.src, alt: pageHeadingDataFallback.image.alt }];
  
  const imageUrl = pageHeadingImages[0]?.url || pageHeadingDataFallback.image.src;
  const imageAlt = pageHeadingImages[0]?.alt || pageHeadingDataFallback.image.alt;

  // Unoptimize for API images (both localhost and production API) to avoid upstream 404 errors
  const shouldUnoptimize = imageUrl.includes('localhost') || imageUrl.includes('api.gelilamanufacturingplc.com');

  return (
    <section className="w-full">
      <div className="relative flex min-h-[500px] lg:min-h-[600px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {pageHeadingImages.length > 1 ? (
          <HeroSlider images={pageHeadingImages} autoPlayInterval={3000} />
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover brightness-75"
            priority
            unoptimized={shouldUnoptimize}
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40 z-[1]" style={{ pointerEvents: 'none' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-4 text-left">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl max-w-3xl">
            {title}
          </h1>
          <p className="text-white/90 text-base font-normal leading-normal sm:text-lg max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
