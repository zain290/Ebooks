import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// React Bits Components
import InfiniteSpiral from '../components/InfiniteSpiral';
import GradientText from '../components/GradientText';

interface Ebook {
  id: number;
  title: string;
  cover_image_url: string;
}

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="animate-pulse w-12 h-12 bg-[#2E1065]/20 rounded-full"></div>
      </div>
    );
  }

  const spiralItems = ebooks.map(book => ({
    src: book.cover_image_url,
    alt: book.title,
    href: `/products/${book.id}`
  }));

  return (
    <div className="h-[calc(100vh-96px)] w-full bg-transparent flex items-center relative overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 h-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 h-full relative">
          
          {/* Creative Text Area (40% width on Desktop) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 z-30 pt-4 lg:pt-0 text-center lg:text-left items-center lg:items-start -mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-[#2E1065] font-semibold text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight">
                Get Lost In <br className="hidden lg:block" />
                <GradientText 
                  colors={['#2E1065', '#8B5CF6', '#D8BFD8', '#2E1065']} 
                  animationSpeed={5} 
                  className="italic font-light inline-block mt-1"
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
              <p className="text-[#2E1065]/80 text-lg md:text-xl font-light leading-relaxed max-w-md">
                Step into a universe of captivating stories, insightful non-fiction, and timeless classics. A curated library designed for the modern reader.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Link 
                  to="/products"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#2E1065] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#2E1065]/90 hover:scale-105 transition-all shadow-2xl shadow-[#2E1065]/30"
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
