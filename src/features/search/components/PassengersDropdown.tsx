import { useState } from 'react';
import {
  Box,
  Button,
  Popover,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PassengersDropdownProps {
  passengers: number;
  onPassengersChange: (count: number) => void;
}

export function PassengersDropdown({
  passengers,
  onPassengersChange,
}: PassengersDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleIncrement = () => {
    if (passengers < 9) {
      onPassengersChange(passengers + 1);
    }
  };

  const handleDecrement = () => {
    if (passengers > 1) {
      onPassengersChange(passengers - 1);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        size="small"
        sx={{
          textTransform: 'none',
          borderColor: 'divider',
          color: 'text.primary',
          backgroundColor: 'background.paper',
          minWidth: 150,
          height: { xs: 48, sm: 48, md: 'auto' },
          justifyContent: 'space-between',
          borderRadius: 1,
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { mt: 1, minWidth: 250, p: 2 },
        }}
      >
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Passengers
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">Adults</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleDecrement}
                disabled={passengers <= 1}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                {passengers}
              </Typography>
              <IconButton
                size="small"
                onClick={handleIncrement}
                disabled={passengers >= 9}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

