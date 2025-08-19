"use client";

import Image from "next/image";
import {
  Calendar,
  Clock,
  Play,
  Film as FilmIcon,
  MonitorPlay as TvIcon,
  Star,
} from "lucide-react";
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
  // Use highest quality backdrop for CSS background
  const backdropUrl = getImageUrl(item.backdrop_path, "backdrop", "original");
  // Use higher quality poster for larger display
  const posterUrl = getImageUrl(item.poster_path, "poster", "w500");
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
      {/* Fixed Backdrop Background */}
      {backdropUrl && (
        <>
          <div
            className="backdrop-container"
            style={{
              backgroundImage: `url(${backdropUrl})`,
            }}
            role="img"
            aria-label={`${title} backdrop`}
          />
          <div className="backdrop-overlay" />
        </>
      )}

      {/* Hero Section */}
      <div className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="glass-strong rounded-lg p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <div className="space-y-0">
                  {/* Poster Image */}
                  <div className="relative w-56 md:w-64 lg:w-72 aspect-[2/3] mx-auto md:mx-0 max-h-[600px]">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={title}
                        fill
                        className={`object-cover shadow-xl ${
                          watchProviders?.flatrate?.length
                            ? "rounded-t-lg rounded-b-none"
                            : "rounded-lg"
                        }`}
                        sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                        priority
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-muted shadow-xl ${
                          watchProviders?.flatrate?.length
                            ? "rounded-t-lg rounded-b-none"
                            : "rounded-lg"
                        }`}
                      >
                        {mediaType === "movie" ? (
                          <FilmIcon className="h-24 w-24 text-muted-foreground" />
                        ) : (
                          <TvIcon className="h-24 w-24 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Watch Now Footer - Seamlessly attached */}
                  {watchProviders?.flatrate?.length && (
                    <div className="w-56 md:w-64 lg:w-72 mx-auto md:mx-0">
                      <div
                        className="rounded-b-lg rounded-t-none p-3 shadow-xl border-t-0"
                        style={{
                          background: "hsl(var(--glass-bg))",
                          backdropFilter: "blur(16px) saturate(180%)",
                          border: "1px solid hsl(var(--glass-border))",
                          borderTop: "none",
                          boxShadow:
                            "0 8px 32px hsl(var(--glass-shadow)), inset 0 1px 0 hsl(var(--glass-border))",
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-center space-y-0.5">
                            <div className="text-[10px] text-muted-foreground leading-tight">
                              Now Streaming
                            </div>
                            <div className="text-xs font-medium leading-tight">
                              Watch On
                            </div>
                          </div>
                          <WatchProvidersCompact providers={watchProviders} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Title and Content */}
              <div className="flex-1 space-y-6">
                {/* Primary Information */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-noir-heading leading-tight">
                      {title}
                    </h1>
                    {((isMovieDetails(item) && item.tagline) ||
                      (isTVShowDetails(item) && item.tagline)) && (
                      <p className="text-xl md:text-2xl text-elegant text-muted-foreground italic mt-3">
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
                        <Star className="h-3 w-3 fill-current" />
                        <span>{rating}</span>
                      </Badge>
                    )}

                    {usCertification && <Badge>{usCertification}</Badge>}

                    <div className="flex flex-wrap items-center gap-3">
                      {releaseDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
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
                          <Clock className="h-4 w-4" />
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
                    <p className="text-lg md:text-xl leading-relaxed max-w-4xl text-body">
                      {item.overview}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {trailer && (
                    <Button size="lg" asChild>
                      <a
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="h-5 w-5" />
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

                {/* Additional Info */}
                {((isMovieDetails(item) && item.external_ids?.imdb_id) ||
                  (isTVShowDetails(item) && item.external_ids?.imdb_id) ||
                  (isMovieDetails(item) && item.homepage) ||
                  (isTVShowDetails(item) && item.homepage)) && (
                  <div className="pt-4 border-t">
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
