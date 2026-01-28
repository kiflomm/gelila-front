"use client";

import Link from "next/link";
import { useMemo } from "react";
import Image from "@/components/ui/image";
import { usePathname } from "next/navigation";
import { useMobileMenuStore } from "@/stores/use-mobile-menu-store";
import { useEffect } from "react";
import { NavDropdown } from "@/components/nav-dropdown";
import navigationData from "@/data/navigation.json";
import { getNavLinkClasses } from "@/lib/utils";
import { useNavDropdownStore } from "@/stores/use-nav-dropdown-store";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { LanguageSelector } from "@/components/language-selector";
import { useImports } from "@/hooks/use-imports";
import { useExports } from "@/hooks/use-exports";

interface HeaderProps {
  forceTransparent?: boolean;
}

export default function Header({ forceTransparent = false }: HeaderProps) {
  const { isOpen, toggle, close } = useMobileMenuStore();
  const { closeAll: closeAllDropdowns } = useNavDropdownStore();
  const pathname = usePathname();

  // Track active section for scroll spy
  const activeSection = useScrollSpy(["careers-section", "news-section", "contact-form"]);

  // Track scroll position
  const isScrolled = useScrollPosition(50);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isExports = pathname === "/exports" || pathname.startsWith("/exports/");
  const isImports = pathname === "/imports" || pathname.startsWith("/imports/");
  const isImportsExports = pathname === "/imports-exports";
  const isSectors = pathname === "/sectors" || pathname.startsWith("/sectors/");
  const isCareers = pathname === "/careers";
  const isCompanies = pathname === "/companies" || pathname.startsWith("/companies/");
  const isNewsListing = pathname === "/news";
  const isNewsDetail = pathname.startsWith("/news/") && pathname !== "/news";
  const isContact = pathname === "/contact";
  const hasTransparentNav =
    forceTransparent ||
    isHome ||
    isAbout ||
    isExports ||
    isImports ||
    isImportsExports ||
    isSectors ||
    isCareers ||
    isCompanies ||
    isNewsListing ||
    isContact;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/imports-exports", label: "Import & Export" },
    { href: "/companies", label: "Subsidiaries" },
    { href: "/news#news-section", label: "News & Updates" },
    { href: "/careers#careers-section", label: "Careers" },
  ];

  const { data: imports = [], isLoading: importsLoading } = useImports();
  const { data: exports = [], isLoading: exportsLoading } = useExports();

  const filteredTradeSections = useMemo(() => {
    const rawSections = navigationData.dropdowns.trade?.sections ?? [];
    if (importsLoading || exportsLoading) {
      return rawSections;
    }
    return rawSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const importMatch = /^\/imports\/(.+)$/.exec(item.href);
          const exportMatch = /^\/exports\/(.+)$/.exec(item.href);
          if (importMatch) {
            const slug = importMatch[1];
            const importItem = imports.find((i) => i.slug === slug);
            return !!importItem && (importItem.products?.length ?? 0) > 0;
          }
          if (exportMatch) {
            const slug = exportMatch[1];
            const exportItem = exports.find((e) => e.slug === slug);
            return !!exportItem && (exportItem.products?.length ?? 0) > 0;
          }
          return false;
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [imports, importsLoading, exports, exportsLoading]);

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
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="shrink-0 max-w-fit mr-4">
            <Link
              href="/"
              className={`flex items-center cursor-pointer ${hasTransparentNav
                ? "text-white"
                : "text-[#181411] dark:text-white"
                }`}
            >
              <div className="flex items-center gap-0 bg-white px-2 py-1 rounded max-w-fit">
                <Image
                  src="/logo-left.png"
                  alt="Gelila Manufacturing PLC"
                  width={100}
                  height={80}
                  className="w-auto h-8 lg:h-12 shrink-0"
                  priority
                />
                <Image
                  src="/logo-right.png"
                  alt="Gelila Manufacturing PLC"
                  width={100}
                  height={80}
                  className="w-auto h-8 lg:h-12 shrink-0"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="notranslate hidden lg:flex items-center justify-center flex-1 space-x-4">
            {navLinks.map((link) => {
              // Enhanced active state logic - considers pathname and hash
              const linkPath = link.href.split('#')[0];
              const linkHash = link.href.includes('#') ? link.href.split('#')[1] : null;
              const isOnPage = pathname === linkPath || pathname === link.href;
              const isActive = isOnPage && (!linkHash || activeSection === linkHash);

              // Check if this link should have a dropdown
              const isTrade = link.href === "/imports-exports";
              const isCompanies = link.href.startsWith("/companies");

              // Check if we're on imports or exports pages for active state
              const isImportsPage = pathname === "/imports" || pathname.startsWith("/imports/");
              const isExportsPage = pathname === "/exports" || pathname.startsWith("/exports/");
              const isImportsExportsPage = pathname === "/imports-exports";
              const isTradeActive = isImportsPage || isExportsPage || isImportsExportsPage;

              if (isTrade && navigationData.dropdowns.trade) {
                return (
                  <NavDropdown
                    key={link.href}
                    id="trade"
                    label={link.label}
                    href="/imports-exports"
                    sections={filteredTradeSections}
                    isTransparent={false}
                    isActive={isTradeActive}
                  />
                );
              }

              if (isCompanies && navigationData.dropdowns.companies) {
                const isCompaniesPage = pathname === "/companies" || pathname.startsWith("/companies/");
                return (
                  <NavDropdown
                    key={link.href}
                    id="companies"
                    label={link.label}
                    href="/companies"
                    sections={navigationData.dropdowns.companies.sections}
                    isTransparent={false}
                    isActive={isCompaniesPage}
                  />
                );
              }

              // Regular link without dropdown
              return (
                <Link
                  key={link.href}
                  className={getNavLinkClasses(isActive, false)}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}

          </nav>

          {/* Right side - Contact Button + Language + Mobile Toggle */}
          <div className="flex items-center gap-4">


            {/* Language Selector - Desktop */}
            <div className="hidden lg:block">
              <LanguageSelector isTransparent={false} />
            </div>

            {/* Mobile/Tablet Hamburger Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle();
              }}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="notranslate lg:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-gray-400 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <span className="material-icons-round text-3xl">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 top-16 animate-in fade-in duration-200"
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
        className={`lg:hidden fixed top-16 left-0 right-0 z-40 bg-background-light/98 dark:bg-background-dark/98 backdrop-blur-md border-b border-border shadow-lg transition-transform duration-300 ease-in-out ${isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        onClick={(e) => {
          // Prevent clicks inside menu from closing it
          e.stopPropagation();
        }}
      >
        <nav className="notranslate px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-1 max-h-[calc(100vh-88px)] overflow-y-auto">
          {navLinks.map((link) => {
            // Enhanced active state logic - considers pathname and hash
            const linkPath = link.href.split('#')[0];
            const linkHash = link.href.includes('#') ? link.href.split('#')[1] : null;
            const isOnPage = pathname === linkPath || pathname === link.href;
            const isActive = isOnPage && (!linkHash || activeSection === linkHash);

            const isTrade = link.href === "/imports-exports";
            const isCompanies = link.href.startsWith("/companies");
            const isCompaniesPage = pathname === "/companies" || pathname.startsWith("/companies/");
            const isImportsPage = pathname === "/imports" || pathname.startsWith("/imports/");
            const isExportsPage = pathname === "/exports" || pathname.startsWith("/exports/");
            const isImportsExportsPage = pathname === "/imports-exports";
            const isTradePage = isImportsPage || isExportsPage || isImportsExportsPage;

            // Check if this link has a dropdown in mobile
            if (isTrade && navigationData.dropdowns.trade) {
              return (
                <div key={link.href} className="flex flex-col">
                  <Link
                    onClick={close}
                    className={
                      isTradePage
                        ? "text-primary text-base sm:text-lg font-bold leading-normal py-3 sm:py-3.5 px-2 rounded-lg bg-primary/10 dark:bg-primary/20 touch-manipulation"
                        : "text-[#181411] dark:text-gray-300 text-base sm:text-lg font-medium leading-normal hover:text-primary transition-colors py-3 sm:py-3.5 px-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 touch-manipulation"
                    }
                    href="/imports-exports"
                  >
                    {link.label}
                  </Link>
                  <div className="pl-4 pt-1 pb-2 flex flex-col gap-1">
                    {filteredTradeSections.map((section) => (
                      <div key={section.title} className="flex flex-col gap-1">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2 pt-2 pb-1">
                          {section.title}
                        </div>
                        {section.items.map((item) => {
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
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

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
                    href="/companies"
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

          {/* Contact Us Button - Mobile */}
          <Link
            onClick={close}
            className="notranslate mt-2 inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:shadow-lg"
            href="/contact#contact-form"
          >
            Contact Us
          </Link>

          {/* Language Selector - Mobile */}
          <div className="mt-3">
            <LanguageSelector isTransparent={false} />
          </div>
        </nav>
      </div>
    </header>
  );
}
