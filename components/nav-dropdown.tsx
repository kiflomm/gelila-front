"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

interface NavDropdownProps {
  label: string;
  href: string;
  items?: DropdownItem[];
  sections?: DropdownSection[];
  isTransparent?: boolean;
  isActive?: boolean;
}

export function NavDropdown({
  label,
  href,
  items,
  sections,
  isTransparent = false,
  isActive = false,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Normalize sections/items for consistent handling
  const normalizedSections: DropdownSection[] = sections
    ? sections
    : items
    ? [{ items }]
    : [];

  // Check if any dropdown item is active
  const hasActiveItem = normalizedSections.some((section) =>
    section.items.some((item) => pathname === item.href)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      (window as any).lastMouseX = e.clientX;
      (window as any).lastMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Only close if mouse is truly outside both trigger and dropdown
    // Use a delay to allow movement between elements
    closeTimeoutRef.current = setTimeout(() => {
      // Check if mouse is over either element using elementFromPoint
      const elementAtPoint = document.elementFromPoint(
        (window as any).lastMouseX || 0,
        (window as any).lastMouseY || 0
      );

      const isOverTrigger =
        elementAtPoint?.closest("[data-dropdown-trigger]") !== null;
      const isOverDropdown =
        elementAtPoint?.closest("[data-dropdown-menu]") !== null;
      const isOverBridge =
        elementAtPoint?.closest("[data-dropdown-bridge]") !== null;

      // Only close if mouse is not over any part of the dropdown area
      if (!isOverTrigger && !isOverDropdown && !isOverBridge) {
        setIsOpen(false);
      }
    }, 200);
  };

  const triggerClassName = cn(
    "text-sm font-medium leading-normal whitespace-nowrap transition-colors relative",
    isActive || hasActiveItem
      ? "text-primary font-bold"
      : isTransparent
      ? "text-white/90 hover:text-white"
      : "text-[#181411] dark:text-white/80 hover:text-primary"
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Link */}
      <div
        ref={triggerRef}
        data-dropdown-trigger
        className="inline-block group"
      >
        <Link
          href={href}
          className={cn(triggerClassName, "flex items-center gap-1.5")}
        >
          {label}
          {/* Arrow Indicator */}
          <span
            className={cn(
              "inline-block transition-all duration-150",
              isOpen
                ? "rotate-180 opacity-100"
                : "rotate-0 opacity-70 group-hover:opacity-100"
            )}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                isTransparent
                  ? "text-white/90"
                  : "text-[#181411] dark:text-white/80",
                isOpen && "text-primary"
              )}
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>

      {/* Invisible bridge to prevent gap closing */}
      {isOpen && (
        <div
          data-dropdown-bridge
          className="absolute top-full left-1/2 -translate-x-1/2 w-[50vw] max-w-[600px] min-w-[300px] h-2 z-40"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          data-dropdown-menu
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[50vw] max-w-[600px] min-w-[300px] bg-white dark:bg-background-dark border border-gray-200/80 dark:border-gray-800 rounded-xl shadow-lg py-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={cn(
              "grid gap-6 px-4",
              normalizedSections.length === 2
                ? "grid-cols-2"
                : normalizedSections.length === 3
                ? "grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {normalizedSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="flex flex-col">
                {section.title && (
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 px-2">
                    {section.title}
                  </h3>
                )}
                <div className="flex flex-col">
                  {section.items.map((item, itemIndex) => {
                    const isItemActive = pathname === item.href;
                    return (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className={cn(
                          "block px-2 py-2.5 text-sm font-medium leading-normal transition-colors rounded-md",
                          isItemActive
                            ? "text-primary bg-primary/5 dark:bg-primary/10"
                            : "text-[#181411] dark:text-white/90 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 hover:text-primary"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
