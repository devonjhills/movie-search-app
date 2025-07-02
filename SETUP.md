# Setup Instructions for Authentication & Watchlist

This guide explains how to set up user authentication and watchlist functionality using Supabase Email Auth on Vercel's free plan.

## 1. Environment Variables Setup

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

## 2. Supabase Project Setup

1. Go to [Supabase.com](https://supabase.com) and create account
2. Create a new project
3. Go to **Settings** → **API** to get:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Anon key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Add these to `.env.local`

## 3. Email Authentication Setup

Email authentication is enabled by default in Supabase! No additional configuration needed.

**Features:**
- ✅ Sign up with email/password
- ✅ Sign in with email/password  
- ✅ Email confirmation (optional)
- ✅ Password reset (built-in)

## 4. Database Schema Setup

1. In Supabase, go to **SQL Editor**
2. Run the schema from `supabase-schema.sql`:

```sql
-- Copy and paste the contents of supabase-schema.sql
```

## 5. Vercel Deployment

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_MOVIE_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Important Production Settings:

- In Supabase → Authentication → URL Configuration, add your production domain to Site URL

## 6. Features Included

- ✅ User authentication with email/password
- ✅ Persistent watchlist storage in Supabase
- ✅ Add/remove movies and TV shows from watchlist
- ✅ Dedicated watchlist page
- ✅ Authentication state in navigation
- ✅ Responsive design
- ✅ Works on Vercel free plan

## 7. Testing

1. Start development server: `npm run dev`
2. Click "Sign In" → redirects to `/auth/signin` page
3. Create account at `/auth/signup` or sign in with existing account
4. Add items to watchlist from movie/TV detail pages
5. View watchlist at `/watchlist`
6. Test removing items from watchlist

## Troubleshooting

- **Email not confirming**: Check Supabase email settings and spam folder
- **Database errors**: Verify Supabase credentials and schema is created
- **Auth issues**: Check Supabase Auth settings and email provider config
- **Vercel deployment**: Ensure all environment variables are set correctly

The implementation uses Vercel's free tier + Supabase free tier effectively and should handle reasonable traffic without issues.