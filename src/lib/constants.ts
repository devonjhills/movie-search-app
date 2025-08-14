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
  tvSeasonDetails: (tvId: number, seasonNumber: number) =>
    `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}`,
  tvOnTheAir: `${TMDB_BASE_URL}/tv/on_the_air`,
  tvPopular: `${TMDB_BASE_URL}/tv/popular`,
  tvTopRated: `${TMDB_BASE_URL}/tv/top_rated`,
  tvDiscover: `${TMDB_BASE_URL}/discover/tv`,
  tvWatchProviders: (id: number) => `${TMDB_BASE_URL}/tv/${id}/watch/providers`,

  // Person endpoints
  personDetails: (id: number) => `${TMDB_BASE_URL}/person/${id}`,

  // Search endpoints
  searchMulti: `${TMDB_BASE_URL}/search/multi`,
} as const;

// Image URL builders - Only sizes actually used in the codebase
export const IMAGE_URLS = {
  // Poster sizes
  poster: {
    w92: (path: string) => `${TMDB_IMAGE_BASE_URL}/w92${path}`, // Horizontal cards
    w185: (path: string) => `${TMDB_IMAGE_BASE_URL}/w185${path}`, // Card components
    w300: (path: string) => `${TMDB_IMAGE_BASE_URL}/w300${path}`, // Split layout sections
    w342: (path: string) => `${TMDB_IMAGE_BASE_URL}/w342${path}`, // Hero sections
    w500: (path: string) => `${TMDB_IMAGE_BASE_URL}/w500${path}`, // Formatted movie results
    w780: (path: string) => `${TMDB_IMAGE_BASE_URL}/w780${path}`, // Large hero displays
  },

  // Backdrop sizes
  backdrop: {
    w780: (path: string) => `${TMDB_IMAGE_BASE_URL}/w780${path}`, // Featured sections
    w1280: (path: string) => `${TMDB_IMAGE_BASE_URL}/w1280${path}`, // Hero sections
  },

  // Profile sizes (for person images)
  profile: {
    w185: (path: string) => `${TMDB_IMAGE_BASE_URL}/w185${path}`, // Person cards
    h632: (path: string) => `${TMDB_IMAGE_BASE_URL}/h632${path}`, // Person details
  },

  // Logo sizes
  logo: {
    w154: (path: string) => `${TMDB_IMAGE_BASE_URL}/w154${path}`, // Watch providers
    w300: (path: string) => `${TMDB_IMAGE_BASE_URL}/w300${path}`, // Watch providers
  },
} as const;

// API Configuration
export const API_CONFIG = {
  language: "en-US",
  region: "US",
  include_adult: false,
  append_to_response: {
    movie:
      "videos,credits,external_ids,recommendations,release_dates,reviews,keywords",
    tv: "videos,credits,aggregate_credits,external_ids,recommendations,reviews,keywords",
    tvSeason: "credits,external_ids,images,videos",
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

// Genre ID to name mappings
export const GENRE_NAMES = {
  movie: {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    53: "Thriller",
    10752: "War",
    37: "Western",
  },
  tv: {
    10759: "Action & Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
    37: "Western",
  },
} as const;
