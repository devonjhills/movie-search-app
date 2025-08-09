"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useWatchlist } from "@/lib/hooks/use-watchlist";
import { Button } from "@/components/ui/button";
import type { Movie, TVShow } from "@/lib/types";

interface WatchlistButtonProps {
  item: Movie | TVShow;
  mediaType: "movie" | "tv";
  variant?: "default" | "hero";
}

export function WatchlistButton({
  item,
  mediaType,
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

  if (!user) {
    return (
      <Link href="/auth/signin">
        <Button variant="outline" size="lg" title="Add to watchlist">
          <BookmarkIcon className="h-4 w-4" />
          Add to Watchlist
        </Button>
      </Link>
    );
  }

  if (inWatchlist) {
    return (
      <Link href="/watchlist">
        <Button
          variant="secondary"
          size="lg"
          title={isHero ? undefined : "View Watchlist"}
        >
          <BookmarkFilledIcon className="h-4 w-4" />
          View Watchlist
        </Button>
      </Link>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="outline"
      size="lg"
      title={isHero ? undefined : "Add to Watchlist"}
    >
      <BookmarkIcon className="h-4 w-4" />
      {isLoading ? "Loading..." : "Add to Watchlist"}
    </Button>
  );
}
