import { FormControl, Select, MenuItem } from '@mui/material';

interface TripTypeDropdownProps {
  value: 'one-way' | 'round-trip';
  onChange: (value: 'one-way' | 'round-trip') => void;
}

export function TripTypeDropdown({ value, onChange }: TripTypeDropdownProps) {
  return (
    <FormControl 
      size="small" 
      sx={{ 
        minWidth: 150,
        '& .MuiInputBase-root': {
          height: { xs: 48, sm: 48, md: 'auto' },
        },
      }}
    >
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as 'one-way' | 'round-trip')}
        sx={{
          backgroundColor: 'background.paper',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },
        }}
      >
        <MenuItem value="one-way">One-way</MenuItem>
        <MenuItem value="round-trip">Round trip</MenuItem>
      </Select>
    </FormControl>
  );
}

