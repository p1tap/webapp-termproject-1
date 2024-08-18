import React from 'react';
import { Paper, Typography } from '@mui/material';

function SummaryCard({ title, value }) {
  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="h4" component="div">{value}</Typography>
    </Paper>
  );
}

export default SummaryCard;