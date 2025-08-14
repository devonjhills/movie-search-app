import Image from "next/image";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { getImageUrl } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Person } from "@/lib/types";

interface PersonCardProps {
  person: Person;
  className?: string;
}

function PersonCardSkeleton() {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg bg-card/50 backdrop-blur-sm border border-border/50">
      <CardContent className="p-3 space-y-3">
        {/* Profile Image Skeleton */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-md">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Person Info Skeleton */}
        <div className="space-y-2">
          {/* Name */}
          <Skeleton className="h-4 w-full" />
          {/* Department */}
          <Skeleton className="h-3 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

function PersonCard({ person, className }: PersonCardProps) {
  const profileUrl = getImageUrl(person.profile_path, "profile", "w185");

  // Get top known for item
  const topKnownFor = person.known_for?.[0];
  const knownForTitle = topKnownFor
    ? "title" in topKnownFor
      ? topKnownFor.title
      : topKnownFor.name
    : null;

  return (
    <Link href={`/person/${person.id}`} className="group">
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200 hover:shadow-lg",
          "bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border",
          "hover:-translate-y-1",
          className,
        )}
      >
        <CardContent className="p-3 space-y-3">
          {/* Profile Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            {profileUrl ? (
              <Image
                src={profileUrl}
                alt={person.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground border border-border/30 rounded-md">
                <PersonIcon className="h-8 w-8" />
              </div>
            )}
          </div>

          {/* Person Info */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {person.name}
            </h3>

            {person.known_for_department && (
              <p className="text-xs text-muted-foreground font-medium">
                {person.known_for_department}
              </p>
            )}

            {/* Top Known For */}
            {knownForTitle && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {knownForTitle}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface PersonGridProps {
  people: Person[];
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
  emptyMessage?: string;
}

export function PersonGrid({
  people,
  isLoading = false,
  error,
  className,
  emptyMessage = "No people found.",
}: PersonGridProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-destructive mb-2">⚠️ Error loading people</div>
        <p className="text-sm text-muted-foreground">
          {error?.message || "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "grid gap-3 sm:gap-4 lg:gap-5",
          "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8",
          className,
        )}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <PersonCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!people || people.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h3 className="text-lg font-medium mb-2">No People Found</h3>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4 lg:gap-5",
        "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8",
        className,
      )}
    >
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
