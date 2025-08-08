"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/api";
import { getRottenTomatoesSearchUrl, formatYear } from "@/lib/utils";
import type { WatchProviderRegion } from "@/lib/types";

interface QuickAccessCardProps {
  externalIds?: {
    imdb_id?: string;
  };
  homepage?: string;
  title: string;
  releaseDate?: string;
  watchProviders?: WatchProviderRegion;
  className?: string;
}

export function QuickAccessCard({
  externalIds,
  homepage,
  title,
  releaseDate,
  watchProviders,
  className = "",
}: QuickAccessCardProps) {
  const year = releaseDate ? formatYear(releaseDate) : undefined;
  const rottenTomatoesUrl = getRottenTomatoesSearchUrl(title, year);

  const links = [
    {
      name: "IMDb",
      url: externalIds?.imdb_id
        ? `https://www.imdb.com/title/${externalIds.imdb_id}`
        : null,
      icon: "🎬",
    },
    {
      name: "Official Website",
      url: homepage,
      icon: "🌐",
    },
    {
      name: "Rotten Tomatoes",
      url: rottenTomatoesUrl,
      icon: "🍅",
    },
  ].filter((link) => link.url);

  // Get streaming providers (flatrate and ads)
  const streamingProviders = [
    ...(watchProviders?.flatrate || []),
    ...(watchProviders?.ads || []),
  ];

  return (
    <div className={`bg-card rounded-lg border p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* External Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">External Links</h3>
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors font-medium"
                >
                  <span className="text-base leading-none">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No external links available
            </p>
          )}
        </div>

        {/* Streaming Providers */}
        {streamingProviders.length > 0 && (
          <div className="flex-1 lg:max-w-md lg:border-l lg:pl-6">
            <h3 className="text-lg font-semibold mb-3">Streaming</h3>
            <div className="flex flex-wrap gap-2">
              {streamingProviders.slice(0, 8).map((provider) => (
                <div
                  key={provider.provider_id}
                  className="relative w-12 h-12 rounded-lg overflow-hidden border border-border/50 bg-card shadow-sm hover:scale-105 transition-transform duration-200"
                  title={provider.provider_name}
                >
                  <Image
                    src={getImageUrl(provider.logo_path, "logo", "w92")}
                    alt={provider.provider_name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ))}
              {streamingProviders.length > 8 && (
                <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-border/50 bg-muted text-xs text-muted-foreground font-medium">
                  +{streamingProviders.length - 8}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
