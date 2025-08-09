"use client";

import Image from "next/image";
import Link from "next/link";
import {
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
  FilmIcon,
} from "@heroicons/react/24/outline";
import { usePersonDetails } from "@/lib/hooks/api-hooks";
import { getImageUrl } from "@/lib/api";
import { formatDate, calculateAge, sortBy } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PersonDetailsPageProps {
  personId: number;
}

function PersonDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Skeleton */}
          <div className="space-y-6">
            <Skeleton className="aspect-[2/3] w-full max-w-sm mx-auto" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PersonDetailsPage({ personId }: PersonDetailsPageProps) {
  const { person, isLoading, isError } = usePersonDetails(personId);

  if (isLoading) {
    return <PersonDetailsSkeleton />;
  }

  if (isError || !person) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <UserIcon className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Person Not Found</h1>
          <p className="text-muted-foreground">
            The person you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const profileUrl = getImageUrl(person.profile_path, "profile", "h632");
  const birthDate = formatDate(person.birthday);
  const deathDate = formatDate(person.deathday);
  const age = calculateAge(person.birthday, person.deathday);

  // Sort and organize credits
  const movieCredits =
    person.combined_credits?.cast?.filter(
      (credit) => credit.media_type === "movie",
    ) || [];
  const tvCredits =
    person.combined_credits?.cast?.filter(
      (credit) => credit.media_type === "tv",
    ) || [];

  // Sort by popularity and release date
  const sortedMovieCredits = sortBy(
    movieCredits,
    (credit) => -(credit.popularity || 0),
    (credit) => -(new Date(credit.release_date || "").getTime() || 0),
  );

  const sortedTVCredits = sortBy(
    tvCredits,
    (credit) => -(credit.popularity || 0),
    (credit) => -(new Date(credit.first_air_date || "").getTime() || 0),
  );

  // Get most popular/recent credits for display
  const featuredMovies = sortedMovieCredits.slice(0, 6);
  const featuredTV = sortedTVCredits.slice(0, 6);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="relative aspect-[2/3] w-full max-w-sm mx-auto">
              {profileUrl ? (
                <Image
                  src={profileUrl}
                  alt={person.name}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted rounded-lg">
                  <UserIcon className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {person.known_for_department && (
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Known For
                    </h4>
                    <p className="text-base font-medium">
                      {person.known_for_department}
                    </p>
                  </div>
                )}

                {person.birthday && (
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Born
                    </h4>
                    <div className="text-base font-medium space-y-1">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{birthDate}</span>
                        {age !== null && !person.deathday && (
                          <span className="text-muted-foreground">
                            ({age} years old)
                          </span>
                        )}
                      </div>
                      {person.place_of_birth && (
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{person.place_of_birth}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {person.deathday && (
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Died
                    </h4>
                    <div className="text-base font-medium">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{deathDate}</span>
                        {age !== null && (
                          <span className="text-muted-foreground">
                            (aged {age})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {person.also_known_as && person.also_known_as.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Also Known As
                    </h4>
                    <div className="text-base font-medium space-y-1">
                      {person.also_known_as.slice(0, 3).map((name, index) => (
                        <p key={index}>{name}</p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* External Links */}
            {person.external_ids && (
              <Card>
                <CardHeader>
                  <CardTitle>External Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {person.external_ids.imdb_id && (
                    <a
                      href={`https://www.imdb.com/name/${person.external_ids.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>IMDB</span>
                    </a>
                  )}
                  {person.external_ids.instagram_id && (
                    <a
                      href={`https://www.instagram.com/${person.external_ids.instagram_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {person.external_ids.twitter_id && (
                    <a
                      href={`https://www.twitter.com/${person.external_ids.twitter_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Name and Basic Info */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold">{person.name}</h1>
              {person.known_for_department && (
                <p className="text-xl text-muted-foreground">
                  {person.known_for_department}
                </p>
              )}
            </div>

            {/* Biography */}
            {person.biography && (
              <Card>
                <CardHeader>
                  <CardTitle>Biography</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground/90">
                    {person.biography.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Movie Credits */}
            {featuredMovies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FilmIcon className="h-5 w-5" />
                    <span>Movie Credits</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      ({movieCredits.length} total)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredMovies.map((movie) => (
                      <Link
                        key={`${movie.id}-${movie.credit_id}`}
                        href={`/movie/${movie.id}`}
                        className="flex space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="relative w-12 h-18 flex-shrink-0">
                          {movie.poster_path ? (
                            <Image
                              src={getImageUrl(
                                movie.poster_path,
                                "poster",
                                "w185",
                              )}
                              alt={movie.title || ""}
                              fill
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted rounded">
                              <FilmIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm font-medium line-clamp-1">
                            {movie.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {movie.character && `as ${movie.character}`}
                          </p>
                          {movie.release_date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(movie.release_date).getFullYear()}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  {movieCredits.length > 6 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Showing {featuredMovies.length} of {movieCredits.length}{" "}
                        movie credits
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* TV Credits */}
            {featuredTV.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>TV Credits</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      ({tvCredits.length} total)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredTV.map((show) => (
                      <Link
                        key={`${show.id}-${show.credit_id}`}
                        href={`/tv/${show.id}`}
                        className="flex space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="relative w-12 h-18 flex-shrink-0">
                          {show.poster_path ? (
                            <Image
                              src={getImageUrl(
                                show.poster_path,
                                "poster",
                                "w185",
                              )}
                              alt={show.name || ""}
                              fill
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted rounded">
                              <svg
                                className="h-4 w-4 text-muted-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm font-medium line-clamp-1">
                            {show.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {show.character && `as ${show.character}`}
                          </p>
                          {show.first_air_date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(show.first_air_date).getFullYear()}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  {tvCredits.length > 6 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Showing {featuredTV.length} of {tvCredits.length} TV
                        credits
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
