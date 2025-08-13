import Image from "next/image";
import Link from "next/link";
import { StarFilledIcon, CalendarIcon } from "@radix-ui/react-icons";
import { cn, formatVoteAverage, truncateText } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { WatchStatusButton } from "@/components/ui/watch-status-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Movie, TVShow } from "@/lib/types";

interface FeaturedSectionProps {
  title: string;
  items: (Movie | TVShow)[];
  mediaType?: "movie" | "tv";
  className?: string;
  limit?: number;
  showTrending?: boolean;
}

export function FeaturedSection({
  title,
  items,
  mediaType = "movie",
  className,
  limit = 6,
  showTrending = true,
}: FeaturedSectionProps) {
  const featuredItems = items.slice(0, limit);

  if (featuredItems.length === 0) return null;

  return (
    <section className={cn("space-y-4 sm:space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-glow">
          {title}
        </h2>
        {showTrending && (
          <Badge variant="outline" className="gap-1.5 text-sm">
            🔥 Hot Now
          </Badge>
        )}
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {featuredItems.map((item, index) => {
          const title =
            "title" in item ? item.title : "name" in item ? item.name : "";
          const releaseDate =
            "release_date" in item
              ? item.release_date
              : "first_air_date" in item
                ? item.first_air_date
                : null;
          const posterUrl = getImageUrl(item.poster_path, "poster", "w342");
          const rating = formatVoteAverage(item.vote_average);

          return (
            <div
              key={item.id}
              className={cn(
                "group relative rounded-xl overflow-hidden bg-card border border-border/50 card-hover",
                // Make first few items larger on larger screens
                index < 2 && "lg:col-span-2 xl:col-span-2",
              )}
            >
              {/* Featured Badge for first items */}
              {index < 2 && (
                <div className="absolute top-3 left-3 z-20">
                  <Badge className="bg-primary/90 text-primary-foreground font-serif text-xs px-2 py-1 shimmer">
                    Featured
                  </Badge>
                </div>
              )}

              {/* Trending Badge */}
              {showTrending && index < 3 && (
                <div className="absolute top-3 right-3 z-20">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    🔥 #{index + 1}
                  </Badge>
                </div>
              )}

              <Link href={`/${mediaType}/${item.id}`} className="block">
                {/* Poster Section */}
                <div
                  className={cn(
                    "relative overflow-hidden",
                    index < 2 ? "aspect-[16/9]" : "aspect-[2/3]",
                  )}
                >
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes={
                        index < 2
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                      <span className="text-sm">No Image</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="bg-background/20 backdrop-blur-sm border border-border/20"
                    >
                      <StarFilledIcon className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Content Section - Only for larger featured items */}
                {index < 2 && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold leading-tight text-glow">
                        {title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2">
                        {item.vote_average > 0 && (
                          <Badge className="gap-1 text-xs shimmer text-champagne-glow">
                            <StarFilledIcon className="h-3 w-3" />
                            <span>{rating}</span>
                          </Badge>
                        )}
                        {releaseDate && (
                          <div className="flex items-center gap-1 text-white/80">
                            <CalendarIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {new Date(releaseDate).getFullYear()}
                            </span>
                          </div>
                        )}
                      </div>

                      {item.overview && (
                        <p className="text-sm leading-relaxed text-white/90 line-clamp-2">
                          {truncateText(item.overview, 120)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Link>

              {/* Compact Info for smaller cards */}
              {index >= 2 && (
                <div className="p-3 sm:p-4 space-y-2">
                  <h3 className="font-serif text-sm sm:text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.vote_average > 0 && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <StarFilledIcon className="h-3 w-3" />
                          <span>{rating}</span>
                        </Badge>
                      )}
                      {releaseDate && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(releaseDate).getFullYear()}
                        </span>
                      )}
                    </div>

                    <WatchStatusButton
                      tmdb_id={item.id}
                      media_type={mediaType}
                      title={title}
                      poster_path={item.poster_path}
                      overview={item.overview || ""}
                      release_date={releaseDate || ""}
                      vote_average={item.vote_average}
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
