"use client";

import { useSectorsData, useActiveSectorFilter, useSectorsActions } from "@/stores/sectors/sectors-store";

export default function FilterChipsSection() {
  const { sectors } = useSectorsData();
  const activeSector = useActiveSectorFilter();
  const { setActiveSectorFilter } = useSectorsActions();

  const handleSectorClick = (sectorId: number) => {
    const newActiveSector = activeSector === sectorId ? null : sectorId;
    setActiveSectorFilter(newActiveSector);
    // Scroll to the section if filtering
    if (newActiveSector) {
      setTimeout(() => {
        const element = document.getElementById(`sector-${sectorId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  if (!sectors || sectors.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 mb-4 sm:mb-6 md:mb-8 overflow-x-auto w-full scrollbar-hide -mx-2 sm:-mx-4 md:mx-0 snap-x snap-mandatory">
      {sectors.map((sector) => {
        const isActive = activeSector === sector.id;
        return (
          <button
            key={sector.id}
            onClick={() => handleSectorClick(sector.id)}
            className={`flex h-9 sm:h-10 md:h-11 shrink-0 items-center justify-center gap-x-2 rounded-full px-3 sm:px-4 md:px-5 lg:px-6 transition-colors snap-start ${
              isActive
                ? "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary font-semibold"
                : "bg-gray-100 dark:bg-gray-800 text-[#424242] dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <p className="text-xs sm:text-sm md:text-base leading-normal whitespace-nowrap">
              {sector.name}
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
