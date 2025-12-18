"use client";

interface ImportItem {
  id: string;
  title: string;
  description: string;
  sourceRegion?: string;
  imageUrl: string;
  imageAlt: string;
}

interface FilterChipsSectionProps {
  imports: ImportItem[];
  activeRegion: string | null;
  setActiveRegion: (region: string | null) => void;
}

export default function FilterChipsSection({
  imports,
  activeRegion,
  setActiveRegion,
}: FilterChipsSectionProps) {
  // Get unique source regions from imports
  const uniqueRegions = Array.from(
    new Set(
      imports
        .map((importItem) => importItem.sourceRegion)
        .filter((region): region is string => !!region)
    )
  ).sort();

  if (uniqueRegions.length === 0) {
    return null;
  }

  const handleRegionClick = (region: string) => {
    const newActiveRegion = activeRegion === region ? null : region;
    setActiveRegion(newActiveRegion);
    // Scroll to the section if filtering
    if (newActiveRegion) {
      setTimeout(() => {
        const element = document.getElementById(`region-${region}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 mb-4 sm:mb-6 md:mb-8 overflow-x-auto w-full scrollbar-hide -mx-2 sm:-mx-4 md:mx-0 snap-x snap-mandatory">
      {uniqueRegions.map((region) => {
        const isActive = activeRegion === region;
        return (
          <button
            key={region}
            onClick={() => handleRegionClick(region)}
            className={`flex h-9 sm:h-10 md:h-11 shrink-0 items-center justify-center gap-x-2 rounded-full px-3 sm:px-4 md:px-5 lg:px-6 transition-colors snap-start ${
              isActive
                ? "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary font-semibold"
                : "bg-gray-100 dark:bg-gray-800 text-[#424242] dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <p className="text-xs sm:text-sm md:text-base leading-normal whitespace-nowrap">
              {region}
            </p>
          </button>
        );
      })}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

