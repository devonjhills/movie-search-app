"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { useWatchlist } from "@/lib/hooks/use-watchlist";
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
    // If already in watchlist, don't do anything (will be handled by Link)
    if (inWatchlist) {
      return;
    }

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
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    if (variant === "hero") {
      return (
        <Link
          href="/auth/signin"
          className={cn(
            "inline-flex items-center space-x-2 px-6 py-3",
            "bg-secondary text-secondary-foreground border border-border",
            "hover:bg-secondary/80 hover:shadow-md transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "rounded-lg cursor-pointer",
            className,
          )}
        >
          <BookmarkIcon className="h-5 w-5" />
          <span>Sign In to Add to Watchlist</span>
        </Link>
      );
    }

    return (
      <Link
        href="/auth/signin"
        className={cn(
          "inline-flex items-center justify-center p-2",
          "bg-secondary text-secondary-foreground border border-border",
          "hover:bg-secondary/80 hover:shadow-md transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          "rounded-lg cursor-pointer",
          className,
        )}
        title="Sign in to add to watchlist"
      >
        <BookmarkIcon className="h-5 w-5" />
      </Link>
    );
  }

  if (variant === "hero") {
    if (inWatchlist) {
      return (
        <Link
          href="/watchlist"
          className={cn(
            "inline-flex items-center space-x-2 px-6 py-3",
            "bg-primary text-primary-foreground border border-primary",
            "hover:bg-primary/90 hover:shadow-md transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "rounded-lg cursor-pointer",
            className,
          )}
        >
          <BookmarkSolidIcon className="h-5 w-5" />
          <span>View Watchlist</span>
        </Link>
      );
    }

    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          "inline-flex items-center space-x-2 px-6 py-3",
          "bg-secondary text-secondary-foreground border border-border",
          "hover:bg-secondary/80 hover:shadow-md transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "rounded-lg cursor-pointer",
          className,
        )}
      >
        <BookmarkIcon className="h-5 w-5" />
        <span>{isLoading ? "Loading..." : "Add to Watchlist"}</span>
      </button>
    );
  }

  if (inWatchlist) {
    return (
      <Link
        href="/watchlist"
        className={cn(
          "inline-flex items-center justify-center p-2",
          "bg-primary text-primary-foreground border border-primary",
          "hover:bg-primary/90 hover:shadow-md transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          "rounded-lg cursor-pointer",
          className,
        )}
        title="View Watchlist"
      >
        <BookmarkSolidIcon className="h-5 w-5 text-yellow-400" />
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center justify-center p-2",
        "bg-secondary text-secondary-foreground border border-border",
        "hover:bg-secondary/80 hover:shadow-md transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "rounded-lg cursor-pointer",
        className,
      )}
      title="Add to Watchlist"
    >
      <BookmarkIcon className="h-5 w-5" />
    </button>
  );
}
