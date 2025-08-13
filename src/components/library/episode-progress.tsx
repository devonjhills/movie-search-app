"use client";

import { TVShowProgress } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayIcon, CheckIcon, ClockIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface EpisodeProgressProps {
  progress: TVShowProgress;
  tmdbId: number;
  onEpisodeUpdate?: () => void;
}

export function EpisodeProgress({
  progress,
  tmdbId,
  onEpisodeUpdate,
}: EpisodeProgressProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const markNextEpisodeWatched = async () => {
    if (!progress.next_episode || isUpdating) return;

    setIsUpdating(true);
    try {
      const response = await fetch("/api/episodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tmdb_id: tmdbId,
          season_number: progress.next_episode.season_number,
          episode_number: progress.next_episode.episode_number,
          watched: true,
        }),
      });

      if (response.ok && onEpisodeUpdate) {
        onEpisodeUpdate();
      }
    } catch (error) {
      console.error("Error marking episode watched:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!progress) {
    return null;
  }

  const completionPercentage = Math.round(progress.completion_percentage);

  return (
    <div className="space-y-2 mt-2">
      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>
            {progress.watched_episodes}/{progress.total_episodes} episodes
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Current Status and Action */}
      <div className="space-y-2">
        {progress.next_episode ? (
          <>
            <Badge variant="outline" className="gap-1 text-xs w-fit">
              <ClockIcon className="h-3 w-3" />
              Next: S{progress.next_episode.season_number}E
              {progress.next_episode.episode_number}
            </Badge>
            {/* Quick Action Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={markNextEpisodeWatched}
              disabled={isUpdating}
              className="w-full h-7 text-xs border-primary/60 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {isUpdating ? (
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <>
                  <PlayIcon className="h-3 w-3 mr-1" />
                  Mark Watched
                </>
              )}
            </Button>
          </>
        ) : (
          <Badge
            variant="default"
            className="gap-1 text-xs w-fit bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            <CheckIcon className="h-3 w-3" />
            Complete
          </Badge>
        )}
      </div>

      {/* Season Progress Summary (for shows with multiple seasons) */}
      {progress.total_seasons > 1 && (
        <div className="text-xs text-muted-foreground">
          {
            progress.seasons.filter((s) => s.completion_percentage === 100)
              .length
          }
          /{progress.total_seasons} seasons complete
        </div>
      )}
    </div>
  );
}
