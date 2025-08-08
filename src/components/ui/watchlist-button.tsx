"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { useWatchlist } from "@/lib/hooks/use-watchlist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Movie, TVShow } from "@/lib/types";

interface WatchlistButtonProps {
  item: Movie | TVShow | any;
  mediaType: "movie" | "tv";
  className?: string;
  variant?: "default" | "hero";
}

export function WatchlistButton({
  item,
  mediaType,
  className,
  variant = "default",
}: WatchlistButtonProps) {
  const { user } = useAuth();
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const [isLoading, setIsLoading] = useState(false);

  const inWatchlist = isInWatchlist(item.id, mediaType);
  const title = mediaType === "movie" ? item.title : item.name;
  const releaseDate =
    mediaType === "movie" ? item.release_date : item.first_air_date;

  const handleClick = async () => {
    if (inWatchlist) return;

    setIsLoading(true);
    try {
      await addToWatchlist({
        tmdb_id: item.id,
        media_type: mediaType,
        title,
        poster_path: item.poster_path,
        overview: item.overview || "",
        release_date: releaseDate || "",
        vote_average: item.vote_average || 0,
      });
    } catch (error) {
      console.error("Watchlist error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isHero = variant === "hero";
  const buttonSize = isHero ? "lg" : "sm";
  const buttonClass = isHero ? className : cn("px-2", className);

  if (!user) {
    return (
      <Button
        as={Link}
        href="/auth/signin"
        variant="secondary"
        size={buttonSize}
        className={cn(buttonClass, "border border-primary/50")}
        title="Add to watchlist"
      >
        <BookmarkIcon className="h-5 w-5" />
        <span>Add to Watchlist</span>
      </Button>
    );
  }

  if (inWatchlist) {
    return (
      <Button
        as={Link}
        href="/watchlist"
        variant={isHero ? "secondary" : "primary"}
        size={buttonSize}
        className={cn(buttonClass, "border border-primary/50")}
        title={isHero ? undefined : "View Watchlist"}
      >
        <BookmarkSolidIcon
          className="h-5 w-5"
          style={{ color: "hsl(var(--rating-gold))" }}
        />
        <span>View Watchlist</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="secondary"
      size={buttonSize}
      className={cn(buttonClass, "border border-border/50")}
      title={isHero ? undefined : "Add to Watchlist"}
    >
      <BookmarkIcon className="h-5 w-5" />
      <span>{isLoading ? "Loading..." : "Add to Watchlist"}</span>
    </Button>
  );
}
