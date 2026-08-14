import "dotenv/config";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error(
        "DATABASE_URL is not defined"
    );
}

const sqlite = new Database(databaseUrl);

export const db = drizzle(sqlite);