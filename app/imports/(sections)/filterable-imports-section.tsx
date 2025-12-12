"use client";

import { useState } from "react";
import FilterChipsSection from "./filter-chips-section";
import ImportsListSection from "./imports-list-section";

interface ImportItem {
  id: string;
  title: string;
  description: string;
  heroDescription?: string;
  sourceRegion?: string;
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

interface FilterableImportsSectionProps {
  imports: ImportItem[];
}

export default function FilterableImportsSection({ imports }: FilterableImportsSectionProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <>
      <FilterChipsSection
        imports={imports}
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
      />
      <ImportsListSection imports={imports} activeRegion={activeRegion} />
    </>
  );
}

