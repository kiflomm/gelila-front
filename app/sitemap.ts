import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { sectorsApi } from "@/api/sectors";
import { exportsApi } from "@/api/exports";
import { newsApi } from "@/api/news";
import { jobsApi } from "@/api/jobs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Fetch dynamic data from APIs
  try {
    // Dynamic sector routes
    const sectors = await sectorsApi.getAllSectors();
    const sectorRoutes: MetadataRoute.Sitemap = sectors.map((sector) => ({
      url: `${baseUrl}/sectors/${sector.slug}`,
      lastModified: sector.updatedAt ? new Date(sector.updatedAt) : currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    // Dynamic export portfolio routes
    const exports = await exportsApi.getAllExports();
    const exportRoutes: MetadataRoute.Sitemap = exports.map((exportItem) => ({
      url: `${baseUrl}/exports/${exportItem.slug}`,
      lastModified: exportItem.updatedAt ? new Date(exportItem.updatedAt) : currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Dynamic news article routes
    const newsData = await newsApi.getNews({ limit: 1000 }); // Get all news
    const newsRoutes: MetadataRoute.Sitemap = newsData.news.map((newsItem) => ({
      url: `${baseUrl}/news/${newsItem.slug}`,
      lastModified: newsItem.publishedAt || newsItem.updatedAt || newsItem.createdAt
        ? new Date(newsItem.publishedAt || newsItem.updatedAt || newsItem.createdAt!)
        : currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Dynamic job application routes
    const jobsData = await jobsApi.getJobs({ limit: 1000 }); // Get all jobs
    const jobRoutes: MetadataRoute.Sitemap = jobsData.jobs
      .filter((job) => job.isActive !== false) // Only active jobs
      .map((job) => ({
        url: `${baseUrl}/careers/apply/${job.id}`,
        lastModified: job.updatedAt || job.createdAt
          ? new Date(job.updatedAt || job.createdAt!)
          : currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

    return [
      ...staticRoutes,
      ...sectorRoutes,
      ...exportRoutes,
      ...newsRoutes,
      ...jobRoutes,
    ];
  } catch (error) {
    // If API calls fail, return only static routes
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
