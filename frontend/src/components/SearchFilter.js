import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchFilter({ onSearch, onFilterChange, showFavoritesOnly, onToggleFavorites }) {
  const [searchTerm, setSearchTerm] = useState('');
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleRegionChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            onChange={handleRegionChange}
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region === 'All' ? 'Filter by Region' : region}
              </option>
            ))}
          </select>
          <button
            onClick={onToggleFavorites}
            className={`px-4 py-2 rounded-md font-semibold ${
              showFavoritesOnly
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showFavoritesOnly ? 'Show All' : 'Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;