import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "What To Watch? - Discover Movies and TV Shows",
  description: "Discover your next favorite movie or TV show with our comprehensive database powered by The Movie Database (TMDB).",
  keywords: ["movies", "tv shows", "entertainment", "watch", "discover", "film", "television"],
  authors: [{ name: "What To Watch?" }],
  openGraph: {
    title: "What To Watch? - Discover Movies and TV Shows",
    description: "Discover your next favorite movie or TV show with our comprehensive database powered by TMDB.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What To Watch? - Discover Movies and TV Shows",
    description: "Discover your next favorite movie or TV show with our comprehensive database powered by TMDB.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
