"use client";

import { ExternalLinkIcon, VideoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { getRottenTomatoesSearchUrl, formatYear } from "@/lib/utils";

import type { ExternalIds } from "@/lib/types";

interface ExternalLinksProps {
  externalIds?: ExternalIds;
  homepage?: string;
  title: string;
  releaseDate?: string;
  className?: string;
}

export function ExternalLinks({
  externalIds,
  homepage,
  title,
  releaseDate,
  className = "",
}: ExternalLinksProps) {
  const year = releaseDate ? formatYear(releaseDate) : undefined;
  const rottenTomatoesUrl = getRottenTomatoesSearchUrl(title, year);

  const links = [
    {
      name: "IMDb",
      url: externalIds?.imdb_id
        ? `https://www.imdb.com/title/${externalIds.imdb_id}`
        : null,
      icon: VideoIcon,
    },
    {
      name: "Official Site",
      url: homepage,
      icon: GlobeIcon,
    },
    {
      name: "Rotten Tomatoes",
      url: rottenTomatoesUrl,
      icon: ExternalLinkIcon,
    },
  ].filter((link) => link.url);

  if (links.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <a 
            key={link.name} 
            href={link.url!} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 underline underline-offset-4 hover:underline-offset-2 transition-all duration-200 font-medium text-sm"
          >
            <IconComponent className="h-4 w-4" />
            {link.name}
          </a>
        );
      })}
    </div>
  );
}
