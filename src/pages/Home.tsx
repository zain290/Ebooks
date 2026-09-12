import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// React Bits Components
import InfiniteSpiral from '../components/InfiniteSpiral';
import GradientText from '../components/GradientText';

interface Ebook {
  id: number;
  title: string;
  category?: string;
  cover_image_url: string;
}

const CATEGORY_THEMES: Record<string, {bg: string, text: string, muted: string, navBorder: string, buttonHover: string, gradient: string[]}> = {
  'Finance': { bg: '#DDF29F', text: '#1A3B12', muted: '#345C24', navBorder: '#C5E080', buttonHover: '#122A0C', gradient: ['#1A3B12', '#4B7B2B', '#7AAB46', '#1A3B12'] },
  'Education': { bg: '#C1E8FC', text: '#0B3050', muted: '#1E5176', navBorder: '#95D4F5', buttonHover: '#062138', gradient: ['#0B3050', '#206290', '#4A98CF', '#0B3050'] },
  'Health': { bg: '#FCD0E8', text: '#520822', muted: '#821E40', navBorder: '#F5A8D0', buttonHover: '#3A0416', gradient: ['#520822', '#991A46', '#D64C78', '#520822'] },
  'Stories': { bg: '#FAD2A7', text: '#5C2808', muted: '#8F4616', navBorder: '#F2B87F', buttonHover: '#421A04', gradient: ['#5C2808', '#A45318', '#DE833D', '#5C2808'] },
  'Novels': { bg: '#BDB5D5', text: '#2E1065', muted: '#52219B', navBorder: '#A59AC2', buttonHover: '#1B083F', gradient: ['#2E1065', '#6D28D9', '#A78BFA', '#2E1065'] },
  'Psychology': { bg: '#FDF0B9', text: '#523F04', muted: '#856A15', navBorder: '#F2E08A', buttonHover: '#362901', gradient: ['#523F04', '#A18116', '#D9B53A', '#523F04'] },
  'Discipline': { bg: '#E1F5A9', text: '#1E3F18', muted: '#38682F', navBorder: '#C6E281', buttonHover: '#122A0E', gradient: ['#1E3F18', '#4A803D', '#7CBC6C', '#1E3F18'] },
  'Language': { bg: '#D6EEF8', text: '#0B3B52', muted: '#1E5D7D', navBorder: '#A8D7EE', buttonHover: '#062738', gradient: ['#0B3B52', '#227299', '#57A9D1', '#0B3B52'] },
  'default': { bg: '#BDB5D5', text: '#2E1065', muted: '#52219B', navBorder: '#A59AC2', buttonHover: '#1B083F', gradient: ['#2E1065', '#6D28D9', '#A78BFA', '#2E1065'] }
};

const Home: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    fetch('/api/ebooks')
      .then(res => res.json())
      .then(data => {
        setEbooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(ebooks.map(b => b.category).filter(Boolean))) as string[];
  const currentCategory = categories.length > 0 ? categories[currentCategoryIndex] : '';

  useEffect(() => {
    if (!currentCategory) return;
    
    // Smoothly apply new CSS variables
    const theme = CATEGORY_THEMES[currentCategory] || CATEGORY_THEMES['default'];
    const root = document.documentElement;
    root.style.setProperty('--color-background', theme.bg);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--color-muted', theme.muted);
    root.style.setProperty('--color-nav-border', theme.navBorder);
    root.style.setProperty('--color-button-hover', theme.buttonHover);
  }, [currentCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="animate-pulse w-12 h-12 bg-[#2E1065]/20 rounded-full"></div>
      </div>
    );
  }

  const handleNextCategory = () => {
    if (categories.length > 0) {
      setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
    }
  };

  const handlePrevCategory = () => {
    if (categories.length > 0) {
      setCurrentCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
    }
  };

  const filteredEbooks = currentCategory ? ebooks.filter(b => b.category === currentCategory) : ebooks;

  let spiralItems = filteredEbooks.map(book => ({
    src: book.cover_image_url,
    alt: book.title,
    href: `/products/${book.id}`,
    id: book.id
  }));

  // Ensure there are enough items to form a complete spiral
  if (spiralItems.length > 0 && spiralItems.length < 15) {
    const original = [...spiralItems];
    while (spiralItems.length < 15) {
      spiralItems = [...spiralItems, ...original.map(item => ({ ...item, id: item.id + Math.random() }))];
    }
  }

  return (
    <div className="h-[calc(100vh-96px)] w-full bg-transparent flex items-center relative overflow-hidden group">
      
      {/* Global Left/Right Navigation Buttons */}
      <button 
        onClick={handlePrevCategory}
        className="absolute left-4 lg:left-6 top-[40%] -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-700 ease-in-out"
        style={{ backgroundColor: 'var(--color-text)' }}
        aria-label="Previous Category"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <button 
        onClick={handleNextCategory}
        className="absolute right-4 lg:right-6 top-[40%] -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-700 ease-in-out"
        style={{ backgroundColor: 'var(--color-text)' }}
        aria-label="Next Category"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="w-full max-w-[1500px] mx-auto px-16 lg:px-32 relative z-10 h-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 h-full relative">
          
          {/* Creative Text Area (40% width on Desktop) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4 lg:gap-5 z-30 pt-4 lg:pt-0 text-center lg:text-left items-center lg:items-start -mt-10 lg:mt-0 transition-colors duration-700 ease-in-out">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-semibold text-5xl lg:text-6xl leading-[1.05] tracking-tight transition-colors duration-700 ease-in-out" style={{ color: 'var(--color-text)' }}>
                Get Lost In <br />
                <GradientText 
                  colors={(CATEGORY_THEMES[currentCategory] || CATEGORY_THEMES['default']).gradient} 
                  animationSpeed={4}
                  className="italic font-light inline-block mt-1 whitespace-nowrap transition-colors duration-700 ease-in-out"
                >
                  Great Books
                </GradientText>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-base md:text-lg font-light leading-relaxed max-w-md transition-colors duration-700 ease-in-out opacity-80" style={{ color: 'var(--color-text)' }}>
                Step into a universe of captivating stories, insightful non-fiction, and timeless classics. A curated library designed for the modern reader.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2"
            >
              <div className="font-bold text-lg md:text-xl tracking-wider uppercase transition-colors duration-700 ease-in-out">
                <GradientText 
                  colors={(CATEGORY_THEMES[currentCategory] || CATEGORY_THEMES['default']).gradient} 
                  animationSpeed={4}
                >
                  {currentCategory || 'All Books'}
                </GradientText>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-0"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Link 
                  to="/products"
                  className="inline-flex items-center justify-center px-10 py-4 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl duration-700 ease-in-out"
                  style={{ backgroundColor: 'var(--color-text)' }}
                >
                  Enter the Library →
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Massive Infinite Spiral Area (60% width on Desktop) */}
          <div className="w-full lg:w-[60%] h-[500px] lg:h-full relative z-10 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full absolute inset-0"
            >
              <InfiniteSpiral
                key={currentCategory}
                items={spiralItems}
                cardWidth={90}        // Decreased card size
                cardHeight={135}      // Decreased card size
                radius={290}          
                speed={0.4}
                perspective={1000}
                verticalSpacing={70}  
                cardTilt={-8}
                edgeFade={0.15}       // Delay fade-out so books reach the edge
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
