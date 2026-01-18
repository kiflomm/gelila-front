import { notFound } from "next/navigation";
import HeroSection from "./(sections)/hero-section";
import DescriptionSection from "./(sections)/description-section";
import ProductsSection from "./(sections)/products-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

// This page is fully dynamic to always show the latest import data
export const dynamic = "force-dynamic";

async function getImportBySlug(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/imports/${slug}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching import:', error);
    return null;
  }
}

interface ImportPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ImportPage({ params }: ImportPageProps) {
  const { slug } = await params;
  
  let importItem;
  try {
    importItem = await getImportBySlug(slug);
  } catch (error) {
    console.error("Error fetching import:", error);
    notFound();
  }

  if (!importItem) {
    notFound();
  }
  
  // Helper function to construct full image URL
  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${cleanImageUrl}`;
  };

  // Transform imageUrls to images array for HeroSlider
  const importImages = importItem.imageUrls && importItem.imageUrls.length > 0
    ? importItem.imageUrls.map((url: string, index: number) => ({
        url: getImageUrl(url),
        alt: importItem.imageAlts?.[index] || importItem.imageAlt || importItem.title,
      }))
    : importItem.imageUrl
    ? [{ url: getImageUrl(importItem.imageUrl), alt: importItem.imageAlt || importItem.title }]
    : [];

  // Transform API data to match the format expected by sections
  const transformedImport = {
    id: importItem.slug,
    title: importItem.title,
    heroDescription: importItem.heroDescription,
    description: importItem.description,
    sourceRegion: importItem.sourceRegion,
    status: importItem.status,
    image: getImageUrl(importItem.imageUrl),
    imageAlt: importItem.imageAlt || importItem.title,
    images: importImages,
    products: (importItem.products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: getImageUrl(product.imageUrl),
      alt: product.imageAlt || product.name,
    })),
  };

  // Generate Product structured data for the main import
  const productSchema = getProductSchema({
    name: transformedImport.title,
    description: transformedImport.description,
    image:
      transformedImport.products && transformedImport.products.length > 0
        ? transformedImport.products[0].image
        : "/logo.png",
    category: transformedImport.sourceRegion,
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Imports", url: "/imports" },
    { name: transformedImport.title, url: `/imports/${slug}` },
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
      <HeroSection importItem={transformedImport} />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <DescriptionSection importItem={transformedImport} />
          <ProductsSection importItem={transformedImport} />
        </div>
      </div>
    </>
  );
}

