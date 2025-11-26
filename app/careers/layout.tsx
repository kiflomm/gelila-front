import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Careers - Gelila Manufacturing PLC",
  description:
    "Join a team of innovators dedicated to excellence and shaping the future of industry. Discover your potential and grow with us.",
  keywords: [
    "careers",
    "jobs",
    "employment",
    "opportunities",
    "hiring",
    "internships",
    "training",
    "development",
  ],
  openGraph: {
    title: "Careers - Gelila Manufacturing PLC",
    description:
      "Join a team of innovators dedicated to excellence and shaping the future of industry.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers - Gelila Manufacturing PLC",
    description:
      "Join a team of innovators dedicated to excellence and shaping the future of industry.",
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
    canonical: "/careers",
  },
};

export default function CareersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

