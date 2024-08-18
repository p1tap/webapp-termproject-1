import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C',
  '#FFA07A', '#20B2AA', '#B0C4DE', '#DDA0DD', '#D2691E', '#6495ED', '#32CD32'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radiusOffset = 30;
  const radius = outerRadius + radiusOffset;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.01) return null; // Don't show labels for slices smaller than 1%

  return (
    <text 
      x={x} 
      y={y} 
      fill="black" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.75 }}
    >
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

function BrandPieChart({ carStats }) {
  const data = useMemo(() => {
    const { brandCounts } = carStats;
    const total = Object.values(brandCounts).reduce((sum, { count }) => sum + count, 0);
    
    return Object.entries(brandCounts)
      .map(([brand, { count }]) => ({
        name: brand,
        value: count,
        percent: count / total
      }))
      .sort((a, b) => b.value - a.value);
  }, [carStats]);

  const totalValue = useMemo(() => data.reduce((sum, entry) => sum + entry.value, 0), [data]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name, props) => {
            const percent = (value / totalValue) * 100;
            return [`${value} cars (${percent.toFixed(1)}%)`, `Brand: ${name}`];
          }}
        />
        <Legend 
          layout="vertical" 
          align="right" 
          verticalAlign="middle"
          formatter={(value, entry) => {
            const { name, percent } = entry.payload;
            return `${name} (${(percent * 100).toFixed(1)}%)`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default BrandPieChart;