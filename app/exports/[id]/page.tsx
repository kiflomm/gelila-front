import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HeroSection from "./(sections)/hero-section";
import DescriptionSection from "./(sections)/description-section";
// import PortfolioDetailsSection from "./(sections)/portfolio-details-section";
import ProductsSection from "./(sections)/products-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

// Force dynamic rendering to ensure updated images appear immediately
export const dynamic = 'force-dynamic';

async function getExportBySlug(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/exports/${slug}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching export:', error);
    return null;
  }
}

async function getAllExports() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/exports`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching exports:', error);
    return [];
  }
}

interface PortfolioPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const exports = await getAllExports();
    return exports.map((exportItem: any) => ({
      id: exportItem.slug,
    }));
  } catch (error) {
    console.error("Error fetching exports for static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { id } = await params;
  const exportItem = await getExportBySlug(id);

  if (!exportItem) {
    return {
      title: "Export Not Found - Gelila Manufacturing PLC",
    };
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

  const imageUrl = getImageUrl(exportItem.imageUrl);

  return {
    title: `${exportItem.title} - Gelila Manufacturing PLC`,
    description: exportItem.heroDescription || exportItem.description,
    keywords: [
      exportItem.title.toLowerCase(),
      "exports",
      "manufacturing",
      "international trade",
      "gelila",
    ],
    openGraph: {
      title: exportItem.title,
      description: exportItem.heroDescription || exportItem.description,
      type: "website",
      locale: "en_US",
      images: imageUrl ? [
        {
          url: imageUrl,
          alt: exportItem.imageAlt || exportItem.title,
          width: 1200,
          height: 630,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: exportItem.title,
      description: exportItem.heroDescription || exportItem.description,
      images: imageUrl ? [imageUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/exports/${id}`,
    },
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { id } = await params;
  
  let exportItem;
  try {
    exportItem = await getExportBySlug(id);
  } catch (error) {
    console.error("Error fetching export:", error);
    notFound();
  }

  if (!exportItem) {
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

  // Transform API data to match the format expected by sections
  // Extract product images for the slideshow (only products with images)
  // Add cache busting to ensure updated images are loaded
  const productImages = (exportItem.products || [])
    .filter((product: any) => product.imageUrl && product.imageUrl.trim() !== '') // Only include products with valid images
    .map((product: any) => {
      const imageUrl = getImageUrl(product.imageUrl);
      // Skip if URL is empty after processing
      if (!imageUrl || imageUrl.trim() === '') {
        return null;
      }
      // Add timestamp to bust browser cache for updated images
      const cacheBuster = product.updatedAt 
        ? new Date(product.updatedAt).getTime() 
        : Date.now();
      const urlWithCacheBuster = imageUrl.includes('?') 
        ? `${imageUrl}&t=${cacheBuster}` 
        : `${imageUrl}?t=${cacheBuster}`;
      return {
        url: urlWithCacheBuster,
        alt: product.imageAlt || product.name,
      };
    })
    .filter(
      (img: { url: string; alt: string } | null): img is { url: string; alt: string } =>
        img !== null
    ); // Remove null entries

  // Get export images - prefer multiple images, fallback to single image, then product images
  const exportImages = exportItem.imageUrls && exportItem.imageUrls.length > 0
    ? exportItem.imageUrls.map((url, index) => ({
        url: getImageUrl(url),
        alt: exportItem.imageAlts?.[index] || exportItem.title,
      }))
    : exportItem.imageUrl
    ? [{ url: getImageUrl(exportItem.imageUrl), alt: exportItem.imageAlt || exportItem.title }]
    : productImages.length > 0
    ? productImages
    : [];

  const transformedExport = {
    id: exportItem.slug,
    title: exportItem.title,
    heroDescription: exportItem.heroDescription,
    description: exportItem.description,
    destinationRegion: exportItem.destinationRegion,
    status: exportItem.status,
    imageUrl: getImageUrl(exportItem.imageUrl),
    imageAlt: exportItem.imageAlt || exportItem.title,
    images: exportImages,
    products: (exportItem.products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: getImageUrl(product.imageUrl),
      alt: product.imageAlt || product.name,
    })),
  };

  // Generate Product structured data
  const productSchema = getProductSchema({
    name: transformedExport.title,
    description: transformedExport.description,
    image: transformedExport.imageUrl || "/logo.png",
    category: "Export Portfolio",
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Exports", url: "/exports" },
    { name: transformedExport.title, url: `/exports/${id}` },
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
      <HeroSection portfolio={transformedExport} />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <DescriptionSection portfolio={transformedExport} />
          {/* <PortfolioDetailsSection portfolio={transformedExport} /> */}
          <ProductsSection exportItem={transformedExport} />
        </div>
      </div>
    </>
  );
}
