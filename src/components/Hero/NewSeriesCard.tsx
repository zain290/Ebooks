import React from 'react';
import Stack from '../Stack';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  cover_image_url: string;
}

interface NewSeriesCardProps {
  books: Book[];
}

const NewSeriesCard: React.FC<NewSeriesCardProps> = ({ books }) => {
  const cards = books.map((book) => (
    <div key={book.id} className="relative w-full h-full rounded-[24px] overflow-hidden select-none group bg-black/5">
      <img 
        src={book.cover_image_url} 
        alt={book.title} 
        className="w-full h-full object-contain pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-4 left-4 z-10">
        <span className={`bg-primary/90 text-white text-[11px] font-black capitalize px-3 py-1 rounded-full shadow-md tracking-wider`}>
          {book.category}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
        <p className="text-white font-black text-lg sm:text-xl line-clamp-1 leading-tight">{book.title}</p>
        <p className="text-white/80 text-xs sm:text-sm font-medium line-clamp-1 mt-1">{book.author}</p>
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
