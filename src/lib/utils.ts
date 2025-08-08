import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "TBA";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid Date";
  }
}

// Format year from date string
export function formatYear(dateString: string | null | undefined): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  } catch (error) {
    return "";
  }
}

// Format runtime in minutes to hours and minutes
export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes || minutes <= 0) return "";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

// Format vote average to one decimal place
export function formatVoteAverage(
  voteAverage: number | null | undefined,
): string {
  if (!voteAverage && voteAverage !== 0) return "N/A";
  return voteAverage.toFixed(1);
}

// Format large numbers (for vote count, revenue, etc.)
export function formatNumber(num: number | null | undefined): string {
  if (!num && num !== 0) return "N/A";

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Format currency
export function formatCurrency(amount: number | null | undefined): string {
  if (!amount && amount !== 0) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Truncate text to specified length
export function truncateText(
  text: string | null | undefined,
  maxLength: number,
): string {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + "...";
}

// Get rating color based on vote average
export function getRatingColor(voteAverage: number | null | undefined): string {
  if (!voteAverage && voteAverage !== 0) return "text-muted-foreground";

  if (voteAverage >= 7) return "text-green-500";
  if (voteAverage >= 5) return "text-yellow-500";
  return "text-red-500";
}

// Extract YouTube video ID from URL or return the key if it's already an ID
export function getYouTubeVideoId(urlOrId: string): string | null {
  if (!urlOrId) return null;

  // If it's already just an ID (11 characters, alphanumeric with dashes and underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }

  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = urlOrId.match(pattern);
    if (match) return match[1];
  }

  return null;
}

// Build YouTube thumbnail URL
export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "hqdefault" | "maxresdefault" = "hqdefault",
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Debounce function for search
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate a slug from a string
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Check if a string is a valid URL
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Capitalize first letter of each word
export function capitalizeWords(text: string): string {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}

// Calculate age from birth date
export function calculateAge(
  birthDate: string | null | undefined,
  deathDate?: string | null,
): number | null {
  if (!birthDate) return null;

  try {
    const birth = new Date(birthDate);
    const end = deathDate ? new Date(deathDate) : new Date();

    let age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    return null;
  }
}

// Sort array by multiple criteria
export function sortBy<T>(
  array: T[],
  ...criteria: Array<(item: T) => number | string>
): T[] {
  return [...array].sort((a, b) => {
    for (const criterion of criteria) {
      const aValue = criterion(a);
      const bValue = criterion(b);

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    }
    return 0;
  });
}

// Group array by key
export function groupBy<T, K extends keyof any>(
  array: T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  return array.reduce(
    (groups, item) => {
      const key = getKey(item);
      (groups[key] = groups[key] || []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}

// Generate Rotten Tomatoes search URL
export function getRottenTomatoesSearchUrl(
  title: string,
  year?: string,
): string {
  const query = year ? `${title} ${year}` : title;
  const encodedQuery = encodeURIComponent(query.trim());
  return `https://www.rottentomatoes.com/search?search=${encodedQuery}`;
}

// Extract US MPAA rating from release dates
export function getUSCertification(
  releaseDates: any, // ReleaseDatesResponse
): string | null {
  if (!releaseDates?.results) return null;

  const usRelease = releaseDates.results.find(
    (result: any) => result.iso_3166_1 === "US",
  );

  if (!usRelease?.release_dates) return null;

  // Find the theatrical release (type 3) or any release with certification
  const certifiedRelease = usRelease.release_dates.find(
    (release: any) => release.certification && release.certification.trim(),
  );

  return certifiedRelease?.certification || null;
}

// Get MPAA rating color and styling
export function getMPAARatingStyle(rating: string | null): {
  color: string;
  bgColor: string;
  textColor: string;
} {
  if (!rating) return { color: "gray", bgColor: "bg-gray-100", textColor: "text-gray-800" };

  switch (rating.toUpperCase()) {
    case "G":
      return { color: "green", bgColor: "bg-green-100", textColor: "text-green-800" };
    case "PG":
      return { color: "blue", bgColor: "bg-blue-100", textColor: "text-blue-800" };
    case "PG-13":
      return { color: "yellow", bgColor: "bg-yellow-100", textColor: "text-yellow-800" };
    case "R":
      return { color: "red", bgColor: "bg-red-100", textColor: "text-red-800" };
    case "NC-17":
      return { color: "purple", bgColor: "bg-purple-100", textColor: "text-purple-800" };
    default:
      return { color: "gray", bgColor: "bg-gray-100", textColor: "text-gray-800" };
  }
}
