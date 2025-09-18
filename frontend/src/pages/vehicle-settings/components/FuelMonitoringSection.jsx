import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FuelMonitoringSection = ({ 
  fuelSettings = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [formData, setFormData] = useState({
    fuelMonitoring: fuelSettings?.fuelMonitoring || true,
    tankCapacity: fuelSettings?.tankCapacity || "50",
    targetEfficiency: fuelSettings?.targetEfficiency || "12",
    lowFuelThreshold: fuelSettings?.lowFuelThreshold || "10",
    costTracking: fuelSettings?.costTracking || true,
    currentFuelPrice: fuelSettings?.currentFuelPrice || "165.50",
    budgetLimit: fuelSettings?.budgetLimit || "15000",
    budgetPeriod: fuelSettings?.budgetPeriod || "monthly",
    ecoMode: fuelSettings?.ecoMode || false,
    idleTimeLimit: fuelSettings?.idleTimeLimit || "5"
  });

  const [errors, setErrors] = useState({});

  const budgetPeriods = [
    { value: "weekly", label: "Weekly Budget" },
    { value: "monthly", label: "Monthly Budget" },
    { value: "quarterly", label: "Quarterly Budget" }
  ];

  const efficiencyUnits = [
    { value: "kmpl", label: "Kilometers per Liter (km/l)" },
    { value: "lp100km", label: "Liters per 100km (l/100km)" }
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

  const validateForm = () => {
    const newErrors = {};
    if (parseFloat(formData?.tankCapacity) <= 0) {
      newErrors.tankCapacity = "Tank capacity must be greater than 0";
    }
    if (parseFloat(formData?.targetEfficiency) <= 0) {
      newErrors.targetEfficiency = "Target efficiency must be greater than 0";
    }
    if (parseFloat(formData?.lowFuelThreshold) >= parseFloat(formData?.tankCapacity)) {
      newErrors.lowFuelThreshold = "Low fuel threshold must be less than tank capacity";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
    }
  };

  const calculateMonthlyCost = () => {
    const efficiency = parseFloat(formData?.targetEfficiency);
    const fuelPrice = parseFloat(formData?.currentFuelPrice);
    const estimatedKm = 2000; // Average monthly kilometers
    const estimatedCost = (estimatedKm / efficiency) * fuelPrice;
    return estimatedCost?.toFixed(2);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Fuel" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Fuel Monitoring</h3>
            <p className="text-sm text-muted-foreground">Consumption tracking and efficiency optimization</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {formData?.ecoMode && (
            <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
              <Icon name="Leaf" size={12} className="text-success" />
              <span className="text-xs font-medium text-success">Eco</span>
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
            {/* Fuel Monitoring Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Fuel" size={20} className="text-primary" />
                <div>
                  <h4 className="font-medium text-card-foreground">Fuel Monitoring</h4>
                  <p className="text-sm text-muted-foreground">Track fuel consumption and efficiency</p>
                </div>
              </div>
              <Checkbox
                checked={formData?.fuelMonitoring}
                onChange={(e) => handleCheckboxChange('fuelMonitoring', e?.target?.checked)}
              />
            </div>

            {formData?.fuelMonitoring && (
              <>
                {/* Vehicle Fuel Configuration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    label="Tank Capacity (Liters)"
                    type="number"
                    value={formData?.tankCapacity}
                    onChange={(e) => handleInputChange('tankCapacity', e?.target?.value)}
                    error={errors?.tankCapacity}
                    min="20"
                    max="200"
                    required
                  />
                  <Input
                    label="Target Efficiency (km/l)"
                    type="number"
                    value={formData?.targetEfficiency}
                    onChange={(e) => handleInputChange('targetEfficiency', e?.target?.value)}
                    error={errors?.targetEfficiency}
                    min="5"
                    max="30"
                    step="0.1"
                    required
                  />
                  <Input
                    label="Low Fuel Alert (Liters)"
                    type="number"
                    value={formData?.lowFuelThreshold}
                    onChange={(e) => handleInputChange('lowFuelThreshold', e?.target?.value)}
                    error={errors?.lowFuelThreshold}
                    min="5"
                    max="50"
                    required
                  />
                </div>

                {/* Cost Tracking */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="DollarSign" size={20} className="text-primary" />
                      <div>
                        <h4 className="font-medium text-card-foreground">Cost Tracking</h4>
                        <p className="text-sm text-muted-foreground">Monitor fuel expenses and budgets</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={formData?.costTracking}
                      onChange={(e) => handleCheckboxChange('costTracking', e?.target?.checked)}
                    />
                  </div>

                  {formData?.costTracking && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Current Fuel Price (KES/L)"
                        type="number"
                        value={formData?.currentFuelPrice}
                        onChange={(e) => handleInputChange('currentFuelPrice', e?.target?.value)}
                        min="100"
                        max="300"
                        step="0.10"
                      />
                      <Input
                        label="Budget Limit (KES)"
                        type="number"
                        value={formData?.budgetLimit}
                        onChange={(e) => handleInputChange('budgetLimit', e?.target?.value)}
                        min="1000"
                        max="100000"
                      />
                      <Select
                        label="Budget Period"
                        options={budgetPeriods}
                        value={formData?.budgetPeriod}
                        onChange={(value) => handleInputChange('budgetPeriod', value)}
                      />
                    </div>
                  )}
                </div>

                {/* Cost Estimation */}
                {formData?.costTracking && (
                  <div className="p-4 bg-info/5 rounded-lg border border-info/20">
                    <div className="flex items-start space-x-3">
                      <Icon name="Calculator" size={16} className="text-info mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-info mb-2">Estimated Monthly Cost</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Based on 2,000 km/month:</p>
                            <p className="font-mono text-lg font-semibold text-card-foreground">
                              KES {calculateMonthlyCost()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Budget remaining:</p>
                            <p className="font-mono text-lg font-semibold text-success">
                              KES {(parseFloat(formData?.budgetLimit) - parseFloat(calculateMonthlyCost()))?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Eco Mode Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-center space-x-3">
                      <Icon name="Leaf" size={20} className="text-success" />
                      <div>
                        <h4 className="font-medium text-success">Eco Mode</h4>
                        <p className="text-sm text-muted-foreground">Optimize driving for fuel efficiency</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={formData?.ecoMode}
                      onChange={(e) => handleCheckboxChange('ecoMode', e?.target?.checked)}
                    />
                  </div>

                  {formData?.ecoMode && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Idle Time Alert (minutes)"
                        type="number"
                        value={formData?.idleTimeLimit}
                        onChange={(e) => handleInputChange('idleTimeLimit', e?.target?.value)}
                        description="Alert when engine idles for this duration"
                        min="1"
                        max="30"
                      />
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="font-medium text-sm text-card-foreground mb-2">Eco Features</h5>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Icon name="Check" size={14} className="text-success" />
                            <span>Gentle acceleration coaching</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Check" size={14} className="text-success" />
                            <span>Optimal speed recommendations</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Check" size={14} className="text-success" />
                            <span>Route efficiency analysis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fuel Theft Detection */}
                <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-warning">Fuel Theft Detection</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Advanced algorithms monitor fuel levels to detect unauthorized siphoning or tampering.
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Icon name="Shield" size={14} className="text-success" />
                          <span className="text-success">Active Protection</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Bell" size={14} className="text-info" />
                          <span className="text-info">Instant Alerts</span>
                        </div>
                      </div>
                    </div>
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
                Save Fuel Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelMonitoringSection;