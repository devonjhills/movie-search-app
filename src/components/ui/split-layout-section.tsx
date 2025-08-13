import Image from "next/image";
import Link from "next/link";
import { StarFilledIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { cn, formatVoteAverage } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { WatchStatusButton } from "@/components/ui/watch-status-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Movie, TVShow } from "@/lib/types";

interface SplitLayoutSectionProps {
  mainTitle: string;
  mainItems: (Movie | TVShow)[];
  mainHref?: string;
  sidebarTitle: string;
  sidebarItems: (Movie | TVShow)[];
  sidebarHref?: string;
  mediaType?: "movie" | "tv";
  className?: string;
  mainLimit?: number;
  sidebarLimit?: number;
}

export function SplitLayoutSection({
  mainTitle,
  mainItems,
  mainHref,
  sidebarTitle,
  sidebarItems,
  sidebarHref,
  mediaType = "movie",
  className,
  mainLimit = 8,
  sidebarLimit = 5,
}: SplitLayoutSectionProps) {
  const displayMainItems = mainItems.slice(0, mainLimit);
  const displaySidebarItems = sidebarItems.slice(0, sidebarLimit);

  return (
    <section className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-glow">
              {mainTitle}
            </h2>
            {mainHref && (
              <Button variant="default" asChild className="group">
                <Link
                  href={mainHref}
                  className="flex items-center gap-2 text-sm"
                >
                  View All
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {displayMainItems.map((item) => {
              const title =
                "title" in item ? item.title : "name" in item ? item.name : "";
              const releaseDate =
                "release_date" in item
                  ? item.release_date
                  : "first_air_date" in item
                    ? item.first_air_date
                    : null;
              const posterUrl = getImageUrl(item.poster_path, "poster", "w300");
              const rating = formatVoteAverage(item.vote_average);

              return (
                <div
                  key={item.id}
                  className="group relative rounded-lg overflow-hidden bg-card border border-border/50 card-hover"
                >
                  <Link href={`/${mediaType}/${item.id}`} className="block">
                    {/* Poster */}
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                          <span className="text-xs">No Image</span>
                        </div>
                      )}

                      {/* Rating Badge */}
                      {item.vote_average > 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="accent" className="gap-1 text-xs">
                            <StarFilledIcon className="h-3 w-3" />
                            <span>{rating}</span>
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-2 sm:p-3 space-y-1">
                      <h3 className="font-serif text-xs sm:text-sm font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      {releaseDate && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(releaseDate).getFullYear()}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="lg:col-span-1 space-y-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-glow">
              {sidebarTitle}
            </h3>
            {sidebarHref && (
              <Button variant="default" size="sm" asChild className="group">
                <Link
                  href={sidebarHref}
                  className="flex items-center gap-1 text-xs"
                >
                  More
                  <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>

          {/* Sidebar Content */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm venetian-blinds">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif">
                Quick Picks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {displaySidebarItems.map((item, index) => {
                const title =
                  "title" in item
                    ? item.title
                    : "name" in item
                      ? item.name
                      : "";
                const releaseDate =
                  "release_date" in item
                    ? item.release_date
                    : "first_air_date" in item
                      ? item.first_air_date
                      : null;
                const posterUrl = getImageUrl(
                  item.poster_path,
                  "poster",
                  "w154",
                );
                const rating = formatVoteAverage(item.vote_average);

                return (
                  <div
                    key={item.id}
                    className="group flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Rank Number */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Small Poster */}
                    <div className="flex-shrink-0 relative w-12 h-16 rounded overflow-hidden">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                          <span className="text-xs">?</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        href={`/${mediaType}/${item.id}`}
                        className="block group-hover:text-primary transition-colors"
                      >
                        <h4 className="font-serif text-sm font-medium leading-tight line-clamp-2">
                          {title}
                        </h4>
                      </Link>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {item.vote_average > 0 && (
                          <div className="flex items-center gap-1">
                            <StarFilledIcon className="h-3 w-3" />
                            <span>{rating}</span>
                          </div>
                        )}
                        {releaseDate && (
                          <span>{new Date(releaseDate).getFullYear()}</span>
                        )}
                      </div>
                    </div>

                    {/* Quick Action */}
                    <div className="flex-shrink-0">
                      <WatchStatusButton
                        tmdb_id={item.id}
                        media_type={mediaType}
                        title={title}
                        poster_path={item.poster_path}
                        overview={item.overview || ""}
                        release_date={releaseDate || ""}
                        vote_average={item.vote_average}
                        size="sm"
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
