import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotifications = ({ 
  alerts = [],
  onDismissAlert = () => {},
  onDismissAll = () => {},
  onConfigureAlerts = () => {},
  soundEnabled = true,
  onToggleSound = () => {},
  className = ''
}) => {
  const [filter, setFilter] = useState('all'); // 'all', 'critical', 'warning', 'info'
  const [sortBy, setSortBy] = useState('timestamp'); // 'timestamp', 'severity', 'type'
  const [expandedAlert, setExpandedAlert] = useState(null);

  const mockAlerts = [
    {
      id: 1,
      type: 'engine_temperature',
      severity: 'critical',
      title: 'Engine Overheating',
      message: 'Engine temperature has exceeded safe operating limits (105°C). Immediate attention required.',
      timestamp: new Date(Date.now() - 300000),
      source: 'Engine Diagnostics',
      actions: [
        { label: 'Stop Vehicle', action: 'stop_vehicle', urgent: true },
        { label: 'Call Mechanic', action: 'call_mechanic', urgent: false }
      ],
      dismissed: false,
      acknowledged: false
    },
    {
      id: 2,
      type: 'speed_violation',
      severity: 'warning',
      title: 'Speed Limit Exceeded',
      message: 'Vehicle speed (78 km/h) exceeded posted limit (50 km/h) on Thika Road.',
      timestamp: new Date(Date.now() - 900000),
      source: 'Speed Monitoring',
      location: 'Thika Road, Nairobi',
      actions: [
        { label: 'View Location', action: 'view_location', urgent: false }
      ],
      dismissed: false,
      acknowledged: true
    },
    {
      id: 3,
      type: 'tire_pressure',
      severity: 'warning',
      title: 'Low Tire Pressure',
      message: 'Rear left tire pressure (28.5 PSI) is below recommended level (32 PSI).',
      timestamp: new Date(Date.now() - 1800000),
      source: 'TPMS',
      actions: [
        { label: 'Find Gas Station', action: 'find_station', urgent: false },
        { label: 'Schedule Service', action: 'schedule_service', urgent: false }
      ],
      dismissed: false,
      acknowledged: false
    },
    {
      id: 4,
      type: 'security_breach',
      severity: 'critical',
      title: 'Unauthorized Access',
      message: 'Vehicle door opened without key authorization. Security system activated.',
      timestamp: new Date(Date.now() - 3600000),
      source: 'Security System',
      location: 'CBD, Nairobi',
      actions: [
        { label: 'Emergency Alert', action: 'emergency_alert', urgent: true },
        { label: 'View Camera', action: 'view_camera', urgent: false }
      ],
      dismissed: false,
      acknowledged: true
    },
    {
      id: 5,
      type: 'maintenance_due',
      severity: 'info',
      title: 'Service Reminder',
      message: 'Regular maintenance service is due in 500 km or 7 days.',
      timestamp: new Date(Date.now() - 7200000),
      source: 'Maintenance Scheduler',
      actions: [
        { label: 'Book Service', action: 'book_service', urgent: false },
        { label: 'Remind Later', action: 'remind_later', urgent: false }
      ],
      dismissed: false,
      acknowledged: false
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'engine_temperature':
        return 'Thermometer';
      case 'speed_violation':
        return 'Gauge';
      case 'tire_pressure':
        return 'Disc';
      case 'security_breach':
        return 'ShieldAlert';
      case 'maintenance_due':
        return 'Wrench';
      case 'battery_low':
        return 'Battery';
      case 'fuel_low':
        return 'Fuel';
      default:
        return 'Bell';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const filteredAlerts = mockAlerts?.filter(alert => {
    if (filter === 'all') return true;
    return alert?.severity === filter;
  });

  const sortedAlerts = [...filteredAlerts]?.sort((a, b) => {
    switch (sortBy) {
      case 'severity':
        const severityOrder = { critical: 3, warning: 2, info: 1 };
        return severityOrder?.[b?.severity] - severityOrder?.[a?.severity];
      case 'type':
        return a?.type?.localeCompare(b?.type);
      case 'timestamp':
      default:
        return b?.timestamp - a?.timestamp;
    }
  });

  const criticalCount = mockAlerts?.filter(a => a?.severity === 'critical' && !a?.dismissed)?.length;
  const warningCount = mockAlerts?.filter(a => a?.severity === 'warning' && !a?.dismissed)?.length;
  const infoCount = mockAlerts?.filter(a => a?.severity === 'info' && !a?.dismissed)?.length;

  const handleAlertAction = (alertId, action) => {
    console.log(`Executing action: ${action} for alert: ${alertId}`);
    // Handle specific alert actions
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center relative">
              <Icon name="Bell" size={20} className="text-primary" />
              {criticalCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{criticalCount}</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground">Alert Center</h3>
              <p className="text-sm text-muted-foreground">
                Real-time notifications & alerts
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={soundEnabled ? "default" : "outline"}
              size="sm"
              iconName={soundEnabled ? 'Volume2' : 'VolumeX'}
              iconPosition="left"
              iconSize={16}
              onClick={onToggleSound}
            >
              Sound
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
              onClick={onConfigureAlerts}
            >
              Configure
            </Button>
          </div>
        </div>
      </div>
      {/* Alert Summary */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-error">{criticalCount}</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{warningCount}</div>
            <div className="text-sm text-muted-foreground">Warning</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{infoCount}</div>
            <div className="text-sm text-muted-foreground">Info</div>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-card-foreground">Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e?.target?.value)}
                className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
              >
                <option value="all">All Alerts</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-card-foreground">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
              >
                <option value="timestamp">Latest First</option>
                <option value="severity">By Severity</option>
                <option value="type">By Type</option>
              </select>
            </div>
          </div>
          
          {sortedAlerts?.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              iconSize={14}
              onClick={onDismissAll}
            >
              Dismiss All
            </Button>
          )}
        </div>
      </div>
      {/* Alerts List */}
      <div className="p-4">
        {sortedAlerts?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="CheckCircle" size={64} className="mx-auto mb-4 text-success" />
            <h4 className="font-medium text-lg text-card-foreground mb-2">All Clear!</h4>
            <p className="text-sm">No active alerts at this time</p>
            <p className="text-sm">Your vehicle systems are operating normally</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`border rounded-lg transition-all duration-200 ${
                  expandedAlert === alert?.id 
                    ? 'border-primary bg-primary/5' 
                    : `border-border hover:border-primary/50 ${getSeverityColor(alert?.severity)}`
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(alert?.severity)}`}>
                        <Icon name={getAlertIcon(alert?.type)} size={20} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-card-foreground">{alert?.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                            {alert?.severity?.toUpperCase()}
                          </span>
                          {alert?.acknowledged && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                              ACKNOWLEDGED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            iconName={expandedAlert === alert?.id ? 'ChevronUp' : 'ChevronDown'}
                            iconSize={16}
                            onClick={() => setExpandedAlert(expandedAlert === alert?.id ? null : alert?.id)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            iconName="X"
                            iconSize={16}
                            onClick={() => onDismissAlert(alert?.id)}
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm text-card-foreground mb-3 leading-relaxed">
                        {alert?.message}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{alert?.timestamp?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Settings" size={12} />
                          <span>{alert?.source}</span>
                        </div>
                        {alert?.location && (
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={12} />
                            <span>{alert?.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  {alert?.actions && alert?.actions?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {alert?.actions?.map((action, index) => (
                          <Button
                            key={index}
                            variant={action?.urgent ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => handleAlertAction(alert?.id, action?.action)}
                          >
                            {action?.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Expanded Details */}
                  {expandedAlert === alert?.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-card-foreground">Alert ID:</span>
                          <div className="text-muted-foreground font-mono">{alert?.id}</div>
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">Type:</span>
                          <div className="text-muted-foreground">{alert?.type?.replace(/_/g, ' ')}</div>
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">Source System:</span>
                          <div className="text-muted-foreground">{alert?.source}</div>
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">Status:</span>
                          <div className="text-muted-foreground">
                            {alert?.acknowledged ? 'Acknowledged' : 'Pending Review'}
                          </div>
                        </div>
                      </div>
                      
                      {!alert?.acknowledged && (
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Check"
                            iconPosition="left"
                            iconSize={14}
                          >
                            Acknowledge Alert
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${soundEnabled ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
            <span className="text-muted-foreground">
              Alert notifications: {soundEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="text-muted-foreground">
            {sortedAlerts?.length} of {mockAlerts?.length} alerts shown
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertNotifications;