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
  if (isActive) {
    return "text-primary text-sm font-bold leading-normal whitespace-nowrap";
  }
  if (hasTransparentNav) {
    return "text-white/90 hover:text-white text-sm font-medium leading-normal transition-colors whitespace-nowrap";
  }
  return "text-[#181411] dark:text-white/80 hover:text-primary text-sm font-medium leading-normal transition-colors whitespace-nowrap";
}

// Shared navigation hover state classes for dropdown triggers (without font-bold on active)
export function getNavDropdownTriggerClasses(
  isActive: boolean,
  hasTransparentNav: boolean
): string {
  if (isActive) {
    return "text-primary font-bold";
  }
  if (hasTransparentNav) {
    return "text-white/90 hover:text-white";
  }
  return "text-[#181411] dark:text-white/80 hover:text-primary";
}
