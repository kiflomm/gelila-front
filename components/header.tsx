"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMobileMenuStore } from "@/stores/use-mobile-menu-store";
import { useEffect, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isExports = pathname === "/exports" || pathname.startsWith("/exports/");
  const isImports = pathname === "/imports" || pathname.startsWith("/imports/");
  const isSectors = pathname === "/sectors" || pathname.startsWith("/sectors/");
  const isCareers = pathname === "/careers";
  const isCompanies = pathname === "/companies" || pathname.startsWith("/companies/");
  const isNews = pathname === "/news" || pathname.startsWith("/news/");
  const isContact = pathname === "/contact";
  const hasTransparentNav =
    forceTransparent ||
    isHome ||
    isAbout ||
    isExports ||
    isImports ||
    isSectors ||
    isCareers ||
    isCompanies ||
    isNews ||
    isContact;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/sectors", label: "Sectors" },
    { href: "/imports", label: "Imports" },
    { href: "/exports", label: "Exports" },
    { href: "/companies", label: "Subsidiaries" },
    { href: "/news", label: "News & Updates" },
    { href: "/careers", label: "Careers" },
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

  // Handle scroll to hide/show navigation bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        hasTransparentNav
          ? "bg-linear-to-b from-black/30 via-black/15 to-transparent"
          : "bg-white/90 dark:bg-black/40 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Top Row - Desktop Navigation */}
          <nav className={`hidden lg:flex items-center justify-center space-x-4 py-2 border-b border-gray-200/50 dark:border-white/10 transition-all duration-300 ${
            isScrolled ? "max-h-0 py-0 overflow-hidden opacity-0" : "max-h-20 opacity-100"
          }`}>
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
                const isCompaniesPage = pathname === "/companies" || pathname.startsWith("/companies/");
                return (
                  <NavDropdown
                    key={link.href}
                    id="companies"
                    label={link.label}
                    href="/companies"
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
            
            {/* Contact Us Button - Desktop */}
            <Link
              href="/contact"
              className={`ml-4 inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:shadow-lg dark:focus:ring-offset-gray-900 ${
                hasTransparentNav ? "" : ""
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Bottom Row - Logo and Contact/Mobile Menu */}
          <div className={`flex items-center justify-between h-16 transition-all duration-300 ${
            isScrolled ? "max-h-0 h-0 overflow-hidden opacity-0" : "max-h-16 opacity-100"
          }`}>
            {/* Logo */}
            <div className="shrink-0 max-w-fit mr-4">
              <Link
                href="/"
                className={`flex items-center cursor-pointer ${
                  hasTransparentNav
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

            {/* Mobile/Tablet Hamburger Button */}
            <div className="lg:hidden flex items-center ml-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle();
                }}
                type="button"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                  hasTransparentNav
                    ? "text-white hover:bg-white/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
                }`}
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
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 top-[88px] animate-in fade-in duration-200"
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
        className={`lg:hidden fixed top-[88px] left-0 right-0 z-40 bg-background-light/98 dark:bg-background-dark/98 backdrop-blur-md border-b border-border shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          // Prevent clicks inside menu from closing it
          e.stopPropagation();
        }}
      >
        <nav className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-1 max-h-[calc(100vh-88px)] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isCompanies = link.href.startsWith("/companies");
            const isCompaniesPage = pathname === "/companies" || pathname.startsWith("/companies/");

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
            className="mt-2 inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-[#d97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:shadow-lg"
            href="/contact"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
