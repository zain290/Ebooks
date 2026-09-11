import React from 'react';
import ScrollFloat from '../ScrollFloat';

const DailyVisitors: React.FC = () => {
  return (
    <div className="bg-white rounded-full py-2 pl-2 pr-6 flex items-center gap-4 shadow-md w-max border border-gray-100">
      <div className="flex -space-x-3">
        <img src="https://i.pravatar.cc/100?img=1" alt="Visitor 1" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        <img src="https://i.pravatar.cc/100?img=2" alt="Visitor 2" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        <img src="https://i.pravatar.cc/100?img=3" alt="Visitor 3" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 z-10">
          +
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-black text-[#1A1A1A] text-base sm:text-lg leading-tight">
          <ScrollFloat text="3500K+" />
        </span>
        <span className="text-[10px] sm:text-xs text-gray-500 font-medium leading-none tracking-wide uppercase mt-0.5 whitespace-nowrap">
          <ScrollFloat text="OUR DAILY VISITORS" />
        </span>
      </div>
    </div>
  );
};

export default DailyVisitors;
