import { MediaCardHorizontal } from "@/components/shared/media-card-horizontal";
import type { TVShow } from "@/lib/types";

interface TVCardHorizontalProps {
  tvShow: TVShow;
  className?: string;
  character?: string;
}

export function TVCardHorizontal(props: TVCardHorizontalProps) {
  return (
    <MediaCardHorizontal
      item={props.tvShow}
      mediaType="tv"
      className={props.className}
      character={props.character}
      showCard={false}
    />
  );
}
