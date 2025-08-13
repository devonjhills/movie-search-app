import Image from "next/image";
import Link from "next/link";
import {
  StarFilledIcon,
  CalendarIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { cn, formatVoteAverage, truncateText } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { WatchStatusButton } from "@/components/ui/watch-status-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Movie, FormattedMovie, TVShow } from "@/lib/types";

interface HeroSectionProps {
  movie: Movie | FormattedMovie | TVShow;
  className?: string;
  mediaType?: "movie" | "tv";
}

export function HeroSection({
  movie,
  className,
  mediaType = "movie",
}: HeroSectionProps) {
  const backdropUrl = movie.backdrop_path
    ? getImageUrl(movie.backdrop_path, "backdrop", "w1280")
    : movie.poster_path
      ? getImageUrl(movie.poster_path, "poster", "w780")
      : null;
  const posterUrl = getImageUrl(movie.poster_path, "poster", "w185");
  const rating = formatVoteAverage(movie.vote_average);

  // Handle both movie and TV show titles and dates
  const title =
    "title" in movie ? movie.title : "name" in movie ? movie.name : "";
  const releaseDate =
    "release_date" in movie
      ? movie.release_date
      : "first_air_date" in movie
        ? movie.first_air_date
        : null;

  return (
    <section
      className={cn(
        "relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:h-[650px] border-b border-border/30",
        className,
      )}
    >
      {/* Background Image with backdrop fade */}
      <div className="absolute inset-0 w-full h-full">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition: "center 25%" }}
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        {/* Hero backdrop fade - same as detail page */}
        <div className="absolute inset-0 hero-backdrop" />
      </div>

      {/* Content with glassmorphic card */}
      <div className="relative h-full flex items-start sm:items-center py-4 sm:py-8">
        <div className="container mx-auto px-4">
          {/* Glass backdrop container for entire hero */}
          <div className="bg-background/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-border/10 shadow-2xl">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center">
              {/* Poster */}
              <div className="col-span-1 sm:col-span-1 lg:col-span-2">
                <div className="relative aspect-[2/3] w-full">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={title}
                      fill
                      className="object-cover rounded-lg shadow-2xl"
                      sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 300px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground rounded-lg">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Movie Details */}
              <div className="col-span-2 sm:col-span-3 lg:col-span-10 space-y-2 sm:space-y-4 lg:space-y-6 text-foreground relative z-10">
                {/* Title */}
                <div>
                  <h1 className="font-serif text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight drop-shadow-lg">
                    {title}
                  </h1>
                </div>

                {/* Rating and Date */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {movie.vote_average > 0 && (
                    <Badge className="gap-1 text-xs sm:text-sm">
                      <StarFilledIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{rating}</span>
                    </Badge>
                  )}
                  {releaseDate && (
                    <div className="flex items-center gap-1.5 text-foreground/80">
                      <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-medium text-sm sm:text-base md:text-lg drop-shadow-md">
                        {new Date(releaseDate).getFullYear()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Overview */}
                {movie.overview && (
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-foreground/90 max-w-3xl drop-shadow-md line-clamp-3 sm:line-clamp-4">
                    {truncateText(movie.overview, 200)}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
                  <Button asChild size="lg">
                    <Link href={`/${mediaType}/${movie.id}`}>
                      <InfoCircledIcon className="h-4 w-4" />
                      View Details
                    </Link>
                  </Button>

                  <WatchStatusButton
                    tmdb_id={movie.id}
                    media_type={mediaType}
                    title={title}
                    poster_path={movie.poster_path}
                    overview={movie.overview || ""}
                    release_date={releaseDate || ""}
                    vote_average={movie.vote_average}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
