import React, { useState, useCallback, useEffect } from 'react';
import { Library } from 'lucide-react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import type { Book, SearchResponse } from './types/book';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Fetch popular books on initial load
  useEffect(() => {
    const fetchPopularBooks = async () => {
      setLoading(true);
      try {
        const popularQueries = [
          'The Lord of the Rings',
          'Harry Potter',
          'Pride and Prejudice',
          '1984',
          'The Great Gatsby'
        ];
        const query = popularQueries[Math.floor(Math.random() * popularQueries.length)];
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data: SearchResponse = await response.json();
        setBooks(data.docs);
      } catch (error) {
        console.error('Error fetching initial books:', error);
        setError('Failed to load featured books. Please try searching instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBooks();
  }, []);

  const searchBooks = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data: SearchResponse = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Library size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">BookFinder</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="flex justify-center mb-8">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={searchBooks}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-600 mb-4">
            {error}
          </div>
        )}

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : books.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {query ? 'Search Results' : 'Featured Books'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>
          </>
        ) : query ? (
          <div className="text-center text-gray-600">
            No books found. Try adjusting your search terms.
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Loading featured books...
          </div>
        )}
      </main>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default App;