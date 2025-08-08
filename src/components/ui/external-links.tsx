"use client";

import { LinkIcon } from "@heroicons/react/24/outline";
import { getRottenTomatoesSearchUrl, formatYear } from "@/lib/utils";

interface ExternalLinksProps {
  externalIds?: {
    imdb_id?: string;
  };
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
      icon: "🎬",
    },
    {
      name: "Official",
      url: homepage,
      icon: "🌐",
    },
    {
      name: "RT",
      url: rottenTomatoesUrl,
      icon: "🍅",
    },
  ].filter((link) => link.url);

  if (links.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
        >
          <span className="text-base leading-none">{link.icon}</span>
          <span className="font-medium">{link.name}</span>
        </a>
      ))}
    </div>
  );
}
