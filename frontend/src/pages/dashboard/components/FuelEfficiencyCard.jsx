import React from 'react';
import Icon from '../../../components/AppIcon';

const FuelEfficiencyCard = ({ 
  fuelData = {
    todayConsumption: 12.5,
    weeklyAverage: 14.2,
    fuelLevel: 68,
    efficiency: 8.5,
    trend: "improving",
    costToday: 1250,
    estimatedRange: 340
  }
}) => {
  const getTrendIcon = () => {
    switch (fuelData?.trend) {
      case 'improving':
        return 'TrendingUp';
      case 'declining':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = () => {
    switch (fuelData?.trend) {
      case 'improving':
        return 'text-success';
      case 'declining':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getFuelLevelColor = () => {
    if (fuelData?.fuelLevel > 50) return 'text-success';
    if (fuelData?.fuelLevel > 25) return 'text-warning';
    return 'text-error';
  };

  const getFuelLevelBg = () => {
    if (fuelData?.fuelLevel > 50) return 'bg-success';
    if (fuelData?.fuelLevel > 25) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">Fuel Efficiency</h3>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-xs font-medium capitalize">{fuelData?.trend}</span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Current Efficiency */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {fuelData?.efficiency}
            <span className="text-lg font-normal text-muted-foreground ml-1">km/L</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Current efficiency</p>
        </div>

        {/* Fuel Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Fuel" size={16} className={getFuelLevelColor()} />
              <span className="text-sm font-medium text-card-foreground">Fuel Level</span>
            </div>
            <span className={`text-sm font-bold ${getFuelLevelColor()}`}>
              {fuelData?.fuelLevel}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getFuelLevelBg()}`}
              style={{ width: `${fuelData?.fuelLevel}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">
            Estimated range: {fuelData?.estimatedRange} km
          </p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Today's Usage</p>
            <p className="text-lg font-semibold text-card-foreground">
              {fuelData?.todayConsumption} <span className="text-xs font-normal">L</span>
            </p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Weekly Avg</p>
            <p className="text-lg font-semibold text-card-foreground">
              {fuelData?.weeklyAverage} <span className="text-xs font-normal">L</span>
            </p>
          </div>
        </div>

        {/* Cost Information */}
        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Today's Cost</span>
          </div>
          <span className="text-sm font-bold text-primary">KES {fuelData?.costToday?.toLocaleString()}</span>
        </div>

        {/* Eco Tips */}
        <div className="flex items-start space-x-2 p-3 bg-success/5 border border-success/10 rounded-lg">
          <Icon name="Lightbulb" size={16} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-success mb-1">Eco Tip</p>
            <p className="text-xs text-muted-foreground">
              Maintain steady speed between 50-80 km/h for optimal fuel efficiency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelEfficiencyCard;