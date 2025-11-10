import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import type { FlightItinerary } from '../../../api/skyScrapperApi';

interface FlightCardProps {
  itinerary: FlightItinerary;
}

export function FlightCard({ itinerary }: FlightCardProps) {
  const leg = itinerary.legs[0];
  
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hr ${mins} min`;
  };

  const getStopText = (stopCount: number) => {
    if (stopCount === 0) return 'Nonstop';
    if (stopCount === 1) return '1 stop';
    return `${stopCount} stops`;
  };

  const carrier = leg.carriers.marketing[0];

  return (
    <Card 
      elevation={0}
      sx={{ 
        mb: 1.5,
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        '&:hover': {
          boxShadow: '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
          borderColor: 'divider',
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flex: { xs: '1 1 100%', md: '1 1 auto' },
          }}>
            <Avatar
              src={carrier.logoUrl}
              alt={carrier.name}
              variant="square"
              sx={{ width: 24, height: 24 }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatTime(leg.departure)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                –
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatTime(leg.arrival)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flex: { xs: '1 1 100%', md: '1 1 auto' },
          }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {carrier.name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flex: { xs: '1 1 100%', md: '0 0 auto' },
          }}>
            <Typography variant="body2" color="text.secondary">
              {formatDuration(leg.durationInMinutes)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {leg.origin.displayCode}–{leg.destination.displayCode}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flex: { xs: '1 1 100%', md: '0 0 auto' },
          }}>
            <Typography variant="body2" color="text.secondary">
              {getStopText(leg.stopCount)}
            </Typography>
          </Box>

          <Box 
            sx={{ 
              textAlign: 'right',
              minWidth: 120,
              flex: { xs: '1 1 100%', md: '0 0 auto' },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                fontSize: '1.125rem',
              }}
            >
              {itinerary.price.formatted}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              round trip
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

