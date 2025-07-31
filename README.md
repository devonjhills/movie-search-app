# What To Watch? - Modern Movie & TV Discovery App

🎬 **A showcase full-stack web application demonstrating modern React development practices**

A production-ready, responsive movie and TV discovery platform built with cutting-edge technologies. This project demonstrates proficiency in Next.js 15, TypeScript, modern React patterns, Supabase authentication, and responsive design principles - perfect for showcasing software development expertise in my portfolio.

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

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v3 with custom design system
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **UI Components**: Headless UI + Custom components
- **Data Fetching**: SWR with native fetch
- **Icons**: Heroicons + Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))
- Supabase project (free at [supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/movie-search-app.git
   cd movie-search-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Add your API keys to `.env.local`:

   ```
   NEXT_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new table called `watchlist` with columns: `id`, `user_id`, `movie_id`, `tv_id`, `title`, `poster_path`, `media_type`, `created_at`
   - Enable Row Level Security and create appropriate policies

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

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
│   ├── person/            # Person components
│   ├── search/            # Search components
│   ├── discover/          # Discovery components
│   └── layout/            # Layout components
├── lib/                   # Utilities and configuration
│   ├── api.ts             # TMDB API functions with SWR
│   ├── types.ts           # TypeScript type definitions
│   ├── constants.ts       # API endpoints and configuration
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🎯 Key Pages

- **Homepage** (`/`): Featured content with popular, top-rated, and now-playing movies
- **TV Shows** (`/tv`): TV show discovery with similar categories
- **Search** (`/search`): Multi-type search with real-time results
- **Discover** (`/discover`): Advanced filtering by genre and sorting options
- **Movie Details** (`/movie/[id]`): Comprehensive movie information with watchlist functionality
- **TV Details** (`/tv/[id]`): Detailed TV show information with seasons and watchlist
- **Person Details** (`/person/[id]`): Actor/director profiles with filmography
- **Authentication** (`/auth/signin`, `/auth/signup`): Secure user authentication
- **Watchlist** (`/watchlist`): Personal collection of saved movies and TV shows

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_MOVIE_API_KEY`: Your TMDB API key (required)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (required)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key (required)

### API Configuration

The app integrates with multiple APIs:

**TMDB API v3**:

- Movies: Popular, top-rated, now-playing, details, search
- TV Shows: Popular, top-rated, on-the-air, details, search
- People: Details, combined credits, search
- Multi-search: Combined search across all media types

**Supabase**:

- Authentication: User sign-up, sign-in, session management
- Database: Watchlist storage with user-specific data
- Real-time: Live updates for watchlist changes

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_MOVIE_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automatically with git pushes

### Manual Deployment

```bash
npm run build
npm start
```

## 🎨 Design System

The app uses a custom design system built on Tailwind CSS with:

- **Colors**: Semantic color variables for light/dark themes
- **Typography**: Inter font with consistent sizing scale
- **Spacing**: 8px-based spacing system
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and hover effects

## 🧪 Development

### Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Code Organization

- **Components**: Organized by feature (movie, tv, person, etc.)
- **Types**: Comprehensive TypeScript definitions for all API responses
- **API Layer**: Centralized data fetching with SWR hooks
- **Utilities**: Helper functions for formatting, calculations, etc.

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Optimized for small screens
- **Breakpoints**: Tailored layouts for tablet and desktop
- **Touch-friendly**: Proper touch targets and interactions
- **Performance**: Optimized images and lazy loading

## 🔍 SEO & Performance

- **Meta Tags**: Dynamic meta tags for all pages
- **Open Graph**: Social media preview optimization
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: SWR caching for improved performance

## 💼 Portfolio Notes

This project demonstrates several key software engineering competencies:

### Architecture & Design Patterns

- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **Custom Hooks**: Abstracted data fetching logic with SWR integration
- **Error Boundaries**: Graceful error handling throughout the application
- **Type Safety**: Comprehensive TypeScript implementation with strict mode

### Performance & Optimization

- **Image Optimization**: Next.js Image component with responsive sizing
- **Code Splitting**: Automatic route-based splitting with Next.js App Router
- **Caching Strategy**: SWR cache invalidation and background updates
- **Bundle Optimization**: Tree shaking and production optimizations

### Development Practices

- **Modern React**: Latest patterns including Server Components and App Router
- **Responsive Design**: Mobile-first CSS with breakpoint-specific optimizations
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation
- **Version Control**: Clean commit history and feature-based development

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
echo "NEXT_PUBLIC_MOVIE_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
```

## 🙏 Acknowledgments

- **TMDB**: Movie and TV data provided by The Movie Database API
- **Next.js**: React framework for production applications
- **Tailwind CSS**: Utility-first CSS framework
- **Vercel**: Deployment and hosting platform

---

**Built with ❤️ to showcase modern web development practices**
