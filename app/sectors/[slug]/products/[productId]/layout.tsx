import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectorsApi } from "@/api/sectors";
import { getImageUrl } from "@/app/news/[slug]/utils";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    productId: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { slug, productId } = await params;
  
  let sector;
  try {
    sector = await sectorsApi.getSectorBySlug(slug);
  } catch {
    return {
      title: "Product Not Found - Gelila Manufacturing PLC",
    };
  }

  if (!sector) {
    return {
      title: "Product Not Found - Gelila Manufacturing PLC",
    };
  }

  const product = sector.products.find((p) => p.id.toString() === productId);

  if (!product) {
    return {
      title: "Product Not Found - Gelila Manufacturing PLC",
    };
  }

  const productImage = product.imageUrl ? getImageUrl(product.imageUrl) : "/og-image.jpg";

  return {
    title: `${product.name} - ${sector.title} - Gelila Manufacturing PLC`,
    description: product.description,
    keywords: [
      product.name.toLowerCase(),
      sector.name.toLowerCase(),
      sector.title.toLowerCase(),
      "product",
      "manufacturing",
    ],
    openGraph: {
      title: `${product.name} - ${sector.title}`,
      description: product.description,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: productImage,
          alt: product.imageAlt || product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${sector.title}`,
      description: product.description,
      images: [productImage],
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
      canonical: `/sectors/${slug}/products/${productId}`,
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { slug, productId } = await params;
  
  let sector;
  try {
    sector = await sectorsApi.getSectorBySlug(slug);
  } catch {
    notFound();
  }

  if (!sector) {
    notFound();
  }

  const product = sector.products.find((p) => p.id.toString() === productId);

  if (!product) {
    notFound();
  }

  return <>{children}</>;
}
