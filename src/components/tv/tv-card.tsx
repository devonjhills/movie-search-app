import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatVoteAverage, truncateText } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import type { TVShow } from "@/lib/types";

interface TVCardProps {
  tvShow: TVShow;
  className?: string;
  size?: "sm" | "md" | "lg";
  showYear?: boolean;
  showRating?: boolean;
  showOverview?: boolean;
}

export function TVCard({
  tvShow,
  className,
  size = "md",
  showYear = true,
  showRating = true,
  showOverview = false,
}: TVCardProps) {
  const imageUrl = getImageUrl(tvShow.poster_path, "poster", "w185");
  const rating = formatVoteAverage(tvShow.vote_average);

  const sizeClasses = {
    sm: "w-40",
    md: "w-48",
    lg: "w-56",
  };

  const aspectRatio = "aspect-[2/3]"; // Standard poster ratio

  return (
    <Link href={`/tv/${tvShow.id}`} className="group">
      <Card
        className={cn(
          "overflow-hidden bg-transparent shadow-none card-hover h-full flex flex-col",
          "border-0",
          sizeClasses[size],
          className,
        )}
      >
        <CardContent className="p-3 space-y-3 flex-1 flex flex-col">
          {/* Poster Image */}
          <div
            className={cn("relative overflow-hidden rounded-lg", aspectRatio)}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={tvShow.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <span className="text-xs text-center p-2">No Image</span>
              </div>
            )}

            {/* Rating Badge */}
            {showRating && tvShow.vote_average > 0 && (
              <div className="absolute top-2 right-2">
                <Badge>
                  <StarIcon className="h-3 w-3" />
                  <span>{rating}</span>
                </Badge>
              </div>
            )}

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 gradient-overlay opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* TV Show Info */}
          <div className="space-y-1 flex-1 flex flex-col">
            <h3 className="text-sm font-medium leading-tight min-h-[2.5rem] flex items-center group-hover:text-primary">
              {tvShow.name}
            </h3>

            {showYear && tvShow.first_air_date && (
              <p className="text-xs text-muted-foreground">
                {new Date(tvShow.first_air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            {showOverview && tvShow.overview && (
              <p className="text-xs text-muted-foreground line-clamp-3">
                {truncateText(tvShow.overview, 120)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
