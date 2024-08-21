import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function StackedBarChart({ carStats }) {
  const { brandModelCounts } = carStats;

  const processedData = Object.entries(brandModelCounts).map(([brand, models]) => {
    const modelData = Object.entries(models).reduce((acc, [model, { count }]) => {
      acc[model] = count;
      return acc;
    }, {});

    return {
      brand,
      ...modelData,
      total: Object.values(models).reduce((sum, { count }) => sum + count, 0)
    };
  }).sort((a, b) => b.total - a.total);

  const allModels = Array.from(new Set(processedData.flatMap(Object.keys)))
    .filter(key => key !== 'brand' && key !== 'total');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p><strong>{label}</strong></p>
          {payload.map((entry, index) => (
            entry.value > 0 && (
              <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
                {`${entry.name}: ${entry.value}`}
              </p>
            )
          ))}
          <p><strong>Total: {payload.reduce((sum, entry) => sum + entry.value, 0)}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={processedData} 
        layout="vertical"
        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="brand" width={90} />
        <Tooltip content={<CustomTooltip />} />
        {allModels.map((model, index) => (
          <Bar key={model} dataKey={model} stackId="a" fill={COLORS[index % COLORS.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StackedBarChart;