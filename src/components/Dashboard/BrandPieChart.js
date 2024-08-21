import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C',
  '#FFA07A', '#20B2AA', '#B0C4DE', '#DDA0DD', '#D2691E', '#6495ED', '#32CD32'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = outerRadius * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.02) return null; // Don't show labels for slices smaller than 5%

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      style={{ fontSize: '12px', fontWeight: 'bold' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function BrandPieChart({ carStats }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={isSmallScreen ? "70%" : "60%"}
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
          layout={isSmallScreen ? "horizontal" : "vertical"}
          align={isSmallScreen ? "center" : "right"}
          verticalAlign={isSmallScreen ? "bottom" : "middle"}
          wrapperStyle={{
            fontSize: '12px',
            maxHeight: '80%',
            overflowY: 'auto',
            paddingBottom: isSmallScreen ? '20px' : '0'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default BrandPieChart;