import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VehicleCard = ({ 
  vehicle, 
  onSelect, 
  onViewDetails, 
  onLocationRequest,
  onSecurityToggle,
  onMaintenanceSchedule,
  isSelected = false,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'idle':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'maintenance':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'alert':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getEngineHealthColor = (health) => {
    if (health >= 80) return 'text-success';
    if (health >= 60) return 'text-warning';
    return 'text-error';
  };

  const formatLastUpdate = (timestamp) => {
    const now = new Date();
    const update = new Date(timestamp);
    const diffMinutes = Math.floor((now - update) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return update?.toLocaleDateString();
  };

  return (
    <div className={`
      bg-card border border-border rounded-lg p-4 transition-all duration-200
      ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'}
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(vehicle?.id)}
            className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <div>
            <h3 className="font-heading font-semibold text-lg text-card-foreground">
              {vehicle?.plateNumber}
            </h3>
            <p className="text-sm text-muted-foreground">{vehicle?.model}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehicle?.status)}`}>
          {vehicle?.status?.charAt(0)?.toUpperCase() + vehicle?.status?.slice(1)}
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Location</span>
          </div>
          <p className="text-sm font-medium text-card-foreground">{vehicle?.location}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="User" size={16} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Driver</span>
          </div>
          <p className="text-sm font-medium text-card-foreground">{vehicle?.driver}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Fuel" size={16} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Fuel</span>
          </div>
          <p className="text-sm font-medium text-card-foreground">{vehicle?.fuelLevel}%</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Engine</span>
          </div>
          <p className={`text-sm font-medium ${getEngineHealthColor(vehicle?.engineHealth)}`}>
            {vehicle?.engineHealth}%
          </p>
        </div>
      </div>
      {/* Last Update */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <span>Last update: {formatLastUpdate(vehicle?.lastUpdate)}</span>
        {vehicle?.alerts > 0 && (
          <div className="flex items-center space-x-1 text-error">
            <Icon name="AlertTriangle" size={14} />
            <span>{vehicle?.alerts} alert{vehicle?.alerts !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MapPin"
            iconSize={14}
            onClick={() => onLocationRequest(vehicle?.id)}
          >
            Location
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName={vehicle?.securityActive ? "ShieldCheck" : "Shield"}
            iconSize={14}
            onClick={() => onSecurityToggle(vehicle?.id)}
            className={vehicle?.securityActive ? "text-success border-success" : ""}
          >
            Security
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(vehicle?.id)}
          >
            Details
          </Button>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-card-foreground mb-2">Vehicle Info</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VIN:</span>
                  <span className="text-card-foreground">{vehicle?.vin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mileage:</span>
                  <span className="text-card-foreground">{vehicle?.mileage?.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Speed:</span>
                  <span className="text-card-foreground">{vehicle?.currentSpeed} km/h</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-card-foreground mb-2">Diagnostics</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Battery:</span>
                  <span className="text-card-foreground">{vehicle?.batteryVoltage}V</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tire Pressure:</span>
                  <span className="text-card-foreground">{vehicle?.tirePressure} PSI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Service:</span>
                  <span className="text-card-foreground">{vehicle?.nextService}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Wrench"
              iconPosition="left"
              iconSize={14}
              onClick={() => onMaintenanceSchedule(vehicle?.id)}
            >
              Schedule Maintenance
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={14}
            >
              Contact Driver
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;