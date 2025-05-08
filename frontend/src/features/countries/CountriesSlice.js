import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import countriesService from './countriesService';

const initialState = {
  countries: [],
  selectedCountry: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all countries
export const getCountries = createAsyncThunk(
  'countries/getAll',
  async (_, thunkAPI) => {
    try {
      return await countriesService.getCountries();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get country details
export const getCountryDetails = createAsyncThunk(
  'countries/getDetails',
  async (countryName, thunkAPI) => {
    try {
      return await countriesService.getCountryDetails(countryName);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add/remove country from favorites
export const toggleFavorite = createAsyncThunk(
  'countries/toggleFavorite',
  async (country, thunkAPI) => {
    try {
      const currentFavorites = thunkAPI.getState().countries.favorites;
      
      // Check if country is already in favorites
      const isAlreadyFavorite = currentFavorites.some(
        (fav) => fav.name.common === country.name.common
      );
      
      let updatedFavorites;
      
      if (isAlreadyFavorite) {
        // Remove from favorites
        updatedFavorites = currentFavorites.filter(
          (fav) => fav.name.common !== country.name.common
        );
      } else {
        // Add to favorites
        updatedFavorites = [...currentFavorites, country];
      }
      
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      return updatedFavorites;
    } catch (error) {
      const message = error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.countries = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCountryDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountryDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedCountry = action.payload[0];
      })
      .addCase(getCountryDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { reset, setSelectedCountry, clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;