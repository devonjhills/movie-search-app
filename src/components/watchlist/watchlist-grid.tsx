"use client";

import Link from "next/link";
import Image from "next/image";
import { useWatchlist } from "@/lib/hooks/use-watchlist";
import { getImageUrl } from "@/lib/api";
import { formatDate, formatVoteAverage } from "@/lib/utils";
import { StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import type { WatchlistItem } from "@/lib/types";

interface WatchlistGridProps {
  items: WatchlistItem[];
}

export function WatchlistGrid({ items }: WatchlistGridProps) {
  const { removeFromWatchlist } = useWatchlist();

  const handleRemove = async (item: WatchlistItem) => {
    try {
      await removeFromWatchlist(item.tmdb_id, item.media_type);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
                  <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    <StarSolidIcon className="h-3 w-3 text-yellow-400" />
                    <span>{rating}</span>
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
                <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </Link>
              {date && <p className="text-xs text-muted-foreground">{date}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
