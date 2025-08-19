import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatVoteAverage } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { RESPONSIVE_SIZES } from "@/lib/constants";

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
  // Responsive image optimization
  const getResponsiveImageUrl = (size: "mobile" | "tablet" | "desktop") => {
    const sizeKey = RESPONSIVE_SIZES.card[
      size
    ] as keyof typeof import("@/lib/constants").IMAGE_URLS.poster;
    return getImageUrl(item.poster_path || null, "poster", sizeKey);
  };

  const imageUrl = getResponsiveImageUrl("tablet");
  const rating = formatVoteAverage(item.vote_average);
  const title = item.title || item.name || "";
  const releaseDate = item.release_date || item.first_air_date;

  const sizeClasses = {
    sm: "w-[160px]",
    md: "w-[185px]",
    lg: "w-[210px]",
  };

  const cardHeights = {
    sm: "h-[340px]", // 160*1.5 + 100px for content = 340px
    md: "h-[378px]", // 185*1.5 + 100px for content = 378px
    lg: "h-[415px]", // 210*1.5 + 100px for content = 415px
  };

  return (
    <Card
      className={cn(
        sizeClasses[size],
        cardHeights[size],
        "flex flex-col noir-card overflow-hidden group",
        className,
      )}
    >
      <CardContent className="p-0 flex flex-col h-full">
        {/* Poster Image - Takes up poster space only */}
        <div className="relative">
          <Link href={`/${mediaType}/${item.id}`} className="block">
            <div className="relative aspect-[2/3] overflow-hidden cursor-pointer w-full">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={RESPONSIVE_SIZES.card.sizes}
                  priority={priority}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  <span className="text-xs text-center p-2 text-body">
                    No Image
                  </span>
                </div>
              )}

              {/* Rating Badge */}
              {showRating && item.vote_average > 0 && (
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="secondary"
                    className="gap-1 glass-subtle text-xs"
                  >
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-readable">{rating}</span>
                  </Badge>
                </div>
              )}

              {/* Enhanced noir gradient overlay with atmospheric lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Subtle rim lighting effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </Link>
        </div>

        {/* Text Content Area - Fixed 100px height */}
        <div className="h-[100px] p-4 flex flex-col justify-between">
          {/* Top section - Title */}
          <div>
            <h3 className="text-noir-subheading text-base leading-tight line-clamp-2 mb-2">
              {title}
            </h3>
          </div>

          {/* Bottom section - Year with guaranteed space */}
          <div className="mt-auto">
            {showYear && releaseDate && (
              <p className="text-sm text-muted-foreground text-body">
                {new Date(releaseDate).getFullYear()}
              </p>
            )}

            {showOverview && item.overview && (
              <p className="text-xs text-muted-foreground line-clamp-1 text-body mt-1">
                {item.overview.length > 60
                  ? item.overview.substring(0, 60) + "..."
                  : item.overview}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
