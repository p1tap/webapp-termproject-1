import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function StackedBarChart({ carStats }) {
  const { brandModelCounts } = carStats;

  // Process and sort data for stacked bar chart
  const processedData = Object.entries(brandModelCounts).map(([brand, models]) => {
    const sortedModels = Object.entries(models)
      .sort((a, b) => b[1].count - a[1].count)
      .reduce((acc, [model, { count }]) => {
        acc[model] = count;
        return acc;
      }, {});

    return {
      brand,
      ...sortedModels,
      total: Object.values(models).reduce((sum, { count }) => sum + count, 0)
    };
  }).sort((a, b) => b.total - a.total).slice(0, 10); // Top 10 brands

  const allModels = Array.from(new Set(processedData.flatMap(Object.keys))).filter(key => key !== 'brand' && key !== 'total');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={processedData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="brand" width={100} />
        <Tooltip />
        <Legend />
        {allModels.map((model, index) => (
          <Bar key={model} dataKey={model} stackId="a" fill={COLORS[index % COLORS.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StackedBarChart;