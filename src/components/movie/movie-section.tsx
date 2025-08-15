import { MediaSection } from "@/components/shared/media-section";
import type { Movie, FormattedMovie } from "@/lib/types";

interface MovieSectionProps {
  title: string;
  movies: (Movie | FormattedMovie)[];
  isLoading?: boolean;
  error?: Error | null;
  href?: string;
  className?: string;
  showViewAll?: boolean;
  limit?: number;
  showTrending?: boolean;
  badge?: string;
}

export function MovieSection(props: MovieSectionProps) {
  return (
    <MediaSection
      title={props.title}
      items={props.movies}
      mediaType="movie"
      isLoading={props.isLoading}
      error={props.error}
      href={props.href}
      className={props.className}
      showViewAll={props.showViewAll}
      limit={props.limit}
      showTrending={props.showTrending}
      badge={props.badge}
    />
  );
}
