"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the page has been scrolled past a threshold
 * @param threshold - Number of pixels to scroll before returning true (default: 50)
 * @returns boolean indicating if page is scrolled past threshold
 */
export function useScrollPosition(threshold: number = 50): boolean {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Check initial scroll position
        const checkScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        // Check on mount
        checkScroll();

        // Add scroll listener
        window.addEventListener("scroll", checkScroll, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, [threshold]);

    return isScrolled;
}
