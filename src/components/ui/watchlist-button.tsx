'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { useWatchlist } from '@/lib/hooks/use-watchlist'
import { cn } from '@/lib/utils'
import type { Movie, TVShow } from '@/lib/types'

interface WatchlistButtonProps {
  item: Movie | TVShow | any
  mediaType: 'movie' | 'tv'
  className?: string
  variant?: 'default' | 'hero'
}

export function WatchlistButton({ item, mediaType, className, variant = 'default' }: WatchlistButtonProps) {
  const { user } = useAuth()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const [isLoading, setIsLoading] = useState(false)

  const inWatchlist = isInWatchlist(item.id, mediaType)
  const title = mediaType === 'movie' ? item.title : item.name
  const releaseDate = mediaType === 'movie' ? item.release_date : item.first_air_date

  const handleClick = async () => {

    setIsLoading(true)
    try {
      if (inWatchlist) {
        await removeFromWatchlist(item.id, mediaType)
      } else {
        await addToWatchlist({
          tmdb_id: item.id,
          media_type: mediaType,
          title,
          poster_path: item.poster_path,
          overview: item.overview || '',
          release_date: releaseDate || '',
          vote_average: item.vote_average || 0,
        })
      }
    } catch (error) {
      console.error('Watchlist error:', error)
      // You could add a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    if (variant === 'hero') {
      return (
        <Link
          href="/auth/signin"
          className={cn(
            'inline-flex items-center space-x-2 px-6 py-3 rounded-lg',
            'border border-white/30 text-white bg-white/10 backdrop-blur-sm',
            'hover:bg-white/20 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-white/50',
            className
          )}
        >
          <BookmarkIcon className="h-5 w-5" />
          <span>Sign In to Add to Watchlist</span>
        </Link>
      )
    }

    return (
      <Link
        href="/auth/signin"
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-lg',
          'bg-black/20 backdrop-blur-sm border border-white/20',
          'hover:bg-black/30 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          className
        )}
        title="Sign in to add to watchlist"
      >
        <BookmarkIcon className="h-5 w-5 text-white" />
      </Link>
    )
  }

  if (variant === 'hero') {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          'inline-flex items-center space-x-2 px-6 py-3 rounded-lg',
          'border border-white/30 text-white bg-white/10 backdrop-blur-sm',
          'hover:bg-white/20 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
      >
        {inWatchlist ? (
          <BookmarkSolidIcon className="h-5 w-5" />
        ) : (
          <BookmarkIcon className="h-5 w-5" />
        )}
        <span>{isLoading ? 'Loading...' : inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center p-2 rounded-lg',
        'bg-black/20 backdrop-blur-sm border border-white/20',
        'hover:bg-black/30 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-white/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      {inWatchlist ? (
        <BookmarkSolidIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <BookmarkIcon className="h-5 w-5 text-white" />
      )}
    </button>
  )
}