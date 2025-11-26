"use client";

import { useState } from "react";
import FilterChipsSection from "./filter-chips-section";
import ProductDivisionsSection from "./product-divisions-section";

export default function FilterableSectorsSection() {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  return (
    <>
      <FilterChipsSection
        activeSector={activeSector}
        setActiveSector={setActiveSector}
      />
      <ProductDivisionsSection activeSector={activeSector} />
    </>
  );
}

