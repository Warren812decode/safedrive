import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertSummarySection = ({ 
  alerts = [
    {
      id: 1,
      type: "maintenance",
      priority: "high",
      title: "Service Due",
      message: "Vehicle service is due in 500 km or 5 days",
      timestamp: new Date(Date.now() - 3600000),
      actionRequired: true
    },
    {
      id: 2,
      type: "speed",
      priority: "medium",
      title: "Speed Violation",
      message: "Exceeded speed limit by 15 km/h on Thika Road",
      timestamp: new Date(Date.now() - 7200000),
      actionRequired: false
    },
    {
      id: 3,
      type: "security",
      priority: "low",
      title: "Geofence Alert",
      message: "Vehicle entered restricted area near Industrial Area",
      timestamp: new Date(Date.now() - 10800000),
      actionRequired: false
    }
  ]
}) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return 'Wrench';
      case 'speed':
        return 'Gauge';
      case 'security':
        return 'Shield';
      case 'fuel':
        return 'Fuel';
      case 'battery':
        return 'Battery';
      default:
        return 'AlertCircle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 border-error/20';
      case 'medium':
        return 'bg-warning/10 border-warning/20';
      case 'low':
        return 'bg-success/10 border-success/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date?.toLocaleDateString('en-KE');
    }
  };

  const toggleExpanded = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const urgentAlerts = alerts?.filter(alert => alert?.priority === 'high')?.length;
  const totalAlerts = alerts?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">Recent Alerts</h3>
        <div className="flex items-center space-x-2">
          {urgentAlerts > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {urgentAlerts} urgent
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {totalAlerts} total
          </span>
        </div>
      </div>
      {alerts?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <p className="text-sm font-medium text-card-foreground mb-1">All Clear!</p>
          <p className="text-xs text-muted-foreground">No active alerts for your vehicle</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts?.map((alert) => (
            <div 
              key={alert?.id}
              className={`border rounded-lg transition-all duration-200 ${getPriorityBg(alert?.priority)}`}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpanded(alert?.id)}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={20} 
                    className={`${getPriorityColor(alert?.priority)} flex-shrink-0 mt-0.5`} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-card-foreground truncate">
                        {alert?.title}
                      </h4>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        {alert?.actionRequired && (
                          <Icon name="AlertCircle" size={14} className="text-error" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(alert?.timestamp)}
                        </span>
                        <Icon 
                          name={expandedAlert === alert?.id ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                          className="text-muted-foreground" 
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {alert?.message}
                    </p>
                  </div>
                </div>
              </div>

              {expandedAlert === alert?.id && (
                <div className="px-4 pb-4 border-t border-border/50">
                  <div className="pt-3 space-y-3">
                    <p className="text-sm text-card-foreground">
                      {alert?.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          alert?.priority === 'high' ? 'bg-error text-error-foreground' :
                          alert?.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                          'bg-success text-success-foreground'
                        }`}>
                          {alert?.priority?.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {alert?.type} alert
                        </span>
                      </div>
                      
                      {alert?.actionRequired && (
                        <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {alerts?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All Alerts ({totalAlerts})
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertSummarySection;