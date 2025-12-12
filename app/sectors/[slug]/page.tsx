import { notFound } from "next/navigation";
import HeroSection from "./(sections)/hero-section";
import DescriptionSection from "./(sections)/description-section";
import ProductsSection from "./(sections)/products-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";
import { apiServer } from "@/lib/api-server";

interface SectorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const sectors = await apiServer.getSectors();
    return sectors.map((sector) => ({
      slug: sector.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for sectors:", error);
    return [];
  }
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  
  const sector = await apiServer.getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  // Fetch products for this sector server-side
  const products = await apiServer.getProductsBySectorId(sector.id);

  // Generate Product structured data for the main sector
  const productSchema = getProductSchema({
    name: sector.title,
    description: sector.description || sector.heroDescription || "",
    image: sector.imageUrl || "/logo.png",
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
          <ProductsSection products={products} sectorSlug={sector.slug} />
        </div>
      </div>
    </>
  );
}
