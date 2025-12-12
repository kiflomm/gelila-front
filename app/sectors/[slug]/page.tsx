import { notFound } from "next/navigation";
import HeroSection from "./(sections)/hero-section";
import DescriptionSection from "./(sections)/description-section";
import ProductsSection from "./(sections)/products-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

async function getSectorBySlug(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/sectors/${slug}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sector:', error);
    return null;
  }
}

async function getAllSectors() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/sectors`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return [];
  }
}

interface SectorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const sectors = await getAllSectors();
    return sectors.map((sector: any) => ({
      slug: sector.slug,
    }));
  } catch (error) {
    console.error("Error fetching sectors for static params:", error);
    return [];
  }
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  
  let sector;
  try {
    sector = await getSectorBySlug(slug);
  } catch (error) {
    console.error("Error fetching sector:", error);
    notFound();
  }

  if (!sector) {
    notFound();
  }
  
  // Transform API data to match the format expected by sections
  const transformedSector = {
    id: sector.slug,
    name: sector.name,
    title: sector.title,
    status: sector.status,
    location: sector.location,
    heroDescription: sector.heroDescription,
    description: sector.description,
    image: sector.imageUrl,
    imageAlt: sector.imageAlt,
    products: sector.products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.imageUrl || "",
      alt: product.imageAlt || product.name,
    })),
  };

  // Generate Product structured data for the main sector
  const productSchema = getProductSchema({
    name: transformedSector.title,
    description: transformedSector.description,
    image:
      transformedSector.products && transformedSector.products.length > 0
        ? transformedSector.products[0].image
        : "/logo.png",
    category: transformedSector.name,
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Sectors", url: "/sectors" },
    { name: transformedSector.title, url: `/sectors/${slug}` },
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
      <HeroSection sector={transformedSector} />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <DescriptionSection sector={transformedSector} />
          <ProductsSection sector={transformedSector} />
        </div>
      </div>
    </>
  );
}
