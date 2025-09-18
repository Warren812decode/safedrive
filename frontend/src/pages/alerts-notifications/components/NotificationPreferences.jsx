import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const NotificationPreferences = ({ 
  preferences = {},
  onSave,
  onCancel,
  className = '' 
}) => {
  const [settings, setSettings] = useState({
    inApp: {
      security: true,
      maintenance: true,
      compliance: true,
      system: false,
      ...preferences?.inApp
    },
    sms: {
      security: true,
      maintenance: false,
      compliance: true,
      system: false,
      ...preferences?.sms
    },
    ussd: {
      security: true,
      maintenance: false,
      compliance: false,
      system: false,
      ...preferences?.ussd
    },
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '06:00',
      ...preferences?.quietHours
    },
    phoneNumber: preferences?.phoneNumber || '+254700000000',
    language: preferences?.language || 'en',
    emergencyContacts: preferences?.emergencyContacts || [
      { name: 'Primary Contact', phone: '+254700000001', relation: 'Family' }
    ]
  });

  const [activeTab, setActiveTab] = useState('delivery');

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'sw', label: 'Kiswahili' }
  ];

  const relationOptions = [
    { value: 'family', label: 'Family Member' },
    { value: 'friend', label: 'Friend' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'security', label: 'Security Service' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'other', label: 'Other' }
  ];

  const handleCategoryToggle = (method, category) => {
    setSettings(prev => ({
      ...prev,
      [method]: {
        ...prev?.[method],
        [category]: !prev?.[method]?.[category]
      }
    }));
  };

  const handleQuietHoursChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev?.quietHours,
        [key]: value
      }
    }));
  };

  const handleEmergencyContactChange = (index, field, value) => {
    setSettings(prev => ({
      ...prev,
      emergencyContacts: prev?.emergencyContacts?.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const addEmergencyContact = () => {
    setSettings(prev => ({
      ...prev,
      emergencyContacts: [
        ...prev?.emergencyContacts,
        { name: '', phone: '', relation: 'family' }
      ]
    }));
  };

  const removeEmergencyContact = (index) => {
    setSettings(prev => ({
      ...prev,
      emergencyContacts: prev?.emergencyContacts?.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  const tabs = [
    { id: 'delivery', label: 'Delivery Methods', icon: 'Send' },
    { id: 'schedule', label: 'Schedule', icon: 'Clock' },
    { id: 'contacts', label: 'Emergency Contacts', icon: 'Users' },
    { id: 'language', label: 'Language', icon: 'Globe' }
  ];

  const categories = [
    { 
      id: 'security', 
      label: 'Security Alerts', 
      description: 'Theft attempts, unauthorized access, tampering',
      icon: 'Shield',
      color: 'text-red-600'
    },
    { 
      id: 'maintenance', 
      label: 'Maintenance Alerts', 
      description: 'Service due, fault codes, battery issues',
      icon: 'Wrench',
      color: 'text-orange-600'
    },
    { 
      id: 'compliance', 
      label: 'Compliance Alerts', 
      description: 'Speed violations, governor issues, NTSA requirements',
      icon: 'FileCheck',
      color: 'text-yellow-600'
    },
    { 
      id: 'system', 
      label: 'System Alerts', 
      description: 'Connectivity issues, app updates, sync status',
      icon: 'Settings',
      color: 'text-blue-600'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Notification Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize how you receive alerts</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-0 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-card-foreground hover:border-border'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="whitespace-nowrap">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {/* Delivery Methods Tab */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Choose how you want to receive different types of alerts
              </h3>
              <div className="space-y-6">
                {categories?.map((category) => (
                  <div key={category?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-4">
                      <Icon name={category?.icon} size={20} className={category?.color} />
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{category?.label}</h4>
                        <p className="text-sm text-muted-foreground">{category?.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Checkbox
                        label="In-App Notifications"
                        checked={settings?.inApp?.[category?.id]}
                        onChange={() => handleCategoryToggle('inApp', category?.id)}
                      />
                      <Checkbox
                        label="SMS Alerts"
                        checked={settings?.sms?.[category?.id]}
                        onChange={() => handleCategoryToggle('sms', category?.id)}
                      />
                      <Checkbox
                        label="USSD Quick Check"
                        checked={settings?.ussd?.[category?.id]}
                        onChange={() => handleCategoryToggle('ussd', category?.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Notification Schedule
              </h3>
              <div className="space-y-4">
                <Checkbox
                  label="Enable Quiet Hours"
                  description="Reduce non-critical notifications during specified hours"
                  checked={settings?.quietHours?.enabled}
                  onChange={(e) => handleQuietHoursChange('enabled', e?.target?.checked)}
                />
                
                {settings?.quietHours?.enabled && (
                  <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                    <Input
                      type="time"
                      label="Start Time"
                      value={settings?.quietHours?.startTime}
                      onChange={(e) => handleQuietHoursChange('startTime', e?.target?.value)}
                    />
                    <Input
                      type="time"
                      label="End Time"
                      value={settings?.quietHours?.endTime}
                      onChange={(e) => handleQuietHoursChange('endTime', e?.target?.value)}
                    />
                  </div>
                )}

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Note about Critical Alerts</p>
                      <p>Security and critical maintenance alerts will always be delivered immediately, regardless of quiet hours settings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Emergency Contacts</h3>
                <p className="text-sm text-muted-foreground">
                  These contacts will be notified for critical security alerts
                </p>
              </div>
              <Button
                variant="outline"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={addEmergencyContact}
              >
                Add Contact
              </Button>
            </div>

            <div className="space-y-4">
              {settings?.emergencyContacts?.map((contact, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Contact Name"
                      value={contact?.name}
                      onChange={(e) => handleEmergencyContactChange(index, 'name', e?.target?.value)}
                      placeholder="Enter name"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={contact?.phone}
                      onChange={(e) => handleEmergencyContactChange(index, 'phone', e?.target?.value)}
                      placeholder="+254700000000"
                    />
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Select
                          label="Relationship"
                          options={relationOptions}
                          value={contact?.relation}
                          onChange={(value) => handleEmergencyContactChange(index, 'relation', value)}
                        />
                      </div>
                      {settings?.emergencyContacts?.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="Trash2"
                          iconSize={16}
                          onClick={() => removeEmergencyContact(index)}
                          className="text-destructive hover:text-destructive"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language Tab */}
        {activeTab === 'language' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Language & Regional Settings
              </h3>
              <div className="space-y-4 max-w-md">
                <Input
                  label="Phone Number"
                  type="tel"
                  value={settings?.phoneNumber}
                  onChange={(e) => setSettings(prev => ({ ...prev, phoneNumber: e?.target?.value }))}
                  description="Used for SMS and USSD notifications"
                />
                
                <Select
                  label="Notification Language"
                  options={languageOptions}
                  value={settings?.language}
                  onChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                  description="Language for SMS and USSD messages"
                />
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-1">USSD Quick Commands</p>
                    <p>Dial *544*1# to check vehicle status in your selected language</p>
                    <p>Dial *544*2# for emergency assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPreferences;