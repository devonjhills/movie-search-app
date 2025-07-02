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
    // If already in watchlist, don't do anything (will be handled by Link)
    if (inWatchlist) {
      return
    }

    setIsLoading(true)
    try {
      await addToWatchlist({
        tmdb_id: item.id,
        media_type: mediaType,
        title,
        poster_path: item.poster_path,
        overview: item.overview || '',
        release_date: releaseDate || '',
        vote_average: item.vote_average || 0,
      })
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
            'hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-white/50',
            'cursor-pointer active:scale-95',
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
          'hover:bg-black/30 hover:scale-110 hover:shadow-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          'cursor-pointer active:scale-95',
          className
        )}
        title="Sign in to add to watchlist"
      >
        <BookmarkIcon className="h-5 w-5 text-white" />
      </Link>
    )
  }

  if (variant === 'hero') {
    if (inWatchlist) {
      return (
        <Link
          href="/watchlist"
          className={cn(
            'inline-flex items-center space-x-2 px-6 py-3 rounded-lg',
            'border border-white/30 text-white bg-white/10 backdrop-blur-sm',
            'hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-white/50',
            'cursor-pointer active:scale-95',
            className
          )}
        >
          <BookmarkSolidIcon className="h-5 w-5" />
          <span>View Watchlist</span>
        </Link>
      )
    }

    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          'inline-flex items-center space-x-2 px-6 py-3 rounded-lg',
          'border border-white/30 text-white bg-white/10 backdrop-blur-sm',
          'hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'cursor-pointer active:scale-95',
          className
        )}
      >
        <BookmarkIcon className="h-5 w-5" />
        <span>{isLoading ? 'Loading...' : 'Add to Watchlist'}</span>
      </button>
    )
  }

  if (inWatchlist) {
    return (
      <Link
        href="/watchlist"
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-lg',
          'bg-black/20 backdrop-blur-sm border border-white/20',
          'hover:bg-black/30 hover:scale-110 hover:shadow-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          'cursor-pointer active:scale-95',
          className
        )}
        title="View Watchlist"
      >
        <BookmarkSolidIcon className="h-5 w-5 text-yellow-400" />
      </Link>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center p-2 rounded-lg',
        'bg-black/20 backdrop-blur-sm border border-white/20',
        'hover:bg-black/30 hover:scale-110 hover:shadow-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-white/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer active:scale-95',
        className
      )}
      title="Add to Watchlist"
    >
      <BookmarkIcon className="h-5 w-5 text-white" />
    </button>
  )
}