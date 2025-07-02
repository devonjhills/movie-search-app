import useSWR from 'swr';
import type {
  MovieDetails,
  TVShowDetails,
  PersonDetails,
  Movie,
  TVShow,
  Person,
  TMDBResponse,
  MultiSearchResult,
  FormattedMovie,
  APIResponse,
  TMDBError,
  WatchProvidersResponse,
} from './types';
import { ENDPOINTS, API_CONFIG, SWR_CONFIG, IMAGE_URLS } from './constants';

// Get API key from environment
const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

if (!API_KEY) {
  console.error('TMDB API key is not configured. Please set NEXT_PUBLIC_MOVIE_API_KEY environment variable.');
}

// Custom fetcher with error handling
const fetcher = async (url: string): Promise<any> => {
  if (!API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  const separator = url.includes('?') ? '&' : '?';
  const fullUrl = `${url}${separator}api_key=${API_KEY}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    const errorData: TMDBError = await response.json().catch(() => ({
      status_code: response.status,
      status_message: response.statusText,
      success: false,
    }));
    
    throw new Error(errorData.status_message || `HTTP ${response.status}`);
  }

  return response.json();
};

// Helper function to build query parameters
const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
};

// Format movie results (preserving original functionality)
export const formatMovieResults = (movie: Movie): FormattedMovie => {
  return {
    id: movie.id,
    release_date: movie.release_date,
    title: movie.title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    overview: movie.overview,
    poster: movie.poster_path ? IMAGE_URLS.poster.w500(movie.poster_path) : '',
  };
};

// Movie API Functions
export const useMovieDetails = (movieId: number) => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    append_to_response: API_CONFIG.append_to_response.movie,
  });
  
  const { data, error, isLoading } = useSWR<MovieDetails>(
    movieId ? `${ENDPOINTS.movieDetails(movieId)}?${queryParams}` : null,
    fetcher,
    SWR_CONFIG
  );

  return {
    movie: data,
    isLoading,
    isError: error,
  };
};

export const usePopularMovies = () => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    page: 1,
    region: API_CONFIG.region,
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<Movie>>(
    `${ENDPOINTS.moviesPopular}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    movies: data?.results?.map(formatMovieResults) || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

export const useTopRatedMovies = () => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    page: 1,
    region: API_CONFIG.region,
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<Movie>>(
    `${ENDPOINTS.moviesTopRated}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    movies: data?.results?.map(formatMovieResults) || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

export const useNowPlayingMovies = () => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    page: 1,
    region: API_CONFIG.region,
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<Movie>>(
    `${ENDPOINTS.moviesNowPlaying}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    movies: data?.results?.map(formatMovieResults) || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

// TV Show API Functions
export const useTVDetails = (tvId: number) => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    append_to_response: API_CONFIG.append_to_response.tv,
  });
  
  const { data, error, isLoading } = useSWR<TVShowDetails>(
    tvId ? `${ENDPOINTS.tvDetails(tvId)}?${queryParams}` : null,
    fetcher,
    SWR_CONFIG
  );

  return {
    tvShow: data,
    isLoading,
    isError: error,
  };
};

export const usePopularTVShows = () => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    page: 1,
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<TVShow>>(
    `${ENDPOINTS.tvPopular}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    tvShows: data?.results || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

export const useTopRatedTVShows = () => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    page: 1,
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<TVShow>>(
    `${ENDPOINTS.tvTopRated}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    tvShows: data?.results || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

export const useOnTheAirTVShows = () => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    page: 1,
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<TVShow>>(
    `${ENDPOINTS.tvOnTheAir}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    tvShows: data?.results || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

// Person API Functions
export const usePersonDetails = (personId: number) => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    append_to_response: API_CONFIG.append_to_response.person,
  });
  
  const { data, error, isLoading } = useSWR<PersonDetails>(
    personId ? `${ENDPOINTS.personDetails(personId)}?${queryParams}` : null,
    fetcher,
    SWR_CONFIG
  );

  return {
    person: data,
    isLoading,
    isError: error,
  };
};

// Search API Functions
export const useMultiSearch = (query: string) => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    query,
    page: 1,
    include_adult: API_CONFIG.include_adult,
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<Movie | TVShow | Person>>(
    query ? `${ENDPOINTS.searchMulti}?${queryParams}` : null,
    fetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: 2000, // Shorter deduping for search
    }
  );

  // Transform search results into categorized format
  const transformedResults: MultiSearchResult = {
    movieResults: [],
    tvResults: [],
    peopleResults: [],
  };

  if (data?.results) {
    data.results.forEach((result: any) => {
      if (result.media_type === 'movie') {
        transformedResults.movieResults.push(result as Movie);
      } else if (result.media_type === 'tv') {
        transformedResults.tvResults.push(result as TVShow);
      } else if (result.media_type === 'person') {
        transformedResults.peopleResults.push(result as Person);
      }
    });
  }

  return {
    results: transformedResults,
    isLoading,
    isError: error,
  };
};

// Discover API Functions
export const useDiscoverMovies = (params: {
  genre?: number;
  keyword?: number;
  sortBy?: string;
  page?: number;
}) => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    region: API_CONFIG.region,
    sort_by: params.sortBy || 'popularity.desc',
    page: params.page || 1,
    ...(params.genre && { with_genres: params.genre }),
    ...(params.keyword && { with_keywords: params.keyword }),
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<Movie>>(
    `${ENDPOINTS.movieDiscover}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

export const useDiscoverTVShows = (params: {
  genre?: number;
  keyword?: number;
  sortBy?: string;
  page?: number;
}) => {
  const queryParams = buildQueryParams({
    language: API_CONFIG.language,
    sort_by: params.sortBy || 'popularity.desc',
    page: params.page || 1,
    ...(params.genre && { with_genres: params.genre }),
    ...(params.keyword && { with_keywords: params.keyword }),
  });

  const { data, error, isLoading } = useSWR<TMDBResponse<TVShow>>(
    `${ENDPOINTS.tvDiscover}?${queryParams}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    tvShows: data?.results || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    isError: error,
  };
};

// Utility functions for images
export const getImageUrl = (
  path: string | null,
  type: 'poster' | 'backdrop' | 'profile' | 'logo' = 'poster',
  size: keyof typeof IMAGE_URLS.poster = 'w500'
): string => {
  if (!path) return '';
  
  switch (type) {
    case 'poster':
      return IMAGE_URLS.poster[size as keyof typeof IMAGE_URLS.poster]?.(path) || '';
    case 'backdrop':
      return IMAGE_URLS.backdrop[size as keyof typeof IMAGE_URLS.backdrop]?.(path) || '';
    case 'profile':
      return IMAGE_URLS.profile[size as keyof typeof IMAGE_URLS.profile]?.(path) || '';
    case 'logo':
      return IMAGE_URLS.logo[size as keyof typeof IMAGE_URLS.logo]?.(path) || '';
    default:
      return '';
  }
};

// Error boundary helper
export const isAPIError = (error: any): error is TMDBError => {
  return error && typeof error.status_code === 'number' && typeof error.status_message === 'string';
};

// Watch Provider API Functions
export const useMovieWatchProviders = (movieId: number) => {
  const { data, error, isLoading } = useSWR<WatchProvidersResponse>(
    movieId ? `${ENDPOINTS.movieWatchProviders(movieId)}` : null,
    fetcher,
    SWR_CONFIG
  );

  return {
    watchProviders: data,
    isLoading,
    isError: error,
  };
};

export const useTVWatchProviders = (tvId: number) => {
  const { data, error, isLoading } = useSWR<WatchProvidersResponse>(
    tvId ? `${ENDPOINTS.tvWatchProviders(tvId)}` : null,
    fetcher,
    SWR_CONFIG
  );

  return {
    watchProviders: data,
    isLoading,
    isError: error,
  };
};