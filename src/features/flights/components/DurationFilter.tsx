import { Box, Typography, Slider } from '@mui/material';

interface DurationFilterProps {
  maxDuration: number; // in minutes
  currentMax: number; // current filter value
  onChange: (value: number) => void;
}

export function DurationFilter({ maxDuration, currentMax, onChange }: DurationFilterProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
        Max Duration
      </Typography>
      <Box sx={{ px: 1 }}>
        <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
          Up to {formatDuration(currentMax)}
        </Typography>
        <Slider
          value={currentMax}
          onChange={(_event, value) => onChange(value as number)}
          min={60}
          max={maxDuration}
          step={30}
          valueLabelDisplay="auto"
          valueLabelFormat={formatDuration}
        />
      </Box>
    </Box>
  );
}

