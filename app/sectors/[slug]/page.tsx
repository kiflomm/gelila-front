import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import HeroSection from "./(sections)/hero-section";
import DescriptionSection from "./(sections)/description-section";
import ProductsSection from "./(sections)/products-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

interface SectorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return productsData.sectors.map((sector) => ({
    slug: sector.id,
  }));
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = productsData.sectors.find((s) => s.id === slug);

  if (!sector) {
    notFound();
  }

  // Generate Product structured data for the main sector
  const productSchema = getProductSchema({
    name: sector.title,
    description: sector.description,
    image:
      sector.products && sector.products.length > 0
        ? sector.products[0].image
        : "/logo.png",
    category: sector.name,
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Sectors", url: "/sectors" },
    { name: sector.title, url: `/sectors/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
