import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Gelila Manufacturing PLC - Imports & Exports",
  description:
    "Your trusted partner in importing and exporting premium goods worldwide. We are committed to excellence in global trade, from sourcing and production to delivery.",
  keywords: [
    "manufacturing",
    "imports",
    "exports",
    "global trade",
    "international trade",
    "quality products",
    "logistics",
    "ISO certified",
    "import-ready",
    "export-ready",
  ],
  openGraph: {
    title: "Gelila Manufacturing PLC - Imports & Exports",
    description:
      "Your trusted partner in importing and exporting premium goods worldwide. We are committed to excellence in global trade, from sourcing and production to delivery.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelila Manufacturing PLC - Imports & Exports",
    description:
      "Your trusted partner in importing and exporting premium goods worldwide.",
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
    canonical: "/imports-exports",
  },
};

export default function ImportsExportsLayout({
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

