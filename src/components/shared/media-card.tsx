import Link from "next/link";
import { Star } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { InViewAnimation } from "@/components/ui/progressive-loader";
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
  priority = false,
}: MediaCardProps) {
  // Optimized image sizes for performance
  const imageUrl = getImageUrl(item.poster_path || null, "poster", "w185");
  const rating = formatVoteAverage(item.vote_average);
  const title = item.title || item.name || "";
  const releaseDate = item.release_date || item.first_air_date;

  // Film noir inspired sizing - prioritize poster visibility
  const sizeClasses = {
    sm: "w-[160px]",
    md: "w-[180px]",
    lg: "w-[200px]",
  };

  // Compact cards with minimal text footprint
  const cardHeights = {
    sm: "h-[280px]", // 160*1.5 + 40px compact text = 280px
    md: "h-[310px]", // 180*1.5 + 40px compact text = 310px
    lg: "h-[340px]", // 200*1.5 + 40px compact text = 340px
  };

  return (
    <InViewAnimation
      animation="fadeUp"
      delay={priority ? 0 : 100}
      className="w-full"
      startVisible={priority}
    >
      <div className={cn(sizeClasses[size], "group cursor-pointer")}>
        <Link href={`/${mediaType}/${item.id}`} className="block">
          <div
            className={cn(
              cardHeights[size],
              "relative overflow-hidden transition-all duration-500 ease-out",
              "hover:scale-[1.03] hover:z-10",
              className,
            )}
          >
            <div className="p-0 h-full relative">
              {/* Main Poster Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
                {imageUrl ? (
                  <OptimizedImage
                    src={imageUrl}
                    alt={title}
                    fill
                    aspectRatio="poster"
                    className="object-cover transition-all duration-500 group-hover:brightness-110"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                    priority={priority}
                    quality={90}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black/20 border border-border/50 rounded-lg">
                    <span className="text-xs text-muted-foreground p-2 text-center">
                      No Image
                    </span>
                  </div>
                )}

                {/* Film Noir Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Rating Badge */}
                {showRating && item.vote_average > 0 && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 border border-border shadow-lg">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-xs font-medium text-foreground">
                          {rating}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Compact Text Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3">
                  <h3 className="font-serif font-semibold text-white text-base leading-tight line-clamp-2 mb-1 drop-shadow-lg">
                    {title}
                  </h3>
                  {showYear && releaseDate && (
                    <p className="text-xs text-white/80 font-medium tracking-wider">
                      {new Date(releaseDate).getFullYear()}
                    </p>
                  )}
                </div>

                {/* Subtle Border Glow on Hover */}
                <div className="absolute inset-0 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Noir Light Reflection */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </InViewAnimation>
  );
}
