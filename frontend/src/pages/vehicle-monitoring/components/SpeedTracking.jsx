import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SpeedTracking = ({ 
  currentSpeed = 45,
  speedLimit = 50,
  governorStatus = 'active',
  violations = [],
  onUpdateSettings = () => {},
  className = ''
}) => {
  const [timeRange, setTimeRange] = useState('today'); // 'today', 'week', 'month'
  const [showViolations, setShowViolations] = useState(true);

  const mockSpeedData = {
    current: currentSpeed,
    average: 42,
    maximum: 78,
    speedLimit: speedLimit,
    governorLimit: 80,
    compliance: 94.5
  };

  const mockViolations = [
    {
      id: 1,
      speed: 78,
      limit: 50,
      location: "Thika Road, Nairobi",
      timestamp: new Date(Date.now() - 3600000),
      duration: 45,
      severity: 'high'
    },
    {
      id: 2,
      speed: 65,
      limit: 50,
      location: "Mombasa Road, Nairobi",
      timestamp: new Date(Date.now() - 7200000),
      duration: 120,
      severity: 'medium'
    },
    {
      id: 3,
      speed: 55,
      limit: 50,
      location: "Waiyaki Way, Nairobi",
      timestamp: new Date(Date.now() - 10800000),
      duration: 30,
      severity: 'low'
    }
  ];

  const mockHourlyData = [
    { hour: '06:00', speed: 35, limit: 50 },
    { hour: '07:00', speed: 42, limit: 50 },
    { hour: '08:00', speed: 38, limit: 50 },
    { hour: '09:00', speed: 45, limit: 50 },
    { hour: '10:00', speed: 52, limit: 50 },
    { hour: '11:00', speed: 48, limit: 50 },
    { hour: '12:00', speed: 44, limit: 50 }
  ];

  const getSpeedStatus = () => {
    if (currentSpeed > speedLimit + 10) return { status: 'critical', color: 'text-error' };
    if (currentSpeed > speedLimit) return { status: 'warning', color: 'text-warning' };
    return { status: 'normal', color: 'text-success' };
  };

  const getGovernorStatus = () => {
    switch (governorStatus) {
      case 'active':
        return { text: 'Active', color: 'text-success', icon: 'Shield' };
      case 'inactive':
        return { text: 'Inactive', color: 'text-error', icon: 'ShieldOff' };
      case 'bypassed':
        return { text: 'Bypassed', color: 'text-warning', icon: 'ShieldAlert' };
      default:
        return { text: 'Unknown', color: 'text-muted-foreground', icon: 'Shield' };
    }
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

  const speedStatus = getSpeedStatus();
  const governor = getGovernorStatus();

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Gauge" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground">Speed Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Real-time speed tracking & compliance
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <Button
              variant="ghost"
              size="icon"
              iconName="Settings"
              iconSize={16}
              onClick={onUpdateSettings}
            />
          </div>
        </div>
      </div>
      {/* Speed Dashboard */}
      <div className="p-4">
        {/* Current Speed Display */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center mb-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${speedStatus?.color}`}>
                  {mockSpeedData?.current}
                </div>
                <div className="text-sm text-muted-foreground">km/h</div>
              </div>
            </div>
            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
              speedStatus?.status === 'critical' ? 'bg-error' : 
              speedStatus?.status === 'warning' ? 'bg-warning' : 'bg-success'
            }`}>
              <Icon 
                name={speedStatus?.status === 'normal' ? 'Check' : 'AlertTriangle'} 
                size={16} 
                className="text-white" 
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Speed Limit: {mockSpeedData?.speedLimit} km/h
          </div>
          <div className={`text-sm font-medium ${speedStatus?.color}`}>
            {speedStatus?.status === 'normal' ? 'Within Limit' : 
             speedStatus?.status === 'warning' ? 'Exceeding Limit' : 'Critical Speed'}
          </div>
        </div>

        {/* Speed Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-card-foreground">{mockSpeedData?.average}</div>
            <div className="text-xs text-muted-foreground">Average Speed</div>
            <div className="text-xs text-muted-foreground">km/h</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-card-foreground">{mockSpeedData?.maximum}</div>
            <div className="text-xs text-muted-foreground">Max Speed</div>
            <div className="text-xs text-muted-foreground">km/h</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">{mockSpeedData?.compliance}%</div>
            <div className="text-xs text-muted-foreground">Compliance</div>
            <div className="text-xs text-muted-foreground">Rate</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-card-foreground">{mockViolations?.length}</div>
            <div className="text-xs text-muted-foreground">Violations</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
        </div>

        {/* Speed Governor Status */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name={governor?.icon} size={20} className={governor?.color} />
              <div>
                <h4 className="font-medium text-card-foreground">Speed Governor</h4>
                <p className="text-sm text-muted-foreground">NTSA Compliance Device</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-medium ${governor?.color}`}>{governor?.text}</div>
              <div className="text-sm text-muted-foreground">
                Limit: {mockSpeedData?.governorLimit} km/h
              </div>
            </div>
          </div>
        </div>

        {/* Speed History Chart */}
        <div className="mb-6">
          <h4 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Speed History (Today)
          </h4>
          <div className="h-32 bg-muted/30 rounded-lg p-4 flex items-end justify-between">
            {mockHourlyData?.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className={`w-4 rounded-t ${data?.speed > data?.limit ? 'bg-error' : 'bg-primary'}`}
                  style={{ height: `${(data?.speed / 80) * 80}px` }}
                ></div>
                <div className="text-xs text-muted-foreground transform -rotate-45">
                  {data?.hour}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speed Violations */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground flex items-center">
              <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
              Speed Violations ({mockViolations?.length})
            </h4>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showViolations}
                onChange={(e) => setShowViolations(e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-card-foreground">Show Details</span>
            </label>
          </div>

          {mockViolations?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="CheckCircle" size={48} className="mx-auto mb-3 text-success" />
              <p className="font-medium">No speed violations today</p>
              <p className="text-sm">Excellent driving compliance!</p>
            </div>
          ) : showViolations ? (
            <div className="space-y-3">
              {mockViolations?.map((violation) => (
                <div key={violation?.id} className={`p-3 border rounded-lg ${getSeverityColor(violation?.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-bold text-lg">
                          {violation?.speed} km/h
                        </span>
                        <span className="text-sm text-muted-foreground">
                          (Limit: {violation?.limit} km/h)
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(violation?.severity)}`}>
                          {violation?.severity?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-card-foreground mb-1">
                        <Icon name="MapPin" size={14} className="inline mr-1" />
                        {violation?.location}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>
                          <Icon name="Clock" size={12} className="inline mr-1" />
                          {violation?.timestamp?.toLocaleTimeString()}
                        </span>
                        <span>
                          <Icon name="Timer" size={12} className="inline mr-1" />
                          {violation?.duration}s duration
                        </span>
                      </div>
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
          ) : (
            <div className="text-sm text-muted-foreground">
              Click "Show Details" to view violation information
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeedTracking;