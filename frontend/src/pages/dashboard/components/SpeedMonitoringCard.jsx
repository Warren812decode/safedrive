import React from 'react';
import Icon from '../../../components/AppIcon';

const SpeedMonitoringCard = ({ 
  speedData = {
    currentSpeed: 65,
    speedLimit: 80,
    averageSpeed: 58,
    maxSpeedToday: 85,
    violations: 2,
    governorActive: true
  }
}) => {
  const isOverLimit = speedData?.currentSpeed > speedData?.speedLimit;
  const speedPercentage = Math.min((speedData?.currentSpeed / speedData?.speedLimit) * 100, 100);
  
  const getSpeedColor = () => {
    if (isOverLimit) return 'text-error';
    if (speedData?.currentSpeed > speedData?.speedLimit * 0.9) return 'text-warning';
    return 'text-success';
  };

  const getSpeedBgColor = () => {
    if (isOverLimit) return 'bg-error';
    if (speedData?.currentSpeed > speedData?.speedLimit * 0.9) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">Speed Monitoring</h3>
        <div className={`flex items-center space-x-1 ${speedData?.governorActive ? 'text-success' : 'text-warning'}`}>
          <Icon name="Shield" size={16} />
          <span className="text-xs font-medium">
            {speedData?.governorActive ? "Governor ON" : "Governor OFF"}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Current Speed Display */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getSpeedColor()}`}>
            {speedData?.currentSpeed}
            <span className="text-lg font-normal text-muted-foreground ml-1">km/h</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Limit: {speedData?.speedLimit} km/h
          </p>
        </div>

        {/* Speed Progress Bar */}
        <div className="relative">
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getSpeedBgColor()}`}
              style={{ width: `${speedPercentage}%` }}
            ></div>
          </div>
          {isOverLimit && (
            <div className="absolute -top-1 right-0 flex items-center space-x-1 text-error">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-xs font-medium">OVER LIMIT</span>
            </div>
          )}
        </div>

        {/* Speed Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Average Today</p>
            <p className="text-lg font-semibold text-card-foreground">
              {speedData?.averageSpeed} <span className="text-xs font-normal">km/h</span>
            </p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Max Today</p>
            <p className="text-lg font-semibold text-card-foreground">
              {speedData?.maxSpeedToday} <span className="text-xs font-normal">km/h</span>
            </p>
          </div>
        </div>

        {/* Violations Alert */}
        {speedData?.violations > 0 && (
          <div className="flex items-center justify-between p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Speed Violations</span>
            </div>
            <span className="text-sm font-bold text-error">{speedData?.violations} today</span>
          </div>
        )}

        {/* NTSA Compliance Status */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">NTSA Compliant</span>
          </div>
          <span className="text-xs font-medium text-success">Active</span>
        </div>
      </div>
    </div>
  );
};

export default SpeedMonitoringCard;