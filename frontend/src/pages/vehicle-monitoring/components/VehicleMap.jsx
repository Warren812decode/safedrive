import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VehicleMap = ({ 
  vehicleLocation = { lat: -1.2921, lng: 36.8219 },
  routeHistory = [],
  geofences = [],
  nearbyPOIs = [],
  isTracking = true,
  onToggleTracking = () => {},
  className = ''
}) => {
  const [mapView, setMapView] = useState('satellite'); // 'satellite', 'roadmap', 'hybrid'
  const [showGeofences, setShowGeofences] = useState(true);
  const [showPOIs, setShowPOIs] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mockGeofences = [
    {
      id: 1,
      name: "Home Zone",
      center: { lat: -1.2921, lng: 36.8219 },
      radius: 500,
      type: "safe",
      active: true
    },
    {
      id: 2,
      name: "Work Area",
      center: { lat: -1.2864, lng: 36.8172 },
      radius: 300,
      type: "work",
      active: true
    }
  ];

  const mockPOIs = [
    {
      id: 1,
      name: "Shell Petrol Station",
      location: { lat: -1.2901, lng: 36.8200 },
      type: "fuel",
      distance: "0.8 km"
    },
    {
      id: 2,
      name: "AA Kenya Service Center",
      location: { lat: -1.2940, lng: 36.8240 },
      type: "service",
      distance: "1.2 km"
    }
  ];

  const mockRouteHistory = [
    { lat: -1.2921, lng: 36.8219, timestamp: new Date(Date.now() - 3600000) },
    { lat: -1.2900, lng: 36.8200, timestamp: new Date(Date.now() - 1800000) },
    { lat: -1.2880, lng: 36.8180, timestamp: new Date(Date.now() - 900000) },
    { lat: -1.2864, lng: 36.8172, timestamp: new Date() }
  ];

  const getMapUrl = () => {
    const { lat, lng } = vehicleLocation;
    return `https://www.google.com/maps?q=${lat},${lng}&z=15&t=${mapView}&output=embed`;
  };

  const getPOIIcon = (type) => {
    switch (type) {
      case 'fuel':
        return 'Fuel';
      case 'service':
        return 'Wrench';
      case 'hospital':
        return 'Cross';
      default:
        return 'MapPin';
    }
  };

  const getGeofenceColor = (type) => {
    switch (type) {
      case 'safe':
        return 'text-success';
      case 'work':
        return 'text-primary';
      case 'restricted':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground">Live Vehicle Location</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date()?.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName={isTracking ? 'Pause' : 'Play'}
              iconPosition="left"
              iconSize={16}
              onClick={onToggleTracking}
            >
              {isTracking ? 'Pause' : 'Resume'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName={isFullscreen ? 'Minimize2' : 'Maximize2'}
              iconSize={16}
              onClick={() => setIsFullscreen(!isFullscreen)}
            />
          </div>
        </div>
      </div>
      {/* Map Controls */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-card-foreground">View:</span>
            <select
              value={mapView}
              onChange={(e) => setMapView(e?.target?.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
            >
              <option value="roadmap">Road</option>
              <option value="satellite">Satellite</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showGeofences}
                onChange={(e) => setShowGeofences(e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-card-foreground">Geofences</span>
            </label>
            
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showPOIs}
                onChange={(e) => setShowPOIs(e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-card-foreground">Points of Interest</span>
            </label>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className={`relative ${isFullscreen ? 'h-96' : 'h-64'} bg-muted`}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Vehicle Location Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={getMapUrl()}
          className="border-0"
        />
        
        {/* Map Overlay Info */}
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Navigation" size={16} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Current Location</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {vehicleLocation?.lat?.toFixed(6)}, {vehicleLocation?.lng?.toFixed(6)}
          </p>
          <p className="text-xs text-muted-foreground">
            Speed: 45 km/h | Heading: NE
          </p>
        </div>

        {/* Speed Indicator */}
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">45</div>
            <div className="text-xs text-muted-foreground">km/h</div>
            <div className="text-xs text-success mt-1">Within Limit</div>
          </div>
        </div>
      </div>
      {/* Map Legend */}
      <div className="p-4 bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Geofences */}
          {showGeofences && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-2 flex items-center">
                <Icon name="Shield" size={16} className="mr-2" />
                Active Geofences
              </h4>
              <div className="space-y-1">
                {mockGeofences?.map((geofence) => (
                  <div key={geofence?.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getGeofenceColor(geofence?.type)?.replace('text-', 'bg-')}`}></div>
                      <span className="text-card-foreground">{geofence?.name}</span>
                    </div>
                    <span className="text-muted-foreground">{geofence?.radius}m</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Points of Interest */}
          {showPOIs && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-2 flex items-center">
                <Icon name="MapPin" size={16} className="mr-2" />
                Nearby Services
              </h4>
              <div className="space-y-1">
                {mockPOIs?.map((poi) => (
                  <div key={poi?.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Icon name={getPOIIcon(poi?.type)} size={12} className="text-accent" />
                      <span className="text-card-foreground">{poi?.name}</span>
                    </div>
                    <span className="text-muted-foreground">{poi?.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Route Summary */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Route" size={16} className="text-primary" />
                <span className="text-card-foreground">Today's Route</span>
              </div>
              <span className="text-muted-foreground">12.5 km traveled</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="History"
              iconPosition="left"
              iconSize={14}
            >
              View History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleMap;