import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    sortBy: string;
    language: string;
    yearFrom: string;
    yearTo: string;
  };
  setFilters: (filters: any) => void;
}

export default function FilterPanel({ isOpen, onClose, filters, setFilters }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  const handleApplyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      sortBy: 'relevance',
      language: '',
      yearFrom: '',
      yearTo: '',
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-40 flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Filters</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <select
              value={localFilters.sortBy}
              onChange={(e) => setLocalFilters({ ...localFilters, sortBy: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="title">Title</option>
              <option value="year">Publication Year</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={localFilters.language}
              onChange={(e) => setLocalFilters({ ...localFilters, language: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">All Languages</option>
              <option value="eng">English</option>
              <option value="spa">Spanish</option>
              <option value="fre">French</option>
              <option value="ger">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publication Year
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="From"
                value={localFilters.yearFrom}
                onChange={(e) => setLocalFilters({ ...localFilters, yearFrom: e.target.value })}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="To"
                value={localFilters.yearTo}
                onChange={(e) => setLocalFilters({ ...localFilters, yearTo: e.target.value })}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}