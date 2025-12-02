import type { Metadata } from "next";
import { getNewsBySlug } from "@/store/news/news-data";
import { notFound } from "next/navigation";
import { getArticleSchema } from "@/lib/seo";

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

  const articleSchema = getArticleSchema({
    headline: newsItem.title,
    description: newsItem.description,
    image: newsItem.imageUrl,
    datePublished: newsItem.date,
    author: newsItem.author.name,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </>
  );
}
