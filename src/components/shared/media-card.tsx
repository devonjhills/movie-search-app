import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatVoteAverage } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average: number;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
}

interface MediaCardProps {
  item: MediaItem;
  mediaType: "movie" | "tv";
  className?: string;
  size?: "sm" | "md" | "lg";
  showYear?: boolean;
  showRating?: boolean;
  showOverview?: boolean;
  priority?: boolean;
}

export function MediaCard({
  item,
  mediaType,
  className,
  size = "md",
  showYear = true,
  showRating = true,
  showOverview = false,
  priority = false,
}: MediaCardProps) {
  const imageUrl = getImageUrl(item.poster_path || null, "poster", "w185");
  const rating = formatVoteAverage(item.vote_average);
  const title = item.title || item.name || "";
  const releaseDate = item.release_date || item.first_air_date;

  const sizeClasses = {
    sm: "w-full",
    md: "w-full",
    lg: "w-full",
  };

  return (
    <Card className={cn(sizeClasses[size], "h-full flex flex-col", className)}>
      <CardContent className="p-2 space-y-2 flex-1 flex flex-col">
        {/* Poster Image - Clickable */}
        <Link href={`/${mediaType}/${item.id}`}>
          <div className="relative aspect-[2/3] overflow-hidden rounded cursor-pointer">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <span className="text-xs text-center p-2">No Image</span>
              </div>
            )}

            {/* Rating Badge */}
            {showRating && item.vote_average > 0 && (
              <div className="absolute top-2 right-2">
                <Badge className="gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{rating}</span>
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Media Info - Not Clickable */}
        <div className="space-y-1 flex-1 flex flex-col">
          <h3 className="text-sm font-medium leading-tight line-clamp-2">
            {title}
          </h3>

          {showYear && releaseDate && (
            <p className="text-xs text-muted-foreground">
              {new Date(releaseDate).getFullYear()}
            </p>
          )}

          {showOverview && item.overview && (
            <p className="text-xs text-muted-foreground line-clamp-3">
              {item.overview.length > 120
                ? item.overview.substring(0, 120) + "..."
                : item.overview}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
