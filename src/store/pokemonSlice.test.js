import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import pokemonReducer, { fetchPokemon, fetchPokemonDetails } from './pokemonSlice';

const mock = new MockAdapter(axios);

describe('pokemonSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { pokemon: pokemonReducer } });
  });

  afterEach(() => {
    mock.reset();
  });

  test('should handle initial state', () => {
    expect(store.getState().pokemon).toEqual({
      list: [],
      selectedPokemon: null,
      status: 'idle',
      error: null,
    });
  });

  test('should fetch Pokémon list', async () => {
    const pokemonData = { results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }] };
    mock.onGet('https://pokeapi.co/api/v2/pokemon?limit=10').reply(200, pokemonData);

    await store.dispatch(fetchPokemon());

    const state = store.getState().pokemon;
    expect(state.status).toEqual('succeeded');
    expect(state.list).toEqual(pokemonData.results);
  });

  test('should fetch Pokémon details', async () => {
    const pokemonDetails = { species: { name: 'bulbasaur' }, sprites: { front_default: 'image_url' } };
    mock.onGet('https://pokeapi.co/api/v2/pokemon/bulbasaur').reply(200, pokemonDetails);

    await store.dispatch(fetchPokemonDetails('bulbasaur'));

    const state = store.getState().pokemon;
    expect(state.status).toEqual('succeeded');
    expect(state.selectedPokemon).toEqual(pokemonDetails);
  });
});
