import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertConfigurationSection = ({ 
  alertSettings = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [formData, setFormData] = useState({
    smsAlerts: alertSettings?.smsAlerts || true,
    ussdAlerts: alertSettings?.ussdAlerts || true,
    inAppAlerts: alertSettings?.inAppAlerts || true,
    emailAlerts: alertSettings?.emailAlerts || false,
    alertTypes: alertSettings?.alertTypes || {
      speed: { enabled: true, urgency: "high", methods: ["sms", "inapp"] },
      fuel: { enabled: true, urgency: "medium", methods: ["sms", "inapp"] },
      security: { enabled: true, urgency: "critical", methods: ["sms", "ussd", "inapp"] },
      maintenance: { enabled: true, urgency: "low", methods: ["inapp"] },
      battery: { enabled: true, urgency: "medium", methods: ["sms", "inapp"] },
      engine: { enabled: true, urgency: "high", methods: ["sms", "inapp"] }
    },
    quietHours: alertSettings?.quietHours || {
      enabled: false,
      startTime: "22:00",
      endTime: "06:00"
    },
    networkPreference: alertSettings?.networkPreference || "auto"
  });

  const urgencyLevels = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "critical", label: "Critical - Immediate" }
  ];

  const networkOptions = [
    { value: "auto", label: "Auto-select best network" },
    { value: "safaricom", label: "Safaricom (Primary)" },
    { value: "airtel", label: "Airtel Kenya" },
    { value: "telkom", label: "Telkom Kenya" }
  ];

  const alertTypeLabels = {
    speed: { name: "Speed Violations", icon: "Gauge", description: "Speeding and governor alerts" },
    fuel: { name: "Fuel Monitoring", icon: "Fuel", description: "Low fuel and theft detection" },
    security: { name: "Security Alerts", icon: "Shield", description: "Theft, tampering, and unauthorized access" },
    maintenance: { name: "Maintenance", icon: "Wrench", description: "Service reminders and diagnostics" },
    battery: { name: "Battery Health", icon: "Battery", description: "Voltage and charging issues" },
    engine: { name: "Engine Diagnostics", icon: "Car", description: "Fault codes and performance issues" }
  };

  const deliveryMethods = [
    { value: "sms", label: "SMS", icon: "MessageSquare" },
    { value: "ussd", label: "USSD", icon: "Phone" },
    { value: "inapp", label: "In-App", icon: "Bell" },
    { value: "email", label: "Email", icon: "Mail" }
  ];

  const handleGlobalMethodToggle = (method, enabled) => {
    setFormData(prev => ({ ...prev, [method]: enabled }));
  };

  const handleAlertTypeUpdate = (alertType, field, value) => {
    setFormData(prev => ({
      ...prev,
      alertTypes: {
        ...prev?.alertTypes,
        [alertType]: {
          ...prev?.alertTypes?.[alertType],
          [field]: value
        }
      }
    }));
  };

  const handleMethodToggle = (alertType, method, enabled) => {
    const currentMethods = formData?.alertTypes?.[alertType]?.methods;
    const updatedMethods = enabled 
      ? [...currentMethods, method]
      : currentMethods?.filter(m => m !== method);
    
    handleAlertTypeUpdate(alertType, 'methods', updatedMethods);
  };

  const handleQuietHoursToggle = (enabled) => {
    setFormData(prev => ({
      ...prev,
      quietHours: {
        ...prev?.quietHours,
        enabled
      }
    }));
  };

  const handleQuietHoursTimeUpdate = (field, value) => {
    setFormData(prev => ({
      ...prev,
      quietHours: {
        ...prev?.quietHours,
        [field]: value
      }
    }));
  };

  const testAlertSystem = () => {
    alert("Test alert sent! You should receive notifications via your configured methods within 30 seconds.");
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-warning';
      case 'medium': return 'text-info';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Alert Configuration</h3>
            <p className="text-sm text-muted-foreground">Notification delivery methods and preferences</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {formData?.smsAlerts && <Icon name="MessageSquare" size={12} className="text-success" />}
            {formData?.ussdAlerts && <Icon name="Phone" size={12} className="text-success" />}
            {formData?.inAppAlerts && <Icon name="Bell" size={12} className="text-success" />}
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="space-y-6 pt-4">
            {/* Global Alert Methods */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Alert Delivery Methods</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {deliveryMethods?.map((method) => (
                  <div key={method?.value} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name={method?.icon} size={16} className="text-primary" />
                      <span className="text-sm font-medium text-card-foreground">{method?.label}</span>
                    </div>
                    <Checkbox
                      checked={formData?.[`${method?.value}Alerts`]}
                      onChange={(e) => handleGlobalMethodToggle(`${method?.value}Alerts`, e?.target?.checked)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Network Preference */}
            <div className="space-y-4">
              <Select
                label="Network Preference"
                description="Preferred mobile network for SMS and USSD alerts"
                options={networkOptions}
                value={formData?.networkPreference}
                onChange={(value) => setFormData(prev => ({ ...prev, networkPreference: value }))}
              />
            </div>

            {/* Alert Type Configuration */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Alert Type Configuration</h4>
              <div className="space-y-4">
                {Object.entries(alertTypeLabels)?.map(([alertType, config]) => (
                  <div key={alertType} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon name={config?.icon} size={16} className="text-primary" />
                        <div>
                          <h5 className="font-medium text-sm text-card-foreground">{config?.name}</h5>
                          <p className="text-xs text-muted-foreground">{config?.description}</p>
                        </div>
                      </div>
                      <Checkbox
                        checked={formData?.alertTypes?.[alertType]?.enabled}
                        onChange={(e) => handleAlertTypeUpdate(alertType, 'enabled', e?.target?.checked)}
                      />
                    </div>

                    {formData?.alertTypes?.[alertType]?.enabled && (
                      <div className="space-y-3 pt-3 border-t border-border">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Select
                            label="Urgency Level"
                            options={urgencyLevels}
                            value={formData?.alertTypes?.[alertType]?.urgency}
                            onChange={(value) => handleAlertTypeUpdate(alertType, 'urgency', value)}
                          />
                          <div>
                            <label className="text-sm font-medium text-card-foreground mb-2 block">
                              Delivery Methods
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {deliveryMethods?.map((method) => (
                                <button
                                  key={method?.value}
                                  onClick={() => handleMethodToggle(
                                    alertType, 
                                    method?.value, 
                                    !formData?.alertTypes?.[alertType]?.methods?.includes(method?.value)
                                  )}
                                  disabled={!formData?.[`${method?.value}Alerts`]}
                                  className={`
                                    flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors
                                    ${formData?.alertTypes?.[alertType]?.methods?.includes(method?.value)
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }
                                    ${!formData?.[`${method?.value}Alerts`] ? 'opacity-50 cursor-not-allowed' : ''}
                                  `}
                                >
                                  <Icon name={method?.icon} size={12} />
                                  <span>{method?.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Moon" size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Quiet Hours</h4>
                    <p className="text-sm text-muted-foreground">Reduce non-critical alerts during sleep hours</p>
                  </div>
                </div>
                <Checkbox
                  checked={formData?.quietHours?.enabled}
                  onChange={(e) => handleQuietHoursToggle(e?.target?.checked)}
                />
              </div>

              {formData?.quietHours?.enabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-info/5 rounded-lg border border-info/20">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Start Time</label>
                    <input
                      type="time"
                      value={formData?.quietHours?.startTime}
                      onChange={(e) => handleQuietHoursTimeUpdate('startTime', e?.target?.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-card-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">End Time</label>
                    <input
                      type="time"
                      value={formData?.quietHours?.endTime}
                      onChange={(e) => handleQuietHoursTimeUpdate('endTime', e?.target?.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-card-foreground"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Test Alert System */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-primary">Test Alert System</h4>
                  <p className="text-sm text-muted-foreground">Send a test notification to verify your settings</p>
                </div>
                <Button
                  variant="outline"
                  iconName="TestTube"
                  iconPosition="left"
                  iconSize={16}
                  onClick={testAlertSystem}
                >
                  Send Test Alert
                </Button>
              </div>
            </div>

            {/* Alert Summary */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-card-foreground mb-3">Alert Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-2">Active Alert Types:</p>
                  <div className="space-y-1">
                    {Object.entries(formData?.alertTypes)?.filter(([_, config]) => config?.enabled)?.map(([type, config]) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-card-foreground">{alertTypeLabels?.[type]?.name}</span>
                          <span className={`text-xs ${getUrgencyColor(config?.urgency)}`}>
                            ({config?.urgency})
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2">Delivery Methods:</p>
                  <div className="space-y-1">
                    {deliveryMethods?.filter(method => formData?.[`${method?.value}Alerts`])?.map(method => (
                        <div key={method?.value} className="flex items-center space-x-2">
                          <Icon name={method?.icon} size={12} className="text-success" />
                          <span className="text-card-foreground">{method?.label}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-border">
              <Button
                variant="default"
                iconName="Save"
                iconPosition="left"
                iconSize={16}
                onClick={handleSave}
              >
                Save Alert Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertConfigurationSection;