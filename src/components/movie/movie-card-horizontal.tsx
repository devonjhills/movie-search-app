import { MediaCardHorizontal } from "@/components/shared/media-card-horizontal";
import type { Movie, FormattedMovie } from "@/lib/types";

interface MovieCardHorizontalProps {
  movie: Movie | FormattedMovie;
  className?: string;
  character?: string;
}

export function MovieCardHorizontal(props: MovieCardHorizontalProps) {
  return (
    <MediaCardHorizontal
      item={props.movie}
      mediaType="movie"
      className={props.className}
      character={props.character}
    />
  );
}
