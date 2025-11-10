import { Paper, FormGroup, FormControlLabel, Checkbox, Typography, Divider } from '@mui/material';
import type { FlightFilters, TimeRange } from '../types';
import { AirlinesFilter } from './AirlinesFilter';
import { TimeFilter } from './TimeFilter';
import { DurationFilter } from './DurationFilter';

interface FiltersBarProps {
  filters: FlightFilters;
  onChange: (filters: FlightFilters) => void;
  availableAirlines: string[];
  maxDuration: number;
}

export function FiltersBar({ filters, onChange, availableAirlines, maxDuration }: FiltersBarProps) {
  const handleStopChange = (stopValue: number) => {
    const newStops = filters.stops.includes(stopValue)
      ? filters.stops.filter((s) => s !== stopValue)
      : [...filters.stops, stopValue];
    
    if (newStops.length === 0) return;
    
    onChange({ ...filters, stops: newStops });
  };

  const handleAirlinesChange = (airlines: string[]) => {
    onChange({ ...filters, airlines });
  };

  const handleTimesChange = (times: TimeRange[]) => {
    onChange({ ...filters, times });
  };

  const handleDurationChange = (duration: number) => {
    onChange({ ...filters, maxDuration: duration });
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: { xs: 2, md: 3 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        position: { xs: 'relative', md: 'sticky' },
        top: { md: 16 },
        height: 'fit-content',
        maxHeight: { md: 'calc(100vh - 100px)' },
        overflow: 'auto',
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
        Stops
      </Typography>
      <FormGroup sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.stops.includes(0)}
              onChange={() => handleStopChange(0)}
              size="small"
            />
          }
          label={<Typography variant="body2">Nonstop</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.stops.includes(1)}
              onChange={() => handleStopChange(1)}
              size="small"
            />
          }
          label={<Typography variant="body2">1 stop</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.stops.includes(2)}
              onChange={() => handleStopChange(2)}
              size="small"
            />
          }
          label={<Typography variant="body2">2+ stops</Typography>}
        />
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <TimeFilter
        selectedTimes={filters.times}
        onChange={handleTimesChange}
      />

      <Divider sx={{ my: 2 }} />

      <DurationFilter
        maxDuration={maxDuration}
        currentMax={filters.maxDuration}
        onChange={handleDurationChange}
      />

      {availableAirlines.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />

          <AirlinesFilter
            airlines={availableAirlines}
            selectedAirlines={filters.airlines.length > 0 ? filters.airlines : availableAirlines}
            onChange={handleAirlinesChange}
          />
        </>
      )}
    </Paper>
  );
}

