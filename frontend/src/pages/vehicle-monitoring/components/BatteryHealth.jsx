import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BatteryHealth = ({ 
  batteryData = {},
  onRunDiagnostic = () => {},
  onUpdateSettings = () => {},
  className = ''
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [showPredictions, setShowPredictions] = useState(true);

  const mockBatteryData = {
    voltage: {
      current: 14.2,
      minimum: 11.8,
      maximum: 14.8,
      status: 'normal',
      trend: 'stable'
    },
    health: {
      percentage: 87,
      status: 'good',
      cycleCount: 1247,
      ageMonths: 18
    },
    charging: {
      isCharging: true,
      chargingRate: 12.5,
      alternatorStatus: 'normal',
      timeToFull: null
    },
    temperature: {
      current: 32,
      optimal: { min: 15, max: 35 },
      status: 'normal'
    },
    predictions: {
      replacementDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      confidenceLevel: 85,
      riskFactors: ['High temperature exposure', 'Frequent deep discharge']
    }
  };

  const mockVoltageHistory = [
    { time: '00:00', voltage: 12.4, charging: false },
    { time: '02:00', voltage: 12.2, charging: false },
    { time: '04:00', voltage: 12.1, charging: false },
    { time: '06:00', voltage: 12.0, charging: false },
    { time: '08:00', voltage: 14.2, charging: true },
    { time: '10:00', voltage: 14.3, charging: true },
    { time: '12:00', voltage: 14.1, charging: true },
    { time: '14:00', voltage: 14.2, charging: true },
    { time: '16:00', voltage: 14.0, charging: true },
    { time: '18:00', voltage: 13.8, charging: false },
    { time: '20:00', voltage: 13.2, charging: false },
    { time: '22:00', voltage: 12.8, charging: false }
  ];

  const getHealthStatus = (percentage) => {
    if (percentage >= 80) return { status: 'excellent', color: 'text-success', bgColor: 'bg-success' };
    if (percentage >= 60) return { status: 'good', color: 'text-primary', bgColor: 'bg-primary' };
    if (percentage >= 40) return { status: 'fair', color: 'text-warning', bgColor: 'bg-warning' };
    return { status: 'poor', color: 'text-error', bgColor: 'bg-error' };
  };

  const getVoltageStatus = (voltage) => {
    if (voltage < 11.5) return { status: 'critical', color: 'text-error' };
    if (voltage < 12.0) return { status: 'low', color: 'text-warning' };
    if (voltage > 14.8) return { status: 'high', color: 'text-warning' };
    return { status: 'normal', color: 'text-success' };
  };

  const getTemperatureStatus = (temp, optimal) => {
    if (temp < optimal?.min - 5 || temp > optimal?.max + 10) return { status: 'critical', color: 'text-error' };
    if (temp < optimal?.min || temp > optimal?.max) return { status: 'warning', color: 'text-warning' };
    return { status: 'normal', color: 'text-success' };
  };

  const healthStatus = getHealthStatus(mockBatteryData?.health?.percentage);
  const voltageStatus = getVoltageStatus(mockBatteryData?.voltage?.current);
  const tempStatus = getTemperatureStatus(mockBatteryData?.temperature?.current, mockBatteryData?.temperature?.optimal);

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Battery" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground">Battery Health</h3>
              <p className="text-sm text-muted-foreground">
                Voltage monitoring & predictive analysis
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Activity"
              iconPosition="left"
              iconSize={16}
              onClick={onRunDiagnostic}
            >
              Run Test
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="Settings"
              iconSize={16}
              onClick={onUpdateSettings}
            />
          </div>
        </div>
      </div>
      {/* Battery Status Overview */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Voltage Display */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-32 border-4 border-muted rounded-lg flex flex-col justify-end p-2">
                <div 
                  className={`${healthStatus?.bgColor} rounded transition-all duration-500`}
                  style={{ height: `${mockBatteryData?.health?.percentage}%` }}
                ></div>
              </div>
              {mockBatteryData?.charging?.isCharging && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={12} className="text-white" />
                </div>
              )}
            </div>
            <div className={`text-3xl font-bold ${voltageStatus?.color} mb-1`}>
              {mockBatteryData?.voltage?.current}V
            </div>
            <div className="text-sm text-muted-foreground">
              {mockBatteryData?.charging?.isCharging ? 'Charging' : 'Discharging'}
            </div>
          </div>

          {/* Health Percentage */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - mockBatteryData?.health?.percentage / 100)}`}
                  className={healthStatus?.color}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${healthStatus?.color}`}>
                  {mockBatteryData?.health?.percentage}%
                </span>
              </div>
            </div>
            <div className={`text-sm font-medium ${healthStatus?.color} mb-1`}>
              {healthStatus?.status?.toUpperCase()}
            </div>
            <div className="text-sm text-muted-foreground">
              Battery Health
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon name="Thermometer" size={16} className={`mx-auto mb-2 ${tempStatus?.color}`} />
            <div className="text-lg font-bold text-card-foreground">
              {mockBatteryData?.temperature?.current}°C
            </div>
            <div className="text-xs text-muted-foreground">Temperature</div>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon name="RotateCcw" size={16} className="mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold text-card-foreground">
              {mockBatteryData?.health?.cycleCount}
            </div>
            <div className="text-xs text-muted-foreground">Charge Cycles</div>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon name="Calendar" size={16} className="mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold text-card-foreground">
              {mockBatteryData?.health?.ageMonths}
            </div>
            <div className="text-xs text-muted-foreground">Months Old</div>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <Icon name="Zap" size={16} className="mx-auto mb-2 text-success" />
            <div className="text-lg font-bold text-card-foreground">
              {mockBatteryData?.charging?.chargingRate}A
            </div>
            <div className="text-xs text-muted-foreground">Charge Rate</div>
          </div>
        </div>

        {/* Voltage History Chart */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-card-foreground flex items-center">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Voltage History
            </h4>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e?.target?.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-32 bg-muted/30 rounded-lg p-4 flex items-end justify-between">
            {mockVoltageHistory?.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className={`w-3 rounded-t ${data?.charging ? 'bg-success' : 'bg-primary'}`}
                  style={{ height: `${((data?.voltage - 10) / 5) * 80}px` }}
                  title={`${data?.voltage}V at ${data?.time}`}
                ></div>
                <div className="text-xs text-muted-foreground transform -rotate-45">
                  {data?.time}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span className="text-muted-foreground">Charging</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span className="text-muted-foreground">Discharging</span>
            </div>
          </div>
        </div>

        {/* Alternator Status */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Settings" size={20} className="text-success" />
              <div>
                <h4 className="font-medium text-card-foreground">Alternator Status</h4>
                <p className="text-sm text-muted-foreground">Charging system health</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-success">Normal Operation</div>
              <div className="text-sm text-muted-foreground">
                Output: {mockBatteryData?.charging?.chargingRate}A
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Analysis */}
        {showPredictions && (
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-card-foreground flex items-center">
                <Icon name="Brain" size={16} className="mr-2 text-accent" />
                AI Predictions
              </h4>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={showPredictions}
                  onChange={(e) => setShowPredictions(e?.target?.checked)}
                  className="rounded border-border"
                />
                <span className="text-card-foreground">Show Predictions</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Calendar" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-card-foreground mb-1">
                      Replacement Recommendation
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expected replacement date: {mockBatteryData?.predictions?.replacementDate?.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence: {mockBatteryData?.predictions?.confidenceLevel}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-card-foreground mb-2">Risk Factors</p>
                    <ul className="space-y-1">
                      {mockBatteryData?.predictions?.riskFactors?.map((factor, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <Icon name="Minus" size={12} className="mr-2" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatteryHealth;