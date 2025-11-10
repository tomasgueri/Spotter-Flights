import { createSelector } from '@reduxjs/toolkit';
import type { FlightItinerary } from '../../api/skyScrapperApi';
import type { SortOption, FlightFilters, TimeRange } from './types';

function isTimeInRange(isoTime: string, range: TimeRange): boolean {
  const date = new Date(isoTime);
  const hour = date.getHours();

  switch (range) {
    case 'early-morning':
      return hour >= 0 && hour < 8;
    case 'morning':
      return hour >= 8 && hour < 12;
    case 'afternoon':
      return hour >= 12 && hour < 18;
    case 'evening':
      return hour >= 18 && hour < 24;
    default:
      return true;
  }
}

export const filterFlights = (
  flights: FlightItinerary[],
  filters: FlightFilters
): FlightItinerary[] => {
  return flights.filter((flight) => {
    const leg = flight.legs[0];
    
    const stopCount = leg.stopCount;
    let stopsMatch = false;
    if (stopCount === 0) stopsMatch = filters.stops.includes(0);
    else if (stopCount === 1) stopsMatch = filters.stops.includes(1);
    else stopsMatch = filters.stops.includes(2);
    
    if (!stopsMatch) return false;
    
    if (filters.airlines.length > 0) {
      const airlineName = leg.carriers.marketing[0]?.name || '';
      if (!filters.airlines.includes(airlineName)) return false;
    }
    
    const timeMatch = filters.times.some((timeRange) =>
      isTimeInRange(leg.departure, timeRange)
    );
    if (!timeMatch) return false;
    
    if (leg.durationInMinutes > filters.maxDuration) return false;
    
    return true;
  });
};

export const filterFlightsByStops = (
  flights: FlightItinerary[],
  allowedStops: number[]
): FlightItinerary[] => {
  return flights.filter((flight) => {
    const stopCount = flight.legs[0].stopCount;
    
    if (stopCount === 0) return allowedStops.includes(0);
    if (stopCount === 1) return allowedStops.includes(1);
    return allowedStops.includes(2);
  });
};

export const sortFlights = (
  flights: FlightItinerary[],
  sortBy: SortOption
): FlightItinerary[] => {
  const sorted = [...flights];

  switch (sortBy) {
    case 'cheapest':
      return sorted.sort((a, b) => a.price.raw - b.price.raw);
    
    case 'fastest':
      return sorted.sort((a, b) => 
        a.legs[0].durationInMinutes - b.legs[0].durationInMinutes
      );
    
    case 'earliest':
      return sorted.sort((a, b) => 
        new Date(a.legs[0].departure).getTime() - new Date(b.legs[0].departure).getTime()
      );
    
    case 'best':
    default:
      return sorted.sort((a, b) => {
        const scoreA = a.price.raw + (a.legs[0].durationInMinutes * 0.5) + (a.legs[0].stopCount * 1000);
        const scoreB = b.price.raw + (b.legs[0].durationInMinutes * 0.5) + (b.legs[0].stopCount * 1000);
        return scoreA - scoreB;
      });
  }
};

export const createFilteredAndSortedFlightsSelector = () =>
  createSelector(
    [
      (flights: FlightItinerary[]) => flights,
      (_flights: FlightItinerary[], filters: FlightFilters) => filters,
      (_flights: FlightItinerary[], _filters: FlightFilters, sortBy: SortOption) => sortBy,
    ],
    (flights, filters, sortBy) => {
      const filtered = filterFlights(flights, filters);
      return sortFlights(filtered, sortBy);
    }
  );

export const getUniqueAirlines = (flights: FlightItinerary[]): string[] => {
  const airlines = new Set<string>();
  flights.forEach((flight) => {
    flight.legs.forEach((leg) => {
      leg.carriers.marketing.forEach((carrier) => {
        if (carrier.name) airlines.add(carrier.name);
      });
    });
  });
  return Array.from(airlines).sort();
};

export const getMaxDuration = (flights: FlightItinerary[]): number => {
  if (flights.length === 0) return 1440;
  return Math.max(...flights.map((f) => f.legs[0].durationInMinutes));
};

