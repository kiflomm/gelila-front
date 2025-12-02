import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Login - Gelila Manufacturing PLC",
  description:
    "Login to your Gelila Manufacturing PLC account to access exclusive content and services.",
  keywords: ["login", "sign in", "account", "authentication", "access"],
  openGraph: {
    title: "Login - Gelila Manufacturing PLC",
    description: "Login to your Gelila Manufacturing PLC account.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - Gelila Manufacturing PLC",
    description: "Login to your Gelila Manufacturing PLC account.",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 lg:pb-12 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-md">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
