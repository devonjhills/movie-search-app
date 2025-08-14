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
      <div className="bg-gradient-to-br from-muted/50 to-background/95 backdrop-blur-sm border border-border rounded-xl p-12 text-center shadow-sm">
        <div className="max-w-md mx-auto space-y-6">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <PlayIcon className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-semibold">Start Your Viewing Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              Begin tracking your movie and TV show progress. Add items to your library and mark them as "Currently Watching" to see them here.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" asChild className="bg-primary/95 backdrop-blur-sm hover:bg-primary">
              <a href="/discover">Discover Movies & Shows</a>
            </Button>
            <Button variant="outline" onClick={onRefresh} className="bg-background/90 backdrop-blur-sm border-border/70 hover:bg-background">
              Refresh Library
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border/50 shadow-sm">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-primary" />
              Currently Watching
            </h2>
          </div>
          <Badge variant="secondary" className="px-3 py-1 bg-secondary/90 backdrop-blur-sm border border-border/30">
            {watchingItems.length}{" "}
            {watchingItems.length === 1 ? "item" : "items"}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="bg-background/90 backdrop-blur-sm border-border/70 hover:bg-background"
        >
          Refresh
        </Button>
      </div>

      {/* TV Shows with Episode Progress */}
      {tvShows.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="bg-background/85 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border/40 shadow-sm">
              <h3 className="text-lg font-serif font-semibold flex items-center gap-2">
                TV Shows
                <Badge variant="outline" className="text-xs bg-background/90 backdrop-blur-sm border-border/50">
                  {tvShows.length}
                </Badge>
              </h3>
            </div>
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
          <div className="bg-background/85 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border/40 shadow-sm inline-block">
            <h3 className="text-lg font-serif font-semibold flex items-center gap-2">
              Movies
              <Badge variant="outline" className="text-xs bg-background/90 backdrop-blur-sm border-border/50">
                {movies.length}
              </Badge>
            </h3>
          </div>
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
      <div className="bg-muted/60 backdrop-blur-sm rounded-lg p-6 border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium">Quick Tip:</span>
            <div className="flex items-center gap-2">
              <PlayIcon className="h-4 w-4 text-primary" />
              <span>Click "Mark Watched" to quickly update episode progress</span>
            </div>
          </div>
          <Button variant="default" size="sm" asChild className="bg-primary/95 backdrop-blur-sm hover:bg-primary">
            <Link href="/library?tab=all">View All Library Items</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
