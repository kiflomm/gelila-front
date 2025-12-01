import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Industrial Sectors - Gelila Manufacturing PLC",
  description:
    "Explore our diverse range of high-quality products across multiple industries.",
  keywords: [
    "sectors",
    "products",
    "manufacturing",
    "footwear",
    "bus assembly",
    "textile",
    "food complex",
    "industrial",
  ],
  openGraph: {
    title: "Industrial Sectors - Gelila Manufacturing PLC",
    description:
      "Explore our diverse range of high-quality products across multiple industries.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Sectors - Gelila Manufacturing PLC",
    description:
      "Explore our diverse range of high-quality products across multiple industries.",
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
    canonical: "/sectors",
  },
};

export default function SectorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 flex-col">
          <div className="relative">
            <Header />
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
