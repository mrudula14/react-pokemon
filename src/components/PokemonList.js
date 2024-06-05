import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, CircularProgress, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';
import { fetchPokemon, fetchPokemonDetails } from '../store/pokemonSlice';

function PokemonList() {
  const dispatch = useDispatch();
  const { list, selectedPokemon, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemon());
    }
  }, [status, dispatch]);

  const handlePokemonClick = (name) => {
    dispatch(fetchPokemonDetails(name));
  };

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper>
          <List>
            {list.map((pokemon) => (
              <ListItem button key={pokemon.name} onClick={() => handlePokemonClick(pokemon.name)}>
                <ListItemText primary={pokemon.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        {status === 'loading' && <CircularProgress />}
        {status !== 'loading' && selectedPokemon && (
          <Paper>
            <Typography variant="h5">{selectedPokemon.species.name}</Typography>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.species.name} />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default PokemonList;
