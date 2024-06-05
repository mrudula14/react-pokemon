import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import store from './store';
import Home from './components/Home';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon" element={<PokemonList />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
