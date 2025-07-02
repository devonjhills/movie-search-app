import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { WatchlistItem } from '@/lib/types'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch watchlist' }, { status: 500 })
    }

    return NextResponse.json({ items: data || [], total: data?.length || 0 })
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tmdb_id, media_type, title, poster_path, overview, release_date, vote_average } = body

    if (!tmdb_id || !media_type || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if item already exists in watchlist
    const { data: existing } = await supabase
      .from('watchlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('tmdb_id', tmdb_id)
      .eq('media_type', media_type)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Item already in watchlist' }, { status: 409 })
    }

    const watchlistItem: Omit<WatchlistItem, 'id' | 'created_at' | 'updated_at'> = {
      user_id: user.id,
      tmdb_id,
      media_type,
      title,
      poster_path: poster_path || null,
      overview: overview || '',
      release_date: release_date || '',
      vote_average: vote_average || 0,
      added_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('watchlist')
      .insert([watchlistItem])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to add to watchlist' }, { status: 500 })
    }

    return NextResponse.json({ item: data }, { status: 201 })
  } catch (error) {
    console.error('Error adding to watchlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const tmdb_id = searchParams.get('tmdb_id')
    const media_type = searchParams.get('media_type')

    if (!tmdb_id || !media_type) {
      return NextResponse.json({ error: 'Missing tmdb_id or media_type' }, { status: 400 })
    }

    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', user.id)
      .eq('tmdb_id', parseInt(tmdb_id))
      .eq('media_type', media_type)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to remove from watchlist' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from watchlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}