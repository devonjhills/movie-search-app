"use client";

import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  PlayIcon,
  ReaderIcon as FilmIcon,
  VideoIcon as TvIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/api";
import { WatchStatusButton } from "@/components/ui/watch-status-button";
import { ShareButton } from "@/components/ui/share-button";
import { Button } from "@/components/ui/button";
import { WatchProvidersCompact } from "@/components/ui/watch-providers";
import { ExternalLinks } from "@/components/ui/external-links";
import {
  formatDate,
  formatRuntime,
  formatVoteAverage,
  getUSCertification,
} from "@/lib/utils";
import type {
  WatchProviderRegion,
  MovieDetailsOrTVShowDetails,
} from "@/lib/types";
import { isMovieDetails, isTVShowDetails } from "@/lib/types";

interface DetailsHeroProps {
  item: MovieDetailsOrTVShowDetails;
  mediaType: "movie" | "tv";
  trailer?: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  };
  watchProviders?: WatchProviderRegion;
}

export function DetailsHero({
  item,
  mediaType,
  trailer,
  watchProviders,
}: DetailsHeroProps) {
  const backdropUrl = getImageUrl(item.backdrop_path, "backdrop", "w1280");
  const posterUrl = getImageUrl(item.poster_path, "poster", "w342");
  const rating = formatVoteAverage(item.vote_average);
  const releaseDate = formatDate(
    isMovieDetails(item) ? item.release_date : item.first_air_date
  );
  const runtime = isMovieDetails(item) ? formatRuntime(item.runtime) : null;
  const title = isMovieDetails(item) ? item.title : item.name;

  // Get US MPAA rating for movies
  const usCertification = isMovieDetails(item)
    ? getUSCertification(item.release_dates)
    : null;

  // External links - raw date for ExternalLinks component
  const rawReleaseDate = isMovieDetails(item)
    ? item.release_date
    : item.first_air_date;

  return (
    <>
      {/* Single Extended Backdrop Background - positioned absolutely to start right after header */}
      <div className="fixed top-16 left-0 right-0 h-screen overflow-hidden z-0">
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
        <div className="absolute inset-0 hero-backdrop" />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-[400px] sm:min-h-[450px] lg:h-[500px] mt-10 mb-8 z-10">
        {/* Hero Content */}
        <div className="relative h-full flex items-start sm:items-center py-4 sm:py-6 lg:py-0">
          <div className="container mx-auto px-4">
            {/* Glass backdrop container for entire hero */}
            <div className="bg-background/80 rounded-xl p-4 sm:p-6 md:p-8 border-2 border-border/40 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center">
                {/* Poster */}
                <div className="sm:col-span-2 lg:col-span-3">
                  <div className="relative aspect-[2/3] w-full max-w-48 sm:max-w-44 lg:max-w-xs mx-auto lg:ml-4">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-lg shadow-xl"
                        sizes="(max-width: 768px) 300px, 400px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted rounded-lg">
                        {mediaType === "movie" ? (
                          <FilmIcon className="h-16 w-16 text-muted-foreground" />
                        ) : (
                          <TvIcon className="h-16 w-16 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and Content */}
                <div className="sm:col-span-6 lg:col-span-9 space-y-3 sm:space-y-4 lg:space-y-6 text-foreground relative z-10">
                  {/* Section 1: Primary Information */}
                  <div className="space-y-4">
                    <div>
                      <h1 className="font-serif text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-foreground drop-shadow-2xl text-glow">
                        {title}
                      </h1>
                      {((isMovieDetails(item) && item.tagline) ||
                        (isTVShowDetails(item) && item.tagline)) && (
                        <p className="text-sm sm:text-sm md:text-base lg:text-lg italic text-muted-foreground drop-shadow-md">
                          &ldquo;
                          {isMovieDetails(item)
                            ? item.tagline
                            : isTVShowDetails(item)
                            ? item.tagline
                            : ""}
                          &rdquo;
                        </p>
                      )}
                    </div>

                    {/* Core Metadata Row */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2 lg:gap-3 text-xs sm:text-xs md:text-sm">
                      {item.vote_average > 0 && (
                        <Badge className="gap-1 font-bold">
                          <StarFilledIcon className="h-3 w-3" />
                          <span>{rating}</span>
                        </Badge>
                      )}

                      {usCertification && (
                        <Badge className="font-bold">
                          {usCertification}
                        </Badge>
                      )}

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-foreground/90">
                        {releaseDate && (
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon className="h-4 w-4 text-primary/80" />
                            <span className="font-semibold text-sm sm:text-base">
                              {new Date(
                                isMovieDetails(item)
                                  ? item.release_date
                                  : item.first_air_date
                              ).getFullYear()}
                            </span>
                          </div>
                        )}

                        {runtime && (
                          <div className="flex items-center gap-1.5">
                            <ClockIcon className="h-4 w-4 text-primary/80" />
                            <span className="font-semibold text-sm sm:text-base">
                              {runtime}
                            </span>
                          </div>
                        )}

                        {isTVShowDetails(item) && item.number_of_seasons && (
                          <span className="font-medium text-sm sm:text-base">
                            {item.number_of_seasons} Season
                            {item.number_of_seasons !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Secondary Information */}
                  <div className="space-y-4">
                    {/* Genres */}
                    {((isMovieDetails(item) && item.genres) ||
                      (isTVShowDetails(item) && item.genres)) &&
                      (isMovieDetails(item)
                        ? item.genres
                        : isTVShowDetails(item)
                        ? item.genres
                        : []
                      ).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {(isMovieDetails(item)
                            ? item.genres
                            : isTVShowDetails(item)
                            ? item.genres
                            : []
                          ).map((genre: { id: number; name: string }) => (
                            <Badge key={genre.id}>
                              {genre.name}
                            </Badge>
                          ))}
                        </div>
                      )}

                    {/* Overview */}
                    {item.overview && (
                      <p className="text-sm sm:text-sm md:text-base lg:text-lg leading-relaxed text-foreground/90 max-w-4xl drop-shadow-md">
                        {item.overview}
                      </p>
                    )}
                  </div>

                  {/* Section 3: Primary Actions */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-2 lg:gap-3">
                    {trailer && (
                      <Button asChild variant="default" size="lg">
                        <a
                          href={`https://www.youtube.com/watch?v=${trailer.key}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <PlayIcon className="h-4 w-4" />
                          Watch Trailer
                        </a>
                      </Button>
                    )}

                    <WatchStatusButton
                      tmdb_id={item.id}
                      media_type={mediaType}
                      title={title}
                      poster_path={item.poster_path}
                      overview={item.overview}
                      release_date={rawReleaseDate}
                      vote_average={item.vote_average}
                      size="lg"
                    />

                    <ShareButton
                      title={`${title} - ${
                        mediaType === "movie" ? "Movie" : "TV Show"
                      } Details`}
                      text={`Check out "${title}" on this ${
                        mediaType === "movie" ? "movie" : "TV show"
                      } app!`}
                    />
                  </div>

                  {/* Section 4: Secondary Actions & Discovery */}
                  {(watchProviders?.flatrate?.length ||
                    (isMovieDetails(item) && item.external_ids?.imdb_id) ||
                    (isTVShowDetails(item) && item.external_ids?.imdb_id) ||
                    (isMovieDetails(item) && item.homepage) ||
                    (isTVShowDetails(item) && item.homepage)) && (
                    <div className="pt-3 sm:pt-4 border-t border-border/50">
                      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-6">
                        {/* External Links - Left Side */}
                        <ExternalLinks
                          externalIds={
                            isMovieDetails(item)
                              ? item.external_ids
                              : isTVShowDetails(item)
                              ? item.external_ids
                              : undefined
                          }
                          homepage={
                            isMovieDetails(item)
                              ? item.homepage
                              : isTVShowDetails(item)
                              ? item.homepage
                              : undefined
                          }
                          title={title}
                          releaseDate={rawReleaseDate}
                        />

                        {/* Streaming Providers - Right Side */}
                        {watchProviders?.flatrate?.length && (
                          <div className="inline-flex items-center gap-3 text-foreground">
                            <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
                              Watch now
                            </span>
                            <WatchProvidersCompact providers={watchProviders} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
