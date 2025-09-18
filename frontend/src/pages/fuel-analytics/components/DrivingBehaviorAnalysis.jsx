import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';


const DrivingBehaviorAnalysis = ({ className = '' }) => {
  const [selectedView, setSelectedView] = useState('speed');

  const speedPatternData = [
    { range: '0-30', consumption: 8.2, efficiency: 15.2, color: '#22C55E' },
    { range: '30-50', consumption: 6.8, efficiency: 18.5, color: '#3B82F6' },
    { range: '50-70', consumption: 7.5, efficiency: 16.8, color: '#F59E0B' },
    { range: '70-90', consumption: 9.8, efficiency: 12.4, color: '#EF4444' },
    { range: '90+', consumption: 12.5, efficiency: 8.9, color: '#DC2626' }
  ];

  const idleTimeData = [
    { category: 'Traffic Lights', minutes: 45, percentage: 35, color: '#3B82F6' },
    { category: 'Parking', minutes: 28, percentage: 22, color: '#22C55E' },
    { category: 'Loading/Unloading', minutes: 32, percentage: 25, color: '#F59E0B' },
    { category: 'Other', minutes: 23, percentage: 18, color: '#8B5CF6' }
  ];

  const routeEfficiencyData = [
    { route: 'Home to Work', distance: 15.2, time: 35, efficiency: 14.2, score: 85 },
    { route: 'Work to Mall', distance: 8.5, time: 18, efficiency: 16.8, score: 92 },
    { route: 'Mall to Home', distance: 12.8, time: 28, efficiency: 13.9, score: 78 },
    { route: 'Weekend Trips', distance: 45.6, time: 85, efficiency: 12.5, score: 72 }
  ];

  const behaviorScores = {
    acceleration: { score: 78, trend: '+5', description: 'Smooth acceleration patterns' },
    braking: { score: 82, trend: '+12', description: 'Gentle braking technique' },
    cornering: { score: 85, trend: '+3', description: 'Steady cornering speed' },
    idling: { score: 65, trend: '-8', description: 'Reduce idle time by 15%' }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">
                {entry?.value} {entry?.name === 'consumption' ? 'L/100km' : 'km/l'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Driving Behavior Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Understand how your driving affects fuel consumption
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          {[
            { id: 'speed', label: 'Speed', icon: 'Gauge' },
            { id: 'idle', label: 'Idle Time', icon: 'Clock' },
            { id: 'routes', label: 'Routes', icon: 'Route' }
          ]?.map((view) => (
            <button
              key={view?.id}
              onClick={() => setSelectedView(view?.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedView === view?.id
                  ? 'bg-card text-card-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={view?.icon} size={14} />
              <span>{view?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content based on selected view */}
      {selectedView === 'speed' && (
        <div className="space-y-6">
          {/* Speed Pattern Chart */}
          <div className="h-64">
            <h4 className="text-sm font-medium text-card-foreground mb-3">
              Fuel Consumption by Speed Range (km/h)
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speedPatternData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="range" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="consumption" 
                  name="consumption"
                  radius={[4, 4, 0, 0]}
                >
                  {speedPatternData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Behavior Scores */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(behaviorScores)?.map(([key, data]) => (
              <div key={key} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-medium text-card-foreground capitalize">
                    {key}
                  </h5>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    data?.trend?.startsWith('+') 
                      ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                  }`}>
                    {data?.trend}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-border rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${data?.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-card-foreground">
                      {data?.score}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {data?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedView === 'idle' && (
        <div className="space-y-6">
          {/* Idle Time Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <h4 className="text-sm font-medium text-card-foreground mb-3">
                Idle Time Distribution
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={idleTimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {idleTimeData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-card-foreground">
                Idle Time Breakdown
              </h4>
              {idleTimeData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm font-medium text-card-foreground">
                      {item?.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-card-foreground">
                      {item?.minutes} min
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item?.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Idle Time Impact */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-warning mb-1">
                  Idle Time Impact
                </h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Your vehicle idles for an average of 128 minutes per week, consuming approximately 8.5L of fuel.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Potential savings:</strong> KES 1,020 per month by reducing idle time by 50%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedView === 'routes' && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-card-foreground">
            Route Efficiency Analysis
          </h4>
          {routeEfficiencyData?.map((route, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-card-foreground mb-1">
                    {route?.route}
                  </h5>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{route?.distance} km</span>
                    <span>{route?.time} min</span>
                    <span>{route?.efficiency} km/l</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-card-foreground">
                      {route?.score}/100
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Efficiency Score
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ 
                        backgroundColor: route?.score >= 85 ? '#22C55E' : route?.score >= 70 ? '#F59E0B' : '#EF4444'
                      }}
                    >
                      {route?.score}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrivingBehaviorAnalysis;