import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "News & Updates - Gelila Manufacturing PLC",
  description:
    "Stay informed with the latest news, press releases, and corporate milestones from Gelila Manufacturing.",
  keywords: [
    "news",
    "updates",
    "press releases",
    "corporate milestones",
    "manufacturing news",
    "industry insights",
    "company events",
  ],
  openGraph: {
    title: "News & Updates - Gelila Manufacturing PLC",
    description:
      "Stay informed with the latest news, press releases, and corporate milestones from Gelila Manufacturing.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Updates - Gelila Manufacturing PLC",
    description:
      "Stay informed with the latest news, press releases, and corporate milestones from Gelila Manufacturing.",
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
    canonical: "/news",
  },
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-6xl">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
