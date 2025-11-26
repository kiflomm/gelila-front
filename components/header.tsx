"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X } from "lucide-react";
import { useMobileMenuStore } from "@/store/use-mobile-menu-store";

export default function Header() {
  const { isOpen, toggle, close } = useMobileMenuStore();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/sectors", label: "Sectors" },
    { href: "/news", label: "News & Updates" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div className="px-4 sm:px-10 lg:px-20 xl:px-40 flex justify-center">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f2f0] dark:border-b-gray-800 py-3 w-full max-w-[1280px]">
          <div className="flex items-center gap-4 text-[#181411] dark:text-white">
            <Mountain className="size-6 text-primary" />
            <h2 className="text-[#181411] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Gelila Manufacturing PLC
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    className={
                      isActive
                        ? "text-primary text-sm font-bold leading-normal"
                        : "text-[#181411] dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
                    }
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <Button className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary!">
              <span className="truncate">Request a Quote</span>
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <Button
            onClick={toggle}
            variant="ghost"
            size="icon"
            className="lg:hidden text-[#181411] dark:text-white hover:text-primary"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-solid border-b-[#f5f2f0] dark:border-b-gray-800 bg-background-light dark:bg-background-dark">
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
