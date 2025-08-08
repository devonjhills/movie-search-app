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
import type { Movie, FormattedMovie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie | FormattedMovie;
  className?: string;
  size?: "sm" | "md" | "lg";
  showYear?: boolean;
  showRating?: boolean;
  showOverview?: boolean;
}

export function MovieCard({
  movie,
  className,
  size = "md",
  showYear = true,
  showRating = true,
  showOverview = false,
}: MovieCardProps) {
  const imageUrl = getImageUrl(movie.poster_path, "poster", "w185");
  const rating = formatVoteAverage(movie.vote_average);
  const year = formatYear(movie.release_date);
  const ratingColor = getRatingColor(movie.vote_average);

  const sizeClasses = {
    sm: "w-40",
    md: "w-48",
    lg: "w-56",
  };

  const aspectRatio = "aspect-[2/3]"; // Standard movie poster ratio

  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <Card
        className={cn(
          "overflow-hidden bg-transparent shadow-none card-hover",
          "border-0",
          sizeClasses[size],
          className,
        )}
      >
        <CardContent className="p-3 space-y-3">
          {/* Poster Image */}
          <div
            className={cn("relative overflow-hidden rounded-lg", aspectRatio)}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={movie.title}
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
            {showRating && movie.vote_average > 0 && (
              <div className="absolute top-2 right-2">
                <div className="rating-badge backdrop-blur-sm">
                  <StarIcon className="h-3 w-3" />
                  <span>{rating}</span>
                </div>
              </div>
            )}

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 gradient-overlay opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Movie Info */}
          <div className="space-y-1">
            <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>

            {showYear && movie.release_date && (
              <p className="text-xs text-muted-foreground">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            {showOverview && movie.overview && (
              <p className="text-xs text-muted-foreground line-clamp-3">
                {truncateText(movie.overview, 120)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
