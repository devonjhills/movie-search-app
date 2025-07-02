import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { WatchlistResponse, WatchlistItem } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useWatchlist() {
  const { data: session } = useSession()
  
  const { data, error, mutate } = useSWR<WatchlistResponse>(
    session?.user ? '/api/watchlist' : null,
    fetcher
  )

  const addToWatchlist = async (item: {
    tmdb_id: number
    media_type: 'movie' | 'tv'
    title: string
    poster_path?: string | null
    overview?: string
    release_date?: string
    vote_average?: number
  }) => {
    if (!session?.user) {
      throw new Error('User not authenticated')
    }

    const response = await fetch('/api/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to add to watchlist')
    }

    mutate() // Revalidate the data
    return response.json()
  }

  const removeFromWatchlist = async (tmdb_id: number, media_type: 'movie' | 'tv') => {
    if (!session?.user) {
      throw new Error('User not authenticated')
    }

    const response = await fetch(`/api/watchlist?tmdb_id=${tmdb_id}&media_type=${media_type}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to remove from watchlist')
    }

    mutate() // Revalidate the data
    return response.json()
  }

  const isInWatchlist = (tmdb_id: number, media_type: 'movie' | 'tv') => {
    if (!data?.items) return false
    return data.items.some(item => item.tmdb_id === tmdb_id && item.media_type === media_type)
  }

  return {
    watchlist: data?.items || [],
    total: data?.total || 0,
    isLoading: !error && !data && !!session?.user,
    error,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    mutate,
  }
}