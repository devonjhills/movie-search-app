# Setup Instructions for Authentication & Watchlist

This guide explains how to set up user authentication and watchlist functionality using NextAuth.js and Supabase on Vercel's free plan.

## 1. Environment Variables Setup

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

## 2. GitHub OAuth Setup

1. Go to [GitHub.com](https://github.com) and sign in
2. Click your profile picture → **Settings**
3. Scroll down to **Developer settings** (left sidebar)
4. Click **OAuth Apps** → **New OAuth App**
5. Fill in these details:
   - **Application name**: `Movie Search App`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
6. Click **Register application**
7. Copy the **Client ID**
8. Click **Generate a new client secret** and copy it
9. Add both to `.env.local`

## 3. Supabase Database Setup

1. Create account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings → API to get your project URL and anon key
4. Add these to `.env.local`
5. Go to SQL Editor and run the schema from `supabase-schema.sql`:

```sql
-- Copy and paste the contents of supabase-schema.sql
```

## 4. NextAuth Secret

Generate a secret for NextAuth:

```bash
openssl rand -base64 32
```

Add this to `.env.local` as `NEXTAUTH_SECRET`

## 5. Vercel Deployment

1. Push your code to GitHub
2. Connect to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

### Important Vercel Settings:

- Make sure to set `NEXTAUTH_URL` to your production domain
- All environment variables must be added in Vercel dashboard
- OAuth redirect URLs must include your production domain

## 6. Features Included

- ✅ User authentication with GitHub OAuth
- ✅ Persistent watchlist storage in Supabase
- ✅ Add/remove movies and TV shows from watchlist
- ✅ Dedicated watchlist page
- ✅ Authentication state in navigation
- ✅ Responsive design
- ✅ Works on Vercel free plan

## 7. Testing

1. Start development server: `npm run dev`
2. Sign in with OAuth provider
3. Add items to watchlist from movie/TV detail pages
4. View watchlist at `/watchlist`
5. Test removing items from watchlist

## Troubleshooting

- **OAuth errors**: Check redirect URLs match exactly
- **Database errors**: Verify Supabase credentials and schema
- **Session issues**: Ensure NEXTAUTH_SECRET is set
- **Vercel deployment**: Check all environment variables are set

The implementation uses Vercel's free tier limits effectively and should handle reasonable traffic without issues.