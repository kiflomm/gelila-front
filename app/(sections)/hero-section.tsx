import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative flex min-h-[600px] lg:min-h-[700px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4i7laV2i-QVdbRf3idJagNz-tdiqPs5ymwV2wqvww1kUCGhUGeT3OWu-Kf0x8TQx2_6iJN7JMMCk2mFgPEJgxI6vTeyCqMAy17gOpaNPej9g8O6_fDs5dZ9_91B0VcpfhgXEHQJ87Gmbd9Vcv_uCh4u1ZLs5v1mLxoSHz-gPMAWU8yorGESPBohvA06K3XJ2iW9giI3W5-i0OnfbsAmtC-vBUyuahx69RMLdGJwNJrn-bhzrLraf-uJNJ8QsfxM8bT21hCdEdTGMM"
          alt="A wide-angle shot of a modern, clean factory floor with automated machinery and production lines in motion."
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Engineering Ethiopia's Industrial Future
            </h1>
            <h2 className="text-white/90 text-base font-normal leading-normal sm:text-lg">
              Powering progress across key sectors with innovative manufacturing
              solutions and a commitment to national growth.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!"
            >
              <Link href="/contact">
                <span className="truncate">Request Quote</span>
              </Link>
            </Button>
            <Button
              asChild
              className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-background-light! text-[#181411]! text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity"
            >
              <Link href="/suppliers">
                <span className="truncate">Become a Supplier</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-transparent! border border-white! text-white! text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:bg-white/10! transition-colors"
            >
              <Link href="/exports">
                <span className="truncate">Export Inquiries</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

