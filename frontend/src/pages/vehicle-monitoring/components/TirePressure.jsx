import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TirePressure = ({ 
  tireData = {},
  onCalibrateSensors = () => {},
  onScheduleMaintenance = () => {},
  className = ''
}) => {
  const [selectedTire, setSelectedTire] = useState('front-left');
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState('C'); // 'C' or 'F'

  const mockTireData = {
    'front-left': {
      pressure: 32.5,
      temperature: 28,
      status: 'normal',
      lastUpdated: new Date(),
      sensorBattery: 85,
      treadDepth: 6.2,
      recommendedPressure: 32,
      leakRate: 0.1
    },
    'front-right': {
      pressure: 31.8,
      temperature: 29,
      status: 'normal',
      lastUpdated: new Date(),
      sensorBattery: 78,
      treadDepth: 6.0,
      recommendedPressure: 32,
      leakRate: 0.2
    },
    'rear-left': {
      pressure: 28.5,
      temperature: 31,
      status: 'low',
      lastUpdated: new Date(),
      sensorBattery: 92,
      treadDepth: 5.8,
      recommendedPressure: 32,
      leakRate: 0.5
    },
    'rear-right': {
      pressure: 33.2,
      temperature: 30,
      status: 'normal',
      lastUpdated: new Date(),
      sensorBattery: 88,
      treadDepth: 5.9,
      recommendedPressure: 32,
      leakRate: 0.1
    }
  };

  const mockMaintenanceSchedule = [
    {
      type: 'rotation',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      mileage: 2500,
      priority: 'medium'
    },
    {
      type: 'replacement',
      dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      mileage: 15000,
      priority: 'low'
    }
  ];

  const mockAlerts = [
    {
      id: 1,
      tire: 'rear-left',
      type: 'low_pressure',
      message: 'Pressure below recommended level',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 2,
      tire: 'front-right',
      type: 'sensor_battery',
      message: 'Sensor battery getting low',
      severity: 'low',
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  const getTireStatus = (pressure, recommended) => {
    const diff = Math.abs(pressure - recommended);
    const percentage = diff / recommended * 100;
    
    if (percentage > 20) return { status: 'critical', color: 'text-error', bgColor: 'bg-error' };
    if (percentage > 10) return { status: 'warning', color: 'text-warning', bgColor: 'bg-warning' };
    return { status: 'normal', color: 'text-success', bgColor: 'bg-success' };
  };

  const getTirePosition = (position) => {
    const positions = {
      'front-left': { name: 'Front Left', icon: 'Circle', position: 'top-left' },
      'front-right': { name: 'Front Right', icon: 'Circle', position: 'top-right' },
      'rear-left': { name: 'Rear Left', icon: 'Circle', position: 'bottom-left' },
      'rear-right': { name: 'Rear Right', icon: 'Circle', position: 'bottom-right' }
    };
    return positions?.[position] || positions?.['front-left'];
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const convertTemperature = (temp) => {
    if (temperatureUnit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  const selectedTireData = mockTireData?.[selectedTire];
  const tireStatus = getTireStatus(selectedTireData?.pressure, selectedTireData?.recommendedPressure);

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Disc" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground">Tire Pressure Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                TPMS real-time monitoring & maintenance
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Calibrate"
              iconPosition="left"
              iconSize={16}
              onClick={onCalibrateSensors}
            >
              Calibrate
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="Settings"
              iconSize={16}
            />
          </div>
        </div>
      </div>
      {/* Tire Visual Display */}
      <div className="p-4">
        <div className="mb-6">
          <h4 className="font-medium text-card-foreground mb-4 text-center">Vehicle Tire Overview</h4>
          <div className="relative mx-auto w-64 h-40 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            {/* Vehicle Body */}
            <div className="absolute inset-4 bg-muted rounded border border-border flex items-center justify-center">
              <Icon name="Car" size={32} className="text-muted-foreground" />
            </div>
            
            {/* Tire Positions */}
            {Object.entries(mockTireData)?.map(([position, data]) => {
              const tirePos = getTirePosition(position);
              const status = getTireStatus(data?.pressure, data?.recommendedPressure);
              
              let positionClasses = '';
              switch (position) {
                case 'front-left':
                  positionClasses = 'absolute -top-2 -left-2';
                  break;
                case 'front-right':
                  positionClasses = 'absolute -top-2 -right-2';
                  break;
                case 'rear-left':
                  positionClasses = 'absolute -bottom-2 -left-2';
                  break;
                case 'rear-right':
                  positionClasses = 'absolute -bottom-2 -right-2';
                  break;
              }
              
              return (
                <button
                  key={position}
                  onClick={() => setSelectedTire(position)}
                  className={`${positionClasses} w-12 h-8 rounded border-2 transition-all duration-200 ${
                    selectedTire === position 
                      ? 'border-primary bg-primary/20' 
                      : `border-border bg-card hover:border-primary/50`
                  }`}
                >
                  <div className={`w-full h-full rounded flex items-center justify-center ${status?.bgColor}/20`}>
                    <div className={`w-2 h-2 rounded-full ${status?.bgColor}`}></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tire Details */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground">
              {getTirePosition(selectedTire)?.name} Details
            </h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Temperature:</span>
              <button
                onClick={() => setTemperatureUnit(temperatureUnit === 'C' ? 'F' : 'C')}
                className="text-sm font-medium text-primary hover:underline"
              >
                °{temperatureUnit}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${tireStatus?.color} mb-1`}>
                {selectedTireData?.pressure}
              </div>
              <div className="text-xs text-muted-foreground">PSI</div>
              <div className="text-xs text-muted-foreground">
                Target: {selectedTireData?.recommendedPressure}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-card-foreground mb-1">
                {convertTemperature(selectedTireData?.temperature)}°
              </div>
              <div className="text-xs text-muted-foreground">{temperatureUnit}</div>
              <div className="text-xs text-muted-foreground">Temperature</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-card-foreground mb-1">
                {selectedTireData?.treadDepth}
              </div>
              <div className="text-xs text-muted-foreground">mm</div>
              <div className="text-xs text-muted-foreground">Tread Depth</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {selectedTireData?.sensorBattery}%
              </div>
              <div className="text-xs text-muted-foreground">Battery</div>
              <div className="text-xs text-muted-foreground">Sensor</div>
            </div>
          </div>
        </div>

        {/* All Tires Summary */}
        <div className="mb-6">
          <h4 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="Grid3X3" size={16} className="mr-2" />
            All Tires Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(mockTireData)?.map(([position, data]) => {
              const tirePos = getTirePosition(position);
              const status = getTireStatus(data?.pressure, data?.recommendedPressure);
              
              return (
                <div
                  key={position}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTire === position 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTire(position)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${status?.bgColor}`}></div>
                      <div>
                        <div className="font-medium text-card-foreground text-sm">
                          {tirePos?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {data?.pressure} PSI • {convertTemperature(data?.temperature)}°{temperatureUnit}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${status?.color}`}>
                        {status?.status?.toUpperCase()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {data?.sensorBattery}% battery
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Maintenance Recommendations */}
        {showRecommendations && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-card-foreground flex items-center">
                <Icon name="Wrench" size={16} className="mr-2" />
                Maintenance Schedule
              </h4>
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                iconSize={14}
                onClick={onScheduleMaintenance}
              >
                Schedule
              </Button>
            </div>
            
            <div className="space-y-3">
              {mockMaintenanceSchedule?.map((item, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={item?.type === 'rotation' ? 'RotateCcw' : 'RefreshCw'} 
                        size={16} 
                        className="text-primary" 
                      />
                      <div>
                        <div className="font-medium text-card-foreground text-sm capitalize">
                          Tire {item?.type}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Due: {item?.dueDate?.toLocaleDateString()} • {item?.mileage} km
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item?.priority === 'high' ? 'text-error bg-error/10' :
                      item?.priority === 'medium'? 'text-warning bg-warning/10' : 'text-accent bg-accent/10'
                    }`}>
                      {item?.priority?.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Alerts */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
            Active Alerts ({mockAlerts?.length})
          </h4>
          
          {mockAlerts?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="CheckCircle" size={48} className="mx-auto mb-3 text-success" />
              <p className="font-medium">All tires are in good condition</p>
              <p className="text-sm">No alerts or maintenance required</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockAlerts?.map((alert) => (
                <div key={alert?.id} className={`p-3 border rounded-lg ${getSeverityColor(alert?.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium text-sm">
                          {getTirePosition(alert?.tire)?.name}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                          {alert?.severity?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-card-foreground mb-1">{alert?.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert?.timestamp?.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="X"
                      iconSize={14}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TirePressure;