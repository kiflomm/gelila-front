"use client";

import productsData from "@/data/products.json";

interface FilterChipsSectionProps {
  activeSector: string | null;
  setActiveSector: (sector: string | null) => void;
}

export default function FilterChipsSection({
  activeSector,
  setActiveSector,
}: FilterChipsSectionProps) {
  const allSectors = productsData.sectors.map((sector) => ({
    id: sector.id,
    name: sector.name,
  }));

  const handleSectorClick = (sectorId: string) => {
    const newActiveSector = activeSector === sectorId ? null : sectorId;
    setActiveSector(newActiveSector);
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

  return (
    <div className="flex gap-2 sm:gap-3 p-3 overflow-x-auto w-full scrollbar-hide">
      {allSectors.map((sector) => {
        const isActive = activeSector === sector.id;
        return (
          <button
            key={sector.id}
            onClick={() => handleSectorClick(sector.id)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
              isActive
                ? "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary font-semibold"
                : "bg-gray-100 dark:bg-gray-800 text-[#424242] dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <p className="text-sm leading-normal">{sector.name}</p>
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

