import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Shared navigation hover state classes
export function getNavLinkClasses(
  isActive: boolean,
  hasTransparentNav: boolean
): string {
  const baseClasses = "nav-item-underline px-2 py-2 text-sm font-medium leading-normal whitespace-nowrap transition-colors";

  if (isActive) {
    return `${baseClasses} text-primary active`;
  }
  if (hasTransparentNav) {
    return `${baseClasses} text-white/90 hover:text-white dark:text-gray-300 dark:hover:text-primary`;
  }
  return `${baseClasses} text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary`;
}

// Shared navigation hover state classes for dropdown triggers (without font-bold on active)
export function getNavDropdownTriggerClasses(
  isActive: boolean,
  hasTransparentNav: boolean
): string {
  const baseClasses = "nav-item-underline";

  if (isActive) {
    return `${baseClasses} text-primary active`;
  }
  if (hasTransparentNav) {
    return `${baseClasses} text-white/90 hover:text-white dark:text-gray-300 dark:hover:text-primary`;
  }
  return `${baseClasses} text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary`;
}
