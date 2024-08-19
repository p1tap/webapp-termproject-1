import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PriceRangeChart({ carStats }) {
  const priceRanges = [
    { range: '0-250k', min: 0, max: 250000 },
    { range: '250k-500k', min: 250000, max: 500000 },
    { range: '500k-750k', min: 500000, max: 750000 },
    { range: '750k-1M', min: 750000, max: 1000000 },
    { range: '1M-1.5M', min: 1000000, max: 1500000 },
    { range: '1.5M-2M', min: 1500000, max: 2000000 },
    { range: '2M+', min: 2000000, max: Infinity }
];

  const data = priceRanges.map(range => {
    let count = 0;
    Object.values(carStats.brandModelCounts).forEach(brand => {
      Object.values(brand).forEach(model => {
        const avgPrice = model.value / model.count;
        if (avgPrice >= range.min && avgPrice < range.max) {
          count += model.count;
        }
      });
    });
    return { name: range.range, count: count };
  });

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PriceRangeChart;