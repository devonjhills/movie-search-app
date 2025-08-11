import { betterAuth } from "better-auth";

// Determine environment and set base URL
const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://www.filmfatale.app";
  }
  return process.env.BETTER_AUTH_URL || "http://localhost:3000";
};

// Database configuration
const getDatabaseConfig = () => {
  // Production: Use Vercel Postgres (try both variable names)
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (dbUrl) {
    return {
      provider: "postgresql" as const,
      url: dbUrl,
    };
  }

  // Development: Use in-memory (Better Auth will warn and use memory adapter)
  return undefined;
};

export const auth = betterAuth({
  baseURL: getBaseURL(),
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-for-dev",
  database: getDatabaseConfig(),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
