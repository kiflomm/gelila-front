import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact Us - Gelila Manufacturing PLC",
  description:
    "Get in touch with Gelila Manufacturing PLC. Reach out for inquiries, partnerships, or general information.",
  keywords: [
    "contact",
    "inquiry",
    "get in touch",
    "partnership",
    "support",
    "customer service",
  ],
  openGraph: {
    title: "Contact Us - Gelila Manufacturing PLC",
    description:
      "Get in touch with Gelila Manufacturing PLC for inquiries, partnerships, or general information.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Gelila Manufacturing PLC",
    description: "Get in touch with Gelila Manufacturing PLC.",
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
    canonical: "/contact",
  },
};

export default function ContactLayout({
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
