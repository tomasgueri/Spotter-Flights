export interface Airport {
  skyId: string;
  entityId: string;
  iata: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
}

export interface SearchParams {
  origin: Airport | null;
  destination: Airport | null;
  departureDate: string | null;
  returnDate: string | null;
  tripType: 'one-way' | 'round-trip';
  passengers: number;
  cabinClass: CabinClass;
}

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

export interface SearchFormState extends SearchParams {
  hasSearched: boolean;
}

