import React from 'react';
import { Grid, Paper } from '@mui/material';
import CarTable from './CarTable';
import BrandPieChart from './BrandPieChart';
import ModelBarChart from './ModelBarChart';

function Dashboard({ carStats }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <CarTable carStats={carStats} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <BrandPieChart carStats={carStats} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <ModelBarChart carStats={carStats} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;