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
import { WatchStatusButton } from "@/components/shared/watch-status-button";
import { ShareButton } from "@/components/ui/share-button";
import { Button } from "@/components/ui/button";
import { WatchProvidersCompact } from "@/components/shared/watch-providers";
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
    isMovieDetails(item) ? item.release_date : item.first_air_date,
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
      {/* Backdrop Background */}
      <div className="absolute inset-0 -z-10">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/30" />
      </div>

      {/* Hero Section */}
      <div className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="bg-card/95 rounded-lg p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Poster */}
              <div className="md:col-span-1">
                <div className="relative aspect-[2/3] w-48 mx-auto">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="200px"
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
              <div className="md:col-span-3 space-y-4">
                {/* Primary Information */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold leading-tight">
                      {title}
                    </h1>
                    {((isMovieDetails(item) && item.tagline) ||
                      (isTVShowDetails(item) && item.tagline)) && (
                      <p className="text-lg italic text-muted-foreground">
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

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2">
                    {item.vote_average > 0 && (
                      <Badge variant="secondary" className="gap-1">
                        <StarFilledIcon className="h-3 w-3" />
                        <span>{rating}</span>
                      </Badge>
                    )}

                    {usCertification && <Badge>{usCertification}</Badge>}

                    <div className="flex flex-wrap items-center gap-3">
                      {releaseDate && (
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {new Date(
                              isMovieDetails(item)
                                ? item.release_date
                                : item.first_air_date,
                            ).getFullYear()}
                          </span>
                        </div>
                      )}

                      {runtime && (
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{runtime}</span>
                        </div>
                      )}

                      {isTVShowDetails(item) && item.number_of_seasons && (
                        <span>
                          {item.number_of_seasons} Season
                          {item.number_of_seasons !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Genres and Overview */}
                <div className="space-y-4">
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
                          <Badge key={genre.id} variant="outline">
                            {genre.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                  {item.overview && (
                    <p className="text-base leading-relaxed max-w-2xl">
                      {item.overview}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {trailer && (
                    <Button asChild>
                      <a
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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

                {/* Additional Info */}
                {(watchProviders?.flatrate?.length ||
                  (isMovieDetails(item) && item.external_ids?.imdb_id) ||
                  (isTVShowDetails(item) && item.external_ids?.imdb_id) ||
                  (isMovieDetails(item) && item.homepage) ||
                  (isTVShowDetails(item) && item.homepage)) && (
                  <div className="pt-4 border-t">
                    <div className="flex flex-col gap-4">
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

                      {watchProviders?.flatrate?.length && (
                        <div className="flex items-center gap-3">
                          <span className="font-medium">Watch now</span>
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
    </>
  );
}
