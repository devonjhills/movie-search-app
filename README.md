# What To Watch? - Modern Movie & TV Discovery App

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![SWR](https://img.shields.io/badge/SWR-Data_Fetching-FF6B6B?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)

🎬 **A professional full-stack web application demonstrating modern React development practices**

A production-ready, responsive movie and TV discovery platform built with cutting-edge technologies. This project showcases advanced proficiency in Next.js 15, TypeScript, modern React patterns, Supabase authentication, and responsive design principles - designed to highlight full-stack development expertise.

<img width="1248" height="633" alt="Screenshot 2025-08-08 at 3 12 52 PM" src="https://github.com/user-attachments/assets/39207651-35f9-4ece-8a4b-63d65749b6f9" />

🔗 **[Live Demo](https://movie-search-app-rho-ten.vercel.app/)** | 📱 **Mobile Optimized** | 🌙 **Dark Mode Ready** | 🔐 **User Authentication**

## ✨ Portfolio Highlights

### 🎯 Technical Excellence

- **Next.js 15 App Router**: Server-side rendering, route optimization, and modern React patterns
- **TypeScript Integration**: 100% type-safe codebase with comprehensive API typing
- **Advanced State Management**: SWR for efficient data fetching, caching, and real-time updates
- **Modern CSS Architecture**: Tailwind CSS v3 with custom design system and responsive utilities
- **Full-Stack Authentication**: Supabase integration with secure user management
- **Performance Optimization**: Image optimization, lazy loading, and code splitting

### 🎨 User Experience Design

- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Dark/Light Mode**: Intelligent theme switching with system preference detection and hydration-safe implementation
- **Micro-interactions**: Smooth animations, hover effects, and loading states
- **Error Boundaries**: Comprehensive error handling with user-friendly fallbacks

### 🚀 Full-Stack Features

- **User Authentication**: Secure sign-up/sign-in with Supabase Auth
- **Personal Watchlist**: Authenticated users can save and manage their favorite content
- **Movie Discovery**: Browse popular, top-rated, and now-playing movies with advanced filtering
- **TV Show Hub**: Comprehensive TV show discovery with season/episode details
- **Advanced Search**: Debounced multi-type search with categorized results
- **Person Profiles**: Actor/director pages with complete filmography
- **Genre Filtering**: Dynamic genre-based content discovery
- **SEO Optimization**: Dynamic meta tags, Open Graph, and structured data

## 🛠️ Technology Stack

| Category             | Technology                          | Version |
| -------------------- | ----------------------------------- | ------- |
| **Framework**        | Next.js with App Router             | 15.x    |
| **Language**         | TypeScript                          | 5.x     |
| **Styling**          | Tailwind CSS + Custom Design System | 3.x     |
| **Database & Auth**  | Supabase (PostgreSQL + Auth)        | Latest  |
| **State Management** | SWR for Data Fetching               | Latest  |
| **UI Components**    | Headless UI + shadcn/ui             | Latest  |
| **Icons**            | Heroicons + Lucide React            | Latest  |
| **Theme Management** | next-themes                         | Latest  |
| **Deployment**       | Vercel                              | Latest  |

## 🚀 Getting Started

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
