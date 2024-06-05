import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
