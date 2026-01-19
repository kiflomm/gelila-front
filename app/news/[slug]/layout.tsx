import type { Metadata } from "next";
import { newsApi } from "@/api/news";
import { notFound } from "next/navigation";
import { getArticleSchema, getAbsoluteUrl } from "@/lib/seo";

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
  
  let newsItem;
  try {
    newsItem = await newsApi.getNewsBySlug(slug);
  } catch (error) {
    return {
      title: "News Article Not Found - Gelila Manufacturing PLC",
    };
  }

  if (!newsItem) {
    return {
      title: "News Article Not Found - Gelila Manufacturing PLC",
    };
  }

  const categoryName = newsItem.category?.name || "News";
  
  // Convert relative image URL to full URL for metadata
  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const baseUrl = apiBaseUrl.replace('/api/v1', '');
    return imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
  };
  
  const fullImageUrl = getImageUrl(newsItem.imageUrl);

  return {
    title: `${newsItem.title} - Gelila Manufacturing PLC`,
    description: newsItem.description,
    keywords: [
      categoryName.toLowerCase(),
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
          url: fullImageUrl,
          alt: newsItem.imageAlt,
          width: 1200,
          height: 630,
        },
      ],
      publishedTime: newsItem.publishedAt || newsItem.createdAt,
      authors: [newsItem.authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description: newsItem.description,
      images: [fullImageUrl],
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
      canonical: getAbsoluteUrl(`/news/${slug}`),
    },
  };
}

export default async function NewsDetailLayout({
  children,
  params,
}: NewsDetailLayoutProps) {
  const { slug } = await params;
  
  let newsItem;
  try {
    newsItem = await newsApi.getNewsBySlug(slug);
  } catch (error) {
    notFound();
  }

  if (!newsItem) {
    notFound();
  }

  // Convert relative image URL to full URL for schema
  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const baseUrl = apiBaseUrl.replace('/api/v1', '');
    return imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
  };
  
  const fullImageUrl = getImageUrl(newsItem.imageUrl);

  const articleSchema = getArticleSchema({
    headline: newsItem.title,
    description: newsItem.description,
    image: fullImageUrl,
    datePublished: newsItem.publishedAt || newsItem.createdAt || new Date().toISOString(),
    author: newsItem.authorName,
  });

  return (
    <div className="notranslate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </div>
  );
}
