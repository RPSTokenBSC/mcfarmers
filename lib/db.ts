// lib/db.ts
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

// Function to open the database
export async function openDB(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  return open({
    filename: "./referrals.db",
    driver: sqlite3.Database,
  });
}
