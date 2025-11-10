import { Box } from '@mui/material';
import { SearchForm } from '../features/search/components/SearchForm';
import { FlightsResults } from '../features/flights/components/FlightsResults';
import { SearchOptionsBar } from '../features/search/components/SearchOptionsBar';

export function HomePage() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '100%', md: 1200, lg: 1400 },
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        py: { xs: 2, md: 3 },
      }}
    >
      <SearchOptionsBar />
      <Box sx={{ mb: 4 }}>
        <SearchForm />
      </Box>
      <Box>
        <FlightsResults />
      </Box>
    </Box>
  );
}

