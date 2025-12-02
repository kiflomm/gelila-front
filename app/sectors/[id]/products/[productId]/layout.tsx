import type { Metadata } from "next";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
    productId: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { id, productId } = await params;
  const sector = productsData.sectors.find((s) => s.id === id);

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
          url: product.image,
          alt: product.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${sector.title}`,
      description: product.description,
      images: [product.image],
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
      canonical: `/sectors/${id}/products/${productId}`,
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { id, productId } = await params;
  const sector = productsData.sectors.find((s) => s.id === id);

  if (!sector) {
    notFound();
  }

  const product = sector.products.find((p) => p.id.toString() === productId);

  if (!product) {
    notFound();
  }

  return <>{children}</>;
}
