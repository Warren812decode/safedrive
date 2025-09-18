import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteOptimizationCards = ({ className = '' }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routeRecommendations = [
    {
      id: 'route-1',
      from: 'Westlands',
      to: 'CBD',
      currentRoute: {
        distance: 8.5,
        time: 25,
        fuel: 0.68,
        cost: 112,
        traffic: 'heavy'
      },
      optimizedRoute: {
        distance: 7.2,
        time: 22,
        fuel: 0.58,
        cost: 96,
        traffic: 'moderate',
        savings: {
          distance: 1.3,
          time: 3,
          fuel: 0.10,
          cost: 16
        }
      },
      waypoints: ['Parklands Rd', 'Museum Hill Rd', 'Uhuru Highway'],
      trafficConditions: 'moderate',
      roadConditions: 'good',
      priority: 'high'
    },
    {
      id: 'route-2',
      from: 'Karen',
      to: 'Gigiri',
      currentRoute: {
        distance: 15.8,
        time: 35,
        fuel: 1.26,
        cost: 208,
        traffic: 'moderate'
      },
      optimizedRoute: {
        distance: 14.2,
        time: 32,
        fuel: 1.14,
        cost: 188,
        traffic: 'light',
        savings: {
          distance: 1.6,
          time: 3,
          fuel: 0.12,
          cost: 20
        }
      },
      waypoints: ['Ngong Rd', 'Kibera Dr', 'Waiyaki Way'],
      trafficConditions: 'light',
      roadConditions: 'excellent',
      priority: 'medium'
    },
    {
      id: 'route-3',
      from: 'Eastlands',
      to: 'Airport',
      currentRoute: {
        distance: 12.4,
        time: 28,
        fuel: 0.99,
        cost: 164,
        traffic: 'heavy'
      },
      optimizedRoute: {
        distance: 11.8,
        time: 24,
        fuel: 0.94,
        cost: 155,
        traffic: 'moderate',
        savings: {
          distance: 0.6,
          time: 4,
          fuel: 0.05,
          cost: 9
        }
      },
      waypoints: ['Outer Ring Rd', 'Mombasa Rd'],
      trafficConditions: 'moderate',
      roadConditions: 'fair',
      priority: 'low'
    }
  ];

  const getTrafficColor = (traffic) => {
    switch (traffic) {
      case 'light': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'heavy': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrafficIcon = (traffic) => {
    switch (traffic) {
      case 'light': return 'CheckCircle';
      case 'moderate': return 'AlertTriangle';
      case 'heavy': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error bg-error/10';
      case 'medium': return 'border-warning bg-warning/10';
      case 'low': return 'border-primary bg-primary/10';
      default: return 'border-border bg-card';
    }
  };

  const RouteCard = ({ route }) => (
    <div className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${getPriorityColor(route?.priority)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-1">
            {route?.from} → {route?.to}
          </h4>
          <div className="flex items-center space-x-2">
            <Icon 
              name={getTrafficIcon(route?.trafficConditions)} 
              size={14} 
              className={getTrafficColor(route?.trafficConditions)}
            />
            <span className={`text-xs font-medium ${getTrafficColor(route?.trafficConditions)}`}>
              {route?.trafficConditions} traffic
            </span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          route?.priority === 'high' ? 'bg-error/20 text-error' :
          route?.priority === 'medium'? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
        }`}>
          {route?.priority} priority
        </div>
      </div>

      {/* Route Comparison */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Current Route */}
        <div className="bg-muted/50 rounded-lg p-3">
          <h5 className="text-xs font-medium text-muted-foreground mb-2">Current Route</h5>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Distance:</span>
              <span className="font-medium">{route?.currentRoute?.distance} km</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{route?.currentRoute?.time} min</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Fuel:</span>
              <span className="font-medium">{route?.currentRoute?.fuel}L</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium">KES {route?.currentRoute?.cost}</span>
            </div>
          </div>
        </div>

        {/* Optimized Route */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-3">
          <h5 className="text-xs font-medium text-success mb-2">Optimized Route</h5>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Distance:</span>
              <span className="font-medium">{route?.optimizedRoute?.distance} km</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{route?.optimizedRoute?.time} min</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Fuel:</span>
              <span className="font-medium">{route?.optimizedRoute?.fuel}L</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium">KES {route?.optimizedRoute?.cost}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      <div className="bg-success/5 border border-success/10 rounded-lg p-3 mb-4">
        <h5 className="text-xs font-medium text-success mb-2">Potential Savings</h5>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center">
            <p className="text-sm font-bold text-success">
              -{route?.optimizedRoute?.savings?.distance} km
            </p>
            <p className="text-xs text-muted-foreground">Distance</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-success">
              -{route?.optimizedRoute?.savings?.time} min
            </p>
            <p className="text-xs text-muted-foreground">Time</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-success">
              -{route?.optimizedRoute?.savings?.fuel}L
            </p>
            <p className="text-xs text-muted-foreground">Fuel</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-success">
              -KES {route?.optimizedRoute?.savings?.cost}
            </p>
            <p className="text-xs text-muted-foreground">Cost</p>
          </div>
        </div>
      </div>

      {/* Waypoints */}
      <div className="mb-4">
        <h5 className="text-xs font-medium text-muted-foreground mb-2">Suggested Route</h5>
        <div className="flex items-center space-x-2 text-xs">
          <Icon name="MapPin" size={12} className="text-primary flex-shrink-0" />
          <span className="text-muted-foreground">
            {route?.waypoints?.join(' → ')}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Navigation"
          iconPosition="left"
          iconSize={14}
          onClick={() => setSelectedRoute(route?.id)}
          className="flex-1 text-xs"
        >
          Use Route
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Map"
          iconSize={14}
          className="text-xs"
        >
          View Map
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Route Optimization
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-powered route suggestions for better fuel efficiency
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
            className="text-xs"
          >
            Refresh Routes
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Settings"
            iconSize={14}
            className="text-xs"
          >
            Preferences
          </Button>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
          <Icon name="TrendingDown" size={20} className="text-success mx-auto mb-2" />
          <p className="text-lg font-bold text-success">KES 45</p>
          <p className="text-xs text-muted-foreground">Avg. daily savings</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <Icon name="Clock" size={20} className="text-primary mx-auto mb-2" />
          <p className="text-lg font-bold text-primary">10 min</p>
          <p className="text-xs text-muted-foreground">Time saved per trip</p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
          <Icon name="Fuel" size={20} className="text-accent mx-auto mb-2" />
          <p className="text-lg font-bold text-accent">0.27L</p>
          <p className="text-xs text-muted-foreground">Fuel saved per trip</p>
        </div>
      </div>
      {/* Route Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-card-foreground">
            Today's Route Recommendations
          </h4>
          <span className="text-xs text-muted-foreground">
            {routeRecommendations?.length} routes analyzed
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {routeRecommendations?.map((route) => (
            <RouteCard key={route?.id} route={route} />
          ))}
        </div>
      </div>
      {/* AI Insights */}
      <div className="mt-6 bg-primary/5 border border-primary/10 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Brain" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-primary mb-1">
              AI Route Insights
            </h5>
            <p className="text-sm text-muted-foreground mb-2">
              Based on your driving patterns and current traffic conditions, using optimized routes could save you approximately <strong>KES 1,350</strong> per month.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                Peak hours: 7-9 AM, 5-7 PM
              </span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                Best efficiency: Off-peak travel
              </span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                Alternative routes available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationCards;