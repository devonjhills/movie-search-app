"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
  variant?: "horizontal" | "vertical";
  className?: string;
}

export function PersonCard({
  person,
  role,
  href,
  mediaType,
  variant = "horizontal",
  className,
}: PersonCardProps) {
  const linkPath = href || `/person/${person.id}`;

  const fallbackInitials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  if (variant === "vertical") {
    return (
      <Link href={linkPath} className={className}>
        <Card className="glass transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group w-[140px] h-[240px] flex flex-col">
          <div className="p-3 flex flex-col items-center text-center h-full">
            {/* Person Avatar */}
            <Avatar className="h-20 w-20 flex-shrink-0 mb-3">
              <AvatarImage
                src={
                  person.profile_path
                    ? getImageUrl(person.profile_path, "profile", "w185")
                    : undefined
                }
                alt={person.name}
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <AvatarFallback className="text-sm font-semibold card-title">
                {fallbackInitials}
              </AvatarFallback>
            </Avatar>

            {/* Person Info */}
            <div className="flex-1 flex flex-col justify-center space-y-2">
              <h4 className="text-noir-subheading text-base leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                {person.name}
              </h4>

              <p className="text-xs text-muted-foreground line-clamp-2 text-body">
                {role}
              </p>

              {mediaType === "tv" && person.episode_count && (
                <Badge variant="outline" className="text-xs">
                  {person.episode_count} ep
                  {person.episode_count !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={linkPath} className={className}>
      <Card
        className={cn(
          "glass transition-all duration-300 hover:shadow-md hover:scale-[1.01] group",
          "min-h-[100px]",
        )}
      >
        <div className="flex items-center space-x-4 p-4">
          {/* Person Avatar */}
          <Avatar className="h-16 w-16 flex-shrink-0">
            <AvatarImage
              src={
                person.profile_path
                  ? getImageUrl(person.profile_path, "profile", "w185")
                  : undefined
              }
              alt={person.name}
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <AvatarFallback className="text-sm font-semibold card-title">
              {fallbackInitials}
            </AvatarFallback>
          </Avatar>

          {/* Person Info */}
          <div className="min-w-0 flex-1 space-y-1">
            <h4 className="text-noir-subheading text-lg leading-tight line-clamp-1 transition-colors duration-300 group-hover:text-primary">
              {person.name}
            </h4>

            <p className="text-sm text-muted-foreground line-clamp-1 text-body">
              {role}
            </p>

            {mediaType === "tv" && person.episode_count && (
              <Badge variant="outline" className="text-xs">
                {person.episode_count} episode
                {person.episode_count !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
