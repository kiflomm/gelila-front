import { notFound } from "next/navigation";
import { newsApi } from "@/api/news";
import HeroSection from "./(sections)/hero-section";
import ContentSection from "./(sections)/content-section";
import Sidebar from "./(sections)/sidebar";

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SIDEBAR_STICKY_TOP = "top-24";
const LATEST_POSTS_COUNT = 3;

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
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

  return (
    <div className="w-full pt-28 sm:pt-32">
      <div className="px-4 sm:px-10 lg:px-20">
        <HeroSection newsItem={newsItem} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 py-8 lg:py-12">
          <main className="lg:col-span-2">
            <div className="prose-wrapper">
              <ContentSection content={newsItem.content} />
            </div>
          </main>

          <aside className="lg:col-span-1">
            <div className={`sticky ${SIDEBAR_STICKY_TOP}`}>
              <Sidebar currentSlug={slug} latestPostsCount={LATEST_POSTS_COUNT} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
