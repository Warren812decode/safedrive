import React from 'react';
import Icon from '../../../components/AppIcon';

const FuelMetricsCards = ({ 
  currentFuelEconomy = 12.5,
  weeklyConsumption = 45.2,
  costSavings = 2850,
  carbonReduction = 15.8,
  className = ''
}) => {
  const metricsData = [
    {
      id: 'fuel-economy',
      title: 'Current Fuel Economy',
      value: `${currentFuelEconomy} km/l`,
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Fuel',
      description: 'vs last month average',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'weekly-consumption',
      title: 'Weekly Consumption',
      value: `${weeklyConsumption}L`,
      change: '-12.5%',
      changeType: 'positive',
      icon: 'TrendingDown',
      description: 'reduction this week',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      value: `KES ${costSavings?.toLocaleString()}`,
      change: '+KES 450',
      changeType: 'positive',
      icon: 'PiggyBank',
      description: 'saved this month',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'carbon-reduction',
      title: 'Carbon Footprint',
      value: `${carbonReduction}% less`,
      change: '-2.3 tons CO₂',
      changeType: 'positive',
      icon: 'Leaf',
      description: 'vs industry average',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {metricsData?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg ${metric?.bgColor}`}>
              <Icon 
                name={metric?.icon} 
                size={20} 
                className={metric?.color}
              />
            </div>
            <div className="text-right">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                metric?.changeType === 'positive' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {metric?.change}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric?.title}
            </h3>
            <p className="text-2xl font-bold text-card-foreground">
              {metric?.value}
            </p>
            <p className="text-xs text-muted-foreground">
              {metric?.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FuelMetricsCards;