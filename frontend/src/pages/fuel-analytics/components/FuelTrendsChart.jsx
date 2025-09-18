import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

import Button from '../../../components/ui/Button';

const FuelTrendsChart = ({ className = '' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [chartType, setChartType] = useState('efficiency');

  const periods = [
    { id: 'daily', label: 'Daily', icon: 'Calendar' },
    { id: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { id: 'monthly', label: 'Monthly', icon: 'CalendarRange' }
  ];

  const chartTypes = [
    { id: 'efficiency', label: 'Fuel Efficiency', unit: 'km/l' },
    { id: 'consumption', label: 'Consumption', unit: 'L' },
    { id: 'cost', label: 'Cost', unit: 'KES' }
  ];

  const mockData = {
    daily: [
      { period: 'Mon', efficiency: 11.2, consumption: 8.5, cost: 1020, target: 12.0 },
      { period: 'Tue', efficiency: 12.8, consumption: 7.2, cost: 864, target: 12.0 },
      { period: 'Wed', efficiency: 13.1, consumption: 6.8, cost: 816, target: 12.0 },
      { period: 'Thu', efficiency: 11.9, consumption: 7.8, cost: 936, target: 12.0 },
      { period: 'Fri', efficiency: 12.5, consumption: 7.5, cost: 900, target: 12.0 },
      { period: 'Sat', efficiency: 13.4, consumption: 6.2, cost: 744, target: 12.0 },
      { period: 'Sun', efficiency: 12.2, consumption: 7.1, cost: 852, target: 12.0 }
    ],
    weekly: [
      { period: 'Week 1', efficiency: 11.8, consumption: 52.3, cost: 6276, target: 12.0 },
      { period: 'Week 2', efficiency: 12.4, consumption: 48.7, cost: 5844, target: 12.0 },
      { period: 'Week 3', efficiency: 12.9, consumption: 45.2, cost: 5424, target: 12.0 },
      { period: 'Week 4', efficiency: 13.2, consumption: 43.8, cost: 5256, target: 12.0 }
    ],
    monthly: [
      { period: 'Jan', efficiency: 11.2, consumption: 198.5, cost: 23820, target: 12.0 },
      { period: 'Feb', efficiency: 11.8, consumption: 185.2, cost: 22224, target: 12.0 },
      { period: 'Mar', efficiency: 12.3, consumption: 172.8, cost: 20736, target: 12.0 },
      { period: 'Apr', efficiency: 12.7, consumption: 165.4, cost: 19848, target: 12.0 },
      { period: 'May', efficiency: 12.9, consumption: 158.9, cost: 19068, target: 12.0 },
      { period: 'Jun', efficiency: 13.1, consumption: 152.3, cost: 18276, target: 12.0 }
    ]
  };

  const currentData = mockData?.[selectedPeriod];
  const currentChart = chartTypes?.find(type => type?.id === chartType);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">
                {entry?.value} {currentChart?.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Fuel Efficiency Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Track your fuel performance over time
          </p>
        </div>
        
        {/* Chart Type Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          {chartTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setChartType(type?.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                chartType === type?.id
                  ? 'bg-card text-card-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {type?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Period Selector */}
      <div className="flex space-x-2 mb-6">
        {periods?.map((period) => (
          <Button
            key={period?.id}
            variant={selectedPeriod === period?.id ? 'default' : 'outline'}
            size="sm"
            iconName={period?.icon}
            iconPosition="left"
            iconSize={16}
            onClick={() => setSelectedPeriod(period?.id)}
            className="text-xs"
          >
            {period?.label}
          </Button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'efficiency' ? (
            <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="period" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--color-muted-foreground)"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
                name="Target"
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                name="Actual"
              />
            </LineChart>
          ) : (
            <AreaChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="period" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={chartType}
                stroke="var(--color-primary)"
                fill="var(--color-primary)"
                fillOpacity={0.1}
                strokeWidth={2}
                name={currentChart?.label}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Performance Summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Best Performance</p>
          <p className="text-lg font-semibold text-success">
            13.4 km/l
          </p>
          <p className="text-xs text-muted-foreground">Saturday</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Average</p>
          <p className="text-lg font-semibold text-card-foreground">
            12.5 km/l
          </p>
          <p className="text-xs text-muted-foreground">This period</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Improvement</p>
          <p className="text-lg font-semibold text-primary">
            +8.2%
          </p>
          <p className="text-xs text-muted-foreground">vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default FuelTrendsChart;