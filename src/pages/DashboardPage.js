import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
} from '@mui/material';
import CarTable from '../components/Dashboard/CarTable';
import BrandPieChart from '../components/Dashboard/BrandPieChart';
import ModelBarChart from '../components/Dashboard/ModelBarChart';
import PriceRangeChart from '../components/Dashboard/PriceRangeChart';
import carsData from '../data/cars.json';
import { processCarData } from '../utils/dataProcessing';

function DashboardPage() {
  const [carStats, setCarStats] = useState(null);

  useEffect(() => {
    const stats = processCarData(carsData.Cars);
    setCarStats(stats);
  }, []);

  if (!carStats) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Car Market Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Top 10 Brand Distribution</Typography>
            <BrandPieChart carStats={carStats} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Top 5 Model Distribution</Typography>
            <ModelBarChart carStats={carStats} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Price Range Distribution</Typography>
            <PriceRangeChart carStats={carStats} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Car Details</Typography>
            <CarTable carStats={carStats} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;