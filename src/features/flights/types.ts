export type SortOption = 'best' | 'cheapest' | 'fastest' | 'earliest';

export type TimeRange = 'early-morning' | 'morning' | 'afternoon' | 'evening';

export interface FlightFilters {
  stops: number[]; // [0] = nonstop, [1] = 1 stop, [2] = 2+ stops
  airlines: string[]; // Selected airlines (empty = all)
  times: TimeRange[]; // Selected time ranges
  maxDuration: number; // Maximum duration in minutes
}

export const DEFAULT_FILTERS: FlightFilters = {
  stops: [0, 1, 2], // Show all by default
  airlines: [], // Empty = all airlines
  times: ['early-morning', 'morning', 'afternoon', 'evening'], // All times
  maxDuration: 1440, // 24 hours
};

