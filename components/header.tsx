"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X } from "lucide-react";
import { useMobileMenuStore } from "@/store/use-mobile-menu-store";

export default function Header() {
  const { isOpen, toggle, close } = useMobileMenuStore();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const hasTransparentNav = isHome || isAbout;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/sectors", label: "Sectors" },
    { href: "/news", label: "News & Updates" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        hasTransparentNav
          ? "bg-linear-to-b from-black/30 via-black/15 to-transparent"
          : "bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-border"
      }`}
    >
      <div className="px-4 sm:px-10 lg:px-20 xl:px-40">
        <div className="flex items-center justify-between whitespace-nowrap py-4 w-full max-w-[1280px] mx-auto">
          <div
            className={`flex items-center gap-4 ${
              hasTransparentNav
                ? "text-white"
                : "text-[#181411] dark:text-white"
            }`}
          >
            <Mountain className="size-6 text-primary" />
            <h2
              className={`text-lg font-bold leading-tight tracking-[-0.015em] ${
                hasTransparentNav
                  ? "text-white"
                  : "text-[#181411] dark:text-white"
              }`}
            >
              Gelila Manufacturing PLC
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 ml-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  className={
                    isActive
                      ? "text-primary text-sm font-bold leading-normal"
                      : hasTransparentNav
                      ? "text-white/90 hover:text-white text-sm font-medium leading-normal transition-colors"
                      : "text-[#181411] dark:text-white/80 hover:text-primary text-sm font-medium leading-normal transition-colors"
                  }
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center ml-auto">
            <Button className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary!">
              <span className="truncate">Request a Quote</span>
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <Button
            onClick={toggle}
            variant="ghost"
            size="icon"
            className={`lg:hidden hover:text-primary ${
              hasTransparentNav
                ? "text-white"
                : "text-[#181411] dark:text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
          <div className="px-4 sm:px-10 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  onClick={close}
                  className={
                    isActive
                      ? "text-primary text-base font-bold leading-normal py-2"
                      : "text-[#181411] dark:text-gray-300 text-base font-medium leading-normal hover:text-primary transition-colors py-2"
                  }
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button
              onClick={close}
              className="flex! w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! mt-2"
            >
              <span className="truncate">Request a Quote</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
