import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export function TopBar() {
  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar 
        sx={{ 
          py: 1,
          minHeight: 64,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FlightTakeoffIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 500,
              color: 'text.primary',
              letterSpacing: '-0.5px',
            }}
          >
            Spotter Flights
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

