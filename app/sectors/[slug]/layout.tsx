import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectorsApi } from "@/api/sectors";
import { getImageUrl } from "@/app/news/[slug]/utils";

interface SectorLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: SectorLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  
  let sector;
  try {
    sector = await sectorsApi.getSectorBySlug(slug);
  } catch {
    return {
      title: "Sector Not Found - Gelila Manufacturing PLC",
    };
  }

  if (!sector) {
    return {
      title: "Sector Not Found - Gelila Manufacturing PLC",
    };
  }

  const statusLabels: Record<string, string> = {
    operational: "Operational",
    planned: "Planned",
    project: "In Development",
  };

  const ogImage =
    sector.products && sector.products.length > 0 && sector.products[0].imageUrl
      ? getImageUrl(sector.products[0].imageUrl)
      : "/og-image.jpg";

  return {
    title: `${sector.title} - Gelila Manufacturing PLC`,
    description: sector.description,
    keywords: [
      sector.name.toLowerCase(),
      sector.title.toLowerCase(),
      sector.location,
      statusLabels[sector.status] || sector.status,
      ...sector.products.map((p) => p.name.toLowerCase()),
    ],
    openGraph: {
      title: `${sector.title} - Gelila Manufacturing PLC`,
      description: sector.description,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: sector.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sector.title} - Gelila Manufacturing PLC`,
      description: sector.description,
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
      canonical: `/sectors/${slug}`,
    },
  };
}

export default async function SectorLayout({
  children,
  params,
}: SectorLayoutProps) {
  const { slug } = await params;
  
  let sector;
  try {
    sector = await sectorsApi.getSectorBySlug(slug);
  } catch {
    notFound();
  }

  if (!sector) {
    notFound();
  }

  return <>{children}</>;
}
