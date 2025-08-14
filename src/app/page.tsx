import { RotatingHeroSection } from "@/components/ui/rotating-hero-section";
import { FeaturedSection } from "@/components/ui/featured-section";
import { MovieSection } from "@/components/movie/movie-section";
import { ENDPOINTS } from "@/lib/constants";
import type { Movie, TMDBResponse } from "@/lib/types";

async function fetchMovies(endpoint: string): Promise<Movie[]> {
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

    const data: TMDBResponse<Movie> = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    return [];
  }
}

export default async function Home() {
  // Fetch all data in parallel for enhanced layout
  const [nowPlayingMovies, popularMovies, topRatedMovies] = await Promise.all([
    fetchMovies(ENDPOINTS.moviesNowPlaying),
    fetchMovies(ENDPOINTS.moviesPopular),
    fetchMovies(ENDPOINTS.moviesTopRated),
  ]);

  // Get top movies for featured rotation (mix of now playing and popular)
  const featuredMovies = [...nowPlayingMovies.slice(0, 5)];

  return (
    <div className="min-h-screen smoke-effect">
      {/* Enhanced Rotating Hero Section */}
      {featuredMovies.length > 0 && (
        <RotatingHeroSection
          items={featuredMovies}
          mediaType="movie"
          className="mb-8 sm:mb-12 md:mb-16"
        />
      )}

      {/* Enhanced Movie Sections */}
      <div className="container mx-auto px-4 space-y-10 md:space-y-16 pb-8 md:pb-12">
        {/* Trending This Week - Featured Layout */}
        <FeaturedSection
          title="Trending This Week"
          items={popularMovies}
          mediaType="movie"
          limit={6}
          showTrending={true}
          viewAllHref="/movies/popular"
        />

        {/* Now Playing with enhanced styling */}
        <MovieSection
          title="Now Playing"
          movies={nowPlayingMovies}
          isLoading={false}
          error={null}
          href="/movies/now-playing"
          limit={10}
          badge="In Theaters"
        />

        {/* Top Rated section */}
        <MovieSection
          title="Top Rated"
          movies={topRatedMovies}
          isLoading={false}
          error={null}
          href="/movies/top-rated"
          limit={10}
          badge="Critics' Choice"
        />
      </div>
    </div>
  );
}
