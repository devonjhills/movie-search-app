import { ENDPOINTS } from "./constants";
import type { Movie, TVShow, TMDBResponse } from "./types";

/**
 * Generic TMDB API fetcher with error handling and caching
 */
async function fetchFromTMDB<T>(endpoint: string): Promise<T[]> {
  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

  if (!API_KEY) {
    console.error("TMDB API key is not configured");
    return [];
  }

  try {
    const response = await fetch(`${endpoint}?api_key=${API_KEY}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: TMDBResponse<T> = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return [];
  }
}

/**
 * Fetch movies from a specific endpoint
 */
export async function fetchMovies(endpoint: string): Promise<Movie[]> {
  return fetchFromTMDB<Movie>(endpoint);
}

/**
 * Fetch TV shows from a specific endpoint
 */
export async function fetchTVShows(endpoint: string): Promise<TVShow[]> {
  return fetchFromTMDB<TVShow>(endpoint);
}

/**
 * Fetch featured movies for homepage
 */
export async function fetchFeaturedMovies() {
  const [nowPlaying, popular, topRated] = await Promise.all([
    fetchMovies(ENDPOINTS.moviesNowPlaying),
    fetchMovies(ENDPOINTS.moviesPopular),
    fetchMovies(ENDPOINTS.moviesTopRated),
  ]);

  return {
    nowPlaying,
    popular,
    topRated,
    featured: nowPlaying.slice(0, 5),
  };
}

/**
 * Fetch featured TV shows for TV page
 */
export async function fetchFeaturedTVShows() {
  const [onTheAir, popular, topRated] = await Promise.all([
    fetchTVShows(ENDPOINTS.tvOnTheAir),
    fetchTVShows(ENDPOINTS.tvPopular),
    fetchTVShows(ENDPOINTS.tvTopRated),
  ]);

  return {
    onTheAir,
    popular,
    topRated,
    featured: onTheAir.slice(0, 5),
  };
}
