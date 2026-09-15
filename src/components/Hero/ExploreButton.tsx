import React from 'react';
import { Link } from 'react-router-dom';
import ScrollFloat from '../ScrollFloat';

const ExploreButton: React.FC = () => {
  return (
    <div className="group relative mt-6 w-full max-w-[280px] h-[45px] rounded-full cursor-pointer">
      {/* Wireframe Container stretching horizontally */}
      <div className="absolute inset-0 border rounded-full pointer-events-none" style={{ borderColor: 'var(--color-text)' }}></div>
      
      {/* Expanding Pill Button positioned left inside the wireframe */}
      <div className="absolute left-1 top-1 bottom-1 w-[170px] group-hover:w-[calc(100%-8px)] rounded-full transition-all duration-400 ease-out flex items-center justify-between px-3.5 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--color-text)' }}>
        
        {/* Animated Text */}
        <span className="font-bold text-xs sm:text-sm whitespace-nowrap pl-1" style={{ color: 'var(--color-background)' }}>
          <ScrollFloat text="Explore Now" />
        </span>
        
        {/* Arrow Icon fixed to the right of the expanding pill */}
        <div className="rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center text-[10px] ml-2 transition-transform duration-400 group-hover:rotate-45" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
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
