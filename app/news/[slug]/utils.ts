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

/**
 * Format date string to "MMM DD, YYYY" format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
/**
 * Convert relative image URL to full URL
 */
export function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return '';
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path starting with /uploads, use backend URL directly
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const baseUrl = apiBaseUrl.replace('/api/v1', '');
  
  return imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
