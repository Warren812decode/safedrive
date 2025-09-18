import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AlertFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  alertCounts = {},
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'critical', label: `Critical (${alertCounts?.critical || 0})` },
    { value: 'high', label: `High (${alertCounts?.high || 0})` },
    { value: 'medium', label: `Medium (${alertCounts?.medium || 0})` },
    { value: 'low', label: `Low (${alertCounts?.low || 0})` }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'security', label: `Security (${alertCounts?.security || 0})` },
    { value: 'maintenance', label: `Maintenance (${alertCounts?.maintenance || 0})` },
    { value: 'compliance', label: `Compliance (${alertCounts?.compliance || 0})` },
    { value: 'system', label: `System (${alertCounts?.system || 0})` }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'dismissed', label: 'Dismissed' }
  ];

  const vehicleOptions = [
    { value: '', label: 'All Vehicles' },
    { value: 'KCA-001A', label: 'KCA-001A (Toyota Corolla)' },
    { value: 'KCB-002B', label: 'KCB-002B (Nissan X-Trail)' },
    { value: 'KCC-003C', label: 'KCC-003C (Isuzu D-Max)' },
    { value: 'KCD-004D', label: 'KCD-004D (Honda Fit)' },
    { value: 'KCE-005E', label: 'KCE-005E (Toyota Hiace)' }
  ];

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value && value !== '' && value !== 'today'
  );

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-card-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              iconSize={16}
              onClick={onClearFilters}
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Search Bar - Always Visible */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search alerts by title, message, or vehicle..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className={`
        ${isExpanded ? 'block' : 'hidden'} lg:block
        p-4 space-y-4
      `}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Severity Filter */}
          <Select
            label="Severity"
            options={severityOptions}
            value={filters?.severity || ''}
            onChange={(value) => handleFilterChange('severity', value)}
            className="w-full"
          />

          {/* Category Filter */}
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category || ''}
            onChange={(value) => handleFilterChange('category', value)}
            className="w-full"
          />

          {/* Status Filter */}
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
            className="w-full"
          />

          {/* Vehicle Filter */}
          <Select
            label="Vehicle"
            options={vehicleOptions}
            value={filters?.vehicle || ''}
            onChange={(value) => handleFilterChange('vehicle', value)}
            searchable
            className="w-full"
          />

          {/* Time Range Filter */}
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={filters?.timeRange || 'today'}
            onChange={(value) => handleFilterChange('timeRange', value)}
            className="w-full"
          />
        </div>

        {/* Custom Date Range */}
        {filters?.timeRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <Input
              type="date"
              label="From Date"
              value={filters?.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
            />
            <Input
              type="date"
              label="To Date"
              value={filters?.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
            />
          </div>
        )}

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <Button
            variant={filters?.unreadOnly ? "default" : "outline"}
            size="sm"
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
            onClick={() => handleFilterChange('unreadOnly', !filters?.unreadOnly)}
          >
            Unread Only
          </Button>
          <Button
            variant={filters?.criticalOnly ? "destructive" : "outline"}
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            iconSize={16}
            onClick={() => handleFilterChange('criticalOnly', !filters?.criticalOnly)}
          >
            Critical Only
          </Button>
          <Button
            variant={filters?.requiresAction ? "warning" : "outline"}
            size="sm"
            iconName="Clock"
            iconPosition="left"
            iconSize={16}
            onClick={() => handleFilterChange('requiresAction', !filters?.requiresAction)}
          >
            Requires Action
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertFilters;