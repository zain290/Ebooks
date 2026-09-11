import React from 'react';
import { motion } from 'framer-motion';
import ScrollFloat from '../components/ScrollFloat';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 flex flex-col items-center"
      >
        <ScrollFloat
          tag="h1"
          text="Our Story"
          containerClassName="text-4xl md:text-5xl font-bold mb-6"
        />
        <ScrollFloat
          tag="p"
          text="We believe that knowledge should be accessible, beautiful, and transformative."
          containerClassName="text-lg text-text/70 leading-relaxed"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8 text-text/80 leading-relaxed text-lg"
      >
        <p>
          Founded on the principles of minimalism and extreme clarity, our platform was built for readers who are tired of clutter. 
          We strip away the noise so you can focus entirely on what matters: the content.
        </p>
        <p>
          Every e-book in our collection is carefully curated to ensure it provides actionable value, free from fluff.
          We partner with industry experts to bring you high-quality guides that respect your time and attention.
        </p>
        
        <div className="my-12 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center flex flex-col items-center">
          <ScrollFloat
            tag="h3"
            text="Our Mission"
            containerClassName="text-2xl font-bold text-primary mb-4"
          />
          <ScrollFloat
            tag="p"
            text='"To elevate the digital reading experience through pristine design and powerful ideas."'
            containerClassName="italic text-text/70"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default About;
