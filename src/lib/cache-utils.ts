// Cache utilities for improved performance
import { unstable_cache } from "next/cache";

/**
 * Enhanced cache wrapper with intelligent revalidation
 */
export function createOptimizedCache<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  keyParts: string[],
  options: {
    revalidate?: number;
    tags?: string[];
  } = {},
) {
  const { revalidate = 3600, tags = [] } = options; // Default 1 hour cache

  return unstable_cache(fn, keyParts, {
    revalidate,
    tags,
  });
}

/**
 * Memory cache for client-side data
 */
class MemoryCache {
  private cache = new Map<
    string,
    { data: unknown; timestamp: number; ttl: number }
  >();

  set(key: string, data: unknown, ttl: number = 300000) {
    // Default 5 minutes
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > item.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  // Clean up expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const memoryCache = new MemoryCache();

// Cleanup expired entries every 5 minutes
if (typeof window !== "undefined") {
  setInterval(() => {
    memoryCache.cleanup();
  }, 300000);
}

/**
 * Generate cache keys for TMDB API calls
 */
export function generateCacheKey(
  endpoint: string,
  params?: Record<string, unknown>,
) {
  const baseKey = endpoint.replace(/[^a-zA-Z0-9]/g, "_");
  if (!params) return [baseKey];

  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}_${params[key]}`)
    .join("_");

  return [baseKey, sortedParams];
}

/**
 * Cache tags for efficient invalidation
 */
export const CACHE_TAGS = {
  MOVIES: "movies",
  TV_SHOWS: "tv-shows",
  PERSONS: "persons",
  SEARCH: "search",
  FEATURED: "featured",
  POPULAR: "popular",
  TOP_RATED: "top-rated",
  NOW_PLAYING: "now-playing",
  ON_THE_AIR: "on-the-air",
} as const;

/**
 * Prefetch data for improved perceived performance
 */
export async function prefetchData<T>(
  fetcher: () => Promise<T>,
  cacheKey: string,
  priority: "high" | "low" = "low",
) {
  // Check if data is already cached
  const cached = memoryCache.get(cacheKey);
  if (cached) return cached;

  // Use requestIdleCallback for low priority prefetching
  if (
    priority === "low" &&
    typeof window !== "undefined" &&
    "requestIdleCallback" in window
  ) {
    return new Promise<T>((resolve) => {
      window.requestIdleCallback(async () => {
        try {
          const data = await fetcher();
          memoryCache.set(cacheKey, data);
          resolve(data);
        } catch (error) {
          console.error("Prefetch failed:", error);
          resolve(null as T);
        }
      });
    });
  }

  // High priority or no requestIdleCallback support
  try {
    const data = await fetcher();
    memoryCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Prefetch failed:", error);
    return null;
  }
}

/**
 * Cache-aware SWR configuration
 */
export const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  focusThrottleInterval: 5000,
  loadingTimeout: 10000,
};

/**
 * Progressive image loading cache
 */
export class ImageCache {
  private static cache = new Map<string, boolean>();

  static isLoaded(src: string): boolean {
    return this.cache.has(src);
  }

  static markLoaded(src: string): void {
    this.cache.set(src, true);
  }

  static preload(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.markLoaded(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  static clear(): void {
    this.cache.clear();
  }
}

const cacheUtils = {
  createOptimizedCache,
  memoryCache,
  generateCacheKey,
  CACHE_TAGS,
  prefetchData,
  SWR_CONFIG,
  ImageCache,
};

export default cacheUtils;
