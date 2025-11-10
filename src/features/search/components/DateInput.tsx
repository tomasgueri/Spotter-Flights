import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateInputProps {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
  minDate?: Date;
  error?: boolean;
  helperText?: string;
}

export function DateInput({ 
  label, 
  value, 
  onChange, 
  minDate = new Date(),
  error,
  helperText 
}: DateInputProps) {
  const dateValue = value ? new Date(value) : null;

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      onChange(newValue.toISOString());
    } else {
      onChange(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        value={dateValue}
        onChange={handleChange}
        minDate={minDate}
        slotProps={{
          textField: {
            fullWidth: true,
            error,
            helperText,
            sx: {
              '& .MuiOutlinedInput-root': {
                py: 0.5,
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiPickersInputBase-root': {
                pt: { xs: 2, sm: 2, md: 0 },
              },
              '& .MuiInputLabel-root': {
                top: { xs: '20px', sm: '20px', md: '0px' },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

