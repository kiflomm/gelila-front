import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HeroSection from "./(sections)/hero-section";
import ProductInfoSection from "./(sections)/product-info-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

// Force dynamic rendering to ensure updated product data appears immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
  const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${baseUrl}${cleanImageUrl}`;
}

interface ProductPageProps {
  params: Promise<{
    id: string;
    productId: string;
  }>;
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/exports`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    const exports = await response.json();
    
    const params: Array<{ id: string; productId: string }> = [];
    exports.forEach((exportItem: any) => {
      (exportItem.products || []).forEach((product: any) => {
        params.push({
          id: exportItem.slug,
          productId: product.id.toString(),
        });
      });
    });
    return params;
  } catch (error) {
    console.error("Error fetching exports for static params:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, productId } = await params;
  const exportItem = await getExportBySlug(id);

  if (!exportItem) {
    notFound();
  }

  const productIdNum = parseInt(productId, 10);
  const product = (exportItem.products || []).find((p: any) => p.id === productIdNum);

  if (!product) {
    notFound();
  }
  
  // Transform product data
  const transformedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    image: getImageUrl(product.imageUrl),
    alt: product.imageAlt || product.name,
  };
  
  const transformedExport = {
    slug: exportItem.slug,
    title: exportItem.title,
    destinationRegion: exportItem.destinationRegion,
  };

  // Generate Product structured data
  const productSchema = getProductSchema({
    name: transformedProduct.name,
    description: transformedProduct.description,
    image: transformedProduct.image,
    category: transformedExport.title,
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Exports", url: "/exports" },
    { name: transformedExport.title, url: `/exports/${id}` },
    { name: transformedProduct.name, url: `/exports/${id}/products/${productId}` },
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
      <HeroSection 
        product={transformedProduct} 
        exportTitle={transformedExport.title}
        exportId={id}
        products={(exportItem.products || []).map((p: any) => ({
          id: p.id,
          name: p.name,
        }))}
      />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <Link
            href={`/exports/${id}`}
            className="inline-flex items-center gap-2 text-[#6C757D] dark:text-white/70 hover:text-primary transition-colors text-sm font-medium w-fit mb-6 group/back"
          >
            <ArrowLeft className="size-4 transition-transform group-hover/back:-translate-x-1" />
            Back to {transformedExport.title}
          </Link>
          <ProductInfoSection
            product={transformedProduct}
            exportId={id}
            exportTitle={transformedExport.title}
            products={(exportItem.products || []).map((p: any) => ({
              id: p.id,
              name: p.name,
            }))}
          />
        </div>
      </div>
    </>
  );
}

