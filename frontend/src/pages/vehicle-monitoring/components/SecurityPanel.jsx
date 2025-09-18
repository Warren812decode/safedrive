import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityPanel = ({ 
  securityStatus = {},
  onToggleArmed = () => {},
  onEmergencyAlert = () => {},
  onUpdateSettings = () => {},
  className = ''
}) => {
  const [isArmed, setIsArmed] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const mockSecurityStatus = {
    armed: isArmed,
    gpsTracking: true,
    motionSensors: true,
    doorSensors: true,
    engineImmobilizer: true,
    panicButton: false,
    geofenceActive: true,
    lastUpdate: new Date()
  };

  const mockSecurityEvents = [
    {
      id: 1,
      type: 'motion_detected',
      severity: 'medium',
      message: 'Vehicle motion detected while parked',
      location: 'Westlands, Nairobi',
      timestamp: new Date(Date.now() - 1800000),
      resolved: true,
      actions: ['SMS sent', 'Owner notified']
    },
    {
      id: 2,
      type: 'unauthorized_access',
      severity: 'high',
      message: 'Door opened without key authorization',
      location: 'CBD, Nairobi',
      timestamp: new Date(Date.now() - 7200000),
      resolved: false,
      actions: ['Immobilizer activated', 'Security called']
    },
    {
      id: 3,
      type: 'geofence_breach',
      severity: 'low',
      message: 'Vehicle left designated safe zone',
      location: 'Karen, Nairobi',
      timestamp: new Date(Date.now() - 14400000),
      resolved: true,
      actions: ['Owner notified']
    }
  ];

  const mockGeofences = [
    {
      id: 1,
      name: 'Home Zone',
      status: 'active',
      breaches: 0,
      lastBreach: null
    },
    {
      id: 2,
      name: 'Work Zone',
      status: 'active',
      breaches: 1,
      lastBreach: new Date(Date.now() - 86400000)
    },
    {
      id: 3,
      name: 'Restricted Area',
      status: 'inactive',
      breaches: 0,
      lastBreach: null
    }
  ];

  const getSecurityIcon = (type) => {
    switch (type) {
      case 'motion_detected':
        return 'Activity';
      case 'unauthorized_access':
        return 'ShieldAlert';
      case 'geofence_breach':
        return 'MapPin';
      case 'theft_attempt':
        return 'AlertTriangle';
      default:
        return 'Shield';
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

  const getStatusColor = (status) => {
    return status ? 'text-success' : 'text-error';
  };

  const handleToggleArmed = () => {
    setIsArmed(!isArmed);
    onToggleArmed(!isArmed);
  };

  const handleEmergencyAlert = () => {
    onEmergencyAlert();
    // This would trigger SMS/USSD emergency protocols
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isArmed ? 'bg-success/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={isArmed ? 'Shield' : 'ShieldOff'} 
                size={20} 
                className={isArmed ? 'text-success' : 'text-error'} 
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground">Security System</h3>
              <p className="text-sm text-muted-foreground">
                Multi-layer vehicle protection
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={isArmed ? "destructive" : "default"}
              size="sm"
              iconName={isArmed ? 'ShieldOff' : 'Shield'}
              iconPosition="left"
              iconSize={16}
              onClick={handleToggleArmed}
            >
              {isArmed ? 'Disarm' : 'Arm'}
            </Button>
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
      {/* Security Status Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon 
              name="Satellite" 
              size={20} 
              className={`mx-auto mb-2 ${getStatusColor(mockSecurityStatus?.gpsTracking)}`} 
            />
            <div className="text-sm font-medium text-card-foreground">GPS Tracking</div>
            <div className={`text-xs ${getStatusColor(mockSecurityStatus?.gpsTracking)}`}>
              {mockSecurityStatus?.gpsTracking ? 'Active' : 'Inactive'}
            </div>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon 
              name="Activity" 
              size={20} 
              className={`mx-auto mb-2 ${getStatusColor(mockSecurityStatus?.motionSensors)}`} 
            />
            <div className="text-sm font-medium text-card-foreground">Motion Sensors</div>
            <div className={`text-xs ${getStatusColor(mockSecurityStatus?.motionSensors)}`}>
              {mockSecurityStatus?.motionSensors ? 'Active' : 'Inactive'}
            </div>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon 
              name="DoorOpen" 
              size={20} 
              className={`mx-auto mb-2 ${getStatusColor(mockSecurityStatus?.doorSensors)}`} 
            />
            <div className="text-sm font-medium text-card-foreground">Door Sensors</div>
            <div className={`text-xs ${getStatusColor(mockSecurityStatus?.doorSensors)}`}>
              {mockSecurityStatus?.doorSensors ? 'Active' : 'Inactive'}
            </div>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon 
              name="Key" 
              size={20} 
              className={`mx-auto mb-2 ${getStatusColor(mockSecurityStatus?.engineImmobilizer)}`} 
            />
            <div className="text-sm font-medium text-card-foreground">Immobilizer</div>
            <div className={`text-xs ${getStatusColor(mockSecurityStatus?.engineImmobilizer)}`}>
              {mockSecurityStatus?.engineImmobilizer ? 'Armed' : 'Disarmed'}
            </div>
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-lg">
          <h4 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2 text-error" />
            Emergency Actions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="destructive"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              iconSize={16}
              onClick={handleEmergencyAlert}
              fullWidth
            >
              Emergency Alert
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ShieldOff"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Disable Engine
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Siren"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Sound Alarm
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Emergency actions will notify security services and send SMS alerts to registered contacts
          </p>
        </div>

        {/* Geofence Status */}
        <div className="mb-6">
          <h4 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="MapPin" size={16} className="mr-2" />
            Geofence Zones
          </h4>
          <div className="space-y-3">
            {mockGeofences?.map((geofence) => (
              <div key={geofence?.id} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      geofence?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                    }`}></div>
                    <div>
                      <div className="font-medium text-card-foreground text-sm">
                        {geofence?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {geofence?.breaches} breach{geofence?.breaches !== 1 ? 'es' : ''} recorded
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      geofence?.status === 'active' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {geofence?.status?.toUpperCase()}
                    </div>
                    {geofence?.lastBreach && (
                      <div className="text-xs text-muted-foreground">
                        Last: {geofence?.lastBreach?.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Events */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground flex items-center">
              <Icon name="History" size={16} className="mr-2" />
              Recent Security Events ({mockSecurityEvents?.length})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName={showHistory ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
              iconSize={14}
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Hide' : 'Show'} History
            </Button>
          </div>

          {mockSecurityEvents?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="CheckCircle" size={48} className="mx-auto mb-3 text-success" />
              <p className="font-medium">No security events</p>
              <p className="text-sm">Your vehicle is secure</p>
            </div>
          ) : showHistory ? (
            <div className="space-y-3">
              {mockSecurityEvents?.map((event) => (
                <div 
                  key={event?.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedIncident === event?.id 
                      ? 'border-primary bg-primary/5' 
                      : `border-border hover:border-primary/50 ${getSeverityColor(event?.severity)}`
                  }`}
                  onClick={() => setSelectedIncident(selectedIncident === event?.id ? null : event?.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon 
                        name={getSecurityIcon(event?.type)} 
                        size={16} 
                        className="flex-shrink-0 mt-0.5 text-card-foreground" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-medium text-sm text-card-foreground">
                            {event?.message}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event?.severity)}`}>
                            {event?.severity?.toUpperCase()}
                          </span>
                          {event?.resolved && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                              RESOLVED
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">
                          <Icon name="MapPin" size={12} className="inline mr-1" />
                          {event?.location}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} className="inline mr-1" />
                          {event?.timestamp?.toLocaleString()}
                        </div>
                        
                        {selectedIncident === event?.id && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-sm font-medium text-card-foreground mb-2">Actions Taken:</p>
                            <ul className="space-y-1">
                              {event?.actions?.map((action, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-center">
                                  <Icon name="Check" size={12} className="mr-2 text-success" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <Icon 
                      name={selectedIncident === event?.id ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="text-muted-foreground flex-shrink-0" 
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Click "Show History" to view recent security events
            </div>
          )}
        </div>

        {/* System Status Footer */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isArmed ? 'bg-success animate-pulse' : 'bg-error'}`}></div>
              <span className="text-muted-foreground">
                System Status: {isArmed ? 'Armed & Monitoring' : 'Disarmed'}
              </span>
            </div>
            <div className="text-muted-foreground">
              Last Update: {mockSecurityStatus?.lastUpdate?.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;