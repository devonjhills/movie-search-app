"use client";

import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/api";

interface PersonCardProps {
  person: {
    id: number;
    name: string;
    profile_path: string | null;
    episode_count?: number; // For TV shows
  };
  role: string; // character or job
  href?: string;
  mediaType?: "movie" | "tv";
}

export function PersonCard({ person, role, href, mediaType }: PersonCardProps) {
  const linkPath = href || `/person/${person.id}`;

  return (
    <Link
      href={linkPath}
      className="group relative flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-background to-muted/30 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
    >
      {/* Person Photo */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-muted shadow-md flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
        {person.profile_path ? (
          <>
            <Image
              src={getImageUrl(person.profile_path, "profile", "w185")}
              alt={person.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="56px"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm font-bold text-primary/80 group-hover:text-primary transition-colors">
              {person.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        )}
        {/* Ring effect */}
        <div className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-hover:ring-primary/30 transition-all duration-300" />
      </div>

      {/* Person Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
          {person.name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
          {role}
          {mediaType === "tv" && person.episode_count && (
            <span className="block text-xs text-muted-foreground/70">
              {person.episode_count} episode
              {person.episode_count !== 1 ? "s" : ""}
            </span>
          )}
        </p>
      </div>

      {/* Subtle arrow indicator */}
      <div className="opacity-0 group-hover:opacity-60 transition-opacity duration-300">
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
