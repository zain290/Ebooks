import React from 'react';
import ScrollFloat from '../ScrollFloat';

const DailyVisitors: React.FC = () => {
  return (
    <div className="rounded-full py-2 pl-2 pr-6 flex items-center gap-4 shadow-md w-max border border-gray-100" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="flex -space-x-3">
        <img src="https://i.pravatar.cc/100?img=1" alt="Visitor 1" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        <img src="https://i.pravatar.cc/100?img=2" alt="Visitor 2" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        <img src="https://i.pravatar.cc/100?img=3" alt="Visitor 3" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold z-10" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}>
          +
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-black text-base sm:text-lg leading-tight" style={{ color: 'var(--color-text)' }}>
          <ScrollFloat text="3500K+" />
        </span>
        <span className="text-[10px] sm:text-xs font-medium leading-none tracking-wide capitalize mt-0.5 whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>
          <ScrollFloat text="Our Daily Visitors" />
        </span>
      </div>
    </div>
  );
};

export default DailyVisitors;
