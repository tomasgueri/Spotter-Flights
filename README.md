# Spotter Flights - Google Flights Clone

A modern, fully-featured flight search interface inspired by Google Flights, built with React (Vite), TypeScript, Redux Toolkit, and Material UI.

## Features

### Core Functionality
- **Smart Airport Search** - Autocomplete with debouncing (700ms) to minimize API calls
- **Origin/Destination Swap** - Quick swap functionality
- **Date Selection** - Departure date picker with round-trip support
- **Passenger Selection** - Configurable passenger count
- **Cabin Class Selection**

### Advanced Filtering
- **Stops Filter** - Nonstop, 1 stop, 2+ stops
- **Airlines Filter** - Filter by specific carriers
- **Time Range Filter** - Filter by departure time (Early Morning, Morning, Afternoon, Evening)
- **Duration Filter** - Maximum flight duration slider

### Sorting Options
- **Best** - Optimal combination of price, duration, and stops
- **Cheapest** - Lowest price first
- **Fastest** - Shortest duration first
- **Earliest** - Earliest departure time first


## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- RapidAPI account and Sky Scrapper API key

## Setup

### 1. Install Dependencies

```bash
npm install
```

**Important:** You also need to install the MUI date picker dependencies:

```bash
npm install @mui/x-date-pickers date-fns
```

### 2. Configure Environment Variables

Create a `.env` file and add your RapidAPI credentials:

```
VITE_RAPIDAPI_KEY=your_actual_api_key_here
VITE_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com
```


### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── app/
│   ├── store.ts
│   └── hooks.ts
├── api/
│   └── skyScrapperApi.ts
├── features/
│   ├── search/                  # Search feature module
│   │   ├── components/
│   │   │   ├── SearchForm.tsx
│   │   │   ├── SearchOptionsBar.tsx
│   │   │   ├── LocationInput.tsx
│   │   │   ├── DateInput.tsx
│   │   │   ├── TripTypeDropdown.tsx 
│   │   │   ├── PassengersDropdown.tsx
│   │   │   └── CabinClassDropdown.tsx
│   │   ├── searchSlice.ts
│   │   └── types.ts
│   ├── flights/                 # Flights feature module
│   │   ├── components/
│   │   │   ├── FlightsResults.tsx
│   │   │   ├── FlightCard.tsx
│   │   │   ├── SortBar.tsx
│   │   │   ├── HorizontalFiltersBar.tsx
│   │   │   ├── AirlinesFilter.tsx
│   │   │   ├── TimeFilter.tsx
│   │   │   └── DurationFilter.tsx
│   │   ├── flightsSelectors.ts
│   │   └── types.ts 
│   └── layout/                  # App layout components
│       ├── MainLayout.tsx
│       └── TopBar.tsx
├── pages/
│   └── HomePage.tsx 
├── theme/
│   └── theme.ts
└── index.css
```

### Architecture Highlights

**Feature-Based Structure:** Each feature (search, flights) is self-contained with its own components, state, and types.

**Redux Toolkit:** Centralized state management with Redux Toolkit's simplified API and RTK Query for automatic caching and loading states.

**TypeScript:** Full type safety across the entire application with strict mode enabled.

**Component Composition:** Small, reusable components that follow single responsibility principle.

**Memoization:** Strategic use of `useMemo` and Redux selectors to prevent unnecessary re-renders.

## Tech Stack

### Core Technologies
- **React 19**
- **TypeScript 5.6+**
- **Vite 6.0**

### UI & Styling
- **Material UI (MUI) v6**
- **MUI X Date Pickers**
- **Custom Theme**

### State Management
- **Redux Toolkit**
- **RTK Query**
- **Redux DevTools**

### API Integration
- **Sky Scrapper API (via RapidAPI)**
- **Axios/Fetch**
- **Debouncing**


##  Key Implementation Details

### State Management Pattern
The application follows a **feature-based Redux architecture**:
- Each feature has its own slice (searchSlice for search state)
- RTK Query manages API data separately
- Selectors use memoization to prevent unnecessary re-renders

### Performance Optimizations
1. **Debounced API Calls** - 700ms delay on airport search
2. **Memoized Selectors** - Reselect for efficient filtering/sorting
3. **Component Memoization** - Strategic use of `useMemo` and `useCallback`
4. **RTK Query Caching** - 5-minute cache reduces redundant API calls
5. **Lazy Loading** - Components render only when needed

### Responsive Design Strategy
- **Mobile First** - Base styles for mobile, progressive enhancement for larger screens
- **MUI Breakpoints** - xs, sm, md, lg for different screen sizes
- **Flexible Layouts** - Flexbox and CSS Grid for adaptive layouts
- **Touch Optimized** - Larger touch targets (48px) on mobile

### Filter & Sort Architecture
**Client-Side Processing:**
- All filtering and sorting happens on the client
- Uses memoized selectors for performance
- Real-time updates without API calls

**Filter Types:**
1. **Stops** - Filters by number of stops (0, 1, 2+)
2. **Airlines** - Checkbox filter for specific carriers
3. **Time** - Filters by departure time range
4. **Duration** - Slider for maximum flight duration

**Sort Algorithms:**
- **Best**: `score = price + (duration × 0.5) + (stops × 1000)`
- **Cheapest**: Sort by `price.raw` ascending
- **Fastest**: Sort by `durationInMinutes` ascending
- **Earliest**: Sort by `departure` timestamp ascending

## API Integration

This app uses the [Sky Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper) for:

### Endpoints Used
1. **Airport Search** (`/flights/searchAirport`)
   - Autocomplete suggestions
   - Minimum 3 characters required
   - 700ms debounce to reduce API calls
   - Filters to show only airports

2. **Flight Search** (`/flights/searchFlights`)
   - Real-time flight data
   - Parameters: origin, destination, date, passengers, cabin class
   - Returns itineraries with pricing, duration, stops, and carriers

### API Optimization
- **Debouncing** - 700ms delay on airport search to reduce calls
- **Character Threshold** - Requires 3+ characters before searching
- **Skip Logic** - Prevents unnecessary requests
- **Error Handling** - Graceful degradation with retry functionality


## Known Limitations

- **Free API Tier**: Limited to 20 requests/day on free plan
- **One-Way Only**: Currently only supports one-way flights (round-trip UI is ready)
- **Client-Side Filters**: All filters are client-side; API doesn't support server-side filtering
