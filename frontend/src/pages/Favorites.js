import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CountryCard from '../components/countryCard';
import CountryDetails from '../components/CountryDetails';

function Favorites() {
  const { favorites, selectedCountry } = useSelector((state) => state.countries);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFavorites = favorites.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaHeart className="text-red-500 text-2xl mr-3" />
          <h1 className="text-3xl font-bold">Your Favorite Countries</h1>
        </div>
        <Link to="/" className="btn btn-secondary">
          Back to Countries
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search favorites..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredFavorites.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">No favorite countries yet.</p>
          <Link to="/" className="btn btn-primary">
            Explore Countries
          </Link>
        </div>
      )}

      {selectedCountry && <CountryDetails />}
    </div>
  );
}

export default Favorites;