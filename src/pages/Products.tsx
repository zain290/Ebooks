import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollFloat from '../components/ScrollFloat';

interface Ebook {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image_url: string;
  author: string;
  category: string;
}

const CATEGORIES = [
  { name: 'Finance', color: 'bg-green-500', icon: '💰' },
  { name: 'Education', color: 'bg-blue-400', icon: '🎓' },
  { name: 'Health', color: 'bg-pink-400', icon: '❤️' },
  { name: 'Stories', color: 'bg-yellow-400', icon: '📖' },
  { name: 'Novels', color: 'bg-purple-500', icon: '📚' },
  { name: 'Psychology', color: 'bg-cyan-400', icon: '🧠' },
  { name: 'Discipline', color: 'bg-stone-500', icon: '⏱️' },
  { name: 'Language', color: 'bg-green-300', icon: 'A文' }
];

const Products: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/ebooks')
      .then(res => res.json())
      .then(data => {
        setEbooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredEbooks = activeCategory
    ? ebooks.filter(e => e.category === activeCategory)
    : ebooks;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-6xl mx-auto">

      <div className="text-center mb-12">
        <ScrollFloat
          tag="h1"
          text="Categories"
          containerClassName="text-3xl md:text-4xl font-bold text-primary mb-2"
        />
      </div>

      {/* Colorful Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl text-white shadow-md transition-all hover:scale-105 hover:shadow-xl ${cat.color} ${activeCategory === cat.name ? 'ring-4 ring-offset-2 ring-primary ring-offset-background' : ''}`}
          >
            <div className="text-3xl mb-3 opacity-90">{cat.icon}</div>
            <ScrollFloat
              tag="span"
              text={cat.name}
              containerClassName="font-bold tracking-wide"
            />
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between items-end mb-8 border-b border-text/10 pb-4">
        <ScrollFloat
          tag="h2"
          text={activeCategory ? `${activeCategory} Books` : 'All Books'}
          containerClassName="text-2xl font-bold"
        />
        <span className="text-text/50 font-medium">{filteredEbooks.length} items</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-pulse w-12 h-12 bg-primary/20 rounded-full"></div></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
          {filteredEbooks.map((ebook, index) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex flex-col"
            >
              <Link to={`/products/${ebook.id}`} className="block relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-text/5 mb-3">
                <div className={`absolute top-2 left-0 ${CATEGORIES.find(c => c.name === ebook.category)?.color || 'bg-gray-400'} text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-r-md z-10 shadow-sm`}>
                  {ebook.category}
                </div>
                <img src={ebook.cover_image_url} alt={ebook.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <h3 className="font-bold text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
                <Link to={`/products/${ebook.id}`}>{ebook.title}</Link>
              </h3>
              <p className="text-xs sm:text-sm text-text/60 line-clamp-1 mb-1">{ebook.author}</p>
              <p className="font-bold text-primary mt-auto">${ebook.price.toFixed(2)}</p>
            </motion.div>
          ))}
          {filteredEbooks.length === 0 && (
            <div className="col-span-full text-center py-20 text-text/50 text-lg">
              No books found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
