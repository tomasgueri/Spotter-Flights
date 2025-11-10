import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SearchFormState, Airport, CabinClass } from './types';

const initialState: SearchFormState = {
  origin: null,
  destination: null,
  departureDate: null,
  returnDate: null,
  tripType: 'one-way',
  passengers: 1,
  cabinClass: 'economy',
  hasSearched: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<Airport | null>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<Airport | null>) => {
      state.destination = action.payload;
    },
    swapOriginDestination: (state) => {
      const temp = state.origin;
      state.origin = state.destination;
      state.destination = temp;
    },
    setDepartureDate: (state, action: PayloadAction<string | null>) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action: PayloadAction<string | null>) => {
      state.returnDate = action.payload;
    },
    setTripType: (state, action: PayloadAction<'one-way' | 'round-trip'>) => {
      state.tripType = action.payload;
      if (action.payload === 'one-way') {
        state.returnDate = null;
      }
    },
    setPassengers: (state, action: PayloadAction<number>) => {
      state.passengers = action.payload;
    },
    setCabinClass: (state, action: PayloadAction<CabinClass>) => {
      state.cabinClass = action.payload;
    },
    markAsSearched: (state) => {
      state.hasSearched = true;
    },
    resetSearch: () => initialState,
  },
});

export const {
  setOrigin,
  setDestination,
  swapOriginDestination,
  setDepartureDate,
  setReturnDate,
  setTripType,
  setPassengers,
  setCabinClass,
  markAsSearched,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;

