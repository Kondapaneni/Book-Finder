import React from 'react';
import { X, Book as BookIcon, User, Calendar, Globe, Tag } from 'lucide-react';
import type { Book } from '../types/book';

interface BookDetailsProps {
  book: Book;
  onClose: () => void;
}

export default function BookDetails({ book, onClose }: BookDetailsProps) {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600&h=800';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="flex flex-col space-y-4">
            <img
              src={coverUrl}
              alt={book.title}
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h2>
              {book.author_name && (
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={20} />
                  <span className="text-lg">{book.author_name.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {book.first_publish_year && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} />
                  <span>First published in {book.first_publish_year}</span>
                </div>
              )}
              {book.edition_count && (
                <div className="flex items-center gap-2 text-gray-600">
                  <BookIcon size={20} />
                  <span>{book.edition_count} editions</span>
                </div>
              )}
              {book.language && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={20} />
                  <span>{book.language.length} languages</span>
                </div>
              )}
            </div>

            {book.subject && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Tag size={20} />
                  Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {book.subject.slice(0, 8).map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View on Open Library
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}