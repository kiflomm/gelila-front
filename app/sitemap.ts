import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import productsData from "@/data/products.json";
import exportPortfolioData from "@/data/export-portfolio.json";
import newsData from "@/data/news.json";
import jobsData from "@/data/jobs.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sectors`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exports`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/site-map`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Dynamic sector routes
  const sectorRoutes: MetadataRoute.Sitemap = productsData.sectors.map(
    (sector) => ({
      url: `${baseUrl}/sectors/${sector.id}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Dynamic export portfolio routes
  const exportRoutes: MetadataRoute.Sitemap =
    exportPortfolioData.exportPortfolios.map((portfolio) => ({
      url: `${baseUrl}/exports/${portfolio.id}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Dynamic news article routes
  const newsRoutes: MetadataRoute.Sitemap = newsData.newsItems.map(
    (newsItem) => {
      // Parse date string (format: "Oct 26, 2023") to Date object
      let lastModified = currentDate;
      try {
        const parsedDate = new Date(newsItem.date);
        if (!isNaN(parsedDate.getTime())) {
          lastModified = parsedDate;
        }
      } catch {
        // Use currentDate if parsing fails
      }
      return {
        url: `${baseUrl}/news/${newsItem.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    }
  );

  // Dynamic job application routes
  const jobRoutes: MetadataRoute.Sitemap = jobsData.jobs.map((job) => ({
    url: `${baseUrl}/careers/apply/${job.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...sectorRoutes,
    ...exportRoutes,
    ...newsRoutes,
    ...jobRoutes,
  ];
}
