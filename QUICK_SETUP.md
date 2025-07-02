# Quick Setup Guide

## 1. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) → Create account
2. Create new project
3. Go to **Settings** → **API**
4. Copy these values:

```bash
# Add to .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_MOVIE_API_KEY=your-tmdb-api-key
```

## 2. Create Database Table

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL and click **Run**:

```sql
-- Create watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  tmdb_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  title TEXT NOT NULL,
  poster_path TEXT,
  overview TEXT DEFAULT '',
  release_date TEXT DEFAULT '',
  vote_average DECIMAL(3,1) DEFAULT 0,
  added_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tmdb_id, media_type)
);

-- Enable Row Level Security
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only access their own data
CREATE POLICY "Users can only access their own watchlist items" ON watchlist
  FOR ALL USING (auth.uid()::text = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user_tmdb ON watchlist(user_id, tmdb_id, media_type);
```

## 3. Test It

1. `npm run dev`
2. Go to `/auth/signup` → Create account
3. Sign in → Try adding a movie to watchlist
4. Should work now!

## Troubleshooting

**"Failed to add to watchlist":**
- Check browser console for more details
- Make sure you created the database table above
- Verify environment variables are set correctly

**"User not authenticated":**
- Make sure you're signed in
- Check that SUPABASE_URL and ANON_KEY are correct

**Email not confirming:**
- Check spam folder
- In Supabase → Authentication → Settings, you can disable email confirmation for testing