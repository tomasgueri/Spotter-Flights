import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import searchReducer from '../features/search/searchSlice';
import { skyScrapperApi } from '../api/skyScrapperApi';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [skyScrapperApi.reducerPath]: skyScrapperApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(skyScrapperApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

