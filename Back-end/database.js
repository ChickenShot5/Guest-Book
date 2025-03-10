const Database = require("better-sqlite3");
const db = new Database("./guestbook.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

const getEntries = () =>
  db.prepare("SELECT * FROM entries ORDER BY created_at DESC").all();
const addEntry = (name, message) =>
  db.prepare("INSERT INTO entries (name, message) VALUES (?, ?)").run(name, message);

module.exports = { getEntries, addEntry };