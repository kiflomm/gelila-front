"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = ["en", "ti", "am", "om"];

interface LanguageSelectorProps {
  isTransparent?: boolean;
}

// Helper function to read language from cookie
function getLanguageFromCookie(): string {
  if (typeof window === "undefined") {
    return "en";
  }

  const cookies = document.cookie.split(";");
  // Get all googtrans cookies (in case there are multiple)
  const googtransCookies = cookies.filter((cookie) =>
    cookie.trim().startsWith("googtrans=")
  );

  if (googtransCookies.length === 0) {
    return "en";
  }

  // Use the first matching cookie (browser typically returns the most specific one first)
  // If there are multiple, we'll use the first non-empty one
  let cookieValue = "";
  for (const cookie of googtransCookies) {
    // Handle cookie value that might contain "=" by splitting only on first "="
    const equalIndex = cookie.indexOf("=");
    const value = equalIndex !== -1 ? cookie.substring(equalIndex + 1).trim() : "";
    if (value && value !== "/en/en") {
      cookieValue = value;
      break; // Use the first non-default value
    } else if (value) {
      cookieValue = value; // Fallback to default if no other found
    }
  }

  if (!cookieValue) {
    return "en";
  }

  // Decode URL-encoded cookie value (handles cases where cookie might be encoded)
  try {
    cookieValue = decodeURIComponent(cookieValue);
  } catch {
    // If decoding fails, use original value
  }

  // Match /SOURCE/TARGET format (e.g., /en/ti, /en/am)
  const langMatch = cookieValue.match(/\/(\w+)\/(\w+)/);

  if (langMatch) {
    const sourceLang = langMatch[1]; // First part is source (should be "en")
    const targetLang = langMatch[2]; // Second part is target
    // If source equals target (e.g., /en/en), it means original language (English)
    if (sourceLang === targetLang) {
      return "en";
    } else if (languages.includes(targetLang)) {
      // Use the target language if it's one we support
      return targetLang;
    } else {
      return "en";
    }
  }

  // Try /auto/LANG format as fallback
  const autoMatch = cookieValue.match(/\/auto\/(\w+)/);
  if (autoMatch && languages.includes(autoMatch[1])) {
    return autoMatch[1];
  }

  return "en";
}

export function LanguageSelector({ isTransparent = false }: LanguageSelectorProps) {
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isGoogleTranslateReady, setIsGoogleTranslateReady] = useState(false);

  // Check if we're on a news detail page (need black text instead of white)
  const isNewsDetail = pathname.startsWith("/news/") && pathname !== "/news";

  useEffect(() => {
    // Get current language from Google Translate cookie on mount
    // Use a small delay to ensure cookie is available after page reload
    const readCookie = () => {
      const lang = getLanguageFromCookie();
      setSelectedLanguage(lang);
    };

    // Read immediately
    readCookie();

    // Also read after a short delay to handle timing issues after reload
    const timeoutId = setTimeout(readCookie, 100);

    // Check if Google Translate is loaded
    const checkGoogleTranslate = () => {
      if (
        typeof window !== "undefined" &&
        window.google?.translate?.TranslateElement
      ) {
        setIsGoogleTranslateReady(true);
      } else {
        // Retry after a short delay
        setTimeout(checkGoogleTranslate, 100);
      }
    };

    checkGoogleTranslate();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleLanguageChange = (value: string) => {
    if (typeof window === "undefined") {
      return;
    }

    // Read current language from cookie directly instead of relying on state
    // This ensures we can detect changes even if state is out of sync
    const currentLangFromCookie = getLanguageFromCookie();

    // Don't do anything if selecting the same language (check both state and cookie)
    if (value === selectedLanguage && value === currentLangFromCookie) {
      return;
    }

    // Programmatically trigger Google Translate language change
    try {
      // Update the cookie - Google Translate uses /SOURCE/TARGET format
      // Since pageLanguage is "en", format is /en/TARGET
      // For English: /en/en (source and target are the same = original language)
      // For other languages: /en/TARGET (e.g., /en/ti, /en/am)
      const cookieValue = value === "en" ? "/en/en" : `/en/${value}`;

      // Clear any existing googtrans cookies first to avoid conflicts
      // Clear cookie without domain (current domain)
      document.cookie = `googtrans=; path=/; max-age=0; SameSite=Lax`;
      // Clear cookie with domain (for subdomain compatibility)
      const hostname = window.location.hostname;
      const domain = hostname.startsWith("www.") ? hostname.substring(4) : hostname;
      document.cookie = `googtrans=; path=/; domain=${domain}; max-age=0; SameSite=Lax`;
      document.cookie = `googtrans=; path=/; domain=.${domain}; max-age=0; SameSite=Lax`;

      // Set the new cookie (overwrites any existing one)
      // In production (HTTPS), add Secure flag for cookie to work properly
      const isSecure = window.location.protocol === "https:";
      const secureFlag = isSecure ? "; Secure" : "";
      // Set cookie without explicit domain to use current domain only
      document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;

      // Update state immediately for better UX
      setSelectedLanguage(value);

      // Try to trigger the Google Translate select element if it exists
      const selectElement = document.querySelector<HTMLSelectElement>(
        ".goog-te-combo"
      );

      if (selectElement && isGoogleTranslateReady) {
        try {
          // Find the option that matches our value
          const options = Array.from(selectElement.options);
          let targetOption = null;

          if (value === "en") {
            // For English, look for empty value or "en" or option that represents original language
            targetOption =
              options.find((opt) => {
                const optValue = opt.value.toLowerCase();
                return optValue === "" || optValue === "en" || optValue === "auto";
              }) || options[0]; // Fallback to first option
          } else {
            // For other languages, match the language code
            targetOption = options.find((opt) => {
              const optValue = opt.value.toLowerCase();
              return (
                optValue === value ||
                optValue === `|${value}` ||
                optValue.includes(value) ||
                optValue.endsWith(value)
              );
            });
          }

          if (targetOption) {
            selectElement.value = targetOption.value;
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            selectElement.dispatchEvent(event);
          }
        } catch (selectError) {
          // Ignore errors with select element manipulation
          console.warn("Could not trigger Google Translate select:", selectError);
        }
      }

      // Reload the page to apply the translation
      // This is the most reliable method for Google Translate
      window.location.reload();
    } catch (error) {
      console.error("Error changing language:", error);
      // Fallback: reload with the cookie set
      window.location.reload();
    }
  };

  // Conditional styling based on page type and header transparency
  const textColorClass = (isNewsDetail || !isTransparent)
    ? "text-[#181411] border-gray-300 hover:border-gray-400 [&_svg]:text-[#181411]"
    : "text-white border-white/30 hover:border-white/50 [&_svg]:text-white";

  return (
    <div className="notranslate">
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className={`w-full md:w-[70px] h-9 text-sm uppercase font-medium text-center md:text-left justify-center md:justify-between ${textColorClass}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="notranslate">
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang} className="uppercase notranslate">
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

