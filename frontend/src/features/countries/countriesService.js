import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

// Get all countries with extended fields
const getCountries = async () => {
  const response = await axios.get(
    `${API_URL}/all?fields=name,flags,capital,population,region,subregion,languages,currencies,tld,borders`
  );
  return response.data;
};

// Get country details by name (includes full details)
const getCountryDetails = async (countryName) => {
  const response = await axios.get(`${API_URL}/name/${countryName}?fullText=true`);
  return response.data;
};

const countriesService = {
  getCountries,
  getCountryDetails,
};

export default countriesService;
