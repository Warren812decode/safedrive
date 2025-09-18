import React from 'react';
import Icon from '../../../components/AppIcon';

const VehicleStatusCard = ({ 
  vehicleData = {
    location: "Nairobi CBD, Kenya",
    engineStatus: "running",
    batteryLevel: 85,
    isMoving: true,
    lastUpdate: new Date()
  }
}) => {
  const getEngineStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'text-success';
      case 'idle':
        return 'text-warning';
      case 'off':
        return 'text-muted-foreground';
      default:
        return 'text-error';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-success';
    if (level > 30) return 'text-warning';
    return 'text-error';
  };

  const getBatteryIcon = (level) => {
    if (level > 75) return 'Battery';
    if (level > 50) return 'Battery';
    if (level > 25) return 'BatteryLow';
    return 'BatteryLow';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">Vehicle Status</h3>
        <div className={`flex items-center space-x-1 ${vehicleData?.isMoving ? 'text-success' : 'text-muted-foreground'}`}>
          <Icon name={vehicleData?.isMoving ? "Navigation" : "MapPin"} size={16} />
          <span className="text-xs font-medium">
            {vehicleData?.isMoving ? "Moving" : "Parked"}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground">Current Location</p>
            <p className="text-sm text-muted-foreground truncate">{vehicleData?.location}</p>
          </div>
        </div>

        {/* Engine Status */}
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={20} className={`${getEngineStatusColor(vehicleData?.engineStatus)} flex-shrink-0`} />
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">Engine Status</p>
            <p className={`text-sm font-medium capitalize ${getEngineStatusColor(vehicleData?.engineStatus)}`}>
              {vehicleData?.engineStatus}
            </p>
          </div>
        </div>

        {/* Battery Level */}
        <div className="flex items-center space-x-3">
          <Icon 
            name={getBatteryIcon(vehicleData?.batteryLevel)} 
            size={20} 
            className={`${getBatteryColor(vehicleData?.batteryLevel)} flex-shrink-0`} 
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-card-foreground">Battery Level</p>
              <span className={`text-sm font-medium ${getBatteryColor(vehicleData?.batteryLevel)}`}>
                {vehicleData?.batteryLevel}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  vehicleData?.batteryLevel > 60 ? 'bg-success' : 
                  vehicleData?.batteryLevel > 30 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${vehicleData?.batteryLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last updated</span>
          </div>
          <span className="text-xs font-medium text-card-foreground">
            {vehicleData?.lastUpdate?.toLocaleTimeString('en-KE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatusCard;