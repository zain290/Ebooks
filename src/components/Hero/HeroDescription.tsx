import React from 'react';
import ScrollFloat from '../ScrollFloat';

const HeroDescription: React.FC = () => {
  return (
    <ScrollFloat
      tag="p"
      text="Immerse yourself in a vast collection of e-books tailored for every reader."
      containerClassName="text-[#555555] font-medium text-sm md:text-base max-w-xs leading-relaxed text-right md:text-left self-end md:self-auto mb-4 md:mb-0"
    />
  );
};

export default HeroDescription;
