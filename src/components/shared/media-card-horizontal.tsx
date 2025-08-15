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
  const imageUrl = getImageUrl(item.poster_path || null, "poster", "w92");
  const title = item.title || item.name || "";
  const releaseDate = item.release_date || item.first_air_date;

  const content = (
    <>
      {/* Poster */}
      <div className="relative w-12 h-18 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded"
            sizes="48px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted rounded">
            <Film className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 min-w-0">
        <h4
          className={cn(
            "text-sm font-medium truncate",
            showCard ? "hover:text-primary" : "group-hover:text-primary",
          )}
        >
          {title}
        </h4>
        {character && (
          <p className="text-xs text-muted-foreground truncate">
            as {character}
          </p>
        )}
        {releaseDate && (
          <p className="text-xs text-muted-foreground">
            {new Date(releaseDate).getFullYear()}
          </p>
        )}
      </div>
    </>
  );

  if (showCard) {
    return (
      <Link href={`/${mediaType}/${item.id}`} className={className}>
        <Card className="flex space-x-3 p-3">{content}</Card>
      </Link>
    );
  }

  return (
    <Link
      href={`/${mediaType}/${item.id}`}
      className={cn(
        "group flex space-x-3 p-3 rounded-lg hover:bg-muted transition-colors",
        className,
      )}
    >
      {content}
    </Link>
  );
}
