"use client";

import { RotatingHeroSection } from "@/components/ui/rotating-hero-section";
import { FeaturedSection } from "@/components/ui/featured-section";
import { TVSection } from "@/components/tv/tv-section";
import {
  usePopularTVShows,
  useTopRatedTVShows,
  useOnTheAirTVShows,
} from "@/lib/hooks/api-hooks";

export default function TVPage() {
  const { tvShows: popularTVShows, isLoading: popularLoading } =
    usePopularTVShows();
  const {
    tvShows: topRatedTVShows,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useTopRatedTVShows();
  const {
    tvShows: onTheAirTVShows,
    isLoading: onTheAirLoading,
    isError: onTheAirError,
  } = useOnTheAirTVShows();

  // Create featured TV shows for rotating hero (mix of popular and top rated)
  const featuredTVShows = [
    ...popularTVShows.slice(0, 3),
    ...topRatedTVShows.slice(0, 2),
  ];

  return (
    <div className="min-h-screen smoke-effect">
      {/* Enhanced Rotating Hero Section for TV */}
      {featuredTVShows.length > 0 && !popularLoading && !topRatedLoading && (
        <RotatingHeroSection
          items={featuredTVShows}
          mediaType="tv"
          className="mb-8 sm:mb-12 md:mb-16"
        />
      )}

      {/* Enhanced TV Show Sections */}
      <div className="container mx-auto px-4 space-y-10 md:space-y-16 pb-8 md:pb-12">
        {/* Binge-Worthy Series - Featured Layout */}
        <FeaturedSection
          title="Binge-Worthy Series"
          items={popularTVShows}
          mediaType="tv"
          limit={6}
          showTrending={true}
        />

        {/* Currently Airing with episode indicators */}
        <TVSection
          title="Currently Airing"
          tvShows={onTheAirTVShows}
          isLoading={onTheAirLoading}
          error={onTheAirError}
          href="/tv/on-the-air"
          limit={12}
          badge="📺 On Air"
          showTrending={true}
          showEpisodeIndicator={true}
        />

        {/* Popular TV Shows section */}
        <TVSection
          title="Popular TV Shows"
          tvShows={popularTVShows}
          isLoading={popularLoading}
          error={null}
          href="/tv/popular"
          limit={10}
          badge="🔥 Popular"
        />

        {/* Critically Acclaimed */}
        <TVSection
          title="Critically Acclaimed"
          tvShows={topRatedTVShows}
          isLoading={topRatedLoading}
          error={topRatedError}
          href="/tv/top-rated"
          limit={10}
          badge="🏆 Emmy Winners"
        />

        {/* Recently Added/Trending */}
        {onTheAirTVShows.length > 0 && (
          <TVSection
            title="Fresh Episodes"
            tvShows={onTheAirTVShows}
            isLoading={onTheAirLoading}
            error={onTheAirError}
            href="/tv/on-the-air"
            limit={8}
            badge="🆕 New"
            showEpisodeIndicator={true}
          />
        )}
      </div>
    </div>
  );
}
