import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import CarTable from '../components/Dashboard/CarTable';
import BrandPieChart from '../components/Dashboard/BrandPieChart';
import ModelBarChart from '../components/Dashboard/ModelBarChart';
import PriceRangeChart from '../components/Dashboard/PriceRangeChart';
import carsData from '../data/cars.json';
import { processCarData } from '../utils/dataProcessing';

function DashboardPage() {
  const [carStats, setCarStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const stats = await processCarData(carsData.Cars);
        setCarStats(stats);
        setLoading(false);
      } catch (err) {
        console.error('Error processing car data:', err);
        setError('Failed to load car data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!carStats) return <Alert severity="warning">No car data available.</Alert>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Car Market Dashboard
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2, height: 550 }}>
          <Typography variant="h6" gutterBottom>Brand Distribution</Typography>
          <BrandPieChart carStats={carStats} />
        </Paper>
      </Grid>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ p: 2, height: 500 }}>
            <Typography variant="h6" gutterBottom>Model Distribution</Typography>
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