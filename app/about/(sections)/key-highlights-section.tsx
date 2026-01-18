import { aboutApi } from "@/api/about";
import storyDataFallback from "@/data/about-story.json";

export default async function KeyHighlightsSection() {
  // Fetch about config from API
  let aboutConfig;
  try {
    aboutConfig = await aboutApi.getAboutConfig();
  } catch (error) {
    // Fallback to static data if API fails
    console.error("Failed to fetch about config:", error);
    aboutConfig = null;
  }

  // Map backend stats to display format with icons
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
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
        <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight mb-8">
          Key Highlights
        </h2>
        <div className="flex flex-col gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-4">
              <span
                className="material-symbols-outlined text-primary text-3xl mt-1 flex-shrink-0"
                aria-label={highlight.icon}
              >
                {highlight.icon}
              </span>
              <div className="flex-1">
                <p className="text-primary text-3xl sm:text-4xl font-bold mb-1">
                  {highlight.value}
                </p>
                <p className="text-[#181411] dark:text-white/80 text-sm sm:text-base font-medium">
                  {highlight.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

