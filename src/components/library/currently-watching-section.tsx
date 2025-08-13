"use client";

import { ViewingHistoryItem } from "@/lib/types";
import { ViewingHistoryCard } from "./viewing-history-card";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CurrentlyWatchingSectionProps {
  items: ViewingHistoryItem[];
  loading: boolean;
  onRefresh: () => void;
}

export function CurrentlyWatchingSection({
  items,
  loading,
  onRefresh,
}: CurrentlyWatchingSectionProps) {
  const watchingItems = items.filter((item) => item.status === "watching");
  const tvShows = watchingItems.filter((item) => item.media_type === "tv");
  const movies = watchingItems.filter((item) => item.media_type === "movie");

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-serif font-semibold flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />
            Currently Watching
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-[2/3] mb-2"></div>
                <div className="space-y-1">
                  <div className="bg-muted h-3 rounded w-3/4"></div>
                  <div className="bg-muted h-2 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (watchingItems.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <PlayIcon className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">No shows in progress</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start watching movies and TV shows to track your progress here.
          </p>
        </div>
        <Button variant="default" onClick={onRefresh}>
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
            <ClockIcon className="h-6 w-6" />
            Currently Watching
          </h2>
          <Badge className="text-sm">
            {watchingItems.length}{" "}
            {watchingItems.length === 1 ? "item" : "items"}
          </Badge>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={onRefresh}
          className="text-muted-foreground hover:text-primary"
        >
          Refresh
        </Button>
      </div>

      {/* TV Shows with Episode Progress */}
      {tvShows.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-semibold flex items-center gap-2">
              TV Shows
              <Badge className="text-xs">
                {tvShows.length}
              </Badge>
            </h3>
            {tvShows.some((show) => show.episode_progress?.next_episode) && (
              <div className="text-sm text-muted-foreground">
                Click &quot;Mark Watched&quot; to quickly update progress
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {tvShows.map((item) => (
              <ViewingHistoryCard
                key={item.id}
                item={item}
                onUpdate={onRefresh}
              />
            ))}
          </div>
        </div>
      )}

      {/* Movies */}
      {movies.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-semibold flex items-center gap-2">
            Movies
            <Badge className="text-xs">
              {movies.length}
            </Badge>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((item) => (
              <ViewingHistoryCard
                key={item.id}
                item={item}
                onUpdate={onRefresh}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions Footer */}
      <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Quick actions:</span>
          <div className="flex items-center gap-2">
            <PlayIcon className="h-3 w-3" />
            <span>Mark next episode watched</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm" asChild>
            <Link href="/library?status=all">View All Library Items</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
