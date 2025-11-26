/**
 * Calculate estimated read time for an article
 * @param content - HTML content string
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Estimated read time in minutes
 */
export function calculateReadTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  // Remove HTML tags and count words
  const textContent = content.replace(/<[^>]*>/g, " ");
  const wordCount = textContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Extract initials from a full name
 * @param name - Full name string
 * @returns Uppercase initials (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
