"use client";

import { useState } from "react";
import FilterChipsSection from "./filter-chips-section";
import ExportsListSection from "./exports-list-section";

interface ExportItem {
  id: string;
  title: string;
  description: string;
  heroDescription?: string;
  destinationRegion?: string;
  status?: string;
  imageUrl: string;
  imageAlt: string;
  products?: Array<{
    id: number;
    name: string;
    description: string;
    image: string;
    alt: string;
  }>;
}

interface FilterableExportsSectionProps {
  exports: ExportItem[];
}

export default function FilterableExportsSection({ exports }: FilterableExportsSectionProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <>
      <FilterChipsSection
        exports={exports}
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
      />
      <ExportsListSection exports={exports} activeRegion={activeRegion} />
    </>
  );
}

