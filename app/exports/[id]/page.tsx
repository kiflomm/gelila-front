import { notFound } from "next/navigation";
import type { Metadata } from "next";
import exportPortfolioData from "@/data/export-portfolio.json";
import HeroSection from "./(sections)/hero-section";
import DescriptionSection from "./(sections)/description-section";
import PortfolioDetailsSection from "./(sections)/portfolio-details-section";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

interface PortfolioPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return exportPortfolioData.exportPortfolios.map((portfolio) => ({
    id: portfolio.id,
  }));
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { id } = await params;
  const portfolio = exportPortfolioData.exportPortfolios.find(
    (p) => p.id === id
  );

  if (!portfolio) {
    return {
      title: "Portfolio Not Found - Gelila Manufacturing PLC",
    };
  }

  return {
    title: `${portfolio.title} - Gelila Manufacturing PLC`,
    description: portfolio.description,
    keywords: [
      portfolio.title.toLowerCase(),
      "exports",
      "manufacturing",
      "international trade",
      "gelila",
    ],
    openGraph: {
      title: portfolio.title,
      description: portfolio.description,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: portfolio.imageUrl,
          alt: portfolio.imageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: portfolio.title,
      description: portfolio.description,
      images: [portfolio.imageUrl],
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
  const portfolio = exportPortfolioData.exportPortfolios.find(
    (p) => p.id === id
  );

  if (!portfolio) {
    notFound();
  }

  // Generate Product structured data
  const productSchema = getProductSchema({
    name: portfolio.title,
    description: portfolio.description,
    image: portfolio.imageUrl,
    category: "Export Portfolio",
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Exports", url: "/exports" },
    { name: portfolio.title, url: `/exports/${id}` },
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
      <HeroSection portfolio={portfolio} />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <DescriptionSection portfolio={portfolio} />
          <PortfolioDetailsSection portfolio={portfolio} />
        </div>
      </div>
    </>
  );
}
