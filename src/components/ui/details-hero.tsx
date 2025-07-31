'use client';

import Image from 'next/image';
import { 
  CalendarIcon, 
  ClockIcon,
  PlayIcon,
  FilmIcon,
  TvIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '@/lib/api';
import { WatchlistButton } from '@/components/ui/watchlist-button';
import { ShareButton } from '@/components/ui/share-button';
import { 
  formatDate, 
  formatRuntime, 
  formatVoteAverage 
} from '@/lib/utils';

interface DetailsHeroProps {
  item: any; // Movie or TV Show
  mediaType: 'movie' | 'tv';
  trailer?: any;
}

export function DetailsHero({ item, mediaType, trailer }: DetailsHeroProps) {
  const backdropUrl = getImageUrl(item.backdrop_path, 'backdrop', 'original');
  const posterUrl = getImageUrl(item.poster_path, 'poster', 'w500');
  const rating = formatVoteAverage(item.vote_average);
  const releaseDate = formatDate(mediaType === 'movie' ? item.release_date : item.first_air_date);
  const runtime = mediaType === 'movie' ? formatRuntime(item.runtime) : null;
  const title = mediaType === 'movie' ? item.title : item.name;

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {backdropUrl ? (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Poster */}
            <div className="md:col-span-3">
              <div className="relative aspect-[2/3] w-full max-w-xs ml-4">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt={title}
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                    sizes="(max-width: 768px) 300px, 400px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted rounded-lg">
                    {mediaType === 'movie' ? (
                      <FilmIcon className="h-16 w-16 text-muted-foreground" />
                    ) : (
                      <TvIcon className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Title and Basic Info */}
            <div className="md:col-span-9 space-y-4 text-foreground relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {title}
              </h1>
              
              {item.tagline && (
                <p className="text-lg italic text-foreground/80">{item.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {item.vote_average > 0 && (
                  <div className="rating-badge">
                    <StarSolidIcon className="h-4 w-4" />
                    <span>{rating}</span>
                  </div>
                )}
                
                {releaseDate && (
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{releaseDate}</span>
                  </div>
                )}
                
                {runtime && (
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{runtime}</span>
                  </div>
                )}
                
                {mediaType === 'tv' && item.number_of_seasons && (
                  <div className="flex items-center space-x-1">
                    <span>
                      {item.number_of_seasons} Season{item.number_of_seasons !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                
                {mediaType === 'tv' && item.number_of_episodes && (
                  <div className="flex items-center space-x-1">
                    <span>
                      {item.number_of_episodes} Episode{item.number_of_episodes !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                {item.genres?.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
                    <PlayIcon className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </a>
                )}
                
                <WatchlistButton 
                  item={item} 
                  mediaType={mediaType} 
                  variant="hero"
                />
                
                <ShareButton 
                  title={`${title} - ${mediaType === 'movie' ? 'Movie' : 'TV Show'} Details`}
                  text={`Check out "${title}" on this ${mediaType === 'movie' ? 'movie' : 'TV show'} app!`}
                  variant="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}