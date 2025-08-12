import Image from "next/image";
import Link from "next/link";
import {
  StarFilledIcon,
  CalendarIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { cn, formatVoteAverage, truncateText } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { WatchlistButton } from "@/components/ui/watchlist-button";
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
        "relative overflow-hidden h-[550px] md:h-[650px] border-b border-border/30",
        className,
      )}
    >
      {/* Background Image with backdrop fade */}
      <div className="absolute inset-0">
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
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          {/* Glass backdrop container for entire hero */}
          <div className="bg-background/20 backdrop-blur-sm rounded-xl p-8 border border-border/10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Poster */}
              <div className="md:col-span-3 lg:col-span-2">
                <div className="relative aspect-[2/3] w-full max-w-xs mx-auto">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={title}
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
                  <h1 className="text-display-xl drop-shadow-lg">{title}</h1>
                </div>

                {/* Rating and Date */}
                <div className="flex items-center gap-4">
                  {movie.vote_average > 0 && (
                    <Badge className="gap-1">
                      <StarFilledIcon className="h-4 w-4" />
                      <span>{rating}</span>
                    </Badge>
                  )}
                  {releaseDate && (
                    <div className="flex items-center space-x-2 text-foreground/80">
                      <CalendarIcon className="h-5 w-5" />
                      <span className="card-title-lg drop-shadow-md">
                        {new Date(releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Overview */}
                {movie.overview && (
                  <p className="text-display-sm leading-relaxed text-foreground/90 max-w-3xl drop-shadow-md">
                    {truncateText(movie.overview, 300)}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild size="lg">
                    <Link href={`/${mediaType}/${movie.id}`}>
                      <InfoCircledIcon className="h-4 w-4" />
                      View Details
                    </Link>
                  </Button>

                  <WatchlistButton
                    item={movie as Movie | TVShow}
                    mediaType={mediaType}
                    variant="hero"
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
