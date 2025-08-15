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
      <div className="space-y-2 mt-2">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Progress</span>
            <span>
              {progress.watched_episodes}/{progress.total_episodes}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Current Status and Action */}
        {progress.next_episode ? (
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="text-xs">
              Next: S{progress.next_episode.season_number}E
              {progress.next_episode.episode_number}
            </Badge>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={markNextEpisodeWatched}
                  disabled={isUpdating}
                  className="h-6 w-6 p-0"
                >
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
          <Badge variant="default" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <CheckIcon className="h-3 w-3 mr-1" />
            Complete
          </Badge>
        )}

        {/* Season Progress Summary */}
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
    </TooltipProvider>
  );
}
