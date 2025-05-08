import { useEffect } from 'react';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedCountry, toggleFavorite } from '../features/countries/CountriesSlice';
import Spinner from './Spinner';

function CountryDetails() {
  const dispatch = useDispatch();
  const { selectedCountry, isLoading, favorites } = useSelector((state) => state.countries);
  
  const isFavorite = favorites.some(
    (fav) => selectedCountry && fav.name.common === selectedCountry.name.common
  );

  useEffect(() => {
    // Add no-scroll class to body when modal is open
    document.body.classList.add('overflow-hidden');
    
    // Clean up function
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleClose = () => {
    dispatch(clearSelectedCountry());
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(selectedCountry));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!selectedCountry) {
    return null;
  }

  // Format currencies
  const currencies = selectedCountry.currencies
    ? Object.values(selectedCountry.currencies)
        .map((currency) => currency.name)
        .join(', ')
    : 'N/A';

  // Format languages
  const languages = selectedCountry.languages
    ? Object.values(selectedCountry.languages).join(', ')
    : 'N/A';

  // Format border countries
  const borders = selectedCountry.borders
    ? selectedCountry.borders.join(', ')
    : 'None';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <button 
            onClick={handleClose}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src={selectedCountry.flags.svg || selectedCountry.flags.png}
                  alt={`Flag of ${selectedCountry.name.common}`}
                  className="w-full h-auto rounded-md shadow-md"
                />
                <button
                  className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 rounded-full"
                  onClick={handleFavoriteClick}
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-600 text-xl" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">{selectedCountry.name.common}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                <p>
                  <span className="font-semibold">Official Name:</span>{' '}
                  {selectedCountry.name.official}
                </p>
                <p>
                  <span className="font-semibold">Population:</span>{' '}
                  {selectedCountry.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region:</span> {selectedCountry.region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span>{' '}
                  {selectedCountry.subregion || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{' '}
                  {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Top Level Domain:</span>{' '}
                  {selectedCountry.tld ? selectedCountry.tld[0] : 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span> {currencies}
                </p>
                <p>
                  <span className="font-semibold">Languages:</span> {languages}
                </p>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Border Countries:</p>
                <p>{borders}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;