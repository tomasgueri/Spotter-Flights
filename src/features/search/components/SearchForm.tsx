import { useState } from 'react';
import { Box, Button, Paper, IconButton, Alert } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setOrigin,
  setDestination,
  swapOriginDestination,
  setDepartureDate,
  setReturnDate,
  markAsSearched,
} from '../searchSlice';
import { LocationInput } from './LocationInput';
import { DateInput } from './DateInput';

export function SearchForm() {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);
  const [errors, setErrors] = useState<{
    origin?: string;
    destination?: string;
    departureDate?: string;
    returnDate?: string;
  }>({});
  const [showApiWarning, setShowApiWarning] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!searchState.origin) {
      newErrors.origin = 'Please select an origin airport';
    }
    
    if (!searchState.destination) {
      newErrors.destination = 'Please select a destination airport';
    }
    
    if (!searchState.departureDate) {
      newErrors.departureDate = 'Please select a departure date';
    }

    if (searchState.tripType === 'round-trip' && !searchState.returnDate) {
      newErrors.returnDate = 'Please select a return date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      setShowApiWarning(true);
      return;
    }

    if (validate()) {
      dispatch(markAsSearched());
      setShowApiWarning(false);
    }
  };

  const handleSwap = () => {
    dispatch(swapOriginDestination());
  };

  return (
    <Box sx={{ mb: 3 }} className="search-form">
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            padding: 1,
            overflow: 'hidden',
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: (theme) => theme.shadows[4],
            },
          }}
        >
          <Box
            sx={{
              flex: { xs: '1 1 100%', lg: '1 1 300px' },
              minWidth: { lg: 250 },
              borderRight: { lg: '1px solid' },
              borderBottom: { xs: '1px solid', lg: 'none' },
              borderColor: 'divider',
            }}
          >
            <LocationInput
              label="Where from?"
              type="origin"
              value={searchState.origin}
              onChange={(airport) => {
                dispatch(setOrigin(airport));
                setErrors((prev) => ({ ...prev, origin: undefined }));
              }}
              error={!!errors.origin}
              helperText={errors.origin}
            />
          </Box>

          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              px: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={handleSwap}
              size="small"
              sx={{
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'rotate(180deg)',
                },
              }}
            >
              <SwapHorizIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: { xs: '1 1 100%', lg: '1 1 300px' },
              minWidth: { lg: 250 },
              borderRight: { lg: '1px solid' },
              borderBottom: { xs: '1px solid', lg: 'none' },
              borderColor: 'divider',
            }}
          >
            <LocationInput
              label="Where to?"
              type="destination"
              value={searchState.destination}
              onChange={(airport) => {
                dispatch(setDestination(airport));
                setErrors((prev) => ({ ...prev, destination: undefined }));
              }}
              error={!!errors.destination}
              helperText={errors.destination}
            />
          </Box>

          <Box
            sx={{
              flex: { xs: '1 1 calc(50% - 8px)', lg: '0 0 220px' },
              minWidth: { lg: 180 },
              borderRight: { lg: '1px solid' },
              borderColor: 'divider',
            }}
          >
            <DateInput
              label="Departure"
              value={searchState.departureDate}
              onChange={(date) => {
                dispatch(setDepartureDate(date));
                setErrors((prev) => ({ ...prev, departureDate: undefined }));
              }}
              error={!!errors.departureDate}
              helperText={errors.departureDate}
            />
          </Box>

          {searchState.tripType === 'round-trip' && (
            <Box
              sx={{
                flex: { xs: '1 1 calc(50% - 8px)', lg: '0 0 220px' },
                minWidth: { lg: 180 },
                borderRight: { lg: '1px solid' },
                borderColor: 'divider',
              }}
            >
              <DateInput
                label="Return"
                value={searchState.returnDate}
                onChange={(date) => {
                  dispatch(setReturnDate(date));
                  setErrors((prev) => ({ ...prev, returnDate: undefined }));
                }}
                minDate={searchState.departureDate ? new Date(searchState.departureDate) : new Date()}
                error={!!errors.returnDate}
                helperText={errors.returnDate}
              />
            </Box>
          )}

          <Box
            sx={{
              flex: { xs: '1 1 100%', lg: '0 0 auto' },
              p: 1,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<SearchIcon />}
              sx={{
                minHeight: { xs: 56, sm: 56, md: 48 },
                px: 4,
                transition: 'all 0.2s ease-in-out',
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Paper>

        {showApiWarning && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="warning" onClose={() => setShowApiWarning(false)}>
              <strong>API Key Not Configured</strong>
              <br />
              Please add your RapidAPI key to a <code>.env</code> file. See{' '}
              <code>.env.example</code> for details.
            </Alert>
          </Box>
        )}
      </form>
    </Box>
  );
}

