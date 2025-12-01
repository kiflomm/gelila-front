import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Sitemap - Gelila Manufacturing PLC",
  description:
    "Browse our complete sitemap to find all pages and sections of the Gelila Manufacturing PLC website.",
  keywords: ["sitemap", "site map", "navigation", "pages", "website structure"],
  openGraph: {
    title: "Sitemap - Gelila Manufacturing PLC",
    description:
      "Browse our complete sitemap to find all pages and sections of our website.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitemap - Gelila Manufacturing PLC",
    description: "Sitemap for Gelila Manufacturing PLC.",
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
    canonical: "/sitemap",
  },
};

export default function SitemapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-4 sm:px-10 lg:px-20 pt-20 sm:pt-20 pb-10 lg:pb-16 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-6xl">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
