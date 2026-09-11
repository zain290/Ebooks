import React from 'react';
import ScrollFloat from '../ScrollFloat';

const HeroHeadline: React.FC = () => {
  return (
    <ScrollFloat
      tag="h1"
      text="TURN THE PAGE TO NEW AND FAMILIAR THE TALES"
      containerClassName="text-[#1A1A1A] font-bold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-4 max-w-[800px] uppercase tracking-tight"
    />
  );
};

export default HeroHeadline;
