"use client";

import { useState, useEffect, useCallback } from "react";
import { TVShowProgress, EpisodeProgress } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, CircleIcon, PlayIcon } from "@radix-ui/react-icons";

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
      for (let ep = 1; ep <= season.episode_count; ep++) {
        await toggleEpisode(season_number, ep, watched);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Episode Tracker
          {progress?.next_episode && (
            <Badge variant="outline" className="gap-1">
              <PlayIcon className="h-3 w-3" />
              Next: S{progress.next_episode.season_number}E
              {progress.next_episode.episode_number}
            </Badge>
          )}
        </CardTitle>

        {progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>
                {progress.watched_episodes}/{progress.total_episodes} episodes
              </span>
            </div>
            <Progress value={progress.completion_percentage} className="h-2" />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs
          value={selectedSeason.toString()}
          onValueChange={(value) => setSelectedSeason(parseInt(value))}
        >
          <TabsList className="grid grid-cols-4 lg:grid-cols-6">
            {regularSeasons.slice(0, 6).map((season) => {
              const seasonProgress = progress?.seasons.find(
                (s) => s.season_number === season.season_number,
              );
              return (
                <TabsTrigger
                  key={season.season_number}
                  value={season.season_number.toString()}
                >
                  <div className="flex flex-col items-center">
                    <span>S{season.season_number}</span>
                    {seasonProgress && (
                      <span className="text-xs text-muted-foreground">
                        {Math.round(seasonProgress.completion_percentage)}%
                      </span>
                    )}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {regularSeasons.map((season) => (
            <TabsContent
              key={season.season_number}
              value={season.season_number.toString()}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Season {season.season_number}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        markSeasonWatched(season.season_number, true)
                      }
                    >
                      Mark All Watched
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        markSeasonWatched(season.season_number, false)
                      }
                    >
                      Mark All Unwatched
                    </Button>
                  </div>
                </div>

                {currentSeasonProgress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Season Progress</span>
                      <span>
                        {currentSeasonProgress.watched_episodes}/
                        {currentSeasonProgress.total_episodes} episodes
                      </span>
                    </div>
                    <Progress
                      value={currentSeasonProgress.completion_percentage}
                      className="h-2"
                    />
                  </div>
                )}

                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
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
                        className="h-10 w-full p-0"
                        onClick={() =>
                          toggleEpisode(
                            season.season_number,
                            episode_number,
                            !isWatched,
                          )
                        }
                      >
                        <div className="flex flex-col items-center">
                          {isWatched ? (
                            <CheckIcon className="h-4 w-4" />
                          ) : (
                            <CircleIcon className="h-4 w-4" />
                          )}
                          <span className="text-xs">{episode_number}</span>
                        </div>
                      </Button>
                    );
                  })}
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
