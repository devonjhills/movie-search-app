import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.filmfatale.app'
  
  // Static pages
  const staticPages = [
    '',
    '/discover',
    '/search',
    '/about',
    '/privacy',
    '/terms',
    '/movies/popular',
    '/movies/top-rated',
    '/movies/now-playing',
    '/tv/popular',
    '/tv/top-rated',
    '/tv/on-the-air',
  ]

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  return staticUrls
}