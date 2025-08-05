import React, { useState } from 'react';
import { searchBooks } from '../api/bookSearchApi';

function SearchBookModal({ isOpen, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await searchBooks(query);
      setResults(response.data.books);
    } catch (err) {
      console.error('검색 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">🔍 도서 검색</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="검색어 입력"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            검색
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">검색 중...</p>
        ) : results.length > 0 ? (
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {results.map((book) => (
              <li
                key={book.isbn13}
                className="border p-3 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(book);
                  onClose();
                }}
              >
                <div className="flex gap-3 items-center">
                  {book.cover && (
                    <img
                      src={book.cover}
                      alt="cover"
                      className="w-12 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{book.title}</div>
                    <div className="text-sm text-gray-600">{book.author}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBookModal;
