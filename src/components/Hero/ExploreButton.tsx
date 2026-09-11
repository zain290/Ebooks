import React from 'react';
import { Link } from 'react-router-dom';
import ScrollFloat from '../ScrollFloat';

const ExploreButton: React.FC = () => {
  return (
    <div className="group relative mt-6 w-full max-w-[280px] h-[45px] rounded-full overflow-hidden cursor-pointer">
      {/* Wireframe Container stretching horizontally */}
      <div className="absolute inset-0 border border-[#1A1A1A] rounded-full pointer-events-none"></div>
      
      {/* Expanding Pill Button positioned left inside the wireframe */}
      <div className="absolute left-1 top-1 bottom-1 w-[154px] group-hover:w-[calc(100%-8px)] bg-[#1A1A1A] rounded-full transition-all duration-400 ease-out flex items-center shadow-sm overflow-hidden">
        
        {/* Animated Text */}
        <div className="w-full text-center transition-all duration-400 ease-out pl-3 group-hover:pl-0">
          <ScrollFloat
            tag="span"
            text="Explore Now"
            containerClassName="text-white font-bold text-xs sm:text-sm"
          />
        </div>
        
        {/* Arrow Icon fixed to the right of the expanding pill */}
        <div className="bg-white text-[#1A1A1A] rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center text-[10px] mr-1.5 transition-transform duration-400 group-hover:rotate-45">
          →
        </div>
      </div>
      
      {/* Hidden Link covering the area for clickability */}
      <Link to="/products" className="absolute inset-0 z-10">
        <span className="sr-only">Explore Now</span>
      </Link>
    </div>
  );
};

export default ExploreButton;
