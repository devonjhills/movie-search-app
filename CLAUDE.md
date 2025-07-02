# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Note: Uses Turbopack for faster development builds.

**Build for production:**
```bash
npm run build
```

**Run production server:**
```bash
npm start
```

**Linting:**
```bash
npm run lint
```

## Project Architecture

This is a modern Next.js-based movie and TV show discovery application using The Movie Database (TMDB) API.

### Technology Stack
- **Next.js 15** with App Router and TypeScript
- **React 19** with functional components and hooks
- **Tailwind CSS v4** for styling with custom design system
- **SWR** for data fetching and caching
- **Headless UI + Heroicons** for UI components
- **next-themes** for dark/light mode support

### Key Architecture Patterns

**App Router Structure (`src/app/`):**
- Modern Next.js App Router with file-based routing
- Dynamic routes: `/movie/[id]`, `/tv/[id]`, `/person/[id]`
- Layouts: Root layout with navigation and theme provider
- Loading states, error boundaries, and not-found pages

**API Layer (`src/lib/`):**
- Modern data fetching with SWR hooks in `api.ts`
- Comprehensive TypeScript types in `types.ts`
- Constants and configuration in `constants.ts`
- Utility functions in `utils.ts`

**Component Structure (`src/components/`):**
- Feature-based organization: `movie/`, `tv/`, `person/`, `search/`, `discover/`
- Base UI components in `ui/` (cards, buttons, skeletons, etc.)
- Layout components in `layout/` (navigation, footer)
- Provider components in `providers/` (theme provider)

**Modern Features:**
- TypeScript for full type safety
- SWR for efficient data fetching with caching
- Dark/light mode with system preference detection
- Responsive design with mobile-first approach
- Loading skeletons and error boundaries
- SEO optimized with proper meta tags

### State Management
- SWR for server state management and caching
- Local component state with `useState`
- URL-based state for search queries and navigation
- Theme state managed by next-themes

### API Integration
- All TMDB API calls use modern fetch with SWR hooks
- Comprehensive error handling and loading states
- TypeScript interfaces for all API responses
- Image optimization with Next.js Image component

### Environment Variables
- `NEXT_PUBLIC_MOVIE_API_KEY` - Required TMDB API key (stored in `.env.local`)

### Routing
- Uses Next.js App Router with clean URLs
- Server components where possible for better performance
- Dynamic metadata generation for SEO
- Proper error handling and not-found pages

## Important Notes

- Uses modern Next.js App Router (not Pages Router)
- All components are TypeScript with proper type definitions
- Tailwind CSS with custom design system and CSS variables
- SWR provides automatic caching and revalidation
- Image optimization configured for TMDB and YouTube domains
- Vercel deployment ready with proper configuration