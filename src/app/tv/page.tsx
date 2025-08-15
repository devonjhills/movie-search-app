import { RotatingHeroSection } from "@/components/ui/rotating-hero-section";
import { FeaturedSection } from "@/components/ui/featured-section";
import { MediaSection } from "@/components/shared/media-section";
import { fetchFeaturedTVShows } from "@/lib/data-fetching";

export default async function TVPage() {
  const { onTheAir, popular, topRated, featured } = await fetchFeaturedTVShows();

  return (
    <div className="min-h-screen">
      {/* Rotating Hero Section for TV */}
      {featured.length > 0 && (
        <RotatingHeroSection
          items={featured}
          mediaType="tv"
          className="mb-8 sm:mb-12 md:mb-16"
        />
      )}

      {/* TV Show Sections */}
      <div className="container mx-auto px-4 space-y-10 md:space-y-16 pb-8 md:pb-12">
        {/* Binge-Worthy Series - Featured Layout */}
        <FeaturedSection
          title="Binge-Worthy Series"
          items={popular}
          mediaType="tv"
          limit={6}
          showTrending={true}
          viewAllHref="/tv/popular"
        />

        {/* On The Air */}
        <MediaSection
          title="On The Air"
          items={onTheAir}
          mediaType="tv"
          href="/tv/on-the-air"
          limit={10}
          badge="Playing Now"
        />

        {/* Top Rated */}
        <MediaSection
          title="Top Rated"
          items={topRated}
          mediaType="tv"
          href="/tv/top-rated"
          limit={10}
          badge="Critics' Choice"
        />
      </div>
    </div>
  );
}
