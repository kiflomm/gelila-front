import type { Metadata } from "next";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";

interface SectorLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: SectorLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const sector = productsData.sectors.find((s) => s.id === id);

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${sector.title} - Gelila Manufacturing PLC`,
      description: sector.description,
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
      canonical: `/sectors/${id}`,
    },
  };
}

export default async function SectorLayout({
  children,
  params,
}: SectorLayoutProps) {
  const { id } = await params;
  const sector = productsData.sectors.find((s) => s.id === id);

  if (!sector) {
    notFound();
  }

  return <>{children}</>;
}
