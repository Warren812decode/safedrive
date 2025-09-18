import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const MaintenanceSchedulingSection = ({ 
  maintenanceSettings = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [formData, setFormData] = useState({
    maintenanceReminders: maintenanceSettings?.maintenanceReminders || true,
    oilChangeInterval: maintenanceSettings?.oilChangeInterval || "5000",
    serviceInterval: maintenanceSettings?.serviceInterval || "10000",
    inspectionInterval: maintenanceSettings?.inspectionInterval || "6",
    reminderAdvance: maintenanceSettings?.reminderAdvance || "500",
    preferredProvider: maintenanceSettings?.preferredProvider || "",
    providerContact: maintenanceSettings?.providerContact || "",
    autoBooking: maintenanceSettings?.autoBooking || false,
    maintenanceHistory: maintenanceSettings?.maintenanceHistory || [
      {
        id: 1,
        type: "Oil Change",
        date: "2024-07-15",
        mileage: "45000",
        provider: "Toyota Kenya",
        cost: "3500",
        nextDue: "50000"
      },
      {
        id: 2,
        type: "Full Service",
        date: "2024-06-01",
        mileage: "40000",
        provider: "Auto Express",
        cost: "8500",
        nextDue: "50000"
      }
    ]
  });

  const [newService, setNewService] = useState({
    type: "",
    provider: "",
    contact: ""
  });

  const [errors, setErrors] = useState({});

  const serviceTypes = [
    { value: "oil_change", label: "Oil Change" },
    { value: "full_service", label: "Full Service" },
    { value: "brake_service", label: "Brake Service" },
    { value: "tire_rotation", label: "Tire Rotation" },
    { value: "battery_check", label: "Battery Check" },
    { value: "inspection", label: "Vehicle Inspection" }
  ];

  const reminderAdvanceOptions = [
    { value: "100", label: "100 km before due" },
    { value: "250", label: "250 km before due" },
    { value: "500", label: "500 km before due" },
    { value: "1000", label: "1000 km before due" }
  ];

  const inspectionIntervals = [
    { value: "3", label: "Every 3 months" },
    { value: "6", label: "Every 6 months" },
    { value: "12", label: "Every 12 months" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const addServiceProvider = () => {
    if (newService?.type && newService?.provider && newService?.contact) {
      // In a real app, this would add to a list of preferred providers
      setFormData(prev => ({
        ...prev,
        preferredProvider: newService?.provider,
        providerContact: newService?.contact
      }));
      
      setNewService({ type: "", provider: "", contact: "" });
    }
  };

  const calculateNextService = (lastMileage, interval) => {
    return parseInt(lastMileage) + parseInt(interval);
  };

  const getDaysUntilService = (nextDueMileage, currentMileage = 47500) => {
    const kmRemaining = nextDueMileage - currentMileage;
    const avgKmPerDay = 65; // Average daily driving
    return Math.ceil(kmRemaining / avgKmPerDay);
  };

  const validateForm = () => {
    const newErrors = {};
    if (parseInt(formData?.oilChangeInterval) < 3000 || parseInt(formData?.oilChangeInterval) > 15000) {
      newErrors.oilChangeInterval = "Oil change interval should be between 3,000-15,000 km";
    }
    if (parseInt(formData?.serviceInterval) < 5000 || parseInt(formData?.serviceInterval) > 25000) {
      newErrors.serviceInterval = "Service interval should be between 5,000-25,000 km";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Wrench" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Maintenance Scheduling</h3>
            <p className="text-sm text-muted-foreground">Service intervals and provider preferences</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {formData?.maintenanceReminders && (
            <div className="flex items-center space-x-1 bg-info/10 px-2 py-1 rounded-full">
              <Icon name="Calendar" size={12} className="text-info" />
              <span className="text-xs font-medium text-info">Active</span>
            </div>
          )}
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
            {/* Maintenance Reminders Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Bell" size={20} className="text-primary" />
                <div>
                  <h4 className="font-medium text-card-foreground">Maintenance Reminders</h4>
                  <p className="text-sm text-muted-foreground">Automatic service notifications</p>
                </div>
              </div>
              <Checkbox
                checked={formData?.maintenanceReminders}
                onChange={(e) => handleCheckboxChange('maintenanceReminders', e?.target?.checked)}
              />
            </div>

            {formData?.maintenanceReminders && (
              <>
                {/* Service Intervals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Input
                    label="Oil Change (km)"
                    type="number"
                    value={formData?.oilChangeInterval}
                    onChange={(e) => handleInputChange('oilChangeInterval', e?.target?.value)}
                    error={errors?.oilChangeInterval}
                    min="3000"
                    max="15000"
                    step="500"
                    required
                  />
                  <Input
                    label="Full Service (km)"
                    type="number"
                    value={formData?.serviceInterval}
                    onChange={(e) => handleInputChange('serviceInterval', e?.target?.value)}
                    error={errors?.serviceInterval}
                    min="5000"
                    max="25000"
                    step="1000"
                    required
                  />
                  <Select
                    label="Inspection Interval"
                    options={inspectionIntervals}
                    value={formData?.inspectionInterval}
                    onChange={(value) => handleInputChange('inspectionInterval', value)}
                  />
                  <Select
                    label="Reminder Advance"
                    description="When to send reminders"
                    options={reminderAdvanceOptions}
                    value={formData?.reminderAdvance}
                    onChange={(value) => handleInputChange('reminderAdvance', value)}
                  />
                </div>

                {/* Preferred Service Provider */}
                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Preferred Service Provider</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Provider Name"
                      type="text"
                      value={formData?.preferredProvider}
                      onChange={(e) => handleInputChange('preferredProvider', e?.target?.value)}
                      placeholder="e.g., Toyota Kenya, Auto Express"
                    />
                    <Input
                      label="Contact Number"
                      type="tel"
                      value={formData?.providerContact}
                      onChange={(e) => handleInputChange('providerContact', e?.target?.value)}
                      placeholder="+254712345678"
                    />
                  </div>
                </div>

                {/* Auto Booking */}
                <div className="flex items-center justify-between p-4 bg-info/5 rounded-lg border border-info/20">
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={20} className="text-info" />
                    <div>
                      <h4 className="font-medium text-info">Auto Booking</h4>
                      <p className="text-sm text-muted-foreground">Automatically schedule appointments</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData?.autoBooking}
                    onChange={(e) => handleCheckboxChange('autoBooking', e?.target?.checked)}
                  />
                </div>

                {/* Add Service Provider Form */}
                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Add Service Provider</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                    <Select
                      label="Service Type"
                      options={serviceTypes}
                      value={newService?.type}
                      onChange={(value) => setNewService(prev => ({ ...prev, type: value }))}
                      placeholder="Select service"
                    />
                    <Input
                      label="Provider Name"
                      type="text"
                      value={newService?.provider}
                      onChange={(e) => setNewService(prev => ({ ...prev, provider: e?.target?.value }))}
                      placeholder="Provider name"
                    />
                    <Input
                      label="Contact"
                      type="tel"
                      value={newService?.contact}
                      onChange={(e) => setNewService(prev => ({ ...prev, contact: e?.target?.value }))}
                      placeholder="Phone number"
                    />
                    <div className="flex items-end">
                      <Button
                        variant="default"
                        size="default"
                        iconName="Plus"
                        iconPosition="left"
                        iconSize={16}
                        onClick={addServiceProvider}
                        className="w-full"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Upcoming Maintenance */}
                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Upcoming Maintenance</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name="AlertTriangle" size={16} className="text-warning" />
                          <div>
                            <p className="font-medium text-sm text-warning">Oil Change Due Soon</p>
                            <p className="text-xs text-muted-foreground">Due at 50,000 km (in ~38 days)</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Calendar"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Schedule
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-info/5 rounded-lg border border-info/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name="Info" size={16} className="text-info" />
                          <div>
                            <p className="font-medium text-sm text-info">Full Service</p>
                            <p className="text-xs text-muted-foreground">Due at 50,000 km (in ~38 days)</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Calendar"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance History */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-card-foreground">Recent Maintenance History</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Add Record
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData?.maintenanceHistory?.map((record) => (
                      <div key={record?.id} className="p-3 bg-card border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon name="Wrench" size={16} className="text-primary" />
                            <div>
                              <p className="font-medium text-sm text-card-foreground">{record?.type}</p>
                              <p className="text-xs text-muted-foreground">
                                {record?.date} • {record?.mileage} km • {record?.provider}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm text-card-foreground">KES {record?.cost}</p>
                            <p className="text-xs text-muted-foreground">Next: {record?.nextDue} km</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-border">
              <Button
                variant="default"
                iconName="Save"
                iconPosition="left"
                iconSize={16}
                onClick={handleSave}
              >
                Save Maintenance Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceSchedulingSection;