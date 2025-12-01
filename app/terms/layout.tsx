import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service - Gelila Manufacturing PLC",
  description:
    "Read our Terms of Service to understand the rules and regulations for using Gelila Manufacturing PLC's website and services.",
  keywords: [
    "terms",
    "terms of service",
    "terms and conditions",
    "user agreement",
    "legal terms",
  ],
  openGraph: {
    title: "Terms of Service - Gelila Manufacturing PLC",
    description:
      "Read our Terms of Service to understand the rules and regulations for using our website and services.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Gelila Manufacturing PLC",
    description: "Terms of Service for Gelila Manufacturing PLC.",
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
    canonical: "/terms",
  },
};

export default function TermsLayout({
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
