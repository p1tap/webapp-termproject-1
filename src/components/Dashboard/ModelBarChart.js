import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ModelBarChart({ carStats }) {
  const { brandModelCounts } = carStats;

  const data = Object.entries(brandModelCounts)
    .sort(([, a], [, b]) => Object.values(b).reduce((sum, { count }) => sum + count, 0) - Object.values(a).reduce((sum, { count }) => sum + count, 0))
    .slice(0, 5) // Top 5 brands
    .map(([brand, models]) => ({
      brand,
      count: Object.values(models).reduce((sum, { count }) => sum + count, 0)
    }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="brand" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ModelBarChart;