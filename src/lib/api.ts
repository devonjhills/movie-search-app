import type { Movie, FormattedMovie, TMDBError } from "./types";
import { IMAGE_URLS } from "./constants";

// Format movie results (preserving original functionality)
export const formatMovieResults = (movie: Movie): FormattedMovie => {
  return {
    id: movie.id,
    release_date: movie.release_date,
    title: movie.title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    overview: movie.overview,
    poster: movie.poster_path ? IMAGE_URLS.poster.w500(movie.poster_path) : "",
  };
};

// Utility functions for images
export const getImageUrl = (
  path: string | null,
  type: "poster" | "backdrop" | "profile" | "logo" = "poster",
  size: string = "w500",
): string => {
  if (!path) return "";

  switch (type) {
    case "poster":
      return (
        IMAGE_URLS.poster[size as keyof typeof IMAGE_URLS.poster]?.(path) || ""
      );
    case "backdrop":
      return (
        IMAGE_URLS.backdrop[size as keyof typeof IMAGE_URLS.backdrop]?.(path) ||
        ""
      );
    case "profile":
      return (
        IMAGE_URLS.profile[size as keyof typeof IMAGE_URLS.profile]?.(path) ||
        ""
      );
    case "logo":
      return (
        IMAGE_URLS.logo[size as keyof typeof IMAGE_URLS.logo]?.(path) || ""
      );
    default:
      return "";
  }
};

// Error boundary helper
export const isAPIError = (error: unknown): error is TMDBError => {
  return (
    error &&
    typeof error.status_code === "number" &&
    typeof error.status_message === "string"
  );
};
