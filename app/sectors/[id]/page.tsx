import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import HeroSection from "./(sections)/hero-section";
import DescriptionSection from "./(sections)/description-section";
import ProductsSection from "./(sections)/products-section";

interface SectorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return productsData.sectors.map((sector) => ({
    id: sector.id,
  }));
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { id } = await params;
  const sector = productsData.sectors.find((s) => s.id === id);

  if (!sector) {
    notFound();
  }

  return (
    <>
      <HeroSection sector={sector} />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <DescriptionSection sector={sector} />
          <ProductsSection sector={sector} />
        </div>
      </div>
    </>
  );
}
