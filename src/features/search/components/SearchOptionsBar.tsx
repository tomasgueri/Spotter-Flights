import { Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setTripType, setPassengers, setCabinClass } from '../searchSlice';
import { TripTypeDropdown } from './TripTypeDropdown';
import { PassengersDropdown } from './PassengersDropdown';
import { CabinClassDropdown } from './CabinClassDropdown';

export function SearchOptionsBar() {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        gap: 1.5,
        p: 2,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <TripTypeDropdown
        value={searchState.tripType}
        onChange={(type) => dispatch(setTripType(type))}
      />
      <PassengersDropdown
        passengers={searchState.passengers}
        onPassengersChange={(count) => dispatch(setPassengers(count))}
      />
      <CabinClassDropdown
        value={searchState.cabinClass}
        onChange={(cabin) => dispatch(setCabinClass(cabin))}
      />
    </Paper>
  );
}

