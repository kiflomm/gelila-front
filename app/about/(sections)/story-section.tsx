import Image from "next/image";
import { aboutApi } from "@/api/about";
import storyDataFallback from "@/data/about-story.json";

/**
 * Get image URL - handles both external URLs and uploaded files
 */
function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    // Fallback to default image from JSON
    return storyDataFallback.image.src;
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

export default async function StorySection() {
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
  const badge = aboutConfig?.storyBadge || storyDataFallback.badge;
  const title = aboutConfig?.storyTitle || storyDataFallback.title;
  const content = aboutConfig?.storyContent || storyDataFallback.paragraphs.map(p => p.content).join("\n\n");
  const imageUrl = aboutConfig?.storyImageUrl
    ? getImageUrl(aboutConfig.storyImageUrl)
    : storyDataFallback.image.src;
  const imageAlt = aboutConfig?.storyImageAlt || storyDataFallback.image.alt;

  // Unoptimize for API images (both localhost and production API) to avoid upstream 404 errors
  const shouldUnoptimize = imageUrl.includes('localhost') || imageUrl.includes('api.gelilamanufacturingplc.com');

  // Split content into paragraphs (by double newline)
  const paragraphs = content.split("\n\n").filter(p => p.trim());

  // Key Highlights from API or fallback
  const highlights = [
    {
      icon: "insights",
      value: aboutConfig?.statSectorsValue || storyDataFallback.stats[0].value,
      label: aboutConfig?.statSectorsLabel || storyDataFallback.stats[0].label,
    },
    {
      icon: "groups",
      value: aboutConfig?.statEmployeesValue || storyDataFallback.stats[1].value,
      label: aboutConfig?.statEmployeesLabel || storyDataFallback.stats[1].label,
    },
    {
      icon: "verified",
      value: aboutConfig?.statYearsValue || storyDataFallback.stats[2].value,
      label: aboutConfig?.statYearsLabel || storyDataFallback.stats[2].label,
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/50 dark:via-black/20 to-transparent -z-10"></div>
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-1 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
            <div className="size-1.5 rounded-full bg-primary"></div>
            <span>{badge}</span>
          </div>
          <h2 className="text-[#181411] dark:text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
            {title}
          </h2>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl border border-primary/10 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-primary/10 p-1">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                unoptimized={shouldUnoptimize}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Paragraphs */}
          <div className="lg:col-span-2 flex flex-col gap-7">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Highlights */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 border border-border shadow-sm sticky top-8">
              <h3 className="text-[#181411] dark:text-white text-lg sm:text-xl font-bold leading-tight tracking-tight mb-4">
                Key Highlights
              </h3>
              <div className="flex flex-col gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-primary text-2xl mt-0.5 shrink-0"
                      aria-label={highlight.icon}
                    >
                      {highlight.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-primary text-2xl sm:text-3xl font-bold mb-0.5">
                        {highlight.value}
                      </p>
                      <p className="text-[#181411] dark:text-white/80 text-xs sm:text-sm font-medium">
                        {highlight.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
