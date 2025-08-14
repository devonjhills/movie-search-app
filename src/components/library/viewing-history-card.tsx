"use client";

import { useState } from "react";
import { ViewingHistoryItem } from "@/lib/types";
import { getImageUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star, MoreVertical, RotateCcw, StickyNote, Edit3 } from "lucide-react";
import { StatusUpdateDialog } from "./status-update-dialog";
import { EpisodeProgress } from "./episode-progress";
import Link from "next/link";
import Image from "next/image";

interface ViewingHistoryCardProps {
  item: ViewingHistoryItem;
  onUpdate: () => void;
}

const statusColors = {
  watching: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  plan_to_watch:
    "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const statusLabels = {
  watching: "Currently Watching",
  completed: "Watched",
  plan_to_watch: "Want to Watch",
};

export function ViewingHistoryCard({
  item,
  onUpdate,
}: ViewingHistoryCardProps) {
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  const getValidImageUrl = (posterPath: string | null): string | null => {
    if (!posterPath || posterPath.trim() === "") return null;
    const imageUrl = getImageUrl(posterPath, "poster", "w185");
    return imageUrl && imageUrl.trim() !== "" ? imageUrl : null;
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(
        `/api/viewing-history?tmdb_id=${item.tmdb_id}&media_type=${item.media_type}`,
        { method: "DELETE" },
      );

      if (!response.ok) throw new Error("Failed to remove item");
      onUpdate();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <>
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 border-border hover:border-border overflow-hidden bg-card/95 backdrop-blur-sm">
        <div className="flex gap-4 p-4">
          {/* Poster - Smaller, Fixed Size */}
          <div className="relative flex-shrink-0">
            <div className="relative w-16 sm:w-20 aspect-[2/3] overflow-hidden rounded-md">
              <Link
                href={`/${item.media_type}/${item.tmdb_id}`}
                className="block w-full h-full relative"
              >
                {(() => {
                  const validImageUrl = getValidImageUrl(item.poster_path);
                  return validImageUrl ? (
                    <Image
                      src={validImageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-medium text-center">
                        No Image
                      </span>
                    </div>
                  );
                })()}
              </Link>
            </div>
          </div>

          {/* Content - Takes up remaining space */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <Link
                  href={`/${item.media_type}/${item.tmdb_id}`}
                  className="block hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground capitalize font-medium">
                    {item.media_type}
                  </span>
                  <Badge
                    className={`${statusColors[item.status]} text-xs px-1.5 py-0.5 font-medium`}
                  >
                    {statusLabels[item.status]}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-6 w-6 p-0 shadow-sm backdrop-blur-sm bg-background/95 hover:bg-background"
                  onClick={() => setShowStatusDialog(true)}
                  title="Update status, rating & notes"
                >
                  <Edit3 className="h-2.5 w-2.5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-6 w-6 p-0 shadow-sm backdrop-blur-sm bg-background/95 hover:bg-background"
                    >
                      <MoreVertical className="h-2.5 w-2.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleRemove}
                      className="text-destructive"
                    >
                      Remove from Library
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Ratings and Metadata Row */}
            <div className="flex items-center flex-wrap gap-2">
              {item.rating && (
                <div className="flex items-center gap-1" title="Your rating">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">
                    {item.rating}/10
                  </span>
                </div>
              )}
              {item.vote_average && (
                <div
                  className="flex items-center gap-1 text-muted-foreground/70"
                  title="TMDB score"
                >
                  <span className="text-xs font-medium">TMDB</span>
                  <span className="text-xs">
                    {Math.round(item.vote_average * 10) / 10}
                  </span>
                </div>
              )}
              {item.watch_count > 1 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <RotateCcw className="h-3 w-3" />
                  <span className="font-medium">{item.watch_count}x</span>
                </div>
              )}
            </div>

            {/* Episode Progress for TV Shows */}
            {item.media_type === "tv" && item.episode_progress && (
              <EpisodeProgress
                progress={item.episode_progress}
                tmdbId={item.tmdb_id}
                onEpisodeUpdate={onUpdate}
              />
            )}

            {/* Notes Section */}
            {item.notes && (
              <div className="border-t border-border/30 pt-2">
                <div className="flex items-start gap-2 text-xs text-muted-foreground p-2 bg-muted/40 backdrop-blur-sm rounded-md">
                  <StickyNote className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary/70" />
                  <span className="line-clamp-2 leading-relaxed">
                    {item.notes}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <StatusUpdateDialog
        item={item}
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
        onUpdate={() => {
          onUpdate();
          setShowStatusDialog(false);
        }}
      />
    </>
  );
}
