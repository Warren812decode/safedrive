import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import AlertToast from '../../components/ui/AlertToast';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import FuelMetricsCards from './components/FuelMetricsCards';
import FuelTrendsChart from './components/FuelTrendsChart';
import DrivingBehaviorAnalysis from './components/DrivingBehaviorAnalysis';
import CostTrackingWidget from './components/CostTrackingWidget';
import RouteOptimizationCards from './components/RouteOptimizationCards';
import EcoDrivingCoach from './components/EcoDrivingCoach';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FuelAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [activeView, setActiveView] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock user data
  const mockUser = {
    name: 'James Mwangi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'individual',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Corolla',
      year: 2019,
      registration: 'KCA 123A'
    }
  };

  // Mock alert counts for navigation
  const alertCounts = {
    monitoring: 2,
    fleet: 0,
    alerts: 5
  };

  // Initialize component
  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('safedrive-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate data loading
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API calls for fuel analytics data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Set initial alerts
        setAlerts([
          {
            id: 'fuel-alert-1',
            type: 'success',
            title: 'Fuel Efficiency Improved',
            message: 'Your fuel economy has increased by 8.2% this month. Great driving!',
            timestamp: new Date(),
            autoDismiss: false
          }
        ]);
        
      } catch (error) {
        console.error('Error loading fuel analytics data:', error);
        setAlerts(prev => [...prev, {
          id: 'error-1',
          type: 'error',
          title: 'Data Loading Error',
          message: 'Unable to load some fuel analytics data. Please refresh the page.',
          timestamp: new Date(),
          autoDismiss: false
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle language change
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('safedrive-language', language);
  };

  // Handle alert dismissal
  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleDismissAllAlerts = () => {
    setAlerts([]);
  };

  // Handle emergency contact
  const handleEmergencyContact = () => {
    // Simulate emergency contact functionality
    setAlerts(prev => [...prev, {
      id: 'emergency-' + Date.now(),
      type: 'info',
      title: 'Emergency Contact Initiated',
      message: 'Emergency services have been notified. Help is on the way.',
      timestamp: new Date(),
      autoDismiss: false
    }]);
  };

  // Handle notification click
  const handleNotificationClick = () => {
    // Navigate to notifications or show notification panel
    console.log('Notifications clicked');
  };

  // Handle user menu click
  const handleUserMenuClick = () => {
    console.log('User menu clicked');
  };

  // View options for mobile/tablet
  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'behavior', label: 'Behavior', icon: 'Activity' },
    { id: 'costs', label: 'Costs', icon: 'DollarSign' },
    { id: 'routes', label: 'Routes', icon: 'Route' },
    { id: 'coaching', label: 'Coaching', icon: 'Award' }
  ];

  // Language toggle
  const LanguageToggle = () => (
    <div className="flex bg-muted rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          currentLanguage === 'en' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('sw')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          currentLanguage === 'sw' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        Kiswahili
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole={mockUser?.role}
        alertCounts={alertCounts}
      />
      {/* Global Header */}
      <GlobalHeader
        user={mockUser}
        notificationCount={alertCounts?.alerts}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
        onEmergencyClick={handleEmergencyContact}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      } pt-16 pb-20 lg:pb-6`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {currentLanguage === 'sw' ? 'Uchambuzi wa Mafuta' : 'Fuel Analytics'}
              </h1>
              <p className="text-muted-foreground">
                {currentLanguage === 'sw' ?'Angalia utendaji wa mafuta na pata mapendekezo ya kuboresha ufanisi' :'Monitor fuel performance and get optimization recommendations'
                }
              </p>
              <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                <Icon name="Car" size={16} />
                <span>{mockUser?.vehicleInfo?.make} {mockUser?.vehicleInfo?.model} ({mockUser?.vehicleInfo?.registration})</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <LanguageToggle />
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                className="text-xs"
              >
                {currentLanguage === 'sw' ? 'Pakua Ripoti' : 'Export Report'}
              </Button>
            </div>
          </div>

          {/* Mobile View Selector */}
          <div className="lg:hidden mb-6">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {viewOptions?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => setActiveView(view?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeView === view?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={view?.icon} size={16} />
                  <span>{view?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid - Desktop */}
          <div className="hidden lg:block space-y-6">
            {/* Top Metrics */}
            <FuelMetricsCards />

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <FuelTrendsChart />
              <DrivingBehaviorAnalysis />
            </div>

            {/* Cost & Route Optimization */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CostTrackingWidget />
              <RouteOptimizationCards />
            </div>

            {/* Eco-Driving Coach */}
            <EcoDrivingCoach />
          </div>

          {/* Content - Mobile/Tablet Views */}
          <div className="lg:hidden">
            {activeView === 'overview' && (
              <div className="space-y-6">
                <FuelMetricsCards />
                <FuelTrendsChart />
              </div>
            )}
            
            {activeView === 'trends' && (
              <div className="space-y-6">
                <FuelTrendsChart />
              </div>
            )}
            
            {activeView === 'behavior' && (
              <div className="space-y-6">
                <DrivingBehaviorAnalysis />
              </div>
            )}
            
            {activeView === 'costs' && (
              <div className="space-y-6">
                <CostTrackingWidget />
              </div>
            )}
            
            {activeView === 'routes' && (
              <div className="space-y-6">
                <RouteOptimizationCards />
              </div>
            )}
            
            {activeView === 'coaching' && (
              <div className="space-y-6">
                <EcoDrivingCoach />
              </div>
            )}
          </div>

          {/* Quick Actions - Mobile */}
          <div className="lg:hidden fixed bottom-20 right-4 space-y-2">
            <Button
              variant="default"
              size="icon"
              iconName="RefreshCw"
              iconSize={20}
              className="rounded-full shadow-lg"
              onClick={() => window.location?.reload()}
            />
          </div>
        </div>
      </main>
      {/* Alert Toast */}
      <AlertToast
        alerts={alerts}
        onDismiss={handleDismissAlert}
        onDismissAll={handleDismissAllAlerts}
        maxVisible={3}
      />
      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        title={currentLanguage === 'sw' ? 'Inapakia...' : 'Loading Analytics...'}
        message={currentLanguage === 'sw' ?'Tafadhali subiri tunapakua data ya uchambuzi wa mafuta' :'Please wait while we load your fuel analytics data'
        }
        loadingSources={[
          currentLanguage === 'sw' ? 'Data ya Mafuta' : 'Fuel Data',
          currentLanguage === 'sw' ? 'Takwimu za Udereva' : 'Driving Statistics',
          currentLanguage === 'sw' ? 'Mapendekezo ya Njia' : 'Route Recommendations',
          currentLanguage === 'sw' ? 'Uchambuzi wa Gharama' : 'Cost Analysis'
        ]}
        connectionStatus="connected"
        showRefresh={false}
      />
    </div>
  );
};

export default FuelAnalytics;