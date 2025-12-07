import type { Metadata } from "next";
import { notFound } from "next/navigation";
import companiesData from "@/data/companies/companies.json";

interface CompanyLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CompanyLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const company = companiesData.companies.find((c) => c.slug === slug);

  if (!company) {
    return {
      title: "Company Not Found - Gelila Manufacturing PLC",
    };
  }

  return {
    title: `${company.title} - Gelila Manufacturing PLC`,
    description: company.description,
    keywords: [
      company.name.toLowerCase(),
      company.title.toLowerCase(),
      company.location?.toLowerCase() || "",
      "subsidiary",
      "gelila manufacturing",
      "ethiopia",
    ].filter(Boolean),
    openGraph: {
      title: `${company.title} - Gelila Manufacturing PLC`,
      description: company.description,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: company.image.src,
          width: 1200,
          height: 630,
          alt: company.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${company.title} - Gelila Manufacturing PLC`,
      description: company.description,
      images: [company.image.src],
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
      canonical: `/companies/${slug}`,
    },
  };
}

export default async function CompanyLayout({
  children,
  params,
}: CompanyLayoutProps) {
  const { slug } = await params;
  const company = companiesData.companies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  return <>{children}</>;
}
