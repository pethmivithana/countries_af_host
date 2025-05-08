import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCountry, toggleFavorite } from '../features/countries/CountriesSlice';

function CountryCard({ country }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.countries);
  
  const isFavorite = favorites.some(
    (fav) => fav.name.common === country.name.common
  );

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(country));
  };

  const handleCardClick = () => {
    dispatch(setSelectedCountry(country));
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="relative h-40">
        <img
          src={country.flags.png || country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
        <button
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 rounded-full"
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{country.name.common}</h3>
        <div className="text-sm">
          <p>
            <span className="font-medium">Capital:</span>{' '}
            {country.capital ? country.capital[0] : 'N/A'}
          </p>
          <p>
            <span className="font-medium">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-medium">Population:</span>{' '}
            {country.population.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;