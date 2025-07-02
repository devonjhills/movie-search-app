'use client';

import { HeroSection } from '@/components/ui/hero-section';
import { MovieSection } from '@/components/movie/movie-section';
import { usePopularMovies, useTopRatedMovies, useNowPlayingMovies } from '@/lib/api';

export default function Home() {
  const { movies: popularMovies, isLoading: popularLoading, isError: popularError } = usePopularMovies();
  const { movies: topRatedMovies, isLoading: topRatedLoading, isError: topRatedError } = useTopRatedMovies();
  const { movies: nowPlayingMovies, isLoading: nowPlayingLoading, isError: nowPlayingError } = useNowPlayingMovies();

  // Use the first popular movie as hero if available
  const heroMovie = popularMovies[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroMovie && !popularLoading && (
        <HeroSection movie={heroMovie} className="mb-12" />
      )}

      {/* Movie Sections */}
      <div className="container mx-auto px-4 space-y-12 pb-12">
        {/* Now Playing */}
        <MovieSection
          title="Now Playing"
          movies={nowPlayingMovies}
          isLoading={nowPlayingLoading}
          error={nowPlayingError}
          limit={12}
        />

        {/* Popular Movies */}
        <MovieSection
          title="Popular Movies"
          movies={popularMovies}
          isLoading={popularLoading}
          error={popularError}
          limit={12}
        />

        {/* Top Rated */}
        <MovieSection
          title="Top Rated"
          movies={topRatedMovies}
          isLoading={topRatedLoading}
          error={topRatedError}
          limit={12}
        />
      </div>
    </div>
  );
}
