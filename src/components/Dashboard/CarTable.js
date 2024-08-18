import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography
} from '@mui/material';

function CarTable({ carStats }) {
  const { brandModelCounts } = carStats;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="car statistics table">
        <TableHead>
          <TableRow>
            <TableCell>Brand / Model</TableCell>
            <TableCell align="right">Number of Cars</TableCell>
            <TableCell align="right">Total Value (Baht)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(brandModelCounts).map(([brand, models]) => {
            const brandTotal = Object.values(models).reduce(
              (sum, { count, value }) => ({
                count: sum.count + count,
                value: sum.value + value
              }),
              { count: 0, value: 0 }
            );

            return (
              <React.Fragment key={brand}>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {brand}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {brandTotal.count}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {brandTotal.value.toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
                {Object.entries(models).map(([model, { count, value }]) => (
                  <TableRow key={`${brand}-${model}`}>
                    <TableCell style={{ paddingLeft: '2rem' }}>{model}</TableCell>
                    <TableCell align="right">{count}</TableCell>
                    <TableCell align="right">{value.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CarTable;