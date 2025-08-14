import Image from "next/image";
import Link from "next/link";
import {
  StarFilledIcon,
  CalendarIcon,
  DrawingPinFilledIcon,
} from "@radix-ui/react-icons";
import { cn, formatVoteAverage } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { ViewAllButton } from "@/components/ui/view-all-button";
import type { Movie, TVShow } from "@/lib/types";

interface FeaturedSectionProps {
  title: string;
  items: (Movie | TVShow)[];
  mediaType?: "movie" | "tv";
  className?: string;
  limit?: number;
  showTrending?: boolean;
  viewAllHref?: string;
}

export function FeaturedSection({
  title,
  items,
  mediaType = "movie",
  className,
  limit = 6,
  showTrending = true,
  viewAllHref,
}: FeaturedSectionProps) {
  const featuredItems = items.slice(0, limit);

  if (featuredItems.length === 0) return null;

  return (
    <section className={cn("space-y-4 sm:space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground text-glow">
            {title}
          </h2>
          {showTrending && (
            <Badge variant="secondary" className="gap-1.5 text-sm">
              <DrawingPinFilledIcon className="h-4 w-4" />
              Trending
            </Badge>
          )}
        </div>
        {viewAllHref && <ViewAllButton href={viewAllHref} />}
      </div>

      {/* All 6 Items in 2x3 Grid - with backdrop images */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {featuredItems.map((item, index) => {
          const title =
            "title" in item ? item.title : "name" in item ? item.name : "";
          const releaseDate =
            "release_date" in item
              ? item.release_date
              : "first_air_date" in item
                ? item.first_air_date
                : null;
          const backdropUrl = getImageUrl(
            item.backdrop_path,
            "backdrop",
            "w780",
          );
          const rating = formatVoteAverage(item.vote_average);

          return (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden bg-card border border-border/50 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/${mediaType}/${item.id}`} className="block">
                <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] overflow-hidden">
                  {/* Backdrop Image */}
                  {backdropUrl ? (
                    <Image
                      src={backdropUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      priority={index < 3}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                      <span className="text-sm">No Image</span>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                      <div className="flex flex-col gap-3">
                        {/* Text Content */}
                        <div className="space-y-2">
                          <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight text-glow">
                            {title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            {item.vote_average > 0 && (
                              <Badge
                                variant="accent"
                                className="gap-1.5 text-sm"
                              >
                                <StarFilledIcon className="h-4 w-4" />
                                <span>{rating}</span>
                              </Badge>
                            )}
                            {releaseDate && (
                              <div className="flex items-center gap-1.5 text-white/80">
                                <CalendarIcon className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  {new Date(releaseDate).getFullYear()}
                                </span>
                              </div>
                            )}
                          </div>
                          {item.overview && (
                            <p className="text-sm text-white/90 line-clamp-1 max-w-full">
                              {item.overview}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
