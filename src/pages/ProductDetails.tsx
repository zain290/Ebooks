import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollFloat from '../components/ScrollFloat';

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

const CATEGORY_THEMES: Record<string, { primary: string, bg: string }> = {
  Finance: { primary: '#65a30d', bg: '#f7fee7' },
  Education: { primary: '#0284c7', bg: '#f0f9ff' },
  Health: { primary: '#db2777', bg: '#fdf2f8' },
  Stories: { primary: '#ea580c', bg: '#fff7ed' },
  Novels: { primary: '#9333ea', bg: '#faf5ff' },
  Psychology: { primary: '#d97706', bg: '#fffbeb' },
  Discipline: { primary: '#65a30d', bg: '#f7fee7' },
  Language: { primary: '#0284c7', bg: '#f0f9ff' },
  Uncategorized: { primary: '#4b5563', bg: '#f9fafb' }
};

const easing = [0.16, 1, 0.3, 1];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const initialEbook = location.state?.ebook as Ebook | undefined;
  
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  
  const easing = [0.16, 1, 0.3, 1];
  const [loading, setLoading] = useState(!initialEbook);

  useEffect(() => {
    fetch(`/api/ebooks/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) navigate('/products');
        else setEbook(data);
        setLoading(false);
      })
      .catch(() => {
      })
      .catch(() => setLoading(false));
  }, [id, location.state]);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchasing(true);
    // Simulate a network request for a payment
    setTimeout(() => {
      setIsPurchasing(false);
      setIsPurchased(true);
      setIsModalOpen(false);
    }, 1500);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-12 h-12 bg-primary/20 rounded-full"></div></div>;
  if (!ebook) return null;

  const theme = CATEGORY_THEMES[ebook.category] || CATEGORY_THEMES.Uncategorized;

  return (
    <div 
      className="min-h-screen transition-colors duration-700 bg-background text-text"
      style={{
        '--color-primary': theme.primary,
        '--color-background': theme.bg,
      } as React.CSSProperties}
    >
      {/* 1. Hero Section (State B) */}
      <section className="relative w-full h-[calc(100vh-96px)] flex items-center justify-center bg-background overflow-hidden">
        
        {/* The Morphed Background Image - Exactly 90% of container */}
        {ebook.cover_image_url ? (
          <motion.div 
            className="absolute w-[90%] h-[80%] z-0 overflow-hidden rounded-[24px] shadow-2xl"
          >
            <motion.img
              layoutId={`cover-${ebook.id}`}
              src={ebook.cover_image_url}
              alt={ebook.title}
              className="w-full h-full object-cover rounded-[24px]"
              transition={{ duration: 0.9, ease: easing }}
              // Inner scale simulation during morph
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
            />
            {/* Dark overlay so text is readable */}
            <div className="absolute inset-0 bg-black/40 z-10" />
          </motion.div>
        ) : null}

        {/* Floating Content Container - perfectly overlaps the 90% image */}
        <div className="relative w-[90%] h-[80%] z-20 pointer-events-none flex flex-col justify-between">
          
          {/* Top Header - Slides down */}
          <motion.header 
            className="w-full p-6 md:p-12 flex justify-between items-center text-white pointer-events-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easing }}
        >
          <Link to="/products" className="font-bold text-sm tracking-widest uppercase hover:text-white/70 transition-colors flex items-center gap-2">
            <span>←</span> Back to Library
          </Link>
          <div className="font-mono text-xs opacity-70 uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
            {ebook.category || 'Uncategorized'}
          </div>
        </motion.header>

          {/* Bottom Content Area */}
          <div className="w-full p-6 md:p-12 max-w-6xl mx-auto flex flex-col justify-end h-full pointer-events-auto z-30 relative">
            
            {/* Project Typography - Fades in */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easing }}
              className="mb-6 text-white"
            >
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 leading-tight"
                style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
              >
                {ebook.title}
              </h1>
              <p 
                className="text-lg md:text-2xl font-light text-white/90 max-w-2xl"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                A masterclass by {ebook.author || 'Unknown'}
              </p>
            </motion.div>

            {/* Bottom Badges & CTA - Slides up */}
            <motion.div 
              className="flex flex-wrap gap-4 items-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: easing }}
            >
              {/* Price Badge */}
              <div className="px-6 py-3 bg-white text-black font-bold text-xl rounded-full shadow-lg flex items-center gap-2">
                {(ebook.discount_percentage && ebook.discount_percentage > 0) ? (
                  <>
                    <span>${(ebook.price - (ebook.price * ebook.discount_percentage / 100)).toFixed(2)}</span>
                    <span className="text-sm text-black/40 line-through">${ebook.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span>${ebook.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* CTA Pill */}
              {!isPurchased ? (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 bg-primary text-white font-bold text-xl rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center min-w-[220px]"
                >
                  Get Instant Access
                </button>
              ) : (
                <a 
                  href={ebook.book_file_url || '#'}
                  download
                  onClick={() => {
                    setTimeout(() => {
                      navigate('/');
                    }, 1000);
                  }}
                  className="px-8 py-3 bg-green-500 text-white font-bold text-xl rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download E-Book
                </a>
              )}

              {(ebook.discount_percentage && ebook.discount_percentage > 0) ? (
                <div className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 text-white rounded-full text-sm font-bold capitalize">
                  {ebook.sale_name || 'Limited Time Offer'} -{ebook.discount_percentage}%
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Below Hero Scrollable Content */}
      <section className="relative z-10 bg-background w-full min-h-[50vh] px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Description Area */}
            <div className="flex-1">
              <ScrollFloat tag="h2" text="About this book" containerClassName="text-3xl font-bold mb-8" />
              <p className="text-text/80 text-xl leading-relaxed mb-12 font-light">
                {ebook.description || 'Unlock the secrets to mastering this topic. This comprehensive guide will take you step-by-step through proven strategies, designed specifically for ambitious learners who want to reach the frontier of their industry.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-text/5 rounded-2xl">
                  <h3 className="font-bold mb-2">Instant Delivery</h3>
                  <p className="text-text/60 text-sm">Download immediately after secure checkout.</p>
                </div>
                <div className="p-6 bg-text/5 rounded-2xl">
                  <h3 className="font-bold mb-2">Lifetime Access</h3>
                  <p className="text-text/60 text-sm">Read on any device, anywhere, anytime.</p>
                </div>
              </div>
            </div>

            {/* Social Proof Area */}
            <div className="w-full md:w-72 shrink-0">
              <div className="p-8 bg-text/5 rounded-3xl sticky top-32">
                <h3 className="font-bold text-lg mb-4">Trusted by Readers</h3>
                <div className="flex -space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-200 border-4 border-background"></div>
                  <div className="w-12 h-12 rounded-full bg-green-200 border-4 border-background"></div>
                  <div className="w-12 h-12 rounded-full bg-yellow-200 border-4 border-background"></div>
                  <div className="w-12 h-12 rounded-full bg-purple-200 border-4 border-background flex items-center justify-center text-xs font-bold">+2k</div>
                </div>
                <p className="text-sm font-medium text-text/70 mb-8">
                  Join <span className="text-text font-bold">2,400+</span> professionals who have already mastered this subject.
                </p>
                
                <Link 
                  to={`/checkout/${ebook.id}`}
                  className="w-full py-4 bg-primary text-white text-center font-bold rounded-xl block hover:bg-primary/90 transition-colors"
                >
                  Purchase Now
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Payment Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isPurchasing && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Complete Purchase</h2>
                  <button 
                    onClick={() => !isPurchasing && setIsModalOpen(false)}
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-2xl">
                  <img src={ebook.cover_image_url} className="w-12 h-16 object-cover rounded shadow-sm" alt="" />
                  <div>
                    <h3 className="font-bold text-black line-clamp-1">{ebook.title}</h3>
                    <p className="text-primary font-bold">
                      ${((ebook.discount_percentage && ebook.discount_percentage > 0) ? (ebook.price - (ebook.price * ebook.discount_percentage / 100)) : ebook.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePurchase} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Email Address</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-black" placeholder="you@example.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Card Information</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-black mb-3" placeholder="0000 0000 0000 0000" />
                    <div className="flex gap-3">
                      <input type="text" required className="w-1/2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-black" placeholder="MM/YY" />
                      <input type="text" required className="w-1/2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-black" placeholder="CVC" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isPurchasing}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all mt-6 shadow-lg disabled:opacity-70 flex justify-center items-center"
                  >
                    {isPurchasing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay $${((ebook.discount_percentage && ebook.discount_percentage > 0) ? (ebook.price - (ebook.price * ebook.discount_percentage / 100)) : ebook.price).toFixed(2)}`
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default ProductDetails;
