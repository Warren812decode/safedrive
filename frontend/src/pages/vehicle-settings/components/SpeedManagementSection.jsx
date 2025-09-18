import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SpeedManagementSection = ({ 
  speedSettings = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [formData, setFormData] = useState({
    governorEnabled: speedSettings?.governorEnabled || true,
    maxSpeed: speedSettings?.maxSpeed || "80",
    cityLimit: speedSettings?.cityLimit || "50",
    highwayLimit: speedSettings?.highwayLimit || "100",
    schoolZoneLimit: speedSettings?.schoolZoneLimit || "30",
    alertThreshold: speedSettings?.alertThreshold || "5",
    ntsakCompliant: speedSettings?.ntsakCompliant || true,
    customZones: speedSettings?.customZones || []
  });

  const [newZone, setNewZone] = useState({
    name: "",
    speedLimit: "",
    coordinates: ""
  });

  const [errors, setErrors] = useState({});

  const alertThresholds = [
    { value: "0", label: "Immediate (0 km/h over)" },
    { value: "5", label: "5 km/h over limit" },
    { value: "10", label: "10 km/h over limit" },
    { value: "15", label: "15 km/h over limit" }
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

  const addCustomZone = () => {
    if (newZone?.name && newZone?.speedLimit) {
      const zone = {
        id: Date.now(),
        name: newZone?.name,
        speedLimit: parseInt(newZone?.speedLimit),
        coordinates: newZone?.coordinates || "Auto-detect"
      };
      
      setFormData(prev => ({
        ...prev,
        customZones: [...prev?.customZones, zone]
      }));
      
      setNewZone({ name: "", speedLimit: "", coordinates: "" });
    }
  };

  const removeCustomZone = (zoneId) => {
    setFormData(prev => ({
      ...prev,
      customZones: prev?.customZones?.filter(zone => zone?.id !== zoneId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (parseInt(formData?.maxSpeed) < 30 || parseInt(formData?.maxSpeed) > 120) {
      newErrors.maxSpeed = "Speed must be between 30-120 km/h";
    }
    if (parseInt(formData?.cityLimit) > parseInt(formData?.maxSpeed)) {
      newErrors.cityLimit = "City limit cannot exceed maximum speed";
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
          <Icon name="Gauge" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Speed Management</h3>
            <p className="text-sm text-muted-foreground">Governor settings and speed limit configuration</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {formData?.ntsakCompliant && (
            <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
              <Icon name="Shield" size={12} className="text-success" />
              <span className="text-xs font-medium text-success">NTSA</span>
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
            {/* Governor Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Speed Governor</h4>
                    <p className="text-sm text-muted-foreground">NTSA-compliant speed limiting system</p>
                  </div>
                </div>
                <Checkbox
                  checked={formData?.governorEnabled}
                  onChange={(e) => handleCheckboxChange('governorEnabled', e?.target?.checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <h4 className="font-medium text-success">NTSA Compliance</h4>
                    <p className="text-sm text-muted-foreground">Vehicle meets regulatory requirements</p>
                  </div>
                </div>
                <Checkbox
                  checked={formData?.ntsakCompliant}
                  onChange={(e) => handleCheckboxChange('ntsakCompliant', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Speed Limits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="Maximum Speed (km/h)"
                type="number"
                value={formData?.maxSpeed}
                onChange={(e) => handleInputChange('maxSpeed', e?.target?.value)}
                error={errors?.maxSpeed}
                min="30"
                max="120"
                required
              />
              <Input
                label="City Limit (km/h)"
                type="number"
                value={formData?.cityLimit}
                onChange={(e) => handleInputChange('cityLimit', e?.target?.value)}
                error={errors?.cityLimit}
                min="20"
                max="80"
              />
              <Input
                label="Highway Limit (km/h)"
                type="number"
                value={formData?.highwayLimit}
                onChange={(e) => handleInputChange('highwayLimit', e?.target?.value)}
                min="60"
                max="120"
              />
              <Input
                label="School Zone (km/h)"
                type="number"
                value={formData?.schoolZoneLimit}
                onChange={(e) => handleInputChange('schoolZoneLimit', e?.target?.value)}
                min="20"
                max="40"
              />
            </div>

            {/* Alert Configuration */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Alert Configuration</h4>
              <Select
                label="Speed Violation Alert Threshold"
                description="When to trigger speed violation alerts"
                options={alertThresholds}
                value={formData?.alertThreshold}
                onChange={(value) => handleInputChange('alertThreshold', value)}
              />
            </div>

            {/* Custom Speed Zones */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-card-foreground">Custom Speed Zones</h4>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Add Zone
                </Button>
              </div>

              {/* Add New Zone Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <Input
                  label="Zone Name"
                  type="text"
                  value={newZone?.name}
                  onChange={(e) => setNewZone(prev => ({ ...prev, name: e?.target?.value }))}
                  placeholder="e.g., Industrial Area"
                />
                <Input
                  label="Speed Limit (km/h)"
                  type="number"
                  value={newZone?.speedLimit}
                  onChange={(e) => setNewZone(prev => ({ ...prev, speedLimit: e?.target?.value }))}
                  placeholder="40"
                  min="20"
                  max="100"
                />
                <div className="flex items-end">
                  <Button
                    variant="default"
                    size="default"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                    onClick={addCustomZone}
                    className="w-full"
                  >
                    Add Zone
                  </Button>
                </div>
              </div>

              {/* Existing Custom Zones */}
              {formData?.customZones?.length > 0 && (
                <div className="space-y-2">
                  {formData?.customZones?.map((zone) => (
                    <div key={zone?.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={16} className="text-primary" />
                        <div>
                          <p className="font-medium text-sm text-card-foreground">{zone?.name}</p>
                          <p className="text-xs text-muted-foreground">{zone?.speedLimit} km/h limit</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Trash2"
                        iconSize={16}
                        onClick={() => removeCustomZone(zone?.id)}
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  ))}
                </div>
              )}
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
                Save Speed Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedManagementSection;