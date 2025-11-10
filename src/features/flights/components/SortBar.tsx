import { Box, Button, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { SortOption } from '../types';

interface SortBarProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  cheapestPrice?: number;
}

export function SortBar({ value, onChange, cheapestPrice }: SortBarProps) {
  const formatPrice = (price: number) => {
    return `ARS ${price.toLocaleString('es-AR')}`;
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          onClick={() => onChange('best')}
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 0' },
            minHeight: 80,
            borderRadius: 2,
            textTransform: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid',
            borderColor: value === 'best' ? 'primary.main' : 'divider',
            backgroundColor: value === 'best' ? 'primary.main' : 'background.paper',
            color: value === 'best' ? 'primary.contrastText' : 'text.primary',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: value === 'best' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <Typography variant="h6" component="span" sx={{ fontWeight: 500 }}>
                Best
              </Typography>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Button>

        <Button
          onClick={() => onChange('cheapest')}
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 0' },
            minHeight: 80,
            borderRadius: 2,
            textTransform: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid',
            borderColor: value === 'cheapest' ? 'primary.main' : 'divider',
            backgroundColor: value === 'cheapest' ? 'primary.main' : 'background.paper',
            color: value === 'cheapest' ? 'primary.contrastText' : 'text.primary',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: value === 'cheapest' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 500, mb: 0.5 }}>
              Cheapest
            </Typography>
            {cheapestPrice && (
              <Typography variant="body2" component="div">
                from {formatPrice(cheapestPrice)}
              </Typography>
            )}
          </Box>
        </Button>

        <Button
          onClick={() => onChange('fastest')}
          sx={{
            flex: { xs: '1 1 calc(50% - 8px)', sm: '0 1 auto' },
            minHeight: 80,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid',
            borderColor: value === 'fastest' ? 'primary.main' : 'divider',
            backgroundColor: value === 'fastest' ? 'primary.main' : 'background.paper',
            color: value === 'fastest' ? 'primary.contrastText' : 'text.primary',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: value === 'fastest' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
            Fastest
          </Typography>
        </Button>

        <Button
          onClick={() => onChange('earliest')}
          sx={{
            flex: { xs: '1 1 calc(50% - 8px)', sm: '0 1 auto' },
            minHeight: 80,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid',
            borderColor: value === 'earliest' ? 'primary.main' : 'divider',
            backgroundColor: value === 'earliest' ? 'primary.main' : 'background.paper',
            color: value === 'earliest' ? 'primary.contrastText' : 'text.primary',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: value === 'earliest' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
            Earliest
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

