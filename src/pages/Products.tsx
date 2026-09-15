import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Hero Subcomponents
import HeroHeadline from '../components/Hero/HeroHeadline';
import HeroDescription from '../components/Hero/HeroDescription';
import HeroBadge from '../components/Hero/HeroBadge';
import ExploreButton from '../components/Hero/ExploreButton';
import NewSeriesCard from '../components/Hero/NewSeriesCard';
import DailyVisitors from '../components/Hero/DailyVisitors';
import ScrollFloat from '../components/ScrollFloat';

// @ts-ignore
import TextLoop from '../components/TextLoop';

interface Ebook {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image_url: string;
  author: string;
  category: string;
  discount_percentage?: number;
  sale_name?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Finance: 'bg-lime-200 text-lime-900',
  Education: 'bg-sky-200 text-sky-900',
  Health: 'bg-pink-200 text-pink-900',
  Stories: 'bg-orange-200 text-orange-900',
  Novels: 'bg-purple-200 text-purple-900',
  Psychology: 'bg-amber-100 text-amber-900',
  Discipline: 'bg-lime-100 text-lime-900',
  Language: 'bg-sky-100 text-sky-900',
  Uncategorized: 'bg-gray-200 text-gray-900'
};

const BookRow = ({ title, books, className = "mb-10 mt-10" }: { title: string, books: Ebook[], className?: string }) => (
  <div className={className}>
    <div className="flex justify-between items-end mb-4 px-4 max-w-7xl mx-auto">
      <ScrollFloat
        tag="h2"
        text={title}
        containerClassName="text-xl font-black text-[#1A1A1A]"
      />
      <Link to="/products" className="text-sm font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors inline-flex items-center">
        <ScrollFloat
          tag="span"
          text="See All →"
        />
      </Link>
    </div>
    <div className="overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex gap-4 px-4 max-w-7xl mx-auto w-max">
        {books.map((book) => (
          <Link key={book.id} to={`/products/${book.id}`} className="block w-32 sm:w-40 group">
            <div className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[3/4] mb-2 bg-text/5">
              <div className={`absolute top-2 left-0 ${CATEGORY_COLORS[book.category] || CATEGORY_COLORS.Uncategorized} text-[10px] font-bold px-2 py-1 rounded-r-md z-10 shadow-sm capitalize tracking-wider`}>
                {book.category}
              </div>
              {book.discount_percentage ? (
                <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-lg">
                  {book.sale_name || 'SALE'} -{book.discount_percentage}%
                </div>
              ) : null}
              <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors text-[#1A1A1A]">{book.title}</h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-[#555555] line-clamp-1">{book.author}</p>
              {book.discount_percentage ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-primary">${(book.price - (book.price * book.discount_percentage / 100)).toFixed(2)}</span>
                  <span className="text-[10px] text-gray-400 line-through">${book.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-xs font-bold text-[#1A1A1A]">${book.price.toFixed(2)}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const Products: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ebooks')
      .then(res => res.json())
      .then(data => {
        setEbooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-transparent"><div className="animate-pulse w-12 h-12 bg-primary/20 rounded-full"></div></div>;
  }

  const newReleases = ebooks.slice(6, 12);
  const forYou = [...ebooks].reverse().slice(0, 6);
  const saleBooks = ebooks.filter(b => b.discount_percentage && b.discount_percentage > 0);

  // Popular book titles for the wave ribbon
  const popularBookTitles = ebooks.length > 0
    ? ebooks.map(b => b.title).slice(0, 8).join(' ✦ ')
    : 'Atomic Habits ✦ The Midnight Library ✦ The Psychology of Money ✦ Learn React Fast ✦ Deep Work ✦ Sapiens';

  return (
    <div className="min-h-screen pb-12 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dribbble Exact Match Hero Section - SCALED DOWN */}
        <div className="bg-transparent w-full pt-8 pb-8 px-4 md:px-12 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14 relative z-10">
            
            {/* Left Column */}
            <div className="flex-1 flex flex-col justify-center gap-6 w-full">
              <div>
                <HeroHeadline />
                <HeroBadge />
              </div>
              
              <div className="pt-2">
                <ExploreButton />
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[420px] flex flex-col items-center lg:items-end gap-6 relative">
              <HeroDescription />
              
              <div className="w-full max-w-[340px] sm:max-w-[380px] h-[370px] sm:h-[410px] relative flex items-center justify-center">
                {ebooks.length > 0 && <NewSeriesCard books={ebooks.slice(0, 4)} />}
                
                {/* Overlapping Daily Visitors */}
                <div className="absolute -bottom-4 -left-3 sm:-left-6 z-30 shadow-xl rounded-full">
                  <DailyVisitors />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* TextLoop Animation Strip */}
        <div 
          className="w-full relative z-10 overflow-hidden"
          style={{ marginTop: '2.33pt', marginBottom: '2.33pt' }}
        >
          <div className="max-w-7xl mx-auto flex justify-center">
            <TextLoop
              text={popularBookTitles}
              shape="wave"
              speed={75}
              direction="forward"
              separator="✦"
              curviness={100}
              fontSize={22}
              fontWeight={800}
              letterSpacing={2}
              color="var(--color-background)"
              ribbon
              ribbonColor="var(--color-text)"
              ribbonWidth={48}
              viewWidth={1200}
              viewHeight={260}
              pauseOnHover
            />
          </div>
        </div>

        {/* Other Sections */}
        {saleBooks.length > 0 && (
          <BookRow title="Special Offers & Sales" books={saleBooks} className="mb-10 mt-[2.33pt]" />
        )}
        <BookRow title="New Releases" books={newReleases} className={saleBooks.length > 0 ? "mb-10" : "mb-10 mt-[2.33pt]"} />
        <BookRow title="For You" books={forYou} />
      </motion.div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Products;
