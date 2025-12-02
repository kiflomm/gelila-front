"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useMobileMenuStore } from "@/store/use-mobile-menu-store";
import { useEffect } from "react";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";
import { NavDropdown } from "@/components/nav-dropdown";
import navigationData from "@/data/navigation.json";

interface HeaderProps {
  forceTransparent?: boolean;
}

export default function Header({ forceTransparent = false }: HeaderProps) {
  const { isOpen, toggle, close } = useMobileMenuStore();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isExports = pathname === "/exports" || pathname.startsWith("/exports/");
  const isSectors = pathname === "/sectors" || pathname.startsWith("/sectors/");
  const isCareers = pathname === "/careers";
  const hasTransparentNav =
    forceTransparent ||
    isHome ||
    isAbout ||
    isExports ||
    isSectors ||
    isCareers;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/exports", label: "Exports" },
    { href: "/sectors", label: "Sectors" },
    { href: "/news", label: "News & Updates" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About Us" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        hasTransparentNav
          ? "bg-linear-to-b from-black/30 via-black/15 to-transparent"
          : "bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-border"
      }`}
    >
      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-40">
        <div className="flex items-center justify-between py-3 sm:py-4 w-full max-w-[1280px] mx-auto gap-2 sm:gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 shrink-0 ${
              hasTransparentNav
                ? "text-white"
                : "text-[#181411] dark:text-white"
            }`}
          >
            <Image
              src="/logo.png"
              alt="Gelila Manufacturing PLC"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto shrink-0"
              priority
            />
            <h2
              className={`text-sm sm:text-base md:text-lg font-bold leading-tight tracking-[-0.015em] truncate ${
                hasTransparentNav
                  ? "text-white"
                  : "text-[#181411] dark:text-white"
              }`}
            >
              <span className="hidden sm:inline">Gelila Manufacturing PLC</span>
              <span className="sm:hidden">Gelila</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 ml-4 xl:ml-8 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              // Check if this link should have a dropdown
              const isSectors = link.href === "/sectors";
              const isExports = link.href === "/exports";
              const isCareers = link.href === "/careers";

              if (isSectors && navigationData.dropdowns.sectors) {
                return (
                  <NavDropdown
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    sections={navigationData.dropdowns.sectors.sections}
                    isTransparent={hasTransparentNav}
                    isActive={isActive}
                  />
                );
              }

              if (isExports && navigationData.dropdowns.exports) {
                return (
                  <NavDropdown
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    sections={navigationData.dropdowns.exports.sections}
                    isTransparent={hasTransparentNav}
                    isActive={isActive}
                  />
                );
              }

              if (isCareers && navigationData.dropdowns.careers) {
                return (
                  <NavDropdown
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    sections={navigationData.dropdowns.careers.sections}
                    isTransparent={hasTransparentNav}
                    isActive={isActive}
                  />
                );
              }

              // Regular link without dropdown
              return (
                <Link
                  key={link.href}
                  className={
                    isActive
                      ? "text-primary text-sm font-bold leading-normal whitespace-nowrap"
                      : hasTransparentNav
                      ? "text-white/90 hover:text-white text-sm font-medium leading-normal transition-colors whitespace-nowrap"
                      : "text-[#181411] dark:text-white/80 hover:text-primary text-sm font-medium leading-normal transition-colors whitespace-nowrap"
                  }
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center ml-auto shrink-0">
            <RequestQuoteDialog />
          </div>

          {/* Mobile/Tablet Hamburger Button */}
          <Button
            onClick={toggle}
            variant="ghost"
            size="icon"
            className={`lg:hidden hover:text-primary shrink-0 touch-manipulation ${
              hasTransparentNav
                ? "text-white"
                : "text-[#181411] dark:text-white"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 top-[73px] sm:top-[81px] animate-in fade-in duration-200"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[73px] sm:top-[81px] left-0 right-0 z-40 bg-background-light/98 dark:bg-background-dark/98 backdrop-blur-md border-b border-border shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-1 max-h-[calc(100vh-73px)] sm:max-h-[calc(100vh-81px)] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                onClick={close}
                className={
                  isActive
                    ? "text-primary text-base sm:text-lg font-bold leading-normal py-3 sm:py-3.5 px-2 rounded-lg bg-primary/10 dark:bg-primary/20 touch-manipulation"
                    : "text-[#181411] dark:text-gray-300 text-base sm:text-lg font-medium leading-normal hover:text-primary transition-colors py-3 sm:py-3.5 px-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 touch-manipulation"
                }
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 sm:mt-4">
            <RequestQuoteDialog
              trigger={
                <Button
                  onClick={close}
                  className="flex! w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 px-4 bg-primary! text-white text-base sm:text-lg font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! touch-manipulation"
                >
                  <span className="truncate">Request a Quote</span>
                </Button>
              }
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
