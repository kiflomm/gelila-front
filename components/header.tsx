"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useMobileMenuStore } from "@/stores/use-mobile-menu-store";
import { useEffect } from "react";
import { NavDropdown } from "@/components/nav-dropdown";
import navigationData from "@/data/navigation.json";
import { getNavLinkClasses } from "@/lib/utils";
import { useNavDropdownStore } from "@/stores/use-nav-dropdown-store";

interface HeaderProps {
  forceTransparent?: boolean;
}

export default function Header({ forceTransparent = false }: HeaderProps) {
  const { isOpen, toggle, close } = useMobileMenuStore();
  const { closeAll: closeAllDropdowns } = useNavDropdownStore();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isExports = pathname === "/exports" || pathname.startsWith("/exports/");
  const isImports = pathname === "/imports" || pathname.startsWith("/imports/");
  const isSectors = pathname === "/sectors" || pathname.startsWith("/sectors/");
  const isCareers = pathname === "/careers";
  const isCompanies = pathname.startsWith("/companies/");
  const hasTransparentNav =
    forceTransparent ||
    isHome ||
    isAbout ||
    isExports ||
    isImports ||
    isSectors ||
    isCareers ||
    isCompanies;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/sectors", label: "Sectors" },
    { href: "/imports", label: "Imports" },
    { href: "/exports", label: "Exports" },
    { href: "/companies/gelila-shoe", label: "Subsidiaries" },
    { href: "/news", label: "News & Updates" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  // Close mobile menu and all dropdowns on route change
  useEffect(() => {
    close();
    closeAllDropdowns();
  }, [pathname, close, closeAllDropdowns]);

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
      className={` absolute top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        hasTransparentNav
          ? "bg-linear-to-b from-black/30 via-black/15 to-transparent"
          : "bg-white dark:bg-background-dark/95 backdrop-blur-sm border-b border-border"
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
            <div className="flex items-center gap-0 shrink-0 bg-white px-2 py-1 rounded">
              <Image
                src="/logo-left.png"
                alt="Gelila Manufacturing PLC"
                width={100}
                height={80}
                className={`w-auto shrink-0 ${
                  hasTransparentNav
                    ? "h-8 sm:h-5 md:h-6 lg:h-10"
                    : "h-8 sm:h-5 md:h-6 lg:h-10"
                }`}
                priority
              />
              <Image
                src="/logo-right.png"
                alt="Gelila Manufacturing PLC"
                width={100}
                height={80}
                className={`hidden sm:block w-auto shrink-0 ${
                  hasTransparentNav
                    ? "h-4 sm:h-5 md:h-6 lg:h-10"
                    : "h-4 sm:h-5 md:h-6 lg:h-10"
                }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              // Check if this link should have a dropdown
              const isSectors = link.href === "/sectors";
              const isExports = link.href === "/exports";
              const isImports = link.href === "/imports";
              const isCareers = link.href === "/careers";
              const isCompanies = link.href.startsWith("/companies");

              if (isSectors && navigationData.dropdowns.sectors) {
                return (
                  <NavDropdown
                    key={link.href}
                    id="sectors"
                    label={link.label}
                    href={link.href}
                    sections={navigationData.dropdowns.sectors.sections}
                    isTransparent={hasTransparentNav}
                    isActive={isActive}
                  />
                );
              }

              if (isImports && navigationData.dropdowns.imports) {
                return (
                  <NavDropdown
                    key={link.href}
                    id="imports"
                    label={link.label}
                    href={link.href}
                    sections={navigationData.dropdowns.imports.sections}
                    isTransparent={hasTransparentNav}
                    isActive={isActive}
                  />
                );
              }

              if (isExports && navigationData.dropdowns.exports) {
                return (
                  <NavDropdown
                    key={link.href}
                    id="exports"
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
                    id="careers"
                    label={link.label}
                    href={link.href}
                    sections={navigationData.dropdowns.careers.sections}
                    isTransparent={hasTransparentNav}
                    isActive={isActive}
                  />
                );
              }

              if (isCompanies && navigationData.dropdowns.companies) {
                const isCompaniesPage = pathname.startsWith("/companies/");
                return (
                  <NavDropdown
                    key={link.href}
                    id="companies"
                    label={link.label}
                    href="/about"
                    sections={navigationData.dropdowns.companies.sections}
                    isTransparent={hasTransparentNav}
                    isActive={isCompaniesPage}
                  />
                );
              }

              // Regular link without dropdown
              return (
                <Link
                  key={link.href}
                  className={getNavLinkClasses(isActive, hasTransparentNav)}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile/Tablet Hamburger Button */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle();
            }}
            type="button"
            variant="ghost"
            size="icon"
            className={`lg:hidden hover:text-primary shrink-0 touch-manipulation z-50 relative ${
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            close();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            close();
          }}
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
        onClick={(e) => {
          // Prevent clicks inside menu from closing it
          e.stopPropagation();
        }}
      >
        <nav className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-1 max-h-[calc(100vh-73px)] sm:max-h-[calc(100vh-81px)] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isCompanies = link.href.startsWith("/companies");
            const isCompaniesPage = pathname.startsWith("/companies/");

            // Check if this link has a dropdown in mobile
            if (isCompanies && navigationData.dropdowns.companies) {
              return (
                <div key={link.href} className="flex flex-col">
                  <Link
                    onClick={close}
                    className={
                      isCompaniesPage
                        ? "text-primary text-base sm:text-lg font-bold leading-normal py-3 sm:py-3.5 px-2 rounded-lg bg-primary/10 dark:bg-primary/20 touch-manipulation"
                        : "text-[#181411] dark:text-gray-300 text-base sm:text-lg font-medium leading-normal hover:text-primary transition-colors py-3 sm:py-3.5 px-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 touch-manipulation"
                    }
                    href="/about"
                  >
                    {link.label}
                  </Link>
                  <div className="pl-4 pt-1 pb-2 flex flex-col gap-1">
                    {navigationData.dropdowns.companies.sections[0]?.items.map(
                      (item) => {
                        const isItemActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            onClick={close}
                            className={
                              isItemActive
                                ? "text-primary text-sm font-semibold leading-normal py-2 px-2 rounded-lg bg-primary/5 dark:bg-primary/10 touch-manipulation"
                                : "text-[#181411] dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary transition-colors py-2 px-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 touch-manipulation"
                            }
                            href={item.href}
                          >
                            {item.label}
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            }

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
        </nav>
      </div>
    </header>
  );
}
