import Image from "next/image";
import Link from "next/link";
import { VideoIcon } from "@radix-ui/react-icons";
import { getImageUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { TVShow } from "@/lib/types";

interface TVCardHorizontalProps {
  tvShow: TVShow;
  className?: string;
  character?: string;
}

export function TVCardHorizontal({
  tvShow,
  className,
  character,
}: TVCardHorizontalProps) {
  const imageUrl = getImageUrl(tvShow.poster_path, "poster", "w92");

  return (
    <Link
      href={`/tv/${tvShow.id}`}
      className={cn(
        "group flex space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors",
        className,
      )}
    >
      {/* Poster */}
      <div className="relative w-12 h-18 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={tvShow.name || ""}
            fill
            className="object-cover rounded"
            sizes="48px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted rounded">
            <VideoIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 min-w-0">
        <h4 className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
          {tvShow.name}
        </h4>
        {character && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            as {character}
          </p>
        )}
        {tvShow.first_air_date && (
          <p className="text-xs text-muted-foreground">
            {new Date(tvShow.first_air_date).getFullYear()}
          </p>
        )}
      </div>
    </Link>
  );
}
