import React from 'react';
import ScrollFloat from '../ScrollFloat';

const HeroDescription: React.FC = () => {
  return (
    <div className="w-full flex justify-start lg:justify-end">
      <ScrollFloat
        tag="p"
        text="Immerse yourself in a vast collection of e-books tailored for every reader."
        containerClassName="text-[#555555] font-medium text-sm md:text-base max-w-sm leading-relaxed text-left"
      />
    </div>
  );
};

export default HeroDescription;
