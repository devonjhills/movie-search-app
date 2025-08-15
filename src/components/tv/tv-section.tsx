import { MediaSection } from "@/components/shared/media-section";
import type { TVShow } from "@/lib/types";

interface TVSectionProps {
  title: string;
  tvShows: TVShow[];
  isLoading?: boolean;
  error?: Error | null;
  href?: string;
  className?: string;
  showViewAll?: boolean;
  limit?: number;
  showTrending?: boolean;
  badge?: string;
  showEpisodeIndicator?: boolean;
}

export function TVSection(props: TVSectionProps) {
  return (
    <MediaSection
      title={props.title}
      items={props.tvShows}
      mediaType="tv"
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
