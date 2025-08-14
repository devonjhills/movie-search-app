"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  StarFilledIcon,
  CalendarIcon,
  InfoCircledIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { cn, formatVoteAverage } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Movie, FormattedMovie, TVShow } from "@/lib/types";

interface RotatingHeroSectionProps {
  items: (Movie | FormattedMovie | TVShow)[];
  className?: string;
  mediaType?: "movie" | "tv";
  autoRotate?: boolean;
  rotateInterval?: number;
}

export function RotatingHeroSection({
  items,
  className,
  mediaType = "movie",
  autoRotate = true,
  rotateInterval = 8000,
}: RotatingHeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Remove duplicates and show up to 5 unique featured items
  const featuredItems = items
    .filter(
      (item, index, arr) => arr.findIndex((i) => i.id === item.id) === index,
    )
    .slice(0, 5);
  const currentItem = featuredItems[currentIndex];

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      const newIndex = (currentIndex + 1) % featuredItems.length;
      setCurrentIndex(newIndex);

      // Reset transition state after animation completes
      setTimeout(() => setIsTransitioning(false), 400);
    });
  }, [isTransitioning, currentIndex, featuredItems.length]);

  useEffect(() => {
    if (!autoRotate || featuredItems.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [
    currentIndex,
    autoRotate,
    rotateInterval,
    featuredItems.length,
    handleNext,
  ]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    requestAnimationFrame(() => {
      const newIndex =
        (currentIndex - 1 + featuredItems.length) % featuredItems.length;
      setCurrentIndex(newIndex);

      setTimeout(() => setIsTransitioning(false), 400);
    });
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);

    requestAnimationFrame(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 400);
    });
  };

  if (!currentItem) return null;

  const rating = formatVoteAverage(currentItem.vote_average);

  // Handle both movie and TV show release dates
  const releaseDate =
    "release_date" in currentItem
      ? currentItem.release_date
      : "first_air_date" in currentItem
        ? currentItem.first_air_date
        : null;

  return (
    <section
      className={cn(
        "relative overflow-hidden h-[450px] sm:h-[500px] md:h-[550px] border-b border-border/30 smoke-effect",
        className,
      )}
    >
      {/* Background Images with smooth crossfade */}
      <div className="absolute inset-0 w-full h-full">
        {featuredItems.map((item, index) => {
          const backdropUrl = item.backdrop_path
            ? getImageUrl(item.backdrop_path, "backdrop", "w1280")
            : item.poster_path
              ? getImageUrl(item.poster_path, "poster", "w780")
              : null;

          const itemTitle =
            "title" in item ? item.title : "name" in item ? item.name : "";

          return backdropUrl ? (
            <Image
              key={`backdrop-${index}`}
              src={backdropUrl}
              alt={itemTitle}
              fill
              className={cn(
                "object-cover transition-opacity duration-700 ease-out",
                index === currentIndex ? "opacity-100" : "opacity-0",
              )}
              style={{ objectPosition: "center 25%" }}
              priority={index === 0}
              sizes="100vw"
            />
          ) : (
            <div
              key={`gradient-${index}`}
              className={cn(
                "h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 transition-opacity duration-700 ease-out",
                index === currentIndex ? "opacity-100" : "opacity-0",
              )}
            />
          );
        })}

        {/* Enhanced hero backdrop */}
        <div className="absolute inset-0 hero-backdrop" />
      </div>

      {/* Navigation Controls */}
      {featuredItems.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-md hover:bg-background/90 border border-border/40 shadow-lg transition-all duration-200"
            onClick={handlePrevious}
            disabled={isTransitioning}
          >
            <ChevronLeftIcon className="h-6 w-6 text-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-md hover:bg-background/90 border border-border/40 shadow-lg transition-all duration-200"
            onClick={handleNext}
            disabled={isTransitioning}
          >
            <ChevronRightIcon className="h-6 w-6 text-foreground" />
          </Button>
        </>
      )}

      {/* Content */}
      <div className="relative h-full flex items-start sm:items-center py-6 sm:py-8 justify-center">
        <div className="px-4 w-full max-w-7xl">
          {/* Glass backdrop container */}
          <div className="bg-background/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-border/10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center">
              {/* Poster */}
              <div className="col-span-1 sm:col-span-1 lg:col-span-2">
                <div className="relative aspect-[2/3] w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] overflow-hidden rounded-lg">
                  {featuredItems.map((item, index) => {
                    const itemPosterUrl = getImageUrl(
                      item.poster_path,
                      "poster",
                      "w185",
                    );
                    const itemTitle =
                      "title" in item
                        ? item.title
                        : "name" in item
                          ? item.name
                          : "";

                    return (
                      <div
                        key={`poster-${index}`}
                        className={cn(
                          "absolute inset-0 transition-all duration-500 ease-out",
                          index === currentIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105",
                        )}
                      >
                        {itemPosterUrl ? (
                          <Image
                            src={itemPosterUrl}
                            alt={itemTitle}
                            fill
                            className="object-cover shadow-2xl"
                            sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 300px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                            <span className="text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Content Details */}
              <div className="col-span-2 sm:col-span-3 lg:col-span-10 space-y-3 sm:space-y-4 text-foreground relative z-10">
                {/* Title */}
                <div className="relative min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[6rem] mb-4">
                  {featuredItems.map((item, index) => {
                    const itemTitle =
                      "title" in item
                        ? item.title
                        : "name" in item
                          ? item.name
                          : "";

                    return (
                      <h1
                        key={`title-${index}`}
                        className={cn(
                          "absolute top-0 left-0 right-0 font-serif text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-normal drop-shadow-lg text-glow transition-all duration-500 ease-out whitespace-nowrap overflow-hidden text-ellipsis py-1",
                          index === currentIndex
                            ? "opacity-100 transform-none"
                            : "opacity-0 translate-y-4",
                        )}
                      >
                        {itemTitle}
                      </h1>
                    );
                  })}
                </div>

                {/* Rating and Date */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {currentItem.vote_average > 0 && (
                    <Badge
                      variant="accent"
                      className="gap-1 text-xs sm:text-sm"
                    >
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
                {currentItem.overview && (
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-foreground/90 w-full drop-shadow-md line-clamp-3">
                    {currentItem.overview}
                  </p>
                )}

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                  <Button asChild size="lg">
                    <Link href={`/${mediaType}/${currentItem.id}`}>
                      <InfoCircledIcon className="h-4 w-4" />
                      View Details
                    </Link>
                  </Button>

                  <Button variant="outline" size="lg">
                    <PlayIcon className="h-4 w-4" />
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator - Fixed position to avoid overlap */}
      {featuredItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 border border-border/20">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-foreground/40 hover:bg-foreground/60",
              )}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}
    </section>
  );
}
