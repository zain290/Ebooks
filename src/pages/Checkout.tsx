import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollFloat from '../components/ScrollFloat';

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

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [ebook, setEbook] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/ebooks/${id}`)
      .then(res => res.json())
      .then(data => setEbook(data));
  }, [id]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  if (!ebook) return null;

  const actualPrice = ebook.discount_percentage ? (ebook.price - (ebook.price * ebook.discount_percentage / 100)) : ebook.price;
  const theme = CATEGORY_THEMES[ebook.category] || CATEGORY_THEMES.Uncategorized;

  return (
    <div 
      className="min-h-screen bg-text/5 flex items-center justify-center py-20 px-4 transition-colors duration-700"
      style={{
        '--color-primary': theme.primary,
        '--color-background': theme.bg,
      } as React.CSSProperties}
    >
      <div className="max-w-4xl w-full bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Product Summary */}
        <div className="w-full md:w-1/3 bg-primary/5 p-8 border-b md:border-b-0 md:border-r border-text/10 flex flex-col">
          <ScrollFloat tag="h3" text="Order Summary" containerClassName="text-lg font-medium text-text/60 mb-6" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-24 bg-text/10 rounded shadow-sm overflow-hidden flex-shrink-0">
              {ebook.cover_image_url && <img src={ebook.cover_image_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div>
              <h4 className="font-bold line-clamp-2 text-sm">{ebook.title}</h4>
              <p className="text-primary font-medium mt-1">${actualPrice.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-auto pt-6 border-t border-text/10">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${actualPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-2/3 p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <ScrollFloat tag="h2" text="Checkout" containerClassName="text-2xl font-bold" />
            <span className="text-sm text-text/40 font-medium">Step {step} of 3</span>
          </div>

          <form onSubmit={handleNext}>
            <AnimateStep step={step} current={1}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text/70">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="you@example.com" />
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 mt-6">Continue to Payment</button>
              </div>
            </AnimateStep>

            <AnimateStep step={step} current={2}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text/70">Card Information</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="flex gap-4">
                  <input type="text" required className="w-1/2 px-4 py-3 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="MM/YY" />
                  <input type="text" required className="w-1/2 px-4 py-3 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="CVC" />
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 py-4 bg-transparent border border-text/20 text-text/70 rounded-lg font-bold">Back</button>
                  <button type="submit" className="w-2/3 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90">Pay ${actualPrice.toFixed(2)}</button>
                </div>
              </div>
            </AnimateStep>

            <AnimateStep step={step} current={3}>
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <ScrollFloat tag="h3" text="Payment Successful!" containerClassName="text-3xl font-bold mb-4" />
                <p className="text-text/60 mb-8">Your e-book is ready for download and a receipt has been sent to your email.</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href={ebook.book_file_url || '#'} 
                    download 
                    onClick={() => {
                      // Navigate back to main page after a short delay to allow download to start
                      setTimeout(() => {
                        navigate('/');
                      }, 1000);
                    }}
                    className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1 text-center"
                  >
                    Download Book
                  </a>
                </div>
              </div>
            </AnimateStep>
          </form>
        </div>
      </div>
    </div>
  );
};

const AnimateStep = ({ step, current, children }: { step: number, current: number, children: React.ReactNode }) => {
  if (step !== current) return null;
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      {children}
    </motion.div>
  );
};

export default Checkout;
