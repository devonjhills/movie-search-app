"use client";

import { WatchStatus } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ViewingHistoryFiltersProps {
  filters: {
    status: WatchStatus | "all";
    mediaType: "movie" | "tv" | "all";
  };
  onFiltersChange: (filters: {
    status: WatchStatus | "all";
    mediaType: "movie" | "tv" | "all";
  }) => void;
}

const statusOptions = [
  { value: "plan_to_watch", label: "Want to Watch" },
  { value: "watching", label: "Currently Watching" },
  { value: "completed", label: "Watched" },
  { value: "all", label: "All Statuses" },
] as const;

const mediaTypeOptions = [
  { value: "all", label: "All Types" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
] as const;

export function ViewingHistoryFilters({
  filters,
  onFiltersChange,
}: ViewingHistoryFiltersProps) {
  const handleClearFilters = () => {
    onFiltersChange({
      status: "all",
      mediaType: "all",
    });
  };

  const hasActiveFilters =
    filters.status !== "all" || filters.mediaType !== "all";

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Filter by:</span>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              status: value as WatchStatus | "all",
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.mediaType}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              mediaType: value as "movie" | "tv" | "all",
            })
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {mediaTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="text-xs"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
