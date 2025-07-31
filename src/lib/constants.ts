// TMDB API Base Configuration
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// API Endpoints
export const ENDPOINTS = {
  // Movie endpoints
  movieDetails: (id: number) => `${TMDB_BASE_URL}/movie/${id}`,
  moviesNowPlaying: `${TMDB_BASE_URL}/movie/now_playing`,
  moviesPopular: `${TMDB_BASE_URL}/movie/popular`,
  moviesTopRated: `${TMDB_BASE_URL}/movie/top_rated`,
  movieDiscover: `${TMDB_BASE_URL}/discover/movie`,
  movieWatchProviders: (id: number) =>
    `${TMDB_BASE_URL}/movie/${id}/watch/providers`,

  // TV endpoints
  tvDetails: (id: number) => `${TMDB_BASE_URL}/tv/${id}`,
  tvOnTheAir: `${TMDB_BASE_URL}/tv/on_the_air`,
  tvPopular: `${TMDB_BASE_URL}/tv/popular`,
  tvTopRated: `${TMDB_BASE_URL}/tv/top_rated`,
  tvDiscover: `${TMDB_BASE_URL}/discover/tv`,
  tvWatchProviders: (id: number) => `${TMDB_BASE_URL}/tv/${id}/watch/providers`,

  // Person endpoints
  personDetails: (id: number) => `${TMDB_BASE_URL}/person/${id}`,

  // Search endpoints
  searchMulti: `${TMDB_BASE_URL}/search/multi`,
  searchMovie: `${TMDB_BASE_URL}/search/movie`,
  searchTv: `${TMDB_BASE_URL}/search/tv`,
  searchPerson: `${TMDB_BASE_URL}/search/person`,
} as const;

// Image URL builders
export const IMAGE_URLS = {
  // Poster sizes
  poster: {
    w92: (path: string) => `${TMDB_IMAGE_BASE_URL}/w92${path}`,
    w154: (path: string) => `${TMDB_IMAGE_BASE_URL}/w154${path}`,
    w185: (path: string) => `${TMDB_IMAGE_BASE_URL}/w185${path}`,
    w342: (path: string) => `${TMDB_IMAGE_BASE_URL}/w342${path}`,
    w500: (path: string) => `${TMDB_IMAGE_BASE_URL}/w500${path}`,
    w780: (path: string) => `${TMDB_IMAGE_BASE_URL}/w780${path}`,
    original: (path: string) => `${TMDB_IMAGE_BASE_URL}/original${path}`,
  },

  // Backdrop sizes
  backdrop: {
    w300: (path: string) => `${TMDB_IMAGE_BASE_URL}/w300${path}`,
    w780: (path: string) => `${TMDB_IMAGE_BASE_URL}/w780${path}`,
    w1280: (path: string) => `${TMDB_IMAGE_BASE_URL}/w1280${path}`,
    original: (path: string) => `${TMDB_IMAGE_BASE_URL}/original${path}`,
  },

  // Profile sizes (for person images)
  profile: {
    w45: (path: string) => `${TMDB_IMAGE_BASE_URL}/w45${path}`,
    w185: (path: string) => `${TMDB_IMAGE_BASE_URL}/w185${path}`,
    h632: (path: string) => `${TMDB_IMAGE_BASE_URL}/h632${path}`,
    original: (path: string) => `${TMDB_IMAGE_BASE_URL}/original${path}`,
  },

  // Logo sizes
  logo: {
    w45: (path: string) => `${TMDB_IMAGE_BASE_URL}/w45${path}`,
    w92: (path: string) => `${TMDB_IMAGE_BASE_URL}/w92${path}`,
    w154: (path: string) => `${TMDB_IMAGE_BASE_URL}/w154${path}`,
    w185: (path: string) => `${TMDB_IMAGE_BASE_URL}/w185${path}`,
    w300: (path: string) => `${TMDB_IMAGE_BASE_URL}/w300${path}`,
    w500: (path: string) => `${TMDB_IMAGE_BASE_URL}/w500${path}`,
    original: (path: string) => `${TMDB_IMAGE_BASE_URL}/original${path}`,
  },
} as const;

// Default image URLs for fallbacks
export const DEFAULT_IMAGES = {
  poster: "/images/default-poster.svg",
  backdrop: "/images/default-backdrop.svg",
  person: "/images/default-person.svg",
} as const;

// API Configuration
export const API_CONFIG = {
  language: "en-US",
  region: "US",
  include_adult: false,
  append_to_response: {
    movie:
      "videos,credits,external_ids,recommendations,release_dates,reviews,keywords",
    tv: "videos,credits,external_ids,recommendations,reviews,keywords",
    person: "combined_credits,external_ids,images",
  },
} as const;

// SWR Configuration
export const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000, // 5 seconds
} as const;

// Media types
export const MEDIA_TYPES = {
  MOVIE: "movie",
  TV: "tv",
  PERSON: "person",
} as const;

// Genre mappings (commonly used ones)
export const MOVIE_GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
} as const;

export const TV_GENRES = {
  ACTION_ADVENTURE: 10759,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  KIDS: 10762,
  MYSTERY: 9648,
  NEWS: 10763,
  REALITY: 10764,
  SCIENCE_FICTION: 10765,
  SOAP: 10766,
  TALK: 10767,
  WAR_POLITICS: 10768,
  WESTERN: 37,
} as const;
