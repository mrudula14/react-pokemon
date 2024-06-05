import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Welcome to the Pokemon App
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/pokemon">
        View Pokemon
      </Button>
    </div>
  );
}

export default Home;
