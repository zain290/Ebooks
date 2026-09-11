import React from 'react';
import { Link } from 'react-router-dom';
import ScrollFloat from '../ScrollFloat';

interface Ebook {
  id: number;
  title: string;
  cover_image_url: string;
}

const BookOfTheWeek: React.FC<{ books: Ebook[] }> = ({ books }) => {
  if (!books || books.length === 0) return null;
  
  // Show only 4 books in this section
  const displayBooks = books.slice(0, 4);

  return (
    <div className="w-full pt-8 border-t border-gray-200 mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="flex flex-col">
        <ScrollFloat
          tag="h2"
          text="Book Of the Week"
          containerClassName="text-2xl font-black text-[#1A1A1A] mb-4"
        />
        <div className="flex gap-4">
          {displayBooks.map(book => (
            <Link key={book.id} to={`/products/${book.id}`} className="group relative w-24 sm:w-28 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-[3/4]">
              <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover transform transition-transform group-hover:scale-105" />
            </Link>
          ))}
        </div>
      </div>
      <Link to="/products" className="text-sm font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors inline-flex items-center">
        <ScrollFloat
          tag="span"
          text="See All Best Sellers →"
        />
      </Link>
    </div>
  );
};

export default BookOfTheWeek;
