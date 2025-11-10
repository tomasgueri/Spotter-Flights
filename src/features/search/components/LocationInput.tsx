import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, Typography, CircularProgress } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSearchAirportsQuery } from '../../../api/skyScrapperApi';
import type { Airport } from '../types';

interface LocationInputProps {
  label: string;
  value: Airport | null;
  onChange: (airport: Airport | null) => void;
  type: 'origin' | 'destination';
  error?: boolean;
  helperText?: string;
}

export function LocationInput({ 
  label, 
  value, 
  onChange, 
  type,
  error,
  helperText 
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    if (value) {
      setInputValue(`${value.name} (${value.iata})`);
    } else {
      setInputValue('');
    }
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const { data: airports = [], isLoading } = useSearchAirportsQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
  });

  const Icon = type === 'origin' ? FlightTakeoffIcon : FlightLandIcon;

  return (
    <Autocomplete
      value={value}
      onChange={(_event, newValue) => {
        onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue, reason) => {
        if (reason === 'input') {
          setInputValue(newInputValue);
        }
      }}
      options={airports}
      clearOnBlur={false}
      clearOnEscape={false}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return `${option.name} (${option.iata})`;
      }}
      isOptionEqualToValue={(option, value) => option.skyId === value.skyId}
      loading={isLoading}
          loadingText="Searching airports..."
          noOptionsText={inputValue.length < 3 ? "Type at least 3 characters" : "No airports found"}
      sx={{
        '& .MuiFormControl-root': {
          pt: { xs: 3, sm: 3, md: 0 },
        },
        '& .MuiInputLabel-root': {
          top: { xs: '20px', sm: '20px', md: '0px' },
        },
        '& .MuiOutlinedInput-root': {
          py: 0.5,
          '& fieldset': {
            border: 'none',
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Icon sx={{ color: 'text.secondary', mr: 1, ml: 1 }} />
            ),
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.skyId}>
          <LocationOnIcon sx={{ color: 'text.secondary', mr: 2 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {option.name} ({option.iata})
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {option.city}, {option.country}
            </Typography>
          </Box>
        </Box>
      )}
      fullWidth
    />
  );
}

