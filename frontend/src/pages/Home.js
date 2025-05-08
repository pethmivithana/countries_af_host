import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CountryCard from '../components/countryCard';
import CountryDetails from '../components/CountryDetails';
import SearchFilter from '../components/SearchFilter';
import Spinner from '../components/Spinner';
import { getCountries } from '../features/countries/CountriesSlice';

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { countries, selectedCountry, isLoading, favorites } = useSelector(
    (state) => state.countries
  );

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    // Apply filters
    let results = [...countries];

    // Filter by search term
    if (searchTerm) {
      results = results.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (regionFilter !== 'All') {
      results = results.filter((country) => country.region === regionFilter);
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      results = results.filter((country) =>
        favorites.some((fav) => fav.name.common === country.name.common)
      );
    }

    setFilteredCountries(results);
  }, [countries, searchTerm, regionFilter, showFavoritesOnly, favorites]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (region) => {
    setRegionFilter(region);
  };

  const toggleFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  if (isLoading && countries.length === 0) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">World Countries Explorer</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore countries around the world, view details, and save your favorites.
        </p>
        
        {!user && (
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6 mb-8">
            <Link to="/login" className="btn btn-primary px-8">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary px-8">
              Register
            </Link>
          </div>
        )}
      </div>
      
      <SearchFilter
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={toggleFavorites}
      />
      
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No countries found matching your criteria.</p>
        </div>
      )}
      
      {selectedCountry && <CountryDetails />}
    </div>
  );
}

export default Home;