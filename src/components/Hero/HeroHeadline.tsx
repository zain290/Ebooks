import React from 'react';
import ScrollFloat from '../ScrollFloat';

const HeroHeadline: React.FC = () => {
  return (
    <ScrollFloat
      tag="h1"
      text="Turn The Page To New And Familiar Tales"
      containerClassName="text-[#2E1065] font-medium text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-4 max-w-[800px] tracking-tight"
    />
  );
};

export default HeroHeadline;
