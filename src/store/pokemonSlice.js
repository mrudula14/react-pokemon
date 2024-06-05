import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
  return response.data;
});

export const fetchPokemonDetails = createAsyncThunk('pokemon/fetchPokemonDetails', async (pokemonName) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return response.data;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    selectedPokemon: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedPokemon(state, action) {
      state.selectedPokemon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.results;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
