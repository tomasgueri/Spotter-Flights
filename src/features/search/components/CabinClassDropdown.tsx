import { FormControl, Select, MenuItem } from '@mui/material';
import type { CabinClass } from '../types';

interface CabinClassDropdownProps {
  value: CabinClass;
  onChange: (cabinClass: CabinClass) => void;
}

const CABIN_CLASSES: { value: CabinClass; label: string }[] = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
];

export function CabinClassDropdown({ value, onChange }: CabinClassDropdownProps) {
  return (
    <FormControl 
      size="small" 
      sx={{ 
        minWidth: 170,
        '& .MuiInputBase-root': {
          height: { xs: 48, sm: 48, md: 'auto' },
        },
      }}
    >
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as CabinClass)}
        sx={{
          backgroundColor: 'background.paper',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },
        }}
      >
        {CABIN_CLASSES.map((cabin) => (
          <MenuItem key={cabin.value} value={cabin.value}>
            {cabin.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

