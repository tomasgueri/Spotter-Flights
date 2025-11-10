import { FormGroup, FormControlLabel, Checkbox, Typography, Box } from '@mui/material';
import type { TimeRange } from '../types';

interface TimeFilterProps {
  selectedTimes: TimeRange[];
  onChange: (times: TimeRange[]) => void;
}

const TIME_RANGES: { value: TimeRange; label: string; range: string }[] = [
  { value: 'early-morning', label: 'Early morning', range: '12am - 8am' },
  { value: 'morning', label: 'Morning', range: '8am - 12pm' },
  { value: 'afternoon', label: 'Afternoon', range: '12pm - 6pm' },
  { value: 'evening', label: 'Evening', range: '6pm - 12am' },
];

export function TimeFilter({ selectedTimes, onChange }: TimeFilterProps) {
  const handleToggle = (time: TimeRange) => {
    const newSelection = selectedTimes.includes(time)
      ? selectedTimes.filter((t) => t !== time)
      : [...selectedTimes, time];
    
    if (newSelection.length === 0) {
      onChange(TIME_RANGES.map((t) => t.value));
    } else {
      onChange(newSelection);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
        Departure Time
      </Typography>
      <FormGroup>
        {TIME_RANGES.map((timeRange) => (
          <FormControlLabel
            key={timeRange.value}
            control={
              <Checkbox
                checked={selectedTimes.includes(timeRange.value)}
                onChange={() => handleToggle(timeRange.value)}
                size="small"
              />
            }
            label={
              <Box>
                <Typography variant="body2">{timeRange.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {timeRange.range}
                </Typography>
              </Box>
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export function isTimeInRange(isoTime: string, range: TimeRange): boolean {
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

