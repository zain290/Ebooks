import React from 'react';
import Stack from '../Stack';

const TRENDING_BOOKS = [
  {
    id: 1,
    title: 'A Legend of Ice and Fire',
    subtitle: 'The Ice Horse',
    badge: '#1 Trending',
    badgeColor: 'bg-red-500',
    cover: 'https://images.unsplash.com/photo-1629196914225-eb20f0119e71?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'The Midnight Library',
    subtitle: 'Matt Haig',
    badge: 'Bestseller',
    badgeColor: 'bg-amber-500',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Atomic Habits',
    subtitle: 'James Clear',
    badge: 'Top Pick',
    badgeColor: 'bg-emerald-500',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    title: 'The Great Mystery',
    subtitle: 'Detective Series',
    badge: 'New Release',
    badgeColor: 'bg-purple-500',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600'
  }
];

const NewSeriesCard: React.FC = () => {
  const cards = TRENDING_BOOKS.map((book) => (
    <div key={book.id} className="relative w-full h-full rounded-[24px] overflow-hidden select-none group bg-black/5">
      <img 
        src={book.cover} 
        alt={book.title} 
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-4 left-4 z-10">
        <span className={`${book.badgeColor} text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider`}>
          {book.badge}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
        <p className="text-white font-black text-lg sm:text-xl line-clamp-1 leading-tight">{book.title}</p>
        <p className="text-white/80 text-xs sm:text-sm font-medium line-clamp-1 mt-1">{book.subtitle}</p>
      </div>
    </div>
  ));

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Stack
        cards={cards}
        randomRotation={true}
        sensitivity={140}
        sendToBackOnClick={true}
        autoplay={false}
        pauseOnHover={true}
      />
    </div>
  );
};

export default NewSeriesCard;
