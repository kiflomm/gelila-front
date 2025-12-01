import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Cookie Policy - Gelila Manufacturing PLC",
  description:
    "Learn about how Gelila Manufacturing PLC uses cookies and similar technologies to enhance your browsing experience.",
  keywords: [
    "cookies",
    "cookie policy",
    "tracking",
    "web analytics",
    "browser data",
  ],
  openGraph: {
    title: "Cookie Policy - Gelila Manufacturing PLC",
    description:
      "Learn about how we use cookies and similar technologies to enhance your browsing experience.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy - Gelila Manufacturing PLC",
    description: "Cookie Policy for Gelila Manufacturing PLC.",
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
    canonical: "/cookies",
  },
};

export default function CookiesLayout({
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
