import type { Metadata } from "next";
import { notFound } from "next/navigation";

// This layout is dynamic because it fetches import data for metadata
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

interface ImportLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ImportLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const importItem = await getImportBySlug(slug);

  if (!importItem) {
    return {
      title: "Import Not Found - Gelila Manufacturing PLC",
    };
  }

  // Helper function to construct full image URL
  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return "/og-image.jpg";
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${cleanImageUrl}`;
  };

  const ogImage = getImageUrl(importItem.imageUrl);

  return {
    title: `${importItem.title} - Gelila Manufacturing PLC`,
    description: importItem.description,
    keywords: [
      importItem.title.toLowerCase(),
      importItem.sourceRegion.toLowerCase(),
      "imports",
      "global sourcing",
    ],
    openGraph: {
      title: `${importItem.title} - Gelila Manufacturing PLC`,
      description: importItem.description,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: importItem.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${importItem.title} - Gelila Manufacturing PLC`,
      description: importItem.description,
      images: [ogImage],
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
      canonical: `/imports/${slug}`,
    },
  };
}

export default async function ImportLayout({
  children,
  params,
}: ImportLayoutProps) {
  const { slug } = await params;
  const importItem = await getImportBySlug(slug);

  if (!importItem) {
    notFound();
  }

  return <>{children}</>;
}

