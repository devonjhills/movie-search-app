"use client";

import { useState } from "react";
import { ViewingHistoryItem } from "@/lib/types";
import { getImageUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star, MoreVertical, RotateCcw, StickyNote, Edit3 } from "lucide-react";
import { StatusUpdateDialog } from "./status-update-dialog";
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
      <Card className="group hover:shadow-md transition-shadow">
        <div className="relative">
          <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
            <Link
              href={`/${item.media_type}/${item.tmdb_id}`}
              className="block w-full h-full"
            >
              {(() => {
                const validImageUrl = getValidImageUrl(item.poster_path);
                return validImageUrl ? (
                  <Image
                    src={validImageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      No Image
                    </span>
                  </div>
                );
              })()}
            </Link>

            <div className="absolute top-1 left-1">
              <Badge
                className={`${statusColors[item.status]} text-xs px-1 py-0.5`}
              >
                {statusLabels[item.status]}
              </Badge>
            </div>

            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowStatusDialog(true)}
                  title="Update status, rating & notes"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <MoreVertical className="h-3 w-3" />
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
          </div>
        </div>

        <CardContent className="p-3">
          <Link
            href={`/${item.media_type}/${item.tmdb_id}`}
            className="block hover:text-primary transition-colors"
          >
            <h3 className="font-medium text-sm line-clamp-2 mb-1">
              {item.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span className="capitalize">{item.media_type}</span>
            <div className="flex items-center gap-2">
              {item.rating && (
                <div className="flex items-center gap-0.5" title="Your rating">
                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{item.rating}/10</span>
                </div>
              )}
              {item.vote_average && (
                <div
                  className="flex items-center gap-0.5 text-muted-foreground/60"
                  title="TMDB score"
                >
                  <span className="text-xs">TMDB:</span>
                  <span>{Math.round(item.vote_average * 10) / 10}</span>
                </div>
              )}
            </div>
          </div>

          {item.watch_count > 1 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <RotateCcw className="h-2.5 w-2.5" />
              <span>{item.watch_count}x</span>
            </div>
          )}

          {item.notes && (
            <div className="mt-2">
              <hr className="border-muted mb-2" />
              <div className="flex items-start gap-1 text-xs text-muted-foreground p-2 bg-muted/30 rounded">
                <StickyNote className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-3 text-xs leading-relaxed">
                  {item.notes}
                </span>
              </div>
            </div>
          )}
        </CardContent>
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
