import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { getImageUrl } from "@/lib/api";
import { truncateText } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Person } from "@/lib/types";

interface PersonCardProps {
  person: Person;
  className?: string;
}

function PersonCard({ person, className }: PersonCardProps) {
  const profileUrl = getImageUrl(person.profile_path, "profile", "w185");

  // Get known for items (movies and TV shows)
  const knownForItems = person.known_for?.slice(0, 3) || [];

  return (
    <Link href={`/person/${person.id}`} className="group">
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg",
          "border-0 bg-transparent shadow-none",
          className,
        )}
      >
        <CardContent className="p-0 space-y-3">
          {/* Profile Image */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            {profileUrl ? (
              <Image
                src={profileUrl}
                alt={person.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <UserIcon className="h-12 w-12" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Person Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {person.name}
            </h3>

            {person.known_for_department && (
              <p className="text-xs text-muted-foreground">
                {person.known_for_department}
              </p>
            )}

            {/* Known For */}
            {knownForItems.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Known for:
                </p>
                <div className="space-y-0.5">
                  {knownForItems.map((item, index) => (
                    <p
                      key={`${item.id}-${index}`}
                      className="text-xs text-muted-foreground line-clamp-1"
                    >
                      {"title" in item ? item.title : item.name}
                    </p>
                  ))}
                </div>
              </div>
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
  error?: any;
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
          "grid gap-6",
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
          className,
        )}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="aspect-[2/3] bg-muted rounded-lg animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded animate-pulse w-16" />
            </div>
          </div>
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
        "grid gap-6",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className,
      )}
    >
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
