# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm start
```
Note: Uses `--openssl-legacy-provider` flag for compatibility with legacy OpenSSL.

**Build for production:**
```bash
npm run build
```

**Run tests:**
```bash
npm test
```

**Linting:**
Uses ESLint with `react-app` configuration (automatically runs during build).

## Project Architecture

This is a React-based movie and TV show search application using The Movie Database (TMDB) API.

### Technology Stack
- **React 17.0.2** with functional components and hooks
- **React Router DOM 5.2.1** using HashRouter
- **Semantic UI React 2.0.3** for UI components
- **Axios 0.21.1** for API requests
- **Create React App** for build toolchain

### Key Architecture Patterns

**API Layer (`src/api/`):**
- Centralized API functions in `api.js`
- Constants for endpoints in `constants.js`
- API key management in `key.js` (reads from `REACT_APP_MOVIE_API_KEY` env var)
- Helper utilities in `helpers.js`

**Component Structure:**
- Feature-based organization: `media/`, `menus/`, `searches/`, `utils/`
- Movie components: `media/movie/MovieHub.js`, `media/movie/MovieDetails.js`
- TV components: `media/tv/TvHub.js`, `media/tv/TvDetails.js`
- Person components: `media/person/PersonDetails.js`, `media/person/PersonCard.js`
- Search components: `searches/SearchPage.js`, `searches/DiscoverPage.js`

**Routing Configuration (`src/App.js`):**
- Uses HashRouter for client-side routing
- Route patterns: `/` (home), `/results` (search), `/discover`, `/tvhub`, `/:movieId`, `/person/:personId`

### State Management
- Local component state with `useState`
- URL-based state for search queries and navigation
- No global state management (Redux/Context)

### API Integration
- All TMDB API calls go through `src/api/api.js`
- Functions for movies, TV shows, people, search, and discovery
- Comprehensive data fetching with `append_to_response` for detailed views
- Error handling with console logging

### Environment Variables
- `REACT_APP_MOVIE_API_KEY` - Required TMDB API key (stored in `.env`)

## Important Notes

- Uses HashRouter instead of BrowserRouter (affects URL structure)
- API responses are logged to console with `console.dir()`
- No TypeScript - uses JavaScript with PropTypes where present
- Semantic UI provides most styling and responsive behavior
- Testing setup exists but no tests are currently implemented