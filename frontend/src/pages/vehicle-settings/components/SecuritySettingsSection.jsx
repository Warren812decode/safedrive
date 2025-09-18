import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettingsSection = ({ 
  securitySettings = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [formData, setFormData] = useState({
    gpsTracking: securitySettings?.gpsTracking || true,
    trackingFrequency: securitySettings?.trackingFrequency || "30",
    motionSensitivity: securitySettings?.motionSensitivity || "medium",
    geofenceEnabled: securitySettings?.geofenceEnabled || true,
    immobilizationEnabled: securitySettings?.immobilizationEnabled || true,
    emergencyContacts: securitySettings?.emergencyContacts || [
      { name: "John Kamau", phone: "+254712345678", relationship: "Primary" },
      { name: "Mary Wanjiku", phone: "+254723456789", relationship: "Secondary" }
    ],
    securityProvider: securitySettings?.securityProvider || "securitas"
  });

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  });

  const [errors, setErrors] = useState({});

  const trackingFrequencies = [
    { value: "10", label: "Every 10 seconds (High battery usage)" },
    { value: "30", label: "Every 30 seconds (Recommended)" },
    { value: "60", label: "Every minute (Balanced)" },
    { value: "300", label: "Every 5 minutes (Battery saver)" }
  ];

  const motionSensitivities = [
    { value: "low", label: "Low - Major movements only" },
    { value: "medium", label: "Medium - Normal sensitivity" },
    { value: "high", label: "High - Detect minor movements" }
  ];

  const securityProviders = [
    { value: "securitas", label: "Securitas Kenya" },
    { value: "g4s", label: "G4S Security" },
    { value: "kcb", label: "KCB Security" },
    { value: "wells_fargo", label: "Wells Fargo Security" },
    { value: "custom", label: "Custom Provider" }
  ];

  const relationships = [
    { value: "Primary", label: "Primary Contact" },
    { value: "Secondary", label: "Secondary Contact" },
    { value: "Family", label: "Family Member" },
    { value: "Friend", label: "Friend" },
    { value: "Colleague", label: "Colleague" }
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

  const addEmergencyContact = () => {
    if (newContact?.name && newContact?.phone && newContact?.relationship) {
      const contact = {
        id: Date.now(),
        name: newContact?.name,
        phone: newContact?.phone,
        relationship: newContact?.relationship
      };
      
      setFormData(prev => ({
        ...prev,
        emergencyContacts: [...prev?.emergencyContacts, contact]
      }));
      
      setNewContact({ name: "", phone: "", relationship: "" });
    }
  };

  const removeEmergencyContact = (contactId) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev?.emergencyContacts?.filter(contact => contact?.id !== contactId)
    }));
  };

  const testSecuritySystem = () => {
    // Simulate security system test
    alert("Security system test initiated. You will receive SMS confirmation shortly.");
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Security Settings</h3>
            <p className="text-sm text-muted-foreground">GPS tracking, geofencing, and theft protection</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {formData?.gpsTracking && (
            <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
              <Icon name="MapPin" size={12} className="text-success" />
              <span className="text-xs font-medium text-success">Active</span>
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
            {/* GPS Tracking */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-card-foreground">GPS Tracking</h4>
                    <p className="text-sm text-muted-foreground">Real-time location monitoring</p>
                  </div>
                </div>
                <Checkbox
                  checked={formData?.gpsTracking}
                  onChange={(e) => handleCheckboxChange('gpsTracking', e?.target?.checked)}
                />
              </div>

              {formData?.gpsTracking && (
                <Select
                  label="Tracking Frequency"
                  description="How often to update vehicle location"
                  options={trackingFrequencies}
                  value={formData?.trackingFrequency}
                  onChange={(value) => handleInputChange('trackingFrequency', value)}
                />
              )}
            </div>

            {/* Motion Detection */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Motion Detection</h4>
              <Select
                label="Motion Sensitivity"
                description="Sensitivity level for unauthorized movement detection"
                options={motionSensitivities}
                value={formData?.motionSensitivity}
                onChange={(value) => handleInputChange('motionSensitivity', value)}
              />
            </div>

            {/* Geofencing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Geofencing</h4>
                    <p className="text-sm text-muted-foreground">Boundary alerts and restrictions</p>
                  </div>
                </div>
                <Checkbox
                  checked={formData?.geofenceEnabled}
                  onChange={(e) => handleCheckboxChange('geofenceEnabled', e?.target?.checked)}
                />
              </div>

              {formData?.geofenceEnabled && (
                <div className="p-4 bg-info/5 rounded-lg border border-info/20">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={16} className="text-info mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-info">Geofence Configuration</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Set up virtual boundaries on the map. You'll receive alerts when your vehicle enters or exits these areas.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Map"
                        iconPosition="left"
                        iconSize={16}
                        className="mt-2"
                      >
                        Configure Boundaries
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remote Immobilization */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-center space-x-3">
                  <Icon name="Lock" size={20} className="text-warning" />
                  <div>
                    <h4 className="font-medium text-warning">Remote Immobilization</h4>
                    <p className="text-sm text-muted-foreground">Emergency vehicle shutdown capability</p>
                  </div>
                </div>
                <Checkbox
                  checked={formData?.immobilizationEnabled}
                  onChange={(e) => handleCheckboxChange('immobilizationEnabled', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Security Provider */}
            <div className="space-y-4">
              <Select
                label="Security Service Provider"
                description="Choose your preferred security response partner"
                options={securityProviders}
                value={formData?.securityProvider}
                onChange={(value) => handleInputChange('securityProvider', value)}
              />
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-card-foreground">Emergency Contacts</h4>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Add Contact
                </Button>
              </div>

              {/* Add New Contact Form */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                <Input
                  label="Full Name"
                  type="text"
                  value={newContact?.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e?.target?.value }))}
                  placeholder="John Kamau"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={newContact?.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e?.target?.value }))}
                  placeholder="+254712345678"
                />
                <Select
                  label="Relationship"
                  options={relationships}
                  value={newContact?.relationship}
                  onChange={(value) => setNewContact(prev => ({ ...prev, relationship: value }))}
                  placeholder="Select relationship"
                />
                <div className="flex items-end">
                  <Button
                    variant="default"
                    size="default"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                    onClick={addEmergencyContact}
                    className="w-full"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Existing Emergency Contacts */}
              <div className="space-y-2">
                {formData?.emergencyContacts?.map((contact, index) => (
                  <div key={contact?.id || index} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={16} className="text-primary" />
                      <div>
                        <p className="font-medium text-sm text-card-foreground">{contact?.name}</p>
                        <p className="text-xs text-muted-foreground">{contact?.phone} • {contact?.relationship}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Phone"
                        iconSize={16}
                        className="text-success hover:text-success"
                      />
                      {contact?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="Trash2"
                          iconSize={16}
                          onClick={() => removeEmergencyContact(contact?.id)}
                          className="text-destructive hover:text-destructive"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Security System */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-primary">Test Security System</h4>
                  <p className="text-sm text-muted-foreground">Verify all security features are working properly</p>
                </div>
                <Button
                  variant="outline"
                  iconName="TestTube"
                  iconPosition="left"
                  iconSize={16}
                  onClick={testSecuritySystem}
                >
                  Run Test
                </Button>
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
                Save Security Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettingsSection;