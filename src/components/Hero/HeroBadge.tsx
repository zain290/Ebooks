import React from 'react';
import ScrollFloat from '../ScrollFloat';

const HeroBadge: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
      <div className="bg-[#E63946] text-white font-bold rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-center text-xs sm:text-sm transform -rotate-12 shadow-lg leading-tight flex-shrink-0 border-2 border-white">
        TOP<br/>RATED
      </div>
      <div>
        <ScrollFloat
          tag="p"
          text="Welcome to a literary haven where every page invites you to discover new worlds and stories."
          containerClassName="text-[#333333] font-medium text-sm sm:text-base max-w-xs leading-snug"
        />
      </div>
    </div>
  );
};

export default HeroBadge;
