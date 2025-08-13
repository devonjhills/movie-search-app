"use client";

import { TVShowProgress } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon } from "@radix-ui/react-icons";
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
    <TooltipProvider>
      <div className="space-y-1.5 mt-2">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-foreground">
              {progress.watched_episodes}/{progress.total_episodes}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Current Status and Action on Same Line */}
        {progress.next_episode ? (
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="secondary"
              className="gap-1 text-xs flex-shrink-0 font-medium">
              Next: S{progress.next_episode.season_number}E
              {progress.next_episode.episode_number}
            </Badge>

            {/* Icon-based Mark Watched Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={markNextEpisodeWatched}
                  disabled={isUpdating}
                  className="h-6 w-6 p-0 border-primary/40 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  {isUpdating ? (
                    <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                  ) : (
                    <CheckIcon className="h-3 w-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Mark S{progress.next_episode.season_number}E
                {progress.next_episode.episode_number} as watched
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <Badge
            variant="default"
            className="gap-1 text-xs w-fit bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20">
            <CheckIcon className="h-3 w-3" />
            Complete
          </Badge>
        )}

        {/* Season Progress Summary (for shows with multiple seasons) */}
        {progress.total_seasons > 1 && (
          <div className="text-xs text-foreground/70 font-medium">
            {
              progress.seasons.filter((s) => s.completion_percentage === 100)
                .length
            }
            /{progress.total_seasons} seasons complete
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
