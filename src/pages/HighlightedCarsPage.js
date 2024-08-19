import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  CardMedia,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CustomTooltip from '../utils/CustomTooltip';

function HighlightedCarsPage() {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const storedHighlightedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(storedHighlightedCars);
  }, []);

  const removeHighlight = (car) => {
    const updatedHighlightedCars = highlightedCars.filter(c => c.Cid !== car.Cid);
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlightedCars));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Favorites
      </Typography>
      {highlightedCars.length === 0 ? (
        <Typography>No cars have been highlighted yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {highlightedCars.map(car => (
            <Grid item xs={12} sm={6} md={4} key={car.Cid}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={car.Img600}
                  alt={car.NameMMT}
                />
                <CardContent>
                  <CustomTooltip title={car.NameMMT} placement="top">
                    <Typography variant="h6" noWrap>{car.NameMMT}</Typography>
                  </CustomTooltip>
                  <Typography>Price: {car.Prc} {car.Currency}</Typography>
                  <Typography>Year: {car.Yr}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton 
                    aria-label="remove from favorites"
                    onClick={() => removeHighlight(car)}
                  >
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HighlightedCarsPage;