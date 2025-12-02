/**
 * SEO utility functions and constants
 */

export const siteConfig = {
  name: "Gelila Manufacturing PLC",
  description:
    "A diversified Ethiopian industrial and service company engaged in footwear manufacturing, food processing, public bus transportation, and the development of new large-scale manufacturing projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gelila.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/gelila",
    linkedin: "https://linkedin.com/company/gelila",
  },
};

/**
 * Get absolute URL for a given path
 */
export function getAbsoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generate Organization structured data
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: getAbsoluteUrl("/logo.png"),
    sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Amharic"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "ET",
      addressLocality: "Addis Ababa",
      addressRegion: "Addis Ababa",
    },
  };
}

/**
 * Generate WebSite structured data with search action
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  };
}

/**
 * Generate Article structured data
 */
export function getArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image.startsWith("http") ? image : getAbsoluteUrl(image),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/logo.png"),
      },
    },
  };
}

/**
 * Generate Product structured data
 */
export function getProductSchema({
  name,
  description,
  image,
  category,
}: {
  name: string;
  description: string;
  image: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image.startsWith("http") ? image : getAbsoluteUrl(image),
    category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

/**
 * Generate JobPosting structured data
 */
export function getJobPostingSchema({
  title,
  description,
  employmentType,
  location,
  datePosted,
}: {
  title: string;
  description: string;
  employmentType: string;
  location: string;
  datePosted: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    employmentType,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressCountry: "ET",
      },
    },
    datePosted,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
  };
}
