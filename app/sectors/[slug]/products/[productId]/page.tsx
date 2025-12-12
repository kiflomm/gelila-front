import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HeroSection from "./(sections)/hero-section";
import ProductInfoSection from "./(sections)/product-info-section";
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
    const response = await fetch(`${apiUrl}/sectors`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    const sectors = await response.json();
    
    const params: Array<{ slug: string; productId: string }> = [];
    sectors.forEach((sector: any) => {
      sector.products.forEach((product: any) => {
        params.push({
          slug: sector.slug,
          productId: product.id.toString(),
        });
      });
    });
    return params;
  } catch (error) {
    console.error("Error fetching sectors for static params:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;
  const sector = await getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  const productIdNum = parseInt(productId, 10);
  const product = sector.products.find((p: any) => p.id === productIdNum);

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
  
  const transformedSector = {
    slug: sector.slug,
    name: sector.name,
    title: sector.title,
  };

  // Generate Product structured data
  const productSchema = getProductSchema({
    name: transformedProduct.name,
    description: transformedProduct.description,
    image: transformedProduct.image,
    category: transformedSector.name,
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Sectors", url: "/sectors" },
    { name: transformedSector.title, url: `/sectors/${slug}` },
    { name: transformedProduct.name, url: `/sectors/${slug}/products/${productId}` },
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
        sectorName={transformedSector.name} 
        sectorId={slug}
        products={sector.products.map((p: any) => ({
          id: p.id,
          name: p.name,
        }))}
      />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <Link
            href={`/sectors/${slug}`}
            className="inline-flex items-center gap-2 text-[#6C757D] dark:text-white/70 hover:text-primary transition-colors text-sm font-medium w-fit mb-6 group/back"
          >
            <ArrowLeft className="size-4 transition-transform group-hover/back:-translate-x-1" />
            Back to {transformedSector.name}
          </Link>
          <ProductInfoSection
            product={transformedProduct}
            sectorId={slug}
            sectorName={transformedSector.name}
            products={sector.products.map((p: any) => ({
              id: p.id,
              name: p.name,
            }))}
          />
        </div>
      </div>
    </>
  );
}
