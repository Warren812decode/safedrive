import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const VehicleProfileSection = ({ 
  vehicleData = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [formData, setFormData] = useState({
    make: vehicleData?.make || "Toyota",
    model: vehicleData?.model || "Corolla",
    year: vehicleData?.year || "2020",
    registration: vehicleData?.registration || "KCA 123A",
    vehicleType: vehicleData?.vehicleType || "personal",
    color: vehicleData?.color || "White",
    engineSize: vehicleData?.engineSize || "1.8L",
    fuelType: vehicleData?.fuelType || "petrol",
    photo: vehicleData?.photo || "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg"
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const vehicleTypes = [
    { value: "personal", label: "Personal Vehicle" },
    { value: "commercial", label: "Commercial Vehicle" },
    { value: "matatu", label: "Matatu/PSV" },
    { value: "taxi", label: "Taxi/Ride-hail" },
    { value: "truck", label: "Truck/Lorry" },
    { value: "motorcycle", label: "Motorcycle/Boda Boda" }
  ];

  const fuelTypes = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "hybrid", label: "Hybrid" },
    { value: "electric", label: "Electric" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const mockUrl = "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg";
        setFormData(prev => ({ ...prev, photo: mockUrl }));
        setIsUploading(false);
      }, 2000);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.make?.trim()) newErrors.make = "Vehicle make is required";
    if (!formData?.model?.trim()) newErrors.model = "Vehicle model is required";
    if (!formData?.registration?.trim()) newErrors.registration = "Registration number is required";
    
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
          <Icon name="Car" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Vehicle Profile</h3>
            <p className="text-sm text-muted-foreground">Basic vehicle information and identification</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="space-y-6 pt-4">
            {/* Vehicle Photo */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden border border-border">
                  <Image
                    src={formData?.photo}
                    alt="Vehicle Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="vehicle-photo"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Camera"
                    iconPosition="left"
                    iconSize={16}
                    loading={isUploading}
                    onClick={() => document.getElementById('vehicle-photo')?.click()}
                    className="w-full"
                  >
                    {isUploading ? "Uploading..." : "Change Photo"}
                  </Button>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Vehicle Make"
                  type="text"
                  value={formData?.make}
                  onChange={(e) => handleInputChange('make', e?.target?.value)}
                  error={errors?.make}
                  placeholder="e.g., Toyota"
                  required
                />
                <Input
                  label="Vehicle Model"
                  type="text"
                  value={formData?.model}
                  onChange={(e) => handleInputChange('model', e?.target?.value)}
                  error={errors?.model}
                  placeholder="e.g., Corolla"
                  required
                />
              </div>
            </div>

            {/* Vehicle Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Year"
                type="number"
                value={formData?.year}
                onChange={(e) => handleInputChange('year', e?.target?.value)}
                placeholder="2020"
                min="1990"
                max="2025"
              />
              <Input
                label="Registration Number"
                type="text"
                value={formData?.registration}
                onChange={(e) => handleInputChange('registration', e?.target?.value?.toUpperCase())}
                error={errors?.registration}
                placeholder="KCA 123A"
                required
              />
              <Input
                label="Color"
                type="text"
                value={formData?.color}
                onChange={(e) => handleInputChange('color', e?.target?.value)}
                placeholder="White"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Vehicle Type"
                options={vehicleTypes}
                value={formData?.vehicleType}
                onChange={(value) => handleInputChange('vehicleType', value)}
                placeholder="Select vehicle type"
              />
              <Input
                label="Engine Size"
                type="text"
                value={formData?.engineSize}
                onChange={(e) => handleInputChange('engineSize', e?.target?.value)}
                placeholder="1.8L"
              />
              <Select
                label="Fuel Type"
                options={fuelTypes}
                value={formData?.fuelType}
                onChange={(value) => handleInputChange('fuelType', value)}
                placeholder="Select fuel type"
              />
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
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleProfileSection;