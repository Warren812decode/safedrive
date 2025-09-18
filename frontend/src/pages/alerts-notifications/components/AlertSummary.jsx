import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertSummary = ({ 
  alertCounts = {},
  connectionStatus = 'connected',
  lastUpdate = new Date(),
  className = '' 
}) => {
  const summaryCards = [
    {
      title: 'Critical',
      count: alertCounts?.critical || 0,
      icon: 'AlertTriangle',
      color: 'bg-red-50 border-red-200 text-red-600',
      bgColor: 'bg-red-600',
      textColor: 'text-red-600'
    },
    {
      title: 'High Priority',
      count: alertCounts?.high || 0,
      icon: 'AlertCircle',
      color: 'bg-orange-50 border-orange-200 text-orange-600',
      bgColor: 'bg-orange-600',
      textColor: 'text-orange-600'
    },
    {
      title: 'Medium',
      count: alertCounts?.medium || 0,
      icon: 'Info',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-600',
      bgColor: 'bg-yellow-600',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Low Priority',
      count: alertCounts?.low || 0,
      icon: 'Bell',
      color: 'bg-blue-50 border-blue-200 text-blue-600',
      bgColor: 'bg-blue-600',
      textColor: 'text-blue-600'
    }
  ];

  const categoryCards = [
    {
      title: 'Security',
      count: alertCounts?.security || 0,
      icon: 'Shield',
      description: 'Theft & tampering alerts'
    },
    {
      title: 'Maintenance',
      count: alertCounts?.maintenance || 0,
      icon: 'Wrench',
      description: 'Service & diagnostic alerts'
    },
    {
      title: 'Compliance',
      count: alertCounts?.compliance || 0,
      icon: 'FileCheck',
      description: 'NTSA & regulation alerts'
    },
    {
      title: 'System',
      count: alertCounts?.system || 0,
      icon: 'Settings',
      description: 'Connectivity & app alerts'
    }
  ];

  const getConnectionStatus = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: 'Wifi',
          text: 'Connected',
          color: 'text-green-600',
          bgColor: 'bg-green-50 border-green-200'
        };
      case 'reconnecting':
        return {
          icon: 'RefreshCw',
          text: 'Reconnecting',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 border-yellow-200'
        };
      case 'offline':
        return {
          icon: 'WifiOff',
          text: 'Offline',
          color: 'text-red-600',
          bgColor: 'bg-red-50 border-red-200'
        };
      default:
        return {
          icon: 'Wifi',
          text: 'Unknown',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50 border-gray-200'
        };
    }
  };

  const status = getConnectionStatus();
  const totalAlerts = Object.values(alertCounts)?.reduce((sum, count) => sum + (count || 0), 0);

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date?.toLocaleDateString('en-GB');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards?.map((card) => (
          <div
            key={card?.title}
            className={`
              p-4 rounded-lg border transition-all duration-200 hover:shadow-md
              ${card?.color}
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{card?.title}</p>
                <p className="text-2xl font-bold mt-1">{card?.count}</p>
              </div>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${card?.bgColor} text-white
              `}>
                <Icon name={card?.icon} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Status Bar */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`
              flex items-center space-x-2 px-3 py-1 rounded-full border
              ${status?.bgColor}
            `}>
              <Icon 
                name={status?.icon} 
                size={16} 
                className={`${status?.color} ${connectionStatus === 'reconnecting' ? 'animate-spin' : ''}`} 
              />
              <span className={`text-sm font-medium ${status?.color}`}>
                {status?.text}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {formatLastUpdate(lastUpdate)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">
              {totalAlerts} Total Alerts
            </span>
          </div>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-card-foreground flex items-center space-x-2">
            <Icon name="BarChart3" size={20} />
            <span>Alert Categories</span>
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryCards?.map((category) => (
              <div
                key={category?.title}
                className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={category?.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-card-foreground">{category?.title}</p>
                    <span className="text-lg font-bold text-primary">{category?.count}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {category?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-card-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Emergency and immediate response options</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Icon name="Phone" size={16} />
              <span className="text-sm font-medium">Emergency</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Icon name="MessageSquare" size={16} />
              <span className="text-sm font-medium">USSD Check</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSummary;