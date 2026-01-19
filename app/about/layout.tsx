import type { Metadata } from "next";
import Footer from "@/components/footer";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us - Gelila Manufacturing PLC",
  description:
    "Learn about Gelila Manufacturing PLC, our mission, values, and commitment to engineering Ethiopia's industrial future.",
  keywords: [
    "about",
    "company",
    "mission",
    "values",
    "history",
    "manufacturing",
    "Ethiopia",
    "industrial",
  ],
  openGraph: {
    title: "About Us - Gelila Manufacturing PLC",
    description:
      "Learn about Gelila Manufacturing PLC, our mission, values, and commitment to engineering Ethiopia's industrial future.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Gelila Manufacturing PLC",
    description:
      "Learn about Gelila Manufacturing PLC and our commitment to excellence.",
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
    canonical: getAbsoluteUrl("/about"),
  },
};

export default function AboutLayout({
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
