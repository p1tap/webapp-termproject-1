import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import BrandPieChart from '../components/Dashboard/BrandPieChart';
import StackedBarChart from '../components/Dashboard/StackedBarChart';
import CarTable from '../components/Dashboard/CarTable';
import carsData from '../data/cars.json';
import { processCarData } from '../utils/dataProcessing';

function DashboardPage() {
  const [carStats, setCarStats] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: isSmallScreen ? 450 : 600 }}>
            <Typography variant="h6" gutterBottom>Brand Distribution</Typography>
            <Box height="90%">
              <BrandPieChart carStats={carStats} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: isSmallScreen ? 450 : 600 }}>
            <Typography variant="h6" gutterBottom>Brand and Model Distribution</Typography>
            <Box height="90%">
              <StackedBarChart carStats={carStats} />
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