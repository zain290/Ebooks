import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.resolve(__dirname, '..', 'data')
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const DB_PATH = path.join(DATA_DIR, 'gallery.db')

const db = new Database(DB_PATH)

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS rate_limits (
    device_key TEXT NOT NULL,
    window_start TEXT NOT NULL,
    request_count INTEGER DEFAULT 0,
    PRIMARY KEY (device_key, window_start)
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS ebooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    cover_image_url TEXT,
    author TEXT,
    category TEXT,
    is_limited_offer INTEGER DEFAULT 0,
    book_file_url TEXT,
    discount_percentage INTEGER DEFAULT 0,
    sale_name TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

// Migration for existing ebooks table
try {
  db.exec(`ALTER TABLE ebooks ADD COLUMN is_limited_offer INTEGER DEFAULT 0`);
} catch (e) {
  // column already exists
}

try {
  db.exec(`ALTER TABLE ebooks ADD COLUMN book_file_url TEXT`);
} catch (e) {
  // column already exists
}

try {
  db.exec(`ALTER TABLE ebooks ADD COLUMN discount_percentage INTEGER DEFAULT 0`);
} catch (e) {
  // column already exists
}

try {
  db.exec(`ALTER TABLE ebooks ADD COLUMN sale_name TEXT`);
} catch (e) {
  // column already exists
}

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

// Seed default admin (admin / admin123)
const adminExists = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash);
}

export default db
