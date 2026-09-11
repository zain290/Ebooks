import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'data', 'gallery.db'));

db.exec(`
  DROP TABLE IF EXISTS ebooks;
  CREATE TABLE IF NOT EXISTS ebooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    cover_image_url TEXT,
    author TEXT,
    category TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const categories = [
  { name: 'Finance', color: '4ade80' }, // Green
  { name: 'Education', color: '60a5fa' }, // Blue
  { name: 'Health', color: 'f472b6' }, // Pink
  { name: 'Stories', color: 'facc15' }, // Yellow
  { name: 'Novels', color: 'a78bfa' }, // Purple
  { name: 'Psychology', color: '22d3ee' }, // Cyan
  { name: 'Discipline', color: 'a8a29e' }, // Brown/Grey
  { name: 'Language', color: '86efac' } // Light Green
];

const books = [
  { title: 'Money Talks', author: 'Jane Doe', cat: 'Finance' },
  { title: 'Investing 101', author: 'John Smith', cat: 'Finance' },
  { title: 'Learn React Fast', author: 'Sarah C.', cat: 'Education' },
  { title: 'The Science of Learning', author: 'Dr. Brain', cat: 'Education' },
  { title: 'Eat Well, Live Well', author: 'Chef Health', cat: 'Health' },
  { title: 'Mindful Meditation', author: 'Yogi Bear', cat: 'Health' },
  { title: 'The Midnight Library', author: 'Matt Haig', cat: 'Stories' },
  { title: 'A Short Story', author: 'Shorty', cat: 'Stories' },
  { title: 'Epic Fantasy Novel', author: 'Fantasy King', cat: 'Novels' },
  { title: 'The Great Mystery', author: 'Detective D', cat: 'Novels' },
  { title: 'Understand Yourself', author: 'Dr. Psy', cat: 'Psychology' },
  { title: 'Human Behavior', author: 'Sigmund F.', cat: 'Psychology' },
  { title: 'Atomic Habits', author: 'James Clear', cat: 'Discipline' },
  { title: 'Deep Work', author: 'Cal Newport', cat: 'Discipline' },
  { title: 'Spanish Vibes', author: 'Senorita', cat: 'Language' },
  { title: 'French for Beginners', author: 'Monsieur', cat: 'Language' },
  { title: 'Rich Dad Poor Dad', author: 'Robert K.', cat: 'Finance' },
  { title: 'Algorithms Explained', author: 'Code Ninja', cat: 'Education' },
  { title: 'The Silent Patient', author: 'Alex M.', cat: 'Novels' },
  { title: 'Ikigai', author: 'Hector Garcia', cat: 'Health' },
];

const stmt = db.prepare(`
  INSERT INTO ebooks (title, description, price, cover_image_url, author, category)
  VALUES (?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const book of books) {
    const covers = [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1629196914225-eb20f0119e71?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1589998059171-989d887dda6e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1525505927227-7f833b3a3ea5?auto=format&fit=crop&q=80&w=400'
    ];
    const cover = covers[Math.floor(Math.random() * covers.length)];
    stmt.run(
      book.title,
      'A wonderful book about ' + book.cat + '.',
      parseFloat((Math.random() * 20 + 9.99).toFixed(2)),
      cover,
      book.author,
      book.cat
    );
  }
})();

console.log('Successfully seeded 20 dummy ebooks with categories.');
