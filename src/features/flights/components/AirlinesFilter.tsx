import { FormGroup, FormControlLabel, Checkbox, Typography, Box } from '@mui/material';

interface AirlinesFilterProps {
  airlines: string[];
  selectedAirlines: string[];
  onChange: (airlines: string[]) => void;
}

export function AirlinesFilter({ airlines, selectedAirlines, onChange }: AirlinesFilterProps) {
  const handleToggle = (airline: string) => {
    const newSelection = selectedAirlines.includes(airline)
      ? selectedAirlines.filter((a) => a !== airline)
      : [...selectedAirlines, airline];
    
    if (newSelection.length === 0) {
      onChange(airlines);
    } else {
      onChange(newSelection);
    }
  };

  const handleSelectAll = () => {
    onChange(airlines);
  };

  const allSelected = selectedAirlines.length === airlines.length;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
        Airlines
      </Typography>
      
      <FormControlLabel
        control={
          <Checkbox
            checked={allSelected}
            onChange={handleSelectAll}
            size="small"
          />
        }
        label={<Typography variant="body2">All airlines</Typography>}
      />
      
      <FormGroup sx={{ ml: 2 }}>
        {airlines.map((airline) => (
          <FormControlLabel
            key={airline}
            control={
              <Checkbox
                checked={selectedAirlines.includes(airline)}
                onChange={() => handleToggle(airline)}
                size="small"
              />
            }
            label={<Typography variant="body2">{airline}</Typography>}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

