import React from 'react';
import { Book as BookIcon, User, Calendar } from 'lucide-react';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400';

  return (
    <div 
      onClick={onClick}
      className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {book.ratings_average && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            ★ {book.ratings_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{book.title}</h3>
        <div className="space-y-2 text-sm text-gray-600 flex-1">
          {book.author_name && (
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="line-clamp-1">{book.author_name[0]}</span>
            </div>
          )}
          {book.first_publish_year && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{book.first_publish_year}</span>
            </div>
          )}
          {book.edition_count && (
            <div className="flex items-center gap-2">
              <BookIcon size={16} />
              <span>{book.edition_count} editions</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}