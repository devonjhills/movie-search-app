# What To Watch?

A modern movie and TV discovery platform built with Next.js 15, TypeScript, and Supabase.

## Features

- **Movie & TV Discovery**: Browse popular, top-rated, and now-playing content
- **Advanced Search**: Multi-type search across movies, TV shows, and people
- **Personal Watchlist**: Save and manage your favorite content (requires authentication)
- **Detailed Pages**: Comprehensive information for movies, TV shows, and cast/crew
- **Responsive Design**: Mobile-first approach with dark/light mode support
- **Authentication**: Secure user management with Supabase

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Data Fetching**: SWR
- **UI Components**: Headless UI + Heroicons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))
- Supabase project (free at [supabase.com](https://supabase.com))

### Installation

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd movie-search-app
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Add your API keys to `.env.local`:

   ```
   NEXT_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set up Supabase database**
   - Create a new table called `watchlist` using the schema in `supabase-schema.sql`
   - Enable Row Level Security and create appropriate policies

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── movie/[id]/        # Movie detail pages
│   ├── tv/[id]/           # TV show detail pages
│   ├── person/[id]/       # Person detail pages
│   ├── search/            # Search page
│   ├── discover/          # Discovery page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── movie/             # Movie-specific components
│   ├── tv/                # TV show components
│   └── layout/            # Layout components
└── lib/                   # Utilities and API
    ├── api.ts             # TMDB API functions
    ├── types.ts           # TypeScript definitions
    └── constants.ts       # Configuration
```

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically with git pushes

### Environment Variables

- `NEXT_PUBLIC_MOVIE_API_KEY`: Your TMDB API key (required)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (required)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key (required)

## License

This project is open source and available under the [MIT License](LICENSE).
