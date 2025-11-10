import { useState, useMemo } from 'react';
import { Box, Typography, Alert, Button, Skeleton } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { useSearchFlightsQuery } from '../../../api/skyScrapperApi';
import { FlightCard } from './FlightCard';
import { SortBar } from './SortBar';
import { HorizontalFiltersBar } from './HorizontalFiltersBar';
import { filterFlights, sortFlights, getUniqueAirlines, getMaxDuration } from '../flightsSelectors';
import { DEFAULT_FILTERS } from '../types';
import type { SortOption, FlightFilters } from '../types';

export function FlightsResults() {
  const searchState = useAppSelector((state) => state.search);
  const [sortBy, setSortBy] = useState<SortOption>('best');
  const [filters, setFilters] = useState<FlightFilters>(DEFAULT_FILTERS);

  const shouldFetch = 
    searchState.hasSearched &&
    searchState.origin &&
    searchState.destination &&
    searchState.departureDate;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const {
    data: flightData,
    isLoading,
    isError,
    error,
    refetch,
  } = useSearchFlightsQuery(
    {
      originSkyId: searchState.origin?.skyId || '',
      destinationSkyId: searchState.destination?.skyId || '',
      originEntityId: searchState.origin?.entityId || '',
      destinationEntityId: searchState.destination?.entityId || '',
      date: searchState.departureDate ? formatDate(searchState.departureDate) : '',
      adults: searchState.passengers,
      cabinClass: searchState.cabinClass,
    },
    {
      skip: !shouldFetch,
    }
  );

  const itineraries = flightData?.data?.itineraries || [];

  const availableAirlines = useMemo(() => getUniqueAirlines(itineraries), [itineraries]);
  const maxDuration = useMemo(() => getMaxDuration(itineraries), [itineraries]);

  const filteredAndSortedFlights = useMemo(() => {
    if (itineraries.length === 0) return [];
    
    const adjustedFilters = {
      ...filters,
      airlines: filters.airlines.length === 0 ? availableAirlines : filters.airlines,
      maxDuration: Math.min(filters.maxDuration, maxDuration),
    };
    
    const filtered = filterFlights(itineraries, adjustedFilters);
    return sortFlights(filtered, sortBy);
  }, [itineraries, filters, sortBy, availableAirlines, maxDuration]);

  const cheapestPrice = useMemo(() => {
    if (filteredAndSortedFlights.length === 0) return undefined;
    return Math.min(...filteredAndSortedFlights.map((f) => f.price.raw));
  }, [filteredAndSortedFlights]);

  if (!searchState.hasSearched) {
    return null;
  }

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          Searching for flights...
        </Typography>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={150}
            sx={{ mb: 2, borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  if (isError) {
    const errorMessage = 
      error && 'status' in error
        ? `Error ${error.status}: ${JSON.stringify(error.data)}`
        : 'An unexpected error occurred';

    return (
      <Box>
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Failed to load flights
          </Typography>
          <Typography variant="body2">
            {errorMessage}
          </Typography>
          <Typography variant="caption">
            Please check your API key configuration and try again.
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (!flightData || itineraries.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No flights found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search criteria
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes fadeIn': {
          from: {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <HorizontalFiltersBar
        filters={filters}
        onChange={setFilters}
        availableAirlines={availableAirlines}
        maxDuration={maxDuration}
      />

      <SortBar 
        value={sortBy} 
        onChange={setSortBy}
        cheapestPrice={cheapestPrice}
      />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
          Top departing flights
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ranked based on price and convenience
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filteredAndSortedFlights.length} flight{filteredAndSortedFlights.length !== 1 ? 's' : ''} found
      </Typography>

      {filteredAndSortedFlights.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No flights match your filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filter settings
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredAndSortedFlights.map((itinerary) => (
            <FlightCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </Box>
      )}
    </Box>
  );
}

