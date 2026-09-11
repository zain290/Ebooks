import React from 'react';
import SplitText from '../SplitText';

const HeroHeadline: React.FC = () => {
  return (
    <SplitText
      tag="h1"
      text="TURN THE PAGE TO NEW AND FAMILIAR THE TALES"
      className="text-[#1A1A1A] font-bold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-4 max-w-[800px] uppercase tracking-tight"
      textAlign="left"
      delay={30}
      duration={0.8}
    />
  );
};

export default HeroHeadline;
