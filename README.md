# Film Fatale - Modern Movie & TV Discovery Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Better Auth](https://img.shields.io/badge/Better_Auth-Authentication-4F46E5?style=flat-square)
![Vercel Postgres](https://img.shields.io/badge/Vercel-Postgres-black?style=flat-square&logo=vercel)
![SWR](https://img.shields.io/badge/SWR-Data_Fetching-FF6B6B?style=flat-square)

🎬 **A professional full-stack movie discovery platform showcasing modern web development**

Film Fatale is a production-ready, responsive movie and TV discovery platform built with cutting-edge technologies. This project demonstrates advanced proficiency in Next.js 15, TypeScript, modern React patterns, Better Auth authentication, Vercel Postgres, and responsive design principles.

<img width="1248" height="633" alt="Film Fatale Screenshot" src="https://github.com/user-attachments/assets/39207651-35f9-4ece-8a4b-63d65749b6f9" />

🔗 **[Live Demo - www.filmfatale.app](https://www.filmfatale.app)** | 📱 **Mobile Optimized** | 🌙 **Dark Mode Ready** | 🔐 **Google OAuth**

## ✨ Portfolio Highlights

### 🎯 Technical Excellence

- **Next.js 15 App Router**: Server-side rendering, route optimization, and modern React patterns
- **TypeScript Integration**: 100% type-safe codebase with comprehensive API typing
- **Better Auth**: Modern TypeScript-first authentication with email/password and Google OAuth
- **Vercel Postgres**: Production-ready PostgreSQL database with automatic scaling
- **Advanced State Management**: SWR for efficient data fetching, caching, and real-time updates
- **Modern CSS Architecture**: Tailwind CSS v3 with custom design system and responsive utilities
- **Performance Optimization**: Image optimization, lazy loading, and code splitting

### 🎨 User Experience Design

- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Dark/Light Mode**: Intelligent theme switching with system preference detection and hydration-safe implementation
- **Micro-interactions**: Smooth animations, hover effects, and loading states
- **Error Boundaries**: Comprehensive error handling with user-friendly fallbacks

### 🚀 Full-Stack Features

- **Modern Authentication**: Secure sign-up/sign-in with Better Auth (email/password + Google OAuth)
- **Persistent Watchlist**: Users can save and manage their favorite content across devices
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
| **Authentication**   | Better Auth                         | Latest  |
| **Database**         | Vercel Postgres                     | Latest  |
| **State Management** | SWR for Data Fetching               | Latest  |
| **UI Components**    | Headless UI + shadcn/ui             | Latest  |
| **Icons**            | Radix UI Icons                      | Latest  |
| **Theme Management** | next-themes                         | Latest  |
| **Deployment**       | Vercel                              | Latest  |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))
- Google OAuth credentials (optional, for social login)

### Installation

1. **Clone and install dependencies**

   ```bash
   git clone https://github.com/devonjhills/movie-search-app.git
   cd movie-search-app
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Add your API keys to `.env.local`:

   ```env
   # Required
   NEXT_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
   BETTER_AUTH_SECRET=your_32_character_random_secret

   # Optional (for Google OAuth)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
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
│   ├── signin/            # Authentication pages
│   ├── signup/            # Authentication pages
│   ├── watchlist/         # User watchlist
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── movie/             # Movie-specific components
│   ├── tv/                # TV show components
│   ├── providers/         # Context providers
│   └── layout/            # Layout components
└── lib/                   # Utilities and API
    ├── auth.ts            # Better Auth configuration
    ├── auth-client.ts     # Client-side auth hooks
    ├── api.ts             # TMDB API functions
    ├── types.ts           # TypeScript definitions
    └── constants.ts       # Configuration
```

## Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
   - Import your GitHub repository to Vercel
   - Vercel will auto-detect Next.js settings

2. **Set up Vercel Postgres**
   - Go to your project dashboard
   - Navigate to **Storage** tab
   - Click **Create Database** → **Postgres**
   - Vercel automatically sets `POSTGRES_URL`

3. **Add environment variables**
   In your Vercel project dashboard:

   ```env
   NEXT_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
   BETTER_AUTH_SECRET=your_32_character_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Update Google OAuth (if using)**
   Add production redirect URI in Google Cloud Console:

   ```
   https://www.filmfatale.app/api/auth/callback/google
   ```

5. **Deploy**
   ```bash
   git push origin main
   ```
   Vercel will automatically deploy your application.

## Environment Variables

### Required

- `NEXT_PUBLIC_MOVIE_API_KEY`: Your TMDB API key
- `BETTER_AUTH_SECRET`: Random 32+ character secret for JWT signing

### Optional (for Google OAuth)

- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

### Automatic (Vercel)

- `POSTGRES_URL`: Vercel Postgres connection string (set automatically)

## Features

### 🎬 **Movie & TV Discovery**

- Browse popular, top-rated, and now-playing content
- Advanced filtering by genre, rating, and release year
- Comprehensive movie and TV show details with cast, crew, and recommendations

### 🔍 **Advanced Search**

- Multi-type search across movies, TV shows, and people
- Debounced search with real-time results
- Categorized search results with filters

### 👤 **User Authentication**

- Modern email/password authentication
- Google OAuth integration
- Secure JWT-based sessions
- Protected routes and user-specific content

### 📋 **Personal Watchlist**

- Save movies and TV shows to personal watchlist
- Persistent storage across devices
- Quick add/remove functionality
- Organized watchlist management

### 🎨 **Modern UI/UX**

- Responsive design optimized for all devices
- Dark/light mode with system preference detection
- Smooth animations and micro-interactions
- Accessible design with proper ARIA labels

## Architecture

### Development Environment

- **Authentication**: In-memory Better Auth (resets on server restart)
- **Watchlist**: In-memory storage (temporary)
- **Database**: No external database required

### Production Environment

- **Authentication**: Better Auth with Vercel Postgres persistence
- **Watchlist**: Persistent storage in Vercel Postgres
- **Database**: Automatic table creation and migration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by [Devon Hills](https://github.com/devonjhills)**
