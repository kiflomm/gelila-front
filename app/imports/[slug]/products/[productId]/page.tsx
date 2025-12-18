import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HeroSection from "./(sections)/hero-section";
import ProductInfoSection from "./(sections)/product-info-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

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
    slug: string;
    productId: string;
  }>;
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/imports`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    const imports = await response.json();
    
    const params: Array<{ slug: string; productId: string }> = [];
    imports.forEach((importItem: any) => {
      (importItem.products || []).forEach((product: any) => {
        params.push({
          slug: importItem.slug,
          productId: product.id.toString(),
        });
      });
    });
    return params;
  } catch (error) {
    console.error("Error fetching imports for static params:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;
  const importItem = await getImportBySlug(slug);

  if (!importItem) {
    notFound();
  }

  const productIdNum = parseInt(productId, 10);
  const product = (importItem.products || []).find((p: any) => p.id === productIdNum);

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
  
  const transformedImport = {
    slug: importItem.slug,
    title: importItem.title,
    sourceRegion: importItem.sourceRegion,
  };

  // Generate Product structured data
  const productSchema = getProductSchema({
    name: transformedProduct.name,
    description: transformedProduct.description,
    image: transformedProduct.image,
    category: transformedImport.title,
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Imports", url: "/imports" },
    { name: transformedImport.title, url: `/imports/${slug}` },
    { name: transformedProduct.name, url: `/imports/${slug}/products/${productId}` },
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
        importTitle={transformedImport.title}
        importId={slug}
        products={(importItem.products || []).map((p: any) => ({
          id: p.id,
          name: p.name,
        }))}
      />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <Link
            href={`/imports/${slug}`}
            className="inline-flex items-center gap-2 text-[#6C757D] dark:text-white/70 hover:text-primary transition-colors text-sm font-medium w-fit mb-6 group/back"
          >
            <ArrowLeft className="size-4 transition-transform group-hover/back:-translate-x-1" />
            Back to {transformedImport.title}
          </Link>
          <ProductInfoSection
            product={transformedProduct}
            importId={slug}
            importTitle={transformedImport.title}
            products={(importItem.products || []).map((p: any) => ({
              id: p.id,
              name: p.name,
            }))}
          />
        </div>
      </div>
    </>
  );
}

