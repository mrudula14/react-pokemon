import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PokemonList from './PokemonList';
import { fetchPokemonDetails } from '../store/pokemonSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  pokemon: {
    list: [{ name: 'bulbasaur' }, { name: 'ivysaur' }],
    selectedPokemon: null,
    status: 'idle',
    error: null,
  },
};

describe('PokemonList', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders Pokemon list', () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  test('fetches and displays Pokemon details when a Pokemon is clicked', async () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('pokemon-item-bulbasaur'));
    });

    // Verify the correct action is dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(expect.objectContaining({
      type: 'pokemon/fetchPokemonDetails/pending',
      meta: expect.objectContaining({
        arg: 'bulbasaur'
      })
    }));

    // Update the store to reflect the new state after fetching details
    store = mockStore({
      ...initialState,
      pokemon: {
        ...initialState.pokemon,
        selectedPokemon: { species: { name: 'bulbasaur' }, sprites: { front_default: 'image_url' } },
      },
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(await screen.findByTestId('pokemon-bulbasaur')).toHaveTextContent(/bulbasaur/i);
    expect(await screen.findByTestId('pokemon-sprite-bulbasaur')).toHaveAttribute('src', 'image_url');
  });
});
