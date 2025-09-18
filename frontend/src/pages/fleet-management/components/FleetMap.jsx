import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const FleetMap = ({ 
  vehicles = [], 
  selectedVehicles = [],
  onVehicleSelect,
  onVehicleClick,
  className = '' 
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: -1.2921, lng: 36.8219 }); // Nairobi
  const [zoomLevel, setZoomLevel] = useState(11);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'active':
        return '#22C55E'; // green
      case 'idle':
        return '#F59E0B'; // amber
      case 'maintenance':
        return '#8B4513'; // brown
      case 'alert':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 3));
  };

  const handleCenterMap = () => {
    setMapCenter({ lat: -1.2921, lng: 36.8219 });
    setZoomLevel(11);
  };

  if (isLoading) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-muted rounded-full animate-spin border-t-primary mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading fleet map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-heading font-semibold text-lg text-card-foreground">Fleet Map</h3>
          <p className="text-sm text-muted-foreground">{vehicles?.length} vehicles tracked</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconSize={16}
            onClick={handleCenterMap}
          >
            Center
          </Button>
          <div className="flex border border-border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              iconSize={16}
              onClick={handleZoomIn}
              className="rounded-r-none border-r border-border"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Minus"
              iconSize={16}
              onClick={handleZoomOut}
              className="rounded-l-none"
            />
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Fleet Vehicle Locations"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="w-full h-full"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-2 shadow-modal">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Active ({vehicles?.filter(v => v?.status === 'active')?.length})</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Idle ({vehicles?.filter(v => v?.status === 'idle')?.length})</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Maintenance ({vehicles?.filter(v => v?.status === 'maintenance')?.length})</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Alert ({vehicles?.filter(v => v?.status === 'alert')?.length})</span>
            </div>
          </div>
        </div>

        {/* Vehicle Markers Simulation */}
        <div className="absolute inset-0 pointer-events-none">
          {vehicles?.slice(0, 8)?.map((vehicle, index) => (
            <div
              key={vehicle?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${25 + Math.floor(index / 4) * 25}%`
              }}
              onClick={() => onVehicleClick(vehicle?.id)}
            >
              <div className="relative">
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: getMarkerColor(vehicle?.status) }}
                />
                {selectedVehicles?.includes(vehicle?.id) && (
                  <div className="absolute -inset-1 border-2 border-primary rounded-full animate-pulse"></div>
                )}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs font-medium text-card-foreground shadow-lg whitespace-nowrap">
                  {vehicle?.plateNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Map Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <span>•</span>
          <span>Real-time tracking active</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconSize={14}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconSize={14}
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FleetMap;