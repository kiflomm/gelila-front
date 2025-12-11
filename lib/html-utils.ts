/**
 * Safely renders HTML content by stripping HTML tags for plain text display
 * or using dangerouslySetInnerHTML with sanitization for rich text display
 */

/**
 * Strips HTML tags and returns plain text
 */
export function stripHtml(html: string): string {
  if (typeof window === "undefined") {
    // Server-side: simple regex strip
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  }
  
  // Client-side: use DOM API
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

/**
 * Truncates HTML content to a specified length (counting only text)
 */
export function truncateHtml(html: string, maxLength: number): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) {
    return html;
  }
  
  // If truncated, show plain text instead
  const truncated = text.slice(0, maxLength) + "...";
  return truncated;
}

/**
 * Safely renders HTML content (for use with dangerouslySetInnerHTML)
 * Note: Backend should sanitize before storing, but this adds an extra layer
 */
export function safeHtml(html: string): string {
  // Basic sanitization - remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
}

