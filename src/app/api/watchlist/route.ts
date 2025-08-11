import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { WatchlistItem } from "@/lib/types";
import { headers } from "next/headers";
import { sql } from "@vercel/postgres";

// In-memory storage for development
const watchlistData = new Map<string, WatchlistItem[]>();

// Database initialization function
async function initDatabase() {
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    return; // Skip if no database URL (development mode)
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS watchlist (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        tmdb_id INTEGER NOT NULL,
        media_type TEXT NOT NULL,
        title TEXT NOT NULL,
        poster_path TEXT,
        overview TEXT,
        release_date TEXT,
        vote_average REAL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, tmdb_id, media_type)
      );
    `;
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Production: Use Postgres
    const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (dbUrl) {
      await initDatabase();
      const { rows } = await sql`
        SELECT * FROM watchlist 
        WHERE user_id = ${session.user.id}
        ORDER BY added_at DESC
      `;

      return NextResponse.json({
        items: rows,
        total: rows.length,
      });
    }

    // Development: Use in-memory storage
    const userWatchlist = watchlistData.get(session.user.id) || [];

    return NextResponse.json({
      items: userWatchlist.sort(
        (a, b) =>
          new Date(b.added_at).getTime() - new Date(a.added_at).getTime(),
      ),
      total: userWatchlist.length,
    });
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      tmdb_id,
      media_type,
      title,
      poster_path,
      overview,
      release_date,
      vote_average,
    } = body;

    if (!tmdb_id || !media_type || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    const watchlistItem: WatchlistItem = {
      id: `${session.user.id}-${tmdb_id}-${media_type}`,
      user_id: session.user.id,
      tmdb_id,
      media_type,
      title,
      poster_path: poster_path || null,
      overview: overview || "",
      release_date: release_date || "",
      vote_average: vote_average || 0,
      added_at: now,
      created_at: now,
      updated_at: now,
    };

    // Production: Use Postgres
    const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (dbUrl) {
      await initDatabase();

      try {
        await sql`
          INSERT INTO watchlist (
            id, user_id, tmdb_id, media_type, title, poster_path, 
            overview, release_date, vote_average, added_at, created_at, updated_at
          ) VALUES (
            ${watchlistItem.id}, ${watchlistItem.user_id}, ${watchlistItem.tmdb_id}, 
            ${watchlistItem.media_type}, ${watchlistItem.title}, ${watchlistItem.poster_path},
            ${watchlistItem.overview}, ${watchlistItem.release_date}, ${watchlistItem.vote_average},
            ${watchlistItem.added_at}, ${watchlistItem.created_at}, ${watchlistItem.updated_at}
          )
        `;

        return NextResponse.json({ item: watchlistItem }, { status: 201 });
      } catch (dbError: unknown) {
        const error = dbError as { message?: string; code?: string };
        if (
          error.message?.includes("duplicate key") ||
          error.code === "23505"
        ) {
          return NextResponse.json(
            { error: "Item already in watchlist" },
            { status: 409 },
          );
        }
        throw dbError;
      }
    }

    // Development: Use in-memory storage
    const userWatchlist = watchlistData.get(session.user.id) || [];

    // Check if item already exists in watchlist
    const existing = userWatchlist.find(
      (item) => item.tmdb_id === tmdb_id && item.media_type === media_type,
    );

    if (existing) {
      return NextResponse.json(
        { error: "Item already in watchlist" },
        { status: 409 },
      );
    }

    userWatchlist.push(watchlistItem);
    watchlistData.set(session.user.id, userWatchlist);

    return NextResponse.json({ item: watchlistItem }, { status: 201 });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tmdb_id = searchParams.get("tmdb_id");
    const media_type = searchParams.get("media_type");

    if (!tmdb_id || !media_type) {
      return NextResponse.json(
        { error: "Missing tmdb_id or media_type" },
        { status: 400 },
      );
    }

    // Production: Use Postgres
    const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (dbUrl) {
      await sql`
        DELETE FROM watchlist 
        WHERE user_id = ${session.user.id} 
        AND tmdb_id = ${parseInt(tmdb_id)} 
        AND media_type = ${media_type}
      `;

      return NextResponse.json({ success: true });
    }

    // Development: Use in-memory storage
    const userWatchlist = watchlistData.get(session.user.id) || [];
    const filteredWatchlist = userWatchlist.filter(
      (item) =>
        !(item.tmdb_id === parseInt(tmdb_id) && item.media_type === media_type),
    );

    watchlistData.set(session.user.id, filteredWatchlist);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
