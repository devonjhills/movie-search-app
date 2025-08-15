import Image from "next/image";
import Link from "next/link";
import { StarFilledIcon, DrawingPinFilledIcon } from "@radix-ui/react-icons";
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
    <section className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {showTrending && (
            <Badge variant="secondary" className="gap-1">
              <DrawingPinFilledIcon className="h-3 w-3" />
              Trending
            </Badge>
          )}
        </div>
        {viewAllHref && <ViewAllButton href={viewAllHref} />}
      </div>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
            <Link key={item.id} href={`/${mediaType}/${item.id}`}>
              <div className="group relative aspect-video rounded-lg overflow-hidden border bg-card">
                {backdropUrl ? (
                  <Image
                    src={backdropUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority={index < 3}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <span className="text-sm">No Image</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    {item.vote_average > 0 && (
                      <Badge variant="secondary" className="gap-1">
                        <StarFilledIcon className="h-3 w-3" />
                        {rating}
                      </Badge>
                    )}
                    {releaseDate && (
                      <Badge variant="outline">
                        {new Date(releaseDate).getFullYear()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
