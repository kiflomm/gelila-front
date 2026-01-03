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

const languages = ["en", "ti", "am"];

export function LanguageSelector() {
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isGoogleTranslateReady, setIsGoogleTranslateReady] = useState(false);
  
  // Check if we're on a news detail page (need black text instead of white)
  const isNewsDetail = pathname.startsWith("/news/") && pathname !== "/news";

  useEffect(() => {
    // Get current language from Google Translate cookie on mount
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      const googtransCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("googtrans=")
      );
      
      if (googtransCookie) {
        // Cookie format: googtrans=/SOURCE/TARGET (e.g., /en/ti means translate from English to Tigrinya)
        // Since our pageLanguage is "en", format will be /en/TARGET
        const cookieValue = googtransCookie.split("=")[1]?.trim();
        
        if (cookieValue) {
          // Match /SOURCE/TARGET format (e.g., /en/ti, /en/am)
          const langMatch = cookieValue.match(/\/(\w+)\/(\w+)/);
          
          if (langMatch) {
            const sourceLang = langMatch[1]; // First part is source (should be "en")
            const targetLang = langMatch[2]; // Second part is target
            
            // If source equals target (e.g., /en/en), it means original language (English)
            if (sourceLang === targetLang) {
              setSelectedLanguage("en");
            } else if (languages.includes(targetLang)) {
              // Use the target language if it's one we support
              setSelectedLanguage(targetLang);
            } else {
              setSelectedLanguage("en");
            }
          } else {
            // Try /auto/LANG format as fallback
            const autoMatch = cookieValue.match(/\/auto\/(\w+)/);
            if (autoMatch && languages.includes(autoMatch[1])) {
              setSelectedLanguage(autoMatch[1]);
            } else {
              setSelectedLanguage("en");
            }
          }
        } else {
          // Empty cookie value means English (default)
          setSelectedLanguage("en");
        }
      } else {
        // No cookie found, default to English
        setSelectedLanguage("en");
      }
    }

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
  }, []);

  const handleLanguageChange = (value: string) => {
    // Don't do anything if selecting the same language
    if (value === selectedLanguage) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    // Programmatically trigger Google Translate language change
    try {
      // Update the cookie - Google Translate uses /SOURCE/TARGET format
      // Since pageLanguage is "en", format is /en/TARGET
      // For English: /en/en (source and target are the same = original language)
      // For other languages: /en/TARGET (e.g., /en/ti, /en/am)
      const cookieValue = value === "en" ? "/en/en" : `/en/${value}`;
      
      // Set the new cookie (overwrites any existing one)
      document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;

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

  // Conditional styling based on page type
  const textColorClass = isNewsDetail 
    ? "text-[#181411] border-gray-300 hover:border-gray-400 [&_svg]:text-[#181411]" 
    : "text-white border-white/30 hover:border-white/50 [&_svg]:text-white";

  return (
    <div className="notranslate">
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className={`w-[70px] h-9 text-sm uppercase font-medium ${textColorClass}`}>
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

