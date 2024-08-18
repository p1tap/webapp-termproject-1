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
import CustomTooltip from '../components/CustomTooltip';
import carsData from '../data/cars.json';

function AllCarsPage() {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    const storedHighlightedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(storedHighlightedCars);
    setAllCars(carsData.Cars);
  }, []);

  useEffect(() => {
    localStorage.setItem('highlightedCars', JSON.stringify(highlightedCars));
  }, [highlightedCars]);

  const toggleHighlight = (car) => {
    setHighlightedCars(prev => {
      if (prev.some(c => c.Cid === car.Cid)) {
        return prev.filter(c => c.Cid !== car.Cid);
      } else {
        return [...prev, car];
      }
    });
  };

  const isHighlighted = (car) => highlightedCars.some(c => c.Cid === car.Cid);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        All Cars
      </Typography>
      <Grid container spacing={3}>
        {allCars.map(car => (
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
                  aria-label="add to favorites"
                  onClick={() => toggleHighlight(car)}
                >
                  <FavoriteIcon color={isHighlighted(car) ? "secondary" : "action"} />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllCarsPage;
