'use client';

import { HeroSection } from '@/components/ui/hero-section';
import { TVSection } from '@/components/tv/tv-section';
import { usePopularTVShows, useTopRatedTVShows, useOnTheAirTVShows } from '@/lib/api';

export default function TVPage() {
  const { tvShows: popularTVShows, isLoading: popularLoading, isError: popularError } = usePopularTVShows();
  const { tvShows: topRatedTVShows, isLoading: topRatedLoading, isError: topRatedError } = useTopRatedTVShows();
  const { tvShows: onTheAirTVShows, isLoading: onTheAirLoading, isError: onTheAirError } = useOnTheAirTVShows();

  // Use the first popular TV show as hero if available
  const heroTVShow = popularTVShows[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroTVShow && !popularLoading && (
        <HeroSection 
          movie={{
            ...heroTVShow,
            title: heroTVShow.name,
            release_date: heroTVShow.first_air_date,
            adult: false,
            original_title: heroTVShow.original_name,
            video: false,
          } as any} 
          mediaType="tv"
          className="mb-12" 
        />
      )}

      {/* TV Show Sections */}
      <div className="container mx-auto px-4 space-y-12 pb-12">
        {/* On The Air */}
        <TVSection
          title="On The Air"
          tvShows={onTheAirTVShows}
          isLoading={onTheAirLoading}
          error={onTheAirError}
          limit={12}
        />

        {/* Popular TV Shows */}
        <TVSection
          title="Popular TV Shows"
          tvShows={popularTVShows}
          isLoading={popularLoading}
          error={popularError}
          limit={12}
        />

        {/* Top Rated */}
        <TVSection
          title="Top Rated"
          tvShows={topRatedTVShows}
          isLoading={topRatedLoading}
          error={topRatedError}
          limit={12}
        />
      </div>
    </div>
  );
}