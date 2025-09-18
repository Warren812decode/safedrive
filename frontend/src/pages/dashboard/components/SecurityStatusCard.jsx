import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityStatusCard = ({ 
  securityData = {
    gpsActive: true,
    alarmStatus: "armed",
    lastMovement: new Date(Date.now() - 1800000), // 30 minutes ago
    geofenceActive: true,
    immobilizerStatus: "active",
    tamperAlerts: 0,
    securityLevel: "high"
  }
}) => {
  const getAlarmStatusColor = () => {
    switch (securityData?.alarmStatus) {
      case 'armed':
        return 'text-success';
      case 'triggered':
        return 'text-error';
      case 'disarmed':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAlarmStatusIcon = () => {
    switch (securityData?.alarmStatus) {
      case 'armed':
        return 'Shield';
      case 'triggered':
        return 'ShieldAlert';
      case 'disarmed':
        return 'ShieldOff';
      default:
        return 'ShieldQuestion';
    }
  };

  const getSecurityLevelColor = () => {
    switch (securityData?.securityLevel) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatLastMovement = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date?.toLocaleDateString('en-KE');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">Security Status</h3>
        <div className={`flex items-center space-x-1 ${getSecurityLevelColor()}`}>
          <Icon name="Shield" size={16} />
          <span className="text-xs font-medium capitalize">{securityData?.securityLevel}</span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Alarm Status */}
        <div className="flex items-center space-x-3">
          <Icon 
            name={getAlarmStatusIcon()} 
            size={20} 
            className={`${getAlarmStatusColor()} flex-shrink-0`} 
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">Alarm System</p>
            <p className={`text-sm font-medium capitalize ${getAlarmStatusColor()}`}>
              {securityData?.alarmStatus}
            </p>
          </div>
        </div>

        {/* GPS Tracking */}
        <div className="flex items-center space-x-3">
          <Icon 
            name="Satellite" 
            size={20} 
            className={`${securityData?.gpsActive ? 'text-success' : 'text-error'} flex-shrink-0`} 
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">GPS Tracking</p>
            <p className={`text-sm font-medium ${securityData?.gpsActive ? 'text-success' : 'text-error'}`}>
              {securityData?.gpsActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {/* Immobilizer Status */}
        <div className="flex items-center space-x-3">
          <Icon 
            name="Lock" 
            size={20} 
            className={`${securityData?.immobilizerStatus === 'active' ? 'text-success' : 'text-warning'} flex-shrink-0`} 
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">Immobilizer</p>
            <p className={`text-sm font-medium capitalize ${securityData?.immobilizerStatus === 'active' ? 'text-success' : 'text-warning'}`}>
              {securityData?.immobilizerStatus}
            </p>
          </div>
        </div>

        {/* Geofence Status */}
        <div className="flex items-center space-x-3">
          <Icon 
            name="MapPin" 
            size={20} 
            className={`${securityData?.geofenceActive ? 'text-success' : 'text-muted-foreground'} flex-shrink-0`} 
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">Geofence</p>
            <p className={`text-sm font-medium ${securityData?.geofenceActive ? 'text-success' : 'text-muted-foreground'}`}>
              {securityData?.geofenceActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {/* Tamper Alerts */}
        {securityData?.tamperAlerts > 0 && (
          <div className="flex items-center justify-between p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Tamper Alerts</span>
            </div>
            <span className="text-sm font-bold text-error">{securityData?.tamperAlerts} today</span>
          </div>
        )}

        {/* Last Movement */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last movement</span>
          </div>
          <span className="text-xs font-medium text-card-foreground">
            {formatLastMovement(securityData?.lastMovement)}
          </span>
        </div>

        {/* Security Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button className="flex items-center justify-center space-x-1 p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
            <Icon name="MapPin" size={14} />
            <span className="text-xs font-medium">Locate</span>
          </button>
          <button className="flex items-center justify-center space-x-1 p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors">
            <Icon name="Phone" size={14} />
            <span className="text-xs font-medium">Emergency</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityStatusCard;