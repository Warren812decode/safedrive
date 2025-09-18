import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import AlertToast from '../../components/ui/AlertToast';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import VehicleStatusCard from './components/VehicleStatusCard';
import SpeedMonitoringCard from './components/SpeedMonitoringCard';
import FuelEfficiencyCard from './components/FuelEfficiencyCard';
import SecurityStatusCard from './components/SecurityStatusCard';
import AlertSummarySection from './components/AlertSummarySection';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [toastAlerts, setToastAlerts] = useState([]);

  // Mock data for dashboard
  const mockVehicleData = {
    location: "Westlands, Nairobi, Kenya",
    engineStatus: "running",
    batteryLevel: 85,
    isMoving: true,
    lastUpdate: new Date()
  };

  const mockSpeedData = {
    currentSpeed: 65,
    speedLimit: 80,
    averageSpeed: 58,
    maxSpeedToday: 85,
    violations: 2,
    governorActive: true
  };

  const mockFuelData = {
    todayConsumption: 12.5,
    weeklyAverage: 14.2,
    fuelLevel: 68,
    efficiency: 8.5,
    trend: "improving",
    costToday: 1250,
    estimatedRange: 340
  };

  const mockSecurityData = {
    gpsActive: true,
    alarmStatus: "armed",
    lastMovement: new Date(Date.now() - 1800000),
    geofenceActive: true,
    immobilizerStatus: "active",
    tamperAlerts: 0,
    securityLevel: "high"
  };

  const mockAlerts = [
    {
      id: 1,
      type: "maintenance",
      priority: "high",
      title: "Service Due",
      message: "Vehicle service is due in 500 km or 5 days. Book appointment with authorized dealer.",
      timestamp: new Date(Date.now() - 3600000),
      actionRequired: true
    },
    {
      id: 2,
      type: "speed",
      priority: "medium",
      title: "Speed Violation",
      message: "Exceeded speed limit by 15 km/h on Thika Road at 14:30",
      timestamp: new Date(Date.now() - 7200000),
      actionRequired: false
    },
    {
      id: 3,
      type: "security",
      priority: "low",
      title: "Geofence Alert",
      message: "Vehicle entered restricted area near Industrial Area",
      timestamp: new Date(Date.now() - 10800000),
      actionRequired: false
    }
  ];

  const mockUser = {
    name: "John Kamau",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const alertCounts = {
    monitoring: 3,
    fleet: 0,
    alerts: mockAlerts?.length
  };

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('safedrive_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random alerts
      if (Math.random() > 0.95) {
        const newAlert = {
          id: Date.now(),
          type: 'info',
          title: 'System Update',
          message: 'Vehicle data synchronized successfully',
          timestamp: new Date(),
          autoDismiss: true
        };
        setToastAlerts(prev => [newAlert, ...prev?.slice(0, 2)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    navigate('/alerts-notifications');
  };

  const handleUserMenuClick = () => {
    console.log('User menu clicked');
  };

  const handleEmergencyClick = () => {
    const emergencyAlert = {
      id: Date.now(),
      type: 'error',
      title: 'Emergency Alert Sent',
      message: 'Emergency contacts have been notified. Help is on the way.',
      timestamp: new Date(),
      autoDismiss: false,
      actions: [
        {
          label: 'Call Police',
          variant: 'destructive',
          onClick: () => window.open('tel:999')
        },
        {
          label: 'Call AA Kenya',
          variant: 'outline',
          onClick: () => window.open('tel:0700400400')
        }
      ]
    };
    setToastAlerts(prev => [emergencyAlert, ...prev]);
  };

  const handleQuickActions = {
    locate: () => {
      const locateAlert = {
        id: Date.now(),
        type: 'success',
        title: 'Vehicle Located',
        message: 'Your vehicle is at Westlands, Nairobi. GPS coordinates sent to your phone.',
        timestamp: new Date()
      };
      setToastAlerts(prev => [locateAlert, ...prev]);
    },
    lockUnlock: () => {
      const lockAlert = {
        id: Date.now(),
        type: 'success',
        title: 'Vehicle Locked',
        message: 'All doors have been locked remotely. Security system is active.',
        timestamp: new Date()
      };
      setToastAlerts(prev => [lockAlert, ...prev]);
    },
    diagnostics: () => {
      navigate('/vehicle-monitoring');
    },
    emergency: handleEmergencyClick
  };

  const handleDismissAlert = (alertId) => {
    setToastAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleDismissAllAlerts = () => {
    setToastAlerts([]);
  };

  const vehicleStatus = {
    isLocked: true,
    engineRunning: mockVehicleData?.engineStatus === 'running',
    gpsActive: mockSecurityData?.gpsActive
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole="individual"
        alertCounts={alertCounts}
      />
      {/* Global Header */}
      <GlobalHeader
        user={mockUser}
        notificationCount={alertCounts?.alerts}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
        onEmergencyClick={handleEmergencyClick}
      />
      {/* Main Content */}
      <main className={`
        transition-all duration-300 pt-16 pb-20 lg:pb-6
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                Dashboard
              </h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>
                  Last updated: {new Date()?.toLocaleTimeString('en-KE', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground">
              Welcome back, {mockUser?.name}. Here's your vehicle status overview.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {/* Vehicle Status Card */}
            <VehicleStatusCard vehicleData={mockVehicleData} />

            {/* Speed Monitoring Card */}
            <SpeedMonitoringCard speedData={mockSpeedData} />

            {/* Fuel Efficiency Card */}
            <FuelEfficiencyCard fuelData={mockFuelData} />

            {/* Security Status Card */}
            <SecurityStatusCard securityData={mockSecurityData} />

            {/* Alert Summary Section - Spans 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <AlertSummarySection alerts={mockAlerts} />
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="mb-6">
            <QuickActionsPanel
              onLocateVehicle={handleQuickActions?.locate}
              onLockUnlock={handleQuickActions?.lockUnlock}
              onDiagnostics={handleQuickActions?.diagnostics}
              onEmergencyAlert={handleQuickActions?.emergency}
              vehicleStatus={vehicleStatus}
            />
          </div>

          {/* Bottom Navigation Spacer for Mobile */}
          <div className="h-4 lg:hidden" />
        </div>
      </main>
      {/* Toast Alerts */}
      <AlertToast
        alerts={toastAlerts}
        onDismiss={handleDismissAlert}
        onDismissAll={handleDismissAllAlerts}
        maxVisible={3}
        autoDismissTime={5000}
      />
      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        title="Loading Dashboard"
        message="Fetching real-time vehicle data and system status"
        connectionStatus="connected"
        loadingSources={[
          "Vehicle diagnostics",
          "GPS location data",
          "Security system status",
          "Fuel efficiency metrics"
        ]}
        progress={null}
        showRefresh={false}
        fullScreen={true}
      />
    </div>
  );
};

export default Dashboard;