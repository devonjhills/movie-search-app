"use client";

import Link from "next/link";
import { getImageUrl } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const fallbackInitials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 hover:shadow-sm transition-all duration-300 group">
      {/* Person Avatar - Clickable */}
      <Link href={linkPath}>
        <Avatar className="h-20 w-20 flex-shrink-0 cursor-pointer">
          <AvatarImage
            src={
              person.profile_path
                ? getImageUrl(person.profile_path, "profile", "w185")
                : undefined
            }
            alt={person.name}
            className="object-cover object-center"
          />
          <AvatarFallback className="text-base font-semibold">
            {fallbackInitials}
          </AvatarFallback>
        </Avatar>
      </Link>

      {/* Person Info - Not Clickable */}
      <div className="min-w-0 flex-1">
        <p className="text-lg font-medium text-foreground mb-1 transition-all duration-300">
          {person.name}
        </p>
        <p className="text-sm text-muted-foreground mb-1">{role}</p>
        {mediaType === "tv" && person.episode_count && (
          <p className="text-sm text-muted-foreground">
            {person.episode_count} episode
            {person.episode_count !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
