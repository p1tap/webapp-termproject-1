import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box,
} from '@mui/material';
import CarTable from '../components/Dashboard/CarTable';
import BrandPieChart from '../components/Dashboard/BrandPieChart';
import ModelBarChart from '../components/Dashboard/ModelBarChart';
import PriceRangeChart from '../components/Dashboard/PriceRangeChart';
import StackedBarChart from '../components/Dashboard/StackedBarChart';
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
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Car Market Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, height: 600 }}>
            <Typography variant="h6" gutterBottom>Brand Distribution</Typography>
            <Box height="90%">
              <BrandPieChart carStats={carStats} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, height: 500 }}>
            <Typography variant="h6" gutterBottom>Model Distribution</Typography>
            <Box height="90%">
              <ModelBarChart carStats={carStats} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, height: 600 }}>
            <Typography variant="h6" gutterBottom>Brand and Model Distribution</Typography>
            <Box height="90%">
              <StackedBarChart carStats={carStats} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, height: 600 }}>
            <Typography variant="h6" gutterBottom>Price Range Distribution</Typography>
            <Box height="90%">
              <PriceRangeChart carStats={carStats} />
            </Box>
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