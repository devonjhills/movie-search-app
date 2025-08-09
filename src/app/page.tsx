import { HeroSection } from "@/components/ui/hero-section";
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
  // Fetch all data in parallel
  const [nowPlayingMovies, popularMovies, topRatedMovies] = await Promise.all([
    fetchMovies(ENDPOINTS.moviesNowPlaying),
    fetchMovies(ENDPOINTS.moviesPopular),
    fetchMovies(ENDPOINTS.moviesTopRated),
  ]);

  const heroMovie = nowPlayingMovies[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroMovie && <HeroSection movie={heroMovie} className="mb-12" />}

      {/* Movie Sections */}
      <div className="container mx-auto px-4 space-y-12 pb-12">
        {/* Now Playing */}
        <MovieSection
          title="Now Playing"
          movies={nowPlayingMovies}
          isLoading={false}
          error={null}
          limit={12}
        />

        {/* Popular Movies */}
        <MovieSection
          title="Popular Movies"
          movies={popularMovies}
          isLoading={false}
          error={null}
          limit={12}
        />

        {/* Top Rated */}
        <MovieSection
          title="Top Rated"
          movies={topRatedMovies}
          isLoading={false}
          error={null}
          limit={12}
        />
      </div>
    </div>
  );
}
