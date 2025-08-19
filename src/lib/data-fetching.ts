import { ENDPOINTS } from "./constants";
import { createOptimizedCache, CACHE_TAGS } from "./cache-utils";
import type { Movie, TVShow, TMDBResponse } from "./types";

/**
 * Generic TMDB API fetcher with enhanced caching and error handling
 */
async function fetchFromTMDB<T>(endpoint: string): Promise<T[]> {
  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

  if (!API_KEY) {
    console.error("TMDB API key is not configured");
    return [];
  }

  try {
    const response = await fetch(`${endpoint}?api_key=${API_KEY}`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: [CACHE_TAGS.MOVIES, CACHE_TAGS.TV_SHOWS], // Tag for invalidation
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: TMDBResponse<T> = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return [];
  }
}

/**
 * Fetch movies from a specific endpoint with optimized caching
 */
export const fetchMovies = createOptimizedCache(
  async (endpoint: string): Promise<Movie[]> => {
    return fetchFromTMDB<Movie>(endpoint);
  },
  ["fetch-movies"],
  {
    revalidate: 3600,
    tags: [CACHE_TAGS.MOVIES],
  },
);

/**
 * Fetch TV shows from a specific endpoint with optimized caching
 */
export const fetchTVShows = createOptimizedCache(
  async (endpoint: string): Promise<TVShow[]> => {
    return fetchFromTMDB<TVShow>(endpoint);
  },
  ["fetch-tv-shows"],
  {
    revalidate: 3600,
    tags: [CACHE_TAGS.TV_SHOWS],
  },
);

/**
 * Fetch featured movies for homepage with optimized caching
 */
export const fetchFeaturedMovies = createOptimizedCache(
  async () => {
    const [nowPlaying, popular, topRated] = await Promise.all([
      fetchFromTMDB<Movie>(ENDPOINTS.moviesNowPlaying),
      fetchFromTMDB<Movie>(ENDPOINTS.moviesPopular),
      fetchFromTMDB<Movie>(ENDPOINTS.moviesTopRated),
    ]);

    return {
      nowPlaying,
      popular,
      topRated,
      featured: popular.slice(0, 5), // Use popular for featured for better variety
    };
  },
  ["featured-movies"],
  {
    revalidate: 1800, // 30 minutes for homepage
    tags: [CACHE_TAGS.FEATURED, CACHE_TAGS.MOVIES],
  },
);

/**
 * Fetch featured TV shows for TV page with optimized caching
 */
export const fetchFeaturedTVShows = createOptimizedCache(
  async () => {
    const [onTheAir, popular, topRated] = await Promise.all([
      fetchFromTMDB<TVShow>(ENDPOINTS.tvOnTheAir),
      fetchFromTMDB<TVShow>(ENDPOINTS.tvPopular),
      fetchFromTMDB<TVShow>(ENDPOINTS.tvTopRated),
    ]);

    return {
      onTheAir,
      popular,
      topRated,
      featured: popular.slice(0, 5), // Use popular for featured for better variety
    };
  },
  ["featured-tv-shows"],
  {
    revalidate: 1800, // 30 minutes for homepage
    tags: [CACHE_TAGS.FEATURED, CACHE_TAGS.TV_SHOWS],
  },
);
