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
import BookOfTheWeek from '../components/Hero/BookOfTheWeek';
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
}

const CATEGORY_COLORS: Record<string, string> = {
  Finance: 'bg-green-500',
  Education: 'bg-blue-400',
  Health: 'bg-pink-400',
  Stories: 'bg-yellow-400',
  Novels: 'bg-purple-500',
  Psychology: 'bg-cyan-400',
  Discipline: 'bg-stone-500',
  Language: 'bg-green-300',
  Uncategorized: 'bg-gray-400'
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
              <div className={`absolute top-2 left-0 ${CATEGORY_COLORS[book.category] || CATEGORY_COLORS.Uncategorized} text-white text-[10px] font-bold px-2 py-1 rounded-r-md z-10 shadow-sm uppercase tracking-wider`}>
                {book.category}
              </div>
              <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors text-[#1A1A1A]">{book.title}</h3>
            <p className="text-xs text-[#555555] line-clamp-1 mt-0.5">{book.author}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
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
    return <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]"><div className="animate-pulse w-12 h-12 bg-primary/20 rounded-full"></div></div>;
  }

  const newReleases = ebooks.slice(6, 12);
  const forYou = [...ebooks].reverse().slice(0, 6);

  // Popular book titles for the wave ribbon
  const popularBookTitles = ebooks.length > 0
    ? ebooks.map(b => b.title).slice(0, 8).join(' ✦ ')
    : 'Atomic Habits ✦ The Midnight Library ✦ The Psychology of Money ✦ Learn React Fast ✦ Deep Work ✦ Sapiens';

  return (
    <div className="min-h-screen pb-12 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dribbble Exact Match Hero Section - SCALED DOWN */}
        <div className="bg-[#F9F9F7] w-full pt-6 pb-6 px-4 md:px-12 rounded-b-[40px] shadow-sm relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
            
            {/* Left Column */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <HeroHeadline />
                <HeroBadge />
              </div>
              
              <div className="mt-6 lg:mt-0">
                <ExploreButton />
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[400px] flex flex-col items-end gap-4 relative">
              <HeroDescription />
              
              <div className="w-full h-[400px] relative">
                <NewSeriesCard />
                
                {/* Overlapping Daily Visitors */}
                <div className="absolute -bottom-4 -right-2 lg:right-auto lg:-left-6 z-20 scale-90 origin-bottom-left">
                  <DailyVisitors />
                </div>
              </div>
            </div>
            
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10 mt-6">
            <BookOfTheWeek books={ebooks} />
          </div>
          
          {/* Decorative Background Blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F3E2B3]/30 rounded-full blur-[80px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
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
              uppercase
              color="#ffffff"
              ribbon
              ribbonColor="#5227FF"
              ribbonWidth={48}
              viewWidth={1200}
              viewHeight={260}
              pauseOnHover
            />
          </div>
        </div>

        {/* Other Sections */}
        <BookRow title="New Releases" books={newReleases} className="mb-10 mt-[2.33pt]" />
        <BookRow title="For You" books={forYou} />
      </motion.div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;
