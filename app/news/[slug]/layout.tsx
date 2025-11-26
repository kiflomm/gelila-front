import type { Metadata } from "next";
import { getNewsBySlug } from "@/store/news/news-data";
import { notFound } from "next/navigation";

interface NewsDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: NewsDetailLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    return {
      title: "News Article Not Found - Gelila Manufacturing PLC",
    };
  }

  return {
    title: `${newsItem.title} - Gelila Manufacturing PLC`,
    description: newsItem.description,
    keywords: [
      newsItem.category.toLowerCase(),
      "manufacturing",
      "news",
      "updates",
      "gelila",
    ],
    openGraph: {
      title: newsItem.title,
      description: newsItem.description,
      type: "article",
      locale: "en_US",
      images: [
        {
          url: newsItem.imageUrl,
          alt: newsItem.imageAlt,
          width: 1200,
          height: 630,
        },
      ],
      publishedTime: newsItem.date,
      authors: [newsItem.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description: newsItem.description,
      images: [newsItem.imageUrl],
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
      canonical: `/news/${slug}`,
    },
  };
}

export default async function NewsDetailLayout({
  children,
  params,
}: NewsDetailLayoutProps) {
  const { slug } = await params;
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  // This layout only handles metadata generation
  // The Header and Footer are provided by the parent news/layout.tsx
  return <>{children}</>;
}
