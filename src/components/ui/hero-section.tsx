import Image from "next/image";
import Link from "next/link";
import { StarIcon, CalendarIcon } from "@heroicons/react/24/solid";
import { cn, formatYear, formatVoteAverage, truncateText } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { WatchlistButton } from "@/components/ui/watchlist-button";
import type { Movie, FormattedMovie } from "@/lib/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface HeroSectionProps {
  movie: Movie | FormattedMovie | any;
  className?: string;
  mediaType?: "movie" | "tv";
}

export function HeroSection({
  movie,
  className,
  mediaType = "movie",
}: HeroSectionProps) {
  const backdropUrl = getImageUrl(
    movie.backdrop_path || movie.poster_path,
    "backdrop",
    "w1280",
  );
  const posterUrl = getImageUrl(movie.poster_path, "poster", "w342");
  const rating = formatVoteAverage(movie.vote_average);
  const year = formatYear(movie.release_date);

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        {/* Theme-aware gradient overlay like movie details page */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Poster */}
          <div className="md:col-span-3 lg:col-span-2">
            <div className="relative aspect-[2/3] w-full max-w-xs mx-auto">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 768px) 300px, 400px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground rounded-lg">
                  <span className="text-sm">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="md:col-span-9 lg:col-span-10 space-y-6 text-foreground relative z-10">
            {/* Title and Year */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                {movie.title}
              </h1>
              {movie.release_date && (
                <div className="flex items-center space-x-2 text-foreground/80">
                  <CalendarIcon className="h-5 w-5" />
                  <span className="text-lg drop-shadow-md">
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Rating */}
            {movie.vote_average > 0 && (
              <div className="flex items-center space-x-2">
                <div className="rating-badge shadow-lg">
                  <StarIcon className="h-4 w-4" />
                  <span>{rating}</span>
                </div>
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <p className="text-lg md:text-xl leading-relaxed text-foreground/90 max-w-3xl drop-shadow-md">
                {truncateText(movie.overview, 300)}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${mediaType}/${movie.id}`}
                className={cn(
                  "inline-flex items-center space-x-2 px-6 py-3 rounded-lg",
                  "bg-primary text-primary-foreground font-semibold shadow-lg",
                  "hover:bg-primary/90 transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                )}
              >
                <InformationCircleIcon className="h-5 w-5" />
                <span>View Details</span>
              </Link>

              <WatchlistButton
                item={movie}
                mediaType={mediaType}
                variant="hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
