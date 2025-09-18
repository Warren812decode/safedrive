import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EngineStatus = ({ 
  engineData = {},
  faultCodes = [],
  onRefreshData = () => {},
  onClearCodes = () => {},
  className = ''
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const mockEngineData = {
    temperature: {
      value: 87,
      unit: '°C',
      status: 'normal',
      threshold: { min: 70, max: 105 },
      trend: 'stable'
    },
    rpm: {
      value: 2150,
      unit: 'RPM',
      status: 'normal',
      threshold: { min: 800, max: 6000 },
      trend: 'increasing'
    },
    oilPressure: {
      value: 45,
      unit: 'PSI',
      status: 'normal',
      threshold: { min: 20, max: 80 },
      trend: 'stable'
    },
    fuelPressure: {
      value: 58,
      unit: 'PSI',
      status: 'normal',
      threshold: { min: 35, max: 65 },
      trend: 'stable'
    },
    voltage: {
      value: 14.2,
      unit: 'V',
      status: 'normal',
      threshold: { min: 12.0, max: 14.8 },
      trend: 'stable'
    },
    airflow: {
      value: 18.5,
      unit: 'g/s',
      status: 'normal',
      threshold: { min: 5, max: 50 },
      trend: 'stable'
    }
  };

  const mockFaultCodes = [
    {
      code: 'P0171',
      description: 'System Too Lean (Bank 1)',
      severity: 'medium',
      timestamp: new Date(Date.now() - 7200000),
      status: 'active'
    },
    {
      code: 'P0420',
      description: 'Catalyst System Efficiency Below Threshold',
      severity: 'low',
      timestamp: new Date(Date.now() - 86400000),
      status: 'pending'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'normal':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'critical':
        return 'bg-error/10 border-error/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'normal':
        return 'bg-success/10 border-success/20';
      default:
        return 'bg-muted/10 border-border';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onRefreshData();
    setRefreshing(false);
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'temperature':
        return 'Thermometer';
      case 'rpm':
        return 'Gauge';
      case 'oilPressure':
        return 'Droplets';
      case 'fuelPressure':
        return 'Fuel';
      case 'voltage':
        return 'Zap';
      case 'airflow':
        return 'Wind';
      default:
        return 'Activity';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Engine" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground">Engine Diagnostics</h3>
              <p className="text-sm text-muted-foreground">
                OBD-II Real-time Monitoring
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
              loading={refreshing}
              onClick={handleRefresh}
            >
              Refresh
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
      {/* Engine Metrics Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(mockEngineData)?.map(([key, metric]) => (
            <div
              key={key}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedMetric === key 
                  ? 'border-primary bg-primary/5' 
                  : `border-border hover:border-primary/50 ${getStatusBgColor(metric?.status)}`
              }`}
              onClick={() => setSelectedMetric(key)}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon 
                  name={getMetricIcon(key)} 
                  size={16} 
                  className={getStatusColor(metric?.status)} 
                />
                <Icon 
                  name={getTrendIcon(metric?.trend)} 
                  size={14} 
                  className="text-muted-foreground" 
                />
              </div>
              <div className="text-2xl font-bold text-card-foreground mb-1">
                {metric?.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {metric?.unit}
                </span>
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {key?.replace(/([A-Z])/g, ' $1')?.trim()}
              </div>
              <div className={`text-xs font-medium mt-1 ${getStatusColor(metric?.status)}`}>
                {metric?.status?.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Metric Details */}
        {selectedMetric && mockEngineData?.[selectedMetric] && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-card-foreground mb-3 flex items-center">
              <Icon name={getMetricIcon(selectedMetric)} size={16} className="mr-2" />
              {selectedMetric?.replace(/([A-Z])/g, ' $1')?.trim()} Details
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Current:</span>
                <div className="font-medium text-card-foreground">
                  {mockEngineData?.[selectedMetric]?.value} {mockEngineData?.[selectedMetric]?.unit}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Min Threshold:</span>
                <div className="font-medium text-card-foreground">
                  {mockEngineData?.[selectedMetric]?.threshold?.min} {mockEngineData?.[selectedMetric]?.unit}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Max Threshold:</span>
                <div className="font-medium text-card-foreground">
                  {mockEngineData?.[selectedMetric]?.threshold?.max} {mockEngineData?.[selectedMetric]?.unit}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className={`font-medium ${getStatusColor(mockEngineData?.[selectedMetric]?.status)}`}>
                  {mockEngineData?.[selectedMetric]?.status?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fault Codes Section */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground flex items-center">
              <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
              Diagnostic Trouble Codes ({mockFaultCodes?.length})
            </h4>
            {mockFaultCodes?.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                iconSize={14}
                onClick={onClearCodes}
              >
                Clear Codes
              </Button>
            )}
          </div>

          {mockFaultCodes?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="CheckCircle" size={48} className="mx-auto mb-3 text-success" />
              <p className="font-medium">No fault codes detected</p>
              <p className="text-sm">Engine systems are operating normally</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockFaultCodes?.map((fault, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono font-bold text-card-foreground">
                          {fault?.code}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(fault?.severity)}`}>
                          {fault?.severity?.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fault?.status === 'active' ? 'text-error bg-error/10' : 'text-warning bg-warning/10'
                        }`}>
                          {fault?.status?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-card-foreground mb-1">{fault?.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Detected: {fault?.timestamp?.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="ExternalLink"
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

export default EngineStatus;