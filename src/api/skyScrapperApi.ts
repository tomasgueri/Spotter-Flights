import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Airport } from '../features/search/types';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'sky-scrapper.p.rapidapi.com';

export interface AirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: Array<{
    skyId: string;
    entityId: string;
    presentation: {
      title: string;
      subtitle: string;
      suggestionTitle: string;
    };
    navigation: {
      entityId: string;
      entityType: string;
      localizedName: string;
      relevantFlightParams: {
        skyId: string;
        entityId: string;
        flightPlaceType: string;
        localizedName: string;
      };
    };
  }>;
}

export interface FlightLeg {
  id: string;
  origin: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
  };
  destination: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
  };
  durationInMinutes: number;
  stopCount: number;
  departure: string;
  arrival: string;
  carriers: {
    marketing: Array<{
      id: number;
      logoUrl: string;
      name: string;
    }>;
  };
  segments: Array<{
    id: string;
    origin: { flightPlaceId: string; displayCode: string; name: string };
    destination: { flightPlaceId: string; displayCode: string; name: string };
    departure: string;
    arrival: string;
    durationInMinutes: number;
    marketingCarrier: { id: number; name: string; logoUrl: string };
    operatingCarrier: { id: number; name: string; logoUrl: string };
  }>;
}

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
}

export interface FlightSearchResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: {
    itineraries: FlightItinerary[];
    filterStats?: {
      duration: { min: number; max: number };
      stops: { direct: number; one: number; twoormore: number };
    };
  };
}

export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  adults: number;
  cabinClass: string;
  currency?: string;
  market?: string;
  locale?: string;
}

export const skyScrapperApi = createApi({
  reducerPath: 'skyScrapperApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${RAPIDAPI_HOST}/api/v1`,
    prepareHeaders: (headers) => {
      if (RAPIDAPI_KEY) {
        headers.set('x-rapidapi-key', RAPIDAPI_KEY);
        headers.set('x-rapidapi-host', RAPIDAPI_HOST);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    searchAirports: builder.query<Airport[], string>({
      query: (searchQuery) => ({
        url: '/flights/searchAirport',
        params: { query: searchQuery },
      }),
      transformResponse: (response: AirportSearchResponse): Airport[] => {
        if (!response.data) return [];
        
        return response.data
          .filter((item) => item.navigation?.entityType === 'AIRPORT')
          .map((item) => {
            const iataMatch = item.presentation.suggestionTitle.match(/\(([A-Z]{3})\)/);
            const iata = iataMatch ? iataMatch[1] : item.skyId;
            
            return {
              skyId: item.skyId,
              entityId: item.entityId,
              iata: iata,
              name: item.presentation.title,
              city: item.presentation.title,
              country: item.presentation.subtitle,
              countryCode: '',
            };
          });
      },
    }),
    searchFlights: builder.query<FlightSearchResponse, FlightSearchParams>({
      query: (params) => ({
        url: '/flights/searchFlights',
        params: {
          originSkyId: params.originSkyId,
          destinationSkyId: params.destinationSkyId,
          originEntityId: params.originEntityId,
          destinationEntityId: params.destinationEntityId,
          date: params.date,
          adults: params.adults.toString(),
          cabinClass: params.cabinClass,
          currency: params.currency || 'USD',
          market: params.market || 'en-US',
          locale: params.locale || 'en-US',
        },
      }),
    }),
  }),
});

export const { useSearchAirportsQuery, useSearchFlightsQuery, useLazySearchFlightsQuery } = skyScrapperApi;

