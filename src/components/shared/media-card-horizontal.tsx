import Image from "next/image";
import Link from "next/link";
import { Film } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
}

interface MediaCardHorizontalProps {
  item: MediaItem;
  mediaType: "movie" | "tv";
  className?: string;
  character?: string;
  showCard?: boolean;
}

export function MediaCardHorizontal({
  item,
  mediaType,
  className,
  character,
  showCard = true,
}: MediaCardHorizontalProps) {
  const imageUrl = getImageUrl(item.poster_path || null, "poster", "w154");
  const title = item.title || item.name || "";
  const releaseDate = item.release_date || item.first_air_date;

  const content = (
    <>
      {/* Poster - Larger for better visibility */}
      <div className="relative w-20 h-28 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted rounded-md">
            <Film className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content - More spacious layout */}
      <div className="flex-1 space-y-3 min-w-0 flex flex-col justify-center px-2">
        <div className="space-y-2">
          <h4
            className={cn(
              "card-title text-base leading-tight line-clamp-2",
              showCard ? "hover:text-primary" : "group-hover:text-primary",
              "transition-colors duration-200",
            )}
          >
            {title}
          </h4>

          {character && (
            <p className="text-sm text-muted-foreground line-clamp-1 text-body">
              <span className="text-accent font-medium">as</span> {character}
            </p>
          )}
        </div>

        {releaseDate && (
          <p className="text-sm text-muted-foreground text-body">
            {new Date(releaseDate).getFullYear()}
          </p>
        )}
      </div>
    </>
  );

  if (showCard) {
    return (
      <Link href={`/${mediaType}/${item.id}`} className={className}>
        <Card
          className={cn(
            "flex space-x-5 p-5 glass overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01] group",
            "min-h-[140px] w-full",
          )}
        >
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Link
      href={`/${mediaType}/${item.id}`}
      className={cn(
        "group flex space-x-5 p-5 rounded-lg hover:bg-muted/50 transition-all duration-300",
        "min-h-[140px] items-center w-full",
        className,
      )}
    >
      {content}
    </Link>
  );
}
