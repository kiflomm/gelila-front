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

  // Split content into paragraphs (by double newline)
  const paragraphs = content.split("\n\n").filter(p => p.trim());

  // Stats from API or fallback
  const stats = [
    {
      value: aboutConfig?.statSectorsValue || storyDataFallback.stats[0].value,
      label: aboutConfig?.statSectorsLabel || storyDataFallback.stats[0].label,
    },
    {
      value: aboutConfig?.statEmployeesValue || storyDataFallback.stats[1].value,
      label: aboutConfig?.statEmployeesLabel || storyDataFallback.stats[1].label,
    },
    {
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
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              unoptimized={
                imageUrl.startsWith("http") || imageUrl.startsWith("/uploads")
              }
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-7">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed max-w-5xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-black/20 border border-primary/10 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <p className="text-3xl lg:text-4xl font-black text-[#181411] dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-[#495057] dark:text-white/70 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
