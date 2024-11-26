import sqlite3 from "sqlite3";
import path from "path";

const dbPath: string = path.join(__dirname, "databae.sqlite");

const db = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  db.run (`CREATE TABLE IF NOT EXISTS user_marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mark INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    date TEXT NOT NULL
    )`
  );
});

export default db;