"use client";

import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  PlayIcon,
  FilmIcon,
  TvIcon,
  GlobeAltIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { getImageUrl } from "@/lib/api";
import { WatchlistButton } from "@/components/ui/watchlist-button";
import { ShareButton } from "@/components/ui/share-button";
import { Button } from "@/components/ui/button";
import { WatchProvidersCompact } from "@/components/ui/watch-providers";
import {
  formatDate,
  formatRuntime,
  formatVoteAverage,
  getRottenTomatoesSearchUrl,
  formatYear,
  getUSCertification,
} from "@/lib/utils";
import type { WatchProviderRegion } from "@/lib/types";

interface DetailsHeroProps {
  item: any; // Movie or TV Show
  mediaType: "movie" | "tv";
  trailer?: any;
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
    mediaType === "movie" ? item.release_date : item.first_air_date,
  );
  const runtime = mediaType === "movie" ? formatRuntime(item.runtime) : null;
  const title = mediaType === "movie" ? item.title : item.name;

  // Get US MPAA rating for movies
  const usCertification =
    mediaType === "movie" ? getUSCertification(item.release_dates) : null;

  // External links
  const year = formatYear(
    mediaType === "movie" ? item.release_date : item.first_air_date,
  );
  const rottenTomatoesUrl = getRottenTomatoesSearchUrl(title, year);

  const externalLinks = [
    {
      name: "IMDb",
      url: item.external_ids?.imdb_id
        ? `https://www.imdb.com/title/${item.external_ids.imdb_id}`
        : null,
      icon: LinkIcon,
      className: "text-amber-500 hover:text-amber-400",
    },
    {
      name: "Official Website",
      url: item.homepage,
      icon: GlobeAltIcon,
      className: "text-blue-500 hover:text-blue-400",
    },
    {
      name: "Rotten Tomatoes",
      url: rottenTomatoesUrl,
      icon: LinkIcon,
      className: "text-red-500 hover:text-red-400",
    },
  ].filter((link) => link.url);

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
      <div className="relative h-96 md:h-[500px] mt-16 z-10">
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            {/* Glass backdrop container for entire hero */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-border/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Poster */}
                <div className="md:col-span-3">
                  <div className="relative aspect-[2/3] w-full max-w-xs mx-auto md:ml-4">
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
                <div className="md:col-span-9 space-y-8 text-foreground relative z-10">
                  {/* Section 1: Primary Information */}
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground drop-shadow-2xl">
                        {title}
                      </h1>
                      {item.tagline && (
                        <p className="text-lg italic text-muted-foreground drop-shadow-md">
                          "{item.tagline}"
                        </p>
                      )}
                    </div>

                    {/* Core Metadata Row */}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      {item.vote_average > 0 && (
                        <div className="rating-badge">
                          <StarSolidIcon className="h-4 w-4" />
                          <span>{rating}</span>
                        </div>
                      )}

                      {usCertification && (
                        <div className="px-2 py-1 rounded text-xs font-semibold bg-accent text-accent-foreground border">
                          {usCertification}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                        {releaseDate && (
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {new Date(
                                mediaType === "movie"
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

                        {mediaType === "tv" && item.number_of_seasons && (
                          <span>
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
                    {item.genres && item.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.genres.map((genre: any) => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium shadow-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Overview */}
                    {item.overview && (
                      <p className="text-lg leading-relaxed text-foreground/90 max-w-4xl drop-shadow-md">
                        {item.overview}
                      </p>
                    )}
                  </div>

                  {/* Section 3: Primary Actions */}
                  <div className="flex flex-wrap gap-3">
                    {trailer && (
                      <a
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200"
                      >
                        <PlayIcon className="h-5 w-5" />
                        <span>Watch Trailer</span>
                      </a>
                    )}

                    <WatchlistButton
                      item={item}
                      mediaType={mediaType}
                      variant="hero"
                    />

                    <ShareButton
                      title={`${title} - ${mediaType === "movie" ? "Movie" : "TV Show"} Details`}
                      text={`Check out "${title}" on this ${mediaType === "movie" ? "movie" : "TV show"} app!`}
                      variant="hero"
                    />
                  </div>

                  {/* Section 4: Secondary Actions & Discovery */}
                  {(watchProviders?.flatrate?.length ||
                    externalLinks.length > 0) && (
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex flex-wrap items-center justify-between gap-6">
                        {/* External Links - Left Side */}
                        {externalLinks.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {externalLinks.map((link) => {
                              const IconComponent = link.icon;
                              return (
                                <Button
                                  key={link.name}
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className={link.className}
                                >
                                  <a
                                    href={link.url!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2"
                                  >
                                    <IconComponent className="h-4 w-4" />
                                    <span>{link.name}</span>
                                  </a>
                                </Button>
                              );
                            })}
                          </div>
                        )}

                        {/* Streaming Providers - Right Side */}
                        {watchProviders?.flatrate?.length && (
                          <div className="inline-flex items-center gap-3 text-foreground">
                            <span className="text-base font-semibold whitespace-nowrap">
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
