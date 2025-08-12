"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  VideoIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useTVSeasonDetails, useTVDetails } from "@/lib/hooks/api-hooks";
import { getImageUrl } from "@/lib/api";
import { PersonCard } from "@/components/ui/person-card";
import { formatDate, formatVoteAverage, formatRuntime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface TVSeasonDetailsPageProps {
  tvId: number;
  seasonNumber: number;
}

function SeasonDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <div className="relative bg-muted p-8">
        <div className="container mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <Skeleton className="aspect-[2/3] w-full max-w-xs" />
            </div>
            <div className="md:col-span-9 space-y-4">
              <Skeleton className="h-12 w-96" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-20 w-full max-w-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Season Overview Card */}
        <div className="bg-background/80 backdrop-blur-sm border border-border/20 rounded-lg shadow-2xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Episodes List Card */}
        <div className="bg-background/80 backdrop-blur-sm border border-border/20 rounded-lg shadow-2xl p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 border border-border/20 rounded-lg"
                >
                  <Skeleton className="aspect-video w-32 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-48" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-12 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cast Section Card */}
        <div className="bg-background/80 backdrop-blur-sm border border-border/20 rounded-lg shadow-2xl p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-3 rounded-lg"
                >
                  <Skeleton className="h-20 w-20 rounded-full flex-shrink-0" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TVSeasonDetailsPage({
  tvId,
  seasonNumber,
}: TVSeasonDetailsPageProps) {
  const { season, isLoading, isError } = useTVSeasonDetails(tvId, seasonNumber);
  const { tvShow } = useTVDetails(tvId);

  if (isLoading) {
    return <SeasonDetailsSkeleton />;
  }

  if (isError || !season) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <VideoIcon className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Season Not Found</h1>
          <p className="text-muted-foreground">
            The season you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href={`/tv/${tvId}`}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to TV Show
          </Link>
        </div>
      </div>
    );
  }

  const rating = formatVoteAverage(season.vote_average);
  const airDate = formatDate(season.air_date);

  // Get season cast with episode counts
  const seasonCast = season.credits?.cast || [];
  const seasonCrew = season.credits?.crew || [];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-border">
        <div className="container mx-auto px-12 py-4">
          <div className="flex items-start gap-6">
            {/* Season Poster */}
            <div className="relative aspect-[2/3] w-28 flex-shrink-0">
              {season.poster_path ? (
                <Image
                  src={getImageUrl(season.poster_path, "poster", "w185")}
                  alt={season.name}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="112px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted rounded-lg">
                  <VideoIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Season Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold leading-tight mb-3">
                  {season.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  {season.vote_average > 0 && (
                    <div className="flex items-center gap-1">
                      <StarFilledIcon className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{rating}</span>
                    </div>
                  )}
                  {airDate && (
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{airDate}</span>
                    </div>
                  )}
                  {season.episodes && season.episodes.length > 0 && (
                    <span>
                      {season.episodes.length} episode
                      {season.episodes.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              {season.overview && (
                <p className="text-base leading-relaxed text-foreground/90 max-w-3xl">
                  {season.overview}
                </p>
              )}

              <Button
                variant="outline"
                size="sm"
                asChild
                className="mt-4 -ml-2"
              >
                <Link
                  href={`/tv/${tvId}`}
                  className="inline-flex items-center gap-2"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Back to {tvShow?.name || "TV Show"}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Aligned with header */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Episodes */}
        {season.episodes && season.episodes.length > 0 && (
          <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
            <CardHeader>
              <CardTitle>Episodes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {season.episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="flex space-x-4 p-5 rounded-xl bg-gradient-to-r from-background to-muted/30 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  >
                    {/* Episode Still */}
                    <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted shadow-md">
                      {episode.still_path ? (
                        <Image
                          src={getImageUrl(
                            episode.still_path,
                            "backdrop",
                            "w300",
                          )}
                          alt={episode.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <PlayIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 space-y-3 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {episode.episode_number}. {episode.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {episode.air_date && formatDate(episode.air_date)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-shrink-0">
                          {episode.vote_average > 0 && (
                            <div className="flex items-center gap-1">
                              <StarFilledIcon className="h-3 w-3 text-yellow-500" />
                              <span>
                                {formatVoteAverage(episode.vote_average)}
                              </span>
                            </div>
                          )}
                          {episode.runtime > 0 && (
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              <span>{formatRuntime(episode.runtime)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {episode.overview && (
                        <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
                          {episode.overview}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Season Cast */}
        {seasonCast.length > 0 && (
          <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
            <CardHeader>
              <CardTitle>Season Cast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {seasonCast.slice(0, 8).map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    role={person.character}
                    mediaType="tv"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Season Crew */}
        {seasonCrew.length > 0 && (
          <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
            <CardHeader>
              <CardTitle>Season Crew</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {seasonCrew.slice(0, 8).map((person) => (
                  <PersonCard
                    key={`${person.id}-${person.job}`}
                    person={person}
                    role={person.job}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
