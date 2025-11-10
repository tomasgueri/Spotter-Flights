import { useState } from 'react';
import { 
  Box, 
  Button, 
  Menu, 
  Checkbox, 
  FormControlLabel, 
  FormGroup, 
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FlightFilters, TimeRange } from '../types';

interface HorizontalFiltersBarProps {
  filters: FlightFilters;
  onChange: (filters: FlightFilters) => void;
  availableAirlines: string[];
  maxDuration: number;
}

export function HorizontalFiltersBar({ 
  filters, 
  onChange, 
  availableAirlines,
  maxDuration 
}: HorizontalFiltersBarProps) {
  const [stopsAnchor, setStopsAnchor] = useState<null | HTMLElement>(null);
  const [airlinesAnchor, setAirlinesAnchor] = useState<null | HTMLElement>(null);
  const [timesAnchor, setTimesAnchor] = useState<null | HTMLElement>(null);
  const [durationAnchor, setDurationAnchor] = useState<null | HTMLElement>(null);

  const handleStopChange = (stopValue: number) => {
    const newStops = filters.stops.includes(stopValue)
      ? filters.stops.filter((s) => s !== stopValue)
      : [...filters.stops, stopValue];
    
    if (newStops.length === 0) return;
    
    onChange({ ...filters, stops: newStops });
  };

  const handleAirlineToggle = (airline: string) => {
    const currentAirlines = filters.airlines.length === 0 ? availableAirlines : filters.airlines;
    const newAirlines = currentAirlines.includes(airline)
      ? currentAirlines.filter((a) => a !== airline)
      : [...currentAirlines, airline];
    
    onChange({ ...filters, airlines: newAirlines });
  };

  const handleTimeToggle = (time: TimeRange) => {
    const newTimes = filters.times.includes(time)
      ? filters.times.filter((t) => t !== time)
      : [...filters.times, time];
    
    onChange({ ...filters, times: newTimes });
  };

  const getStopsLabel = () => {
    if (filters.stops.length === 3) return 'Stops';
    if (filters.stops.includes(0) && filters.stops.length === 1) return 'Nonstop';
    if (filters.stops.includes(1) && filters.stops.length === 1) return '1 stop';
    if (filters.stops.includes(2) && filters.stops.length === 1) return '2+ stops';
    return `Stops (${filters.stops.length})`;
  };

  const getAirlinesLabel = () => {
    const selected = filters.airlines.length === 0 ? availableAirlines.length : filters.airlines.length;
    if (selected === availableAirlines.length) return 'Airlines';
    return `Airlines (${selected})`;
  };

  const getTimesLabel = () => {
    if (filters.times.length === 4) return 'Times';
    return `Times (${filters.times.length})`;
  };

  const getDurationLabel = () => {
    if (filters.maxDuration >= maxDuration) return 'Duration';
    const hours = Math.floor(filters.maxDuration / 60);
    return `Up to ${hours}h`;
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          endIcon={<ExpandMoreIcon />}
          onClick={(e) => setStopsAnchor(e.currentTarget)}
          sx={{
            textTransform: 'none',
            borderColor: 'divider',
            color: 'text.primary',
            px: 2.5,
            py: 1,
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          {getStopsLabel()}
        </Button>
        <Menu
          anchorEl={stopsAnchor}
          open={Boolean(stopsAnchor)}
          onClose={() => setStopsAnchor(null)}
        >
          <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Stops
            </Typography>
            <FormGroup>
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
          </Box>
        </Menu>

        {availableAirlines.length > 0 && (
          <>
            <Button
              variant="outlined"
              endIcon={<ExpandMoreIcon />}
              onClick={(e) => setAirlinesAnchor(e.currentTarget)}
              sx={{
                textTransform: 'none',
                borderColor: 'divider',
                color: 'text.primary',
                px: 2.5,
                py: 1,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {getAirlinesLabel()}
            </Button>
            <Menu
              anchorEl={airlinesAnchor}
              open={Boolean(airlinesAnchor)}
              onClose={() => setAirlinesAnchor(null)}
            >
              <Box sx={{ px: 2, py: 1, minWidth: 200, maxHeight: 400, overflow: 'auto' }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                  Airlines
                </Typography>
                <FormGroup>
                  {availableAirlines.map((airline) => (
                    <FormControlLabel
                      key={airline}
                      control={
                        <Checkbox
                          checked={filters.airlines.length === 0 || filters.airlines.includes(airline)}
                          onChange={() => handleAirlineToggle(airline)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{airline}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>
          </Menu>
        </>
        )}

        <Button
          variant="outlined"
          endIcon={<ExpandMoreIcon />}
          onClick={(e) => setTimesAnchor(e.currentTarget)}
          sx={{
            textTransform: 'none',
            borderColor: 'divider',
            color: 'text.primary',
            px: 2.5,
            py: 1,
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          {getTimesLabel()}
        </Button>
        <Menu
          anchorEl={timesAnchor}
          open={Boolean(timesAnchor)}
          onClose={() => setTimesAnchor(null)}
        >
          <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Departure Time
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.times.includes('early-morning')}
                    onChange={() => handleTimeToggle('early-morning')}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Early morning (12 AM - 6 AM)</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.times.includes('morning')}
                    onChange={() => handleTimeToggle('morning')}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Morning (6 AM - 12 PM)</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.times.includes('afternoon')}
                    onChange={() => handleTimeToggle('afternoon')}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Afternoon (12 PM - 6 PM)</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.times.includes('evening')}
                    onChange={() => handleTimeToggle('evening')}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Evening (6 PM - 12 AM)</Typography>}
              />
            </FormGroup>
          </Box>
        </Menu>

        <Button
          variant="outlined"
          endIcon={<ExpandMoreIcon />}
          onClick={(e) => setDurationAnchor(e.currentTarget)}
          sx={{
            textTransform: 'none',
            borderColor: 'divider',
            color: 'text.primary',
            px: 2.5,
            py: 1,
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          {getDurationLabel()}
        </Button>
        <Menu
          anchorEl={durationAnchor}
          open={Boolean(durationAnchor)}
          onClose={() => setDurationAnchor(null)}
        >
          <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Maximum Duration
            </Typography>
            <FormGroup>
              {[3, 6, 12, 24].map((hours) => (
                <FormControlLabel
                  key={hours}
                  control={
                    <Checkbox
                      checked={filters.maxDuration >= hours * 60}
                      onChange={() => onChange({ ...filters, maxDuration: hours * 60 })}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">Up to {hours}h</Typography>}
                />
              ))}
            </FormGroup>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
}

