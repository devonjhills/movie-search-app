import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "@/components/ui/card";
import {
  cn,
  formatYear,
  formatVoteAverage,
  getRatingColor,
  truncateText,
} from "@/lib/utils";
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
  const imageUrl = getImageUrl(tvShow.poster_path, "poster", "w342");
  const rating = formatVoteAverage(tvShow.vote_average);
  const year = formatYear(tvShow.first_air_date);
  const ratingColor = getRatingColor(tvShow.vote_average);

  const sizeClasses = {
    sm: "w-32",
    md: "w-40",
    lg: "w-48",
  };

  const aspectRatio = "aspect-[2/3]"; // Standard poster ratio

  return (
    <Link href={`/tv/${tvShow.id}`} className="group">
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg",
          "border-0 bg-transparent shadow-none",
          sizeClasses[size],
          className,
        )}
      >
        <CardContent className="p-0 space-y-3">
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
              <div className="absolute top-2 right-2 flex items-center space-x-1 rounded-full bg-background/90 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm border border-border">
                <StarIcon className="h-3 w-3 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* TV Show Info */}
          <div className="space-y-1">
            <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {tvShow.name}
            </h3>

            {showYear && year && (
              <p className="text-xs text-muted-foreground">{year}</p>
            )}

            {showOverview && tvShow.overview && (
              <p className="text-xs text-muted-foreground line-clamp-3">
                {truncateText(tvShow.overview, 120)}
              </p>
            )}

            {showRating && tvShow.vote_average > 0 && (
              <div className="flex items-center space-x-1">
                <StarIcon className="h-3 w-3 text-yellow-400" />
                <span className={cn("text-xs font-medium", ratingColor)}>
                  {rating}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
