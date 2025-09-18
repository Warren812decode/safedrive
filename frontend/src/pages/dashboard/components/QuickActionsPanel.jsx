import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ 
  onLocateVehicle = () => {},
  onLockUnlock = () => {},
  onDiagnostics = () => {},
  onEmergencyAlert = () => {},
  vehicleStatus = {
    isLocked: true,
    engineRunning: false,
    gpsActive: true
  }
}) => {
  const quickActions = [
    {
      id: 'locate',
      label: 'Locate Vehicle',
      icon: 'MapPin',
      variant: 'outline',
      onClick: onLocateVehicle,
      disabled: !vehicleStatus?.gpsActive,
      description: 'Find your vehicle location'
    },
    {
      id: 'lock',
      label: vehicleStatus?.isLocked ? 'Unlock Vehicle' : 'Lock Vehicle',
      icon: vehicleStatus?.isLocked ? 'Unlock' : 'Lock',
      variant: 'outline',
      onClick: onLockUnlock,
      disabled: false,
      description: vehicleStatus?.isLocked ? 'Unlock doors remotely' : 'Lock doors remotely'
    },
    {
      id: 'diagnostics',
      label: 'Run Diagnostics',
      icon: 'Stethoscope',
      variant: 'outline',
      onClick: onDiagnostics,
      disabled: false,
      description: 'Check engine and system health'
    },
    {
      id: 'emergency',
      label: 'Emergency Alert',
      icon: 'Phone',
      variant: 'destructive',
      onClick: onEmergencyAlert,
      disabled: false,
      description: 'Send emergency notification'
    }
  ];

  const additionalActions = [
    {
      id: 'horn',
      label: 'Sound Horn',
      icon: 'Volume2',
      onClick: () => console.log('Horn activated')
    },
    {
      id: 'lights',
      label: 'Flash Lights',
      icon: 'Lightbulb',
      onClick: () => console.log('Lights flashed')
    },
    {
      id: 'engine',
      label: vehicleStatus?.engineRunning ? 'Stop Engine' : 'Start Engine',
      icon: vehicleStatus?.engineRunning ? 'Square' : 'Play',
      onClick: () => console.log('Engine toggled')
    },
    {
      id: 'climate',
      label: 'Climate Control',
      icon: 'Thermometer',
      onClick: () => console.log('Climate control opened')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={16}
            onClick={action?.onClick}
            disabled={action?.disabled}
            className="justify-start h-auto p-4 flex-col items-start space-y-1"
          >
            <span className="font-medium text-sm">{action?.label}</span>
            <span className="text-xs opacity-75 font-normal">
              {action?.description}
            </span>
          </Button>
        ))}
      </div>
      {/* Secondary Actions */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-card-foreground mb-3">More Actions</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {additionalActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.onClick}
              className="flex flex-col items-center justify-center p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
            >
              <Icon 
                name={action?.icon} 
                size={20} 
                className="text-muted-foreground group-hover:text-primary transition-colors mb-1" 
              />
              <span className="text-xs font-medium text-card-foreground text-center leading-tight">
                {action?.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Emergency Contact Info */}
      <div className="mt-4 p-3 bg-error/5 border border-error/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Phone" size={16} className="text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-error mb-1">Emergency Contacts</p>
            <p className="text-xs text-muted-foreground">
              Police: 999 | AA Kenya: 0700 400 400 | Your Emergency: +254 700 000 000
            </p>
          </div>
        </div>
      </div>
      {/* Vehicle Status Indicators */}
      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-1 ${vehicleStatus?.isLocked ? 'text-success' : 'text-warning'}`}>
            <Icon name={vehicleStatus?.isLocked ? 'Lock' : 'Unlock'} size={12} />
            <span>{vehicleStatus?.isLocked ? 'Locked' : 'Unlocked'}</span>
          </div>
          <div className={`flex items-center space-x-1 ${vehicleStatus?.engineRunning ? 'text-success' : 'text-muted-foreground'}`}>
            <Icon name="Zap" size={12} />
            <span>{vehicleStatus?.engineRunning ? 'Running' : 'Off'}</span>
          </div>
          <div className={`flex items-center space-x-1 ${vehicleStatus?.gpsActive ? 'text-success' : 'text-error'}`}>
            <Icon name="Satellite" size={12} />
            <span>{vehicleStatus?.gpsActive ? 'GPS On' : 'GPS Off'}</span>
          </div>
        </div>
        <span className="text-muted-foreground">
          Last sync: {new Date()?.toLocaleTimeString('en-KE', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default QuickActionsPanel;