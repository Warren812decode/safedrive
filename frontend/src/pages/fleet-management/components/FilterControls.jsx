import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  onFilterChange,
  onSortChange,
  onSearch,
  totalVehicles = 0,
  filteredCount = 0,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('plateNumber');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'idle', label: 'Idle' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'alert', label: 'Alert' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
    { value: 'van', label: 'Van' },
    { value: 'matatu', label: 'Matatu' }
  ];

  const sortOptions = [
    { value: 'plateNumber', label: 'Plate Number' },
    { value: 'status', label: 'Status' },
    { value: 'driver', label: 'Driver Name' },
    { value: 'location', label: 'Location' },
    { value: 'fuelLevel', label: 'Fuel Level' },
    { value: 'engineHealth', label: 'Engine Health' },
    { value: 'lastUpdate', label: 'Last Update' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    onFilterChange({ status: value, type: selectedType });
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    onFilterChange({ status: selectedStatus, type: value });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedType('all');
    setSortBy('plateNumber');
    onSearch('');
    onFilterChange({ status: 'all', type: 'all' });
    onSortChange('plateNumber');
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-card-foreground">Filter & Search</h3>
          <p className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalVehicles} vehicles
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconSize={16}
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            Advanced
          </Button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search by plate, driver, location..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
        
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={handleStatusChange}
          placeholder="Filter by status"
        />
        
        <Select
          options={typeOptions}
          value={selectedType}
          onChange={handleTypeChange}
          placeholder="Filter by type"
        />
        
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={handleSortChange}
          placeholder="Sort by"
        />
      </div>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Fuel Level Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min %"
                  min="0"
                  max="100"
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max %"
                  min="0"
                  max="100"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Engine Health Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min %"
                  min="0"
                  max="100"
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max %"
                  min="0"
                  max="100"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Last Update
              </label>
              <Select
                options={[
                  { value: 'all', label: 'Any time' },
                  { value: '1h', label: 'Last hour' },
                  { value: '6h', label: 'Last 6 hours' },
                  { value: '24h', label: 'Last 24 hours' },
                  { value: '7d', label: 'Last 7 days' }
                ]}
                value="all"
                onChange={() => {}}
                placeholder="Filter by update time"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="alerts-only"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="alerts-only" className="text-sm text-card-foreground">
                Show only vehicles with alerts
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="security-active"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="security-active" className="text-sm text-card-foreground">
                Security system active
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="maintenance-due"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="maintenance-due" className="text-sm text-card-foreground">
                Maintenance due
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          iconName="AlertTriangle"
          iconPosition="left"
          iconSize={14}
          onClick={() => handleStatusChange('alert')}
          className={selectedStatus === 'alert' ? 'bg-error/10 border-error text-error' : ''}
        >
          Critical Alerts
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Fuel"
          iconPosition="left"
          iconSize={14}
          className="hover:bg-warning/10 hover:border-warning hover:text-warning"
        >
          Low Fuel
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Wrench"
          iconPosition="left"
          iconSize={14}
          onClick={() => handleStatusChange('maintenance')}
          className={selectedStatus === 'maintenance' ? 'bg-secondary/10 border-secondary text-secondary' : ''}
        >
          Maintenance
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Shield"
          iconPosition="left"
          iconSize={14}
          className="hover:bg-success/10 hover:border-success hover:text-success"
        >
          Security Active
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;