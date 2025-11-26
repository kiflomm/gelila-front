import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Gelila Manufacturing PLC - Exports",
  description:
    "Your trusted partner in manufacturing and exporting premium goods worldwide. We are committed to excellence, from production to delivery.",
  keywords: [
    "manufacturing",
    "exports",
    "global distribution",
    "international trade",
    "quality products",
    "logistics",
    "ISO certified",
    "export-ready",
  ],
  openGraph: {
    title: "Gelila Manufacturing PLC - Exports",
    description:
      "Your trusted partner in manufacturing and exporting premium goods worldwide. We are committed to excellence, from production to delivery.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelila Manufacturing PLC - Exports",
    description:
      "Your trusted partner in manufacturing and exporting premium goods worldwide.",
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
    canonical: "/exports",
  },
};

export default function ExportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1">
          <div className="px-4 sm:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1280px] flex-1">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
