import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { siteConfig, getOrganizationSchema, getWebSiteSchema, getAbsoluteUrl } from "@/lib/seo";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth/auth-provider";
import { TranslationWidget } from "@/components/translation-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Gelila Manufacturing PLC - Leading Ethiopian Industrial Group",
    template: "%s | Gelila Manufacturing PLC",
  },
  description: siteConfig.description,
  keywords: [
    "Gelila Manufacturing",
    "Ethiopian manufacturing",
    "footwear manufacturing",
    "food processing",
    "bus transportation",
    "industrial group",
    "Ethiopia",
    "manufacturing PLC",
    "export manufacturing",
    "leather footwear",
    "wheat flour",
    "biscuits",
    "public transport",
    "Soloda",
    "bus assembly",
    "textile manufacturing",
  ],
  authors: [{ name: "Gelila Manufacturing PLC" }],
  creator: "Gelila Manufacturing PLC",
  publisher: "Gelila Manufacturing PLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Gelila Manufacturing PLC - Leading Ethiopian Industrial Group",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Gelila Manufacturing PLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelila Manufacturing PLC - Leading Ethiopian Industrial Group",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@gelila",
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
    canonical: getAbsoluteUrl("/"),
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  category: "Manufacturing",
};

const organizationSchema = getOrganizationSchema();
const websiteSchema = getWebSiteSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} font-display antialiased bg-background-light dark:bg-background-dark text-[#212121] dark:text-gray-200`}
        suppressHydrationWarning
      >
        <TranslationWidget />
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
