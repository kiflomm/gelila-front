import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Forgot Password - Gelila Manufacturing PLC",
  description:
    "Reset your Gelila Manufacturing PLC account password. Enter your email address to receive password reset instructions.",
  keywords: [
    "forgot password",
    "reset password",
    "password recovery",
    "account recovery",
  ],
  openGraph: {
    title: "Forgot Password - Gelila Manufacturing PLC",
    description: "Reset your Gelila Manufacturing PLC account password.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgot Password - Gelila Manufacturing PLC",
    description: "Reset your Gelila Manufacturing PLC account password.",
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
    canonical: "/forgot-password",
  },
};

export default function ForgotPasswordLayout({
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
