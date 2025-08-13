"use client";

import { useState, useEffect, useCallback } from "react";
import { TVShowProgress, EpisodeProgress } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  CheckIcon,
  CircleIcon,
  PlayIcon,
  ChevronRightIcon,
  ClockIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

interface EpisodeTrackerProps {
  tmdb_id: number;
  seasons: {
    season_number: number;
    episode_count: number;
    name: string;
  }[]; // TMDB season data
}

export function EpisodeTracker({ tmdb_id, seasons }: EpisodeTrackerProps) {
  const [progress, setProgress] = useState<TVShowProgress | null>(null);
  const [episodes, setEpisodes] = useState<EpisodeProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(1);

  const fetchProgress = useCallback(async () => {
    try {
      const response = await fetch(`/api/tv-progress/${tmdb_id}`);
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error("Error fetching TV progress:", error);
    }
  }, [tmdb_id]);

  const fetchEpisodes = useCallback(
    async (season?: number) => {
      try {
        const params = new URLSearchParams({ tmdb_id: tmdb_id.toString() });
        if (season) params.append("season_number", season.toString());

        const response = await fetch(`/api/episodes?${params}`);
        if (response.ok) {
          const data = await response.json();
          setEpisodes(data.episodes);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    },
    [tmdb_id],
  );

  useEffect(() => {
    fetchProgress();
    fetchEpisodes();
  }, [fetchProgress, fetchEpisodes]);

  useEffect(() => {
    fetchEpisodes(selectedSeason);
  }, [selectedSeason, fetchEpisodes]);

  const toggleEpisode = async (
    season_number: number,
    episode_number: number,
    watched: boolean,
  ) => {
    try {
      const response = await fetch("/api/episodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tmdb_id,
          season_number,
          episode_number,
          watched,
        }),
      });

      if (response.ok) {
        await fetchProgress();
        await fetchEpisodes(selectedSeason);
      }
    } catch (error) {
      console.error("Error toggling episode:", error);
    }
  };

  const markSeasonWatched = async (season_number: number, watched: boolean) => {
    const season = seasons.find((s) => s.season_number === season_number);
    if (!season) return;

    try {
      // Create batch of episodes to update
      const episodesToUpdate = [];
      for (let ep = 1; ep <= season.episode_count; ep++) {
        episodesToUpdate.push({
          season_number,
          episode_number: ep,
          watched,
        });
      }

      // Send batch update request
      const response = await fetch("/api/episodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tmdb_id,
          episodes: episodesToUpdate,
        }),
      });

      if (response.ok) {
        // Refresh data after batch update
        await fetchProgress();
        await fetchEpisodes(selectedSeason);
      } else {
        console.error("Batch update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error marking season:", error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Episode Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="bg-muted h-4 rounded w-1/2"></div>
            <div className="bg-muted h-20 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const regularSeasons = seasons.filter((season) => season.season_number > 0);
  const currentSeasonProgress = progress?.seasons.find(
    (s) => s.season_number === selectedSeason,
  );

  return (
    <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-display-sm flex items-center gap-3">
            <ClockIcon className="h-5 w-5" />
            Episode Tracker
            {progress?.next_episode && (
              <Badge variant="secondary" className="gap-1.5">
                <PlayIcon className="h-3 w-3" />
                Next: S{progress.next_episode.season_number}E
                {progress.next_episode.episode_number}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-primary"
          >
            <Link href="/library?tab=watching">
              <BookmarkIcon className="h-4 w-4 mr-1" />
              My Library
            </Link>
          </Button>
        </div>

        {progress && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="text-primary font-semibold">
                {progress.watched_episodes}/{progress.total_episodes} episodes (
                {Math.round(progress.completion_percentage)}%)
              </span>
            </div>
            <div className="h-3 w-full bg-muted/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${progress.completion_percentage}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs
          value={selectedSeason.toString()}
          onValueChange={(value) => setSelectedSeason(parseInt(value))}
        >
          {/* Enhanced Season Selector */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <ChevronRightIcon className="h-4 w-4" />
              Select Season
            </h4>
            <div className="flex flex-wrap gap-2">
              {regularSeasons.map((season) => {
                const seasonProgress = progress?.seasons.find(
                  (s) => s.season_number === season.season_number,
                );
                const isSelected = selectedSeason === season.season_number;
                const completionPercentage =
                  seasonProgress?.completion_percentage || 0;

                return (
                  <button
                    key={season.season_number}
                    onClick={() => setSelectedSeason(season.season_number)}
                    className={`relative group flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[80px] ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-md shadow-primary/20"
                        : "border-border hover:border-primary/50 bg-background hover:bg-primary/5"
                    }`}
                  >
                    <div
                      className={`text-lg font-bold transition-colors ${
                        isSelected
                          ? "text-primary"
                          : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      S{season.season_number}
                    </div>

                    {seasonProgress && (
                      <>
                        <div
                          className={`text-xs font-semibold transition-colors ${
                            isSelected
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {Math.round(completionPercentage)}%
                        </div>

                        {/* Progress Ring */}
                        <div className="relative w-8 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`absolute left-0 top-0 h-full transition-all duration-500 rounded-full ${
                              isSelected
                                ? "bg-primary"
                                : "bg-primary/60 group-hover:bg-primary"
                            }`}
                            style={{ width: `${completionPercentage}%` }}
                          />
                        </div>
                      </>
                    )}

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {regularSeasons.map((season) => (
            <TabsContent
              key={season.season_number}
              value={season.season_number.toString()}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Season {season.season_number}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        markSeasonWatched(season.season_number, true)
                      }
                      className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
                    >
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Mark All Watched
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        markSeasonWatched(season.season_number, false)
                      }
                      className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950"
                    >
                      <CircleIcon className="h-4 w-4 mr-1" />
                      Mark All Unwatched
                    </Button>
                  </div>
                </div>

                {currentSeasonProgress && (
                  <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">
                        Season Progress
                      </span>
                      <span className="text-primary font-semibold">
                        {currentSeasonProgress.watched_episodes}/
                        {currentSeasonProgress.total_episodes} episodes (
                        {Math.round(
                          currentSeasonProgress.completion_percentage,
                        )}
                        %)
                      </span>
                    </div>
                    <div className="h-3 w-full bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{
                          width: `${currentSeasonProgress.completion_percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Episodes ({season.episode_count} total)
                  </h4>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-3">
                    {Array.from({ length: season.episode_count }, (_, i) => {
                      const episode_number = i + 1;
                      const episodeProgress = episodes.find(
                        (ep) =>
                          ep.season_number === season.season_number &&
                          ep.episode_number === episode_number,
                      );
                      const isWatched = episodeProgress?.watched || false;

                      return (
                        <Button
                          key={episode_number}
                          variant={isWatched ? "default" : "outline"}
                          size="sm"
                          className={`relative h-12 w-full p-0 transition-all duration-200 hover:scale-105 ${
                            isWatched
                              ? "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
                              : "border-2 hover:border-primary/60 hover:bg-primary/5"
                          }`}
                          onClick={() =>
                            toggleEpisode(
                              season.season_number,
                              episode_number,
                              !isWatched,
                            )
                          }
                        >
                          <div className="flex flex-col items-center justify-center gap-1">
                            <div
                              className={`transition-all duration-200 ${
                                isWatched ? "scale-110" : "scale-100"
                              }`}
                            >
                              {isWatched ? (
                                <CheckIcon className="h-4 w-4" />
                              ) : (
                                <CircleIcon className="h-3 w-3 opacity-60" />
                              )}
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                isWatched
                                  ? "text-primary-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {episode_number}
                            </span>
                          </div>

                          {/* Watched indicator */}
                          {isWatched && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {season.episode_count > 50 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Click on episode numbers to mark as watched/unwatched
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
