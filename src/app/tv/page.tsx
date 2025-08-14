import { RotatingHeroSection } from "@/components/ui/rotating-hero-section";
import { FeaturedSection } from "@/components/ui/featured-section";
import { TVSection } from "@/components/tv/tv-section";
import { ENDPOINTS } from "@/lib/constants";
import type { TVShow, TMDBResponse } from "@/lib/types";

async function fetchTVShows(endpoint: string): Promise<TVShow[]> {
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

    const data: TMDBResponse<TVShow> = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching TV shows from ${endpoint}:`, error);
    return [];
  }
}

export default async function TVPage() {
  // Fetch all TV data in parallel
  const [onTheAirTVShows, popularTVShows, topRatedTVShows] = await Promise.all([
    fetchTVShows(ENDPOINTS.tvOnTheAir),
    fetchTVShows(ENDPOINTS.tvPopular),
    fetchTVShows(ENDPOINTS.tvTopRated),
  ]);

  // Get top TV shows for featured rotation (top 5 from on the air)
  const featuredTVShows = [...onTheAirTVShows.slice(0, 5)];

  return (
    <div className="min-h-screen smoke-effect">
      {/* Enhanced Rotating Hero Section for TV */}
      {featuredTVShows.length > 0 && (
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
          viewAllHref="/tv/popular"
        />

        {/* On The Air */}
        <TVSection
          title="On The Air"
          tvShows={onTheAirTVShows}
          isLoading={false}
          error={null}
          href="/tv/on-the-air"
          limit={10}
          badge="Playing Now"
        />

        {/* Top Rated */}
        <TVSection
          title="Top Rated"
          tvShows={topRatedTVShows}
          isLoading={false}
          error={null}
          href="/tv/top-rated"
          limit={10}
          badge="Critics' Choice"
        />
      </div>
    </div>
  );
}
