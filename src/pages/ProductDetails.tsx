import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ebooks/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) navigate('/products');
        else setEbook(data);
        setLoading(false);
      })
      .catch(() => {
        navigate('/products');
      });
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-12 h-12 bg-primary/20 rounded-full"></div></div>;
  if (!ebook) return null;

  const theme = CATEGORY_THEMES[ebook.category] || CATEGORY_THEMES.Uncategorized;

  return (
    <div 
      className="min-h-screen pt-24 pb-16 px-4 transition-colors duration-700"
      style={{
        '--color-primary': theme.primary,
        '--color-background': theme.bg,
      } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto">
        <Link to="/products" className="inline-block mb-8 text-text/60 hover:text-primary transition-colors">
          ← Back to Library
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Left: 3D Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative aspect-[3/4] w-full max-w-md rounded-lg shadow-2xl overflow-hidden transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
            {ebook.cover_image_url ? (
              <img src={ebook.cover_image_url} alt={ebook.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-text/5 flex items-center justify-center">No Cover</div>
            )}
          </div>
        </motion.div>

        {/* Right: Details & Psychology */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col justify-center"
        >
          {(ebook.discount_percentage && ebook.discount_percentage > 0) ? (
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4 capitalize tracking-wider w-max">
              <ScrollFloat tag="span" text={`${ebook.sale_name || 'Limited Time Offer'} -${ebook.discount_percentage}%`} />
            </div>
          ) : null}
          <ScrollFloat
            tag="h1"
            text={ebook.title}
            containerClassName="text-4xl md:text-5xl font-bold mb-2 leading-tight"
          />
          <ScrollFloat
            tag="p"
            text={`by ${ebook.author || 'Unknown'}`}
            containerClassName="text-lg text-text/50 mb-6"
          />
          
          <div className="mb-8 flex items-end gap-3">
            {(ebook.discount_percentage && ebook.discount_percentage > 0) ? (
              <>
                <span className="text-4xl font-bold text-primary">${(ebook.price - (ebook.price * ebook.discount_percentage / 100)).toFixed(2)}</span>
                <span className="text-lg text-text/40 line-through mb-1">${ebook.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-4xl font-bold text-primary">${ebook.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-text/80 text-lg leading-relaxed mb-10">
            {ebook.description || 'Unlock the secrets to mastering this topic. This comprehensive guide will take you step-by-step through proven strategies.'}
          </p>

          {/* Social Proof */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-text/5 rounded-xl">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-background"></div>
              <div className="w-10 h-10 rounded-full bg-green-200 border-2 border-background"></div>
              <div className="w-10 h-10 rounded-full bg-yellow-200 border-2 border-background"></div>
            </div>
            <p className="text-sm font-medium text-text/70">
              Joined by <span className="text-text font-bold">2,400+</span> readers
            </p>
          </div>

          <Link 
            to={`/checkout/${ebook.id}`}
            className="w-full text-center px-8 py-5 bg-primary text-white rounded-xl font-bold text-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)] transform hover:-translate-y-1 block"
          >
            <ScrollFloat tag="span" text="Get Instant Access" />
          </Link>
          <p className="text-center text-sm text-text/40 mt-4 flex items-center justify-center gap-2">
            <span>🔒 Secure Checkout</span> • <span>Instant Download</span>
          </p>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;
