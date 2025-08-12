"use client";

import Link from "next/link";
import Image from "next/image";
import { useWatchlist } from "@/lib/hooks/use-watchlist";
import { getImageUrl } from "@/lib/api";
import { formatDate, formatVoteAverage } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import type { WatchlistItem } from "@/lib/types";

interface WatchlistGridProps {
  items: WatchlistItem[];
  size?: "sm" | "md" | "lg";
}

export function WatchlistGrid({ items, size = "md" }: WatchlistGridProps) {
  const { removeFromWatchlist } = useWatchlist();

  const gridClasses = {
    sm: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3",
    md: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
    lg: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6",
  };

  const cardSizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };

  const handleRemove = async (item: WatchlistItem) => {
    try {
      await removeFromWatchlist(item.tmdb_id, item.media_type);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <div className={gridClasses[size]}>
      {items.map((item) => {
        const posterUrl = getImageUrl(item.poster_path, "poster", "w342");
        const rating = formatVoteAverage(item.vote_average);
        const date = formatDate(item.release_date);
        const href =
          item.media_type === "movie"
            ? `/movie/${item.tmdb_id}`
            : `/tv/${item.tmdb_id}`;

        return (
          <div
            key={`${item.media_type}-${item.tmdb_id}`}
            className="group relative"
          >
            <Link href={href} className="block">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <span className="text-xs">No Image</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Rating */}
                {item.vote_average > 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="text-xs gap-1">
                      <StarFilledIcon className="h-3 w-3" />
                      <span>{rating}</span>
                    </Badge>
                  </div>
                )}

                {/* Media type badge */}
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium uppercase">
                  {item.media_type}
                </div>
              </div>
            </Link>

            {/* Remove button */}
            <button
              onClick={() => handleRemove(item)}
              className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-destructive/90"
              title="Remove from watchlist"
            >
              <TrashIcon className="h-4 w-4" />
            </button>

            {/* Info */}
            <div className="mt-2 space-y-1">
              <Link href={href}>
                <h3
                  className={`font-medium line-clamp-2 hover:text-primary transition-colors ${cardSizeClasses[size]}`}
                >
                  {item.title}
                </h3>
              </Link>
              {date && size !== "sm" && (
                <p className="text-xs text-muted-foreground">{date}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
