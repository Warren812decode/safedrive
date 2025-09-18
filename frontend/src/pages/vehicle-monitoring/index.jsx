import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import AlertToast from '../../components/ui/AlertToast';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import monitoring components
import VehicleMap from './components/VehicleMap';
import EngineStatus from './components/EngineStatus';
import SpeedTracking from './components/SpeedTracking';
import BatteryHealth from './components/BatteryHealth';
import TirePressure from './components/TirePressure';
import SecurityPanel from './components/SecurityPanel';
import AlertNotifications from './components/AlertNotifications';

const VehicleMonitoring = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mock real-time data states
  const [vehicleData, setVehicleData] = useState({
    location: { lat: -1.2921, lng: 36.8219 },
    speed: 45,
    engineTemp: 87,
    batteryVoltage: 14.2,
    isTracking: true
  });

  const [toastAlerts, setToastAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Speed Alert',
      message: 'Vehicle exceeded speed limit on Thika Road',
      timestamp: new Date(),
      autoDismiss: true
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    initializeData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVehicleData(prev => ({
        ...prev,
        speed: Math.max(0, prev?.speed + (Math.random() - 0.5) * 10),
        engineTemp: Math.max(70, Math.min(110, prev?.engineTemp + (Math.random() - 0.5) * 5)),
        batteryVoltage: Math.max(11, Math.min(15, prev?.batteryVoltage + (Math.random() - 0.5) * 0.5))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle connection status changes
  useEffect(() => {
    const checkConnection = () => {
      // Simulate connection status changes
      const statuses = ['connected', 'reconnecting', 'offline'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      if (Math.random() < 0.1) { // 10% chance of status change
        setConnectionStatus(randomStatus);
      }
    };

    const connectionInterval = setInterval(checkConnection, 10000);
    return () => clearInterval(connectionInterval);
  }, []);

  const handleRefreshData = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
    
    // Add success toast
    setToastAlerts(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      title: 'Data Refreshed',
      message: 'Vehicle monitoring data updated successfully',
      timestamp: new Date(),
      autoDismiss: true
    }]);
  };

  const handleEmergencyAlert = () => {
    setToastAlerts(prev => [...prev, {
      id: Date.now(),
      type: 'error',
      title: 'Emergency Alert Sent',
      message: 'Emergency services and contacts have been notified',
      timestamp: new Date(),
      autoDismiss: false,
      actions: [
        {
          label: 'View Status',
          onClick: () => console.log('View emergency status'),
          variant: 'outline'
        }
      ]
    }]);
  };

  const handleDismissToast = (alertId) => {
    setToastAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleDismissAllToasts = () => {
    setToastAlerts([]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'engine', label: 'Engine', icon: 'Engine' },
    { id: 'speed', label: 'Speed', icon: 'Gauge' },
    { id: 'battery', label: 'Battery', icon: 'Battery' },
    { id: 'tires', label: 'Tires', icon: 'Disc' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'alerts', label: 'Alerts', icon: 'Bell' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <VehicleMap
              vehicleLocation={vehicleData?.location}
              isTracking={vehicleData?.isTracking}
              onToggleTracking={() => setVehicleData(prev => ({ ...prev, isTracking: !prev?.isTracking }))}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngineStatus />
              <SpeedTracking currentSpeed={vehicleData?.speed} />
            </div>
          </div>
        );
      case 'engine':
        return <EngineStatus onRefreshData={handleRefreshData} />;
      case 'speed':
        return <SpeedTracking currentSpeed={vehicleData?.speed} />;
      case 'battery':
        return <BatteryHealth />;
      case 'tires':
        return <TirePressure />;
      case 'security':
        return <SecurityPanel onEmergencyAlert={handleEmergencyAlert} />;
      case 'alerts':
        return (
          <AlertNotifications
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Vehicle Monitoring - SafeDrive Kenya</title>
        <meta name="description" content="Real-time vehicle monitoring dashboard with comprehensive diagnostics, tracking, and safety features for Kenyan drivers." />
      </Helmet>
      {/* Navigation */}
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        alertCounts={{ monitoring: toastAlerts?.length }}
      />
      <GlobalHeader
        onEmergencyClick={handleEmergencyAlert}
        notificationCount={toastAlerts?.length}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'} pt-16 pb-20 lg:pb-6`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Vehicle Monitoring
                </h1>
                <p className="text-muted-foreground">
                  Real-time diagnostics and tracking for comprehensive vehicle oversight
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                  connectionStatus === 'connected' ? 'border-success/20 bg-success/10' :
                  connectionStatus === 'reconnecting'? 'border-warning/20 bg-warning/10' : 'border-error/20 bg-error/10'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-success animate-pulse' :
                    connectionStatus === 'reconnecting'? 'bg-warning animate-pulse' : 'bg-error'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    connectionStatus === 'connected' ? 'text-success' :
                    connectionStatus === 'reconnecting'? 'text-warning' : 'text-error'
                  }`}>
                    {connectionStatus === 'connected' ? 'Connected' :
                     connectionStatus === 'reconnecting'? 'Reconnecting' : 'Offline'}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                  loading={refreshing}
                  onClick={handleRefreshData}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <div className="flex space-x-1 overflow-x-auto pb-px">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        title="Connecting to Vehicle"
        message="Establishing connection with vehicle systems and loading real-time data"
        connectionStatus={connectionStatus}
        loadingSources={[
          'OBD-II Diagnostics',
          'GPS Tracking',
          'TPMS Sensors',
          'Security System',
          'Battery Monitor'
        ]}
        showRefresh={connectionStatus === 'offline'}
        onRefresh={handleRefreshData}
      />
      {/* Toast Notifications */}
      <AlertToast
        alerts={toastAlerts}
        onDismiss={handleDismissToast}
        onDismissAll={handleDismissAllToasts}
        maxVisible={3}
      />
    </div>
  );
};

export default VehicleMonitoring;