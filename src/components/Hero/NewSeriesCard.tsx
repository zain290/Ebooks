import React from 'react';
import ScrollFloat from '../ScrollFloat';
import Stack from '../Stack';

const TRENDING_BOOKS = [
  {
    id: 1,
    title: 'A Legend of Ice and Fire',
    subtitle: 'The Ice Horse',
    badge: '#1 Trending',
    badgeColor: 'bg-red-500',
    cover: 'https://images.unsplash.com/photo-1629196914225-eb20f0119e71?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 2,
    title: 'The Midnight Library',
    subtitle: 'Matt Haig',
    badge: 'Bestseller',
    badgeColor: 'bg-amber-500',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 3,
    title: 'Atomic Habits',
    subtitle: 'James Clear',
    badge: 'Top Pick',
    badgeColor: 'bg-emerald-500',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 4,
    title: 'The Great Mystery',
    subtitle: 'Detective Series',
    badge: 'New Release',
    badgeColor: 'bg-purple-500',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=500'
  }
];

const NewSeriesCard: React.FC = () => {
  const cards = TRENDING_BOOKS.map((book) => (
    <div key={book.id} className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg select-none group bg-black/10">
      <img 
        src={book.cover} 
        alt={book.title} 
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 z-10">
        <span className={`${book.badgeColor} text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider`}>
          {book.badge}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
        <p className="text-white font-black text-sm line-clamp-1 leading-tight">{book.title}</p>
        <p className="text-white/80 text-[11px] font-medium line-clamp-1 mt-0.5">{book.subtitle}</p>
      </div>
    </div>
  ));

  return (
    <div className="bg-gradient-to-b from-[#FDFBF7] to-[#FEE599] rounded-[32px] p-6 pb-7 flex flex-col items-center justify-between w-full h-full shadow-sm relative overflow-hidden">
      
      {/* Interactive Stack Illustration Area */}
      <div className="w-full flex-1 flex items-center justify-center relative mb-4 pt-2">
        <div className="w-[230px] sm:w-[260px] h-[200px] sm:h-[220px] relative">
          <Stack
            cards={cards}
            randomRotation={true}
            sensitivity={120}
            sendToBackOnClick={true}
            autoplay={false}
            pauseOnHover={true}
          />
        </div>
      </div>

      {/* Bottom Text */}
      <div className="w-full text-left px-2 flex flex-col items-start z-10">
        <ScrollFloat
          tag="h3"
          text="NEW SERIES COLLECTION"
          containerClassName="text-[#1A1A1A] font-black text-xl sm:text-2xl tracking-tight mb-1 uppercase"
        />
        <ScrollFloat
          tag="p"
          text="A Legend of Ice and Fire: Trending Series"
          containerClassName="text-[#333333] font-medium text-xs sm:text-sm leading-snug"
        />
      </div>
    </div>
  );
};

export default NewSeriesCard;
