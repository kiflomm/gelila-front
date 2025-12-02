import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo";
import productsData from "@/data/products.json";
import exportPortfolioData from "@/data/export-portfolio.json";
import newsData from "@/data/news.json";
import jobsData from "@/data/jobs.json";

export async function GET() {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/sectors`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: `${baseUrl}/exports`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: `${baseUrl}/news`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/careers`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      url: `${baseUrl}/sitemap`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.3",
    },
    {
      url: `${baseUrl}/privacy`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.2",
    },
    {
      url: `${baseUrl}/terms`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.2",
    },
    {
      url: `${baseUrl}/cookies`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.2",
    },
  ];

  // Dynamic sector routes
  const sectorRoutes = productsData.sectors.map((sector) => ({
    url: `${baseUrl}/sectors/${sector.id}`,
    lastmod: currentDate,
    changefreq: "monthly",
    priority: "0.8",
  }));

  // Dynamic export portfolio routes
  const exportRoutes = exportPortfolioData.exportPortfolios.map(
    (portfolio) => ({
      url: `${baseUrl}/exports/${portfolio.id}`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    })
  );

  // Dynamic news article routes
  const newsRoutes = newsData.newsItems.map((newsItem) => {
    // Parse date string (format: "Oct 26, 2023") to ISO string
    let lastmod = currentDate;
    try {
      const parsedDate = new Date(newsItem.date);
      if (!isNaN(parsedDate.getTime())) {
        lastmod = parsedDate.toISOString();
      }
    } catch {
      // Use currentDate if parsing fails
    }
    return {
      url: `${baseUrl}/news/${newsItem.slug}`,
      lastmod,
      changefreq: "monthly",
      priority: "0.7",
    };
  });

  // Dynamic job application routes
  const jobRoutes = jobsData.jobs.map((job) => ({
    url: `${baseUrl}/careers/apply/${job.id}`,
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "0.6",
  }));

  const allRoutes = [
    ...staticRoutes,
    ...sectorRoutes,
    ...exportRoutes,
    ...newsRoutes,
    ...jobRoutes,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
