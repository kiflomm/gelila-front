import type { Metadata } from "next";
import Footer from "@/components/footer";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Subsidiary Companies - Gelila Manufacturing PLC",
  description:
    "Explore Gelila Manufacturing PLC's subsidiary companies, each specializing in distinct sectors including footwear manufacturing, food processing, and public bus transportation.",
  keywords: [
    "subsidiary companies",
    "gelila shoe",
    "soloda bus",
    "gelila food complex",
    "manufacturing",
    "Ethiopia",
    "industrial",
  ],
  openGraph: {
    title: "Subsidiary Companies - Gelila Manufacturing PLC",
    description:
      "Explore Gelila Manufacturing PLC's subsidiary companies, each specializing in distinct sectors and contributing to our diverse portfolio.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subsidiary Companies - Gelila Manufacturing PLC",
    description:
      "Explore Gelila Manufacturing PLC's subsidiary companies and their contributions to Ethiopia's industrial growth.",
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
    canonical: getAbsoluteUrl("/companies"),
  },
};

export default function CompaniesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

