import Link from "next/link";
import Image from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Home, Factory, Wrench } from "lucide-react";
import TransparentHeader from "@/components/transparent-header";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <TransparentHeader />
        <main className="relative flex min-h-[600px] lg:min-h-[700px] w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
            alt="A dark industrial manufacturing facility with machinery and production equipment."
            fill
            className="object-cover brightness-75"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/80" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6">
            {/* Large 404 Display */}
            <div className="relative mb-8">
              <h1 className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[240px] font-black leading-none text-white/10 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Industrial Icons Decoration */}
                  <div className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 opacity-30">
                    <Factory className="size-12 sm:size-16 md:size-20 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 opacity-30">
                    <Wrench className="size-10 sm:size-14 md:size-16 text-white animate-pulse" />
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
                      Page Not Found
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                      The page you're looking for seems to have been misplaced
                      in our production line.
                    </p>
                    <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-12 max-w-xl mx-auto">
                      Don't worry, our quality control team is on it. Let's get
                      you back on track.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button
                asChild
                size="lg"
                className="flex! min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 px-6 sm:px-8 bg-primary! text-white text-base sm:text-lg font-bold leading-normal tracking-[0.015em] hover:opacity-90! hover:bg-primary! shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="size-5" />
                  <span>Go to Homepage</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex! min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 px-6 sm:px-8 bg-transparent! border border-white! text-white! text-base sm:text-lg font-bold leading-normal tracking-[0.015em] hover:bg-white/10! transition-colors"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Contact Us</span>
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/20">
              <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6">
                Or explore our main sections:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/sectors"
                  className="text-sm sm:text-base text-white hover:text-primary font-medium transition-colors hover:underline underline-offset-2"
                >
                  Sectors
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  href="/exports"
                  className="text-sm sm:text-base text-white hover:text-primary font-medium transition-colors hover:underline underline-offset-2"
                >
                  Exports
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  href="/news"
                  className="text-sm sm:text-base text-white hover:text-primary font-medium transition-colors hover:underline underline-offset-2"
                >
                  News & Updates
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  href="/about"
                  className="text-sm sm:text-base text-white hover:text-primary font-medium transition-colors hover:underline underline-offset-2"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
