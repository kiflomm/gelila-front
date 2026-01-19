import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy - Gelila Manufacturing PLC",
  description:
    "Read our Privacy Policy to understand how Gelila Manufacturing PLC collects, uses, and protects your personal information.",
  keywords: [
    "privacy",
    "privacy policy",
    "data protection",
    "personal information",
    "GDPR",
    "data privacy",
  ],
  openGraph: {
    title: "Privacy Policy - Gelila Manufacturing PLC",
    description:
      "Read our Privacy Policy to understand how we collect, use, and protect your personal information.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Gelila Manufacturing PLC",
    description: "Privacy Policy for Gelila Manufacturing PLC.",
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
    canonical: getAbsoluteUrl("/privacy"),
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-4 sm:px-10 lg:px-20 pt-28 sm:pt-32 lg:pt-36 pb-10 lg:pb-16 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-6xl">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
