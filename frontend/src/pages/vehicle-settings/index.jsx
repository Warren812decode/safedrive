import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import AlertToast from '../../components/ui/AlertToast';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all setting sections
import VehicleProfileSection from './components/VehicleProfileSection';
import SpeedManagementSection from './components/SpeedManagementSection';
import SecuritySettingsSection from './components/SecuritySettingsSection';
import FuelMonitoringSection from './components/FuelMonitoringSection';
import MaintenanceSchedulingSection from './components/MaintenanceSchedulingSection';
import AlertConfigurationSection from './components/AlertConfigurationSection';
import LanguagePreferencesSection from './components/LanguagePreferencesSection';
import SubscriptionManagementSection from './components/SubscriptionManagementSection';

const VehicleSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    speed: false,
    security: false,
    fuel: false,
    maintenance: false,
    alerts: false,
    language: false,
    subscription: false
  });

  // Mock settings data
  const [settingsData, setSettingsData] = useState({
    vehicle: {
      make: "Toyota",
      model: "Corolla",
      year: "2020",
      registration: "KCA 123A",
      vehicleType: "personal",
      color: "White",
      engineSize: "1.8L",
      fuelType: "petrol",
      photo: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg"
    },
    speed: {
      governorEnabled: true,
      maxSpeed: "80",
      cityLimit: "50",
      highwayLimit: "100",
      schoolZoneLimit: "30",
      alertThreshold: "5",
      ntsakCompliant: true,
      customZones: []
    },
    security: {
      gpsTracking: true,
      trackingFrequency: "30",
      motionSensitivity: "medium",
      geofenceEnabled: true,
      immobilizationEnabled: true,
      emergencyContacts: [
        { name: "John Kamau", phone: "+254712345678", relationship: "Primary" },
        { name: "Mary Wanjiku", phone: "+254723456789", relationship: "Secondary" }
      ],
      securityProvider: "securitas"
    },
    fuel: {
      fuelMonitoring: true,
      tankCapacity: "50",
      targetEfficiency: "12",
      lowFuelThreshold: "10",
      costTracking: true,
      currentFuelPrice: "165.50",
      budgetLimit: "15000",
      budgetPeriod: "monthly",
      ecoMode: false,
      idleTimeLimit: "5"
    },
    maintenance: {
      maintenanceReminders: true,
      oilChangeInterval: "5000",
      serviceInterval: "10000",
      inspectionInterval: "6",
      reminderAdvance: "500",
      preferredProvider: "Toyota Kenya",
      providerContact: "+254712345678",
      autoBooking: false
    },
    alertConfig: {
      smsAlerts: true,
      ussdAlerts: true,
      inAppAlerts: true,
      emailAlerts: false,
      alertTypes: {
        speed: { enabled: true, urgency: "high", methods: ["sms", "inapp"] },
        fuel: { enabled: true, urgency: "medium", methods: ["sms", "inapp"] },
        security: { enabled: true, urgency: "critical", methods: ["sms", "ussd", "inapp"] },
        maintenance: { enabled: true, urgency: "low", methods: ["inapp"] },
        battery: { enabled: true, urgency: "medium", methods: ["sms", "inapp"] },
        engine: { enabled: true, urgency: "high", methods: ["sms", "inapp"] }
      },
      quietHours: { enabled: false, startTime: "22:00", endTime: "06:00" },
      networkPreference: "auto"
    },
    language: {
      currentLanguage: "en"
    },
    subscription: {
      currentPlan: "individual",
      paymentMethod: "mpesa",
      autoRenewal: true
    }
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Mock user data
  const userData = {
    name: "John Kamau",
    avatar: null
  };

  // Mock alert counts
  const alertCounts = {
    monitoring: 2,
    fleet: 0,
    alerts: 5
  };

  useEffect(() => {
    // Simulate loading settings data
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check localStorage for saved language preference
        const savedLanguage = localStorage.getItem('safedrive_language') || 'en';
        setSettingsData(prev => ({
          ...prev,
          language: { currentLanguage: savedLanguage }
        }));
        
        setLastSaved(new Date());
      } catch (error) {
        console.error('Error loading settings:', error);
        showAlert('error', 'Failed to load settings', 'Please refresh the page and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const showAlert = (type, title, message) => {
    const newAlert = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: new Date()
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleSectionToggle = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey]
    }));
  };

  const handleSettingsUpdate = (section, data) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: { ...prev?.[section], ...data }
    }));
    setHasUnsavedChanges(true);
    
    // Auto-save after 2 seconds
    setTimeout(() => {
      handleSaveAll();
    }, 2000);
  };

  const handleSaveAll = () => {
    setIsLoading(true);
    
    // Simulate save operation
    setTimeout(() => {
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      setIsLoading(false);
      showAlert('success', 'Settings Saved', 'All vehicle settings have been updated successfully.');
    }, 1000);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      setIsLoading(true);
      
      setTimeout(() => {
        // Reset to default values
        setSettingsData({
          vehicle: {
            make: "",
            model: "",
            year: "",
            registration: "",
            vehicleType: "personal",
            color: "",
            engineSize: "",
            fuelType: "petrol",
            photo: ""
          },
          speed: {
            governorEnabled: true,
            maxSpeed: "80",
            cityLimit: "50",
            highwayLimit: "100",
            schoolZoneLimit: "30",
            alertThreshold: "5",
            ntsakCompliant: true,
            customZones: []
          },
          security: {
            gpsTracking: true,
            trackingFrequency: "30",
            motionSensitivity: "medium",
            geofenceEnabled: true,
            immobilizationEnabled: true,
            emergencyContacts: [],
            securityProvider: "securitas"
          },
          fuel: {
            fuelMonitoring: true,
            tankCapacity: "50",
            targetEfficiency: "12",
            lowFuelThreshold: "10",
            costTracking: true,
            currentFuelPrice: "165.50",
            budgetLimit: "15000",
            budgetPeriod: "monthly",
            ecoMode: false,
            idleTimeLimit: "5"
          },
          maintenance: {
            maintenanceReminders: true,
            oilChangeInterval: "5000",
            serviceInterval: "10000",
            inspectionInterval: "6",
            reminderAdvance: "500",
            preferredProvider: "",
            providerContact: "",
            autoBooking: false
          },
          alertConfig: {
            smsAlerts: true,
            ussdAlerts: true,
            inAppAlerts: true,
            emailAlerts: false,
            alertTypes: {
              speed: { enabled: true, urgency: "high", methods: ["sms", "inapp"] },
              fuel: { enabled: true, urgency: "medium", methods: ["sms", "inapp"] },
              security: { enabled: true, urgency: "critical", methods: ["sms", "ussd", "inapp"] },
              maintenance: { enabled: true, urgency: "low", methods: ["inapp"] },
              battery: { enabled: true, urgency: "medium", methods: ["sms", "inapp"] },
              engine: { enabled: true, urgency: "high", methods: ["sms", "inapp"] }
            },
            quietHours: { enabled: false, startTime: "22:00", endTime: "06:00" },
            networkPreference: "auto"
          },
          language: {
            currentLanguage: "en"
          },
          subscription: {
            currentPlan: "basic",
            paymentMethod: "mpesa",
            autoRenewal: false
          }
        });
        
        setHasUnsavedChanges(false);
        setIsLoading(false);
        showAlert('info', 'Settings Reset', 'All settings have been reset to default values.');
      }, 1500);
    }
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `safedrive-settings-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    link?.click();
    URL.revokeObjectURL(url);
    
    showAlert('success', 'Settings Exported', 'Your vehicle settings have been exported successfully.');
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  const handleUserMenuClick = () => {
    console.log('User menu clicked');
  };

  const handleEmergencyClick = () => {
    showAlert('info', 'Emergency Contact', 'Connecting to emergency services...');
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const dismissAllAlerts = () => {
    setAlerts([]);
  };

  if (isLoading && !settingsData?.vehicle?.make) {
    return (
      <LoadingOverlay
        isLoading={true}
        title="Loading Vehicle Settings"
        message="Retrieving your configuration preferences..."
        connectionStatus="connected"
        loadingSources={[
          "Vehicle profile data",
          "Security settings",
          "Alert configurations",
          "Subscription details"
        ]}
        fullScreen={true}
      />
    );
  }

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
        user={userData}
        notificationCount={alerts?.length}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
        onEmergencyClick={handleEmergencyClick}
      />
      {/* Main Content */}
      <main className={`
        transition-all duration-300 pt-16 pb-20 lg:pb-6
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">Vehicle Settings</h1>
                <p className="text-muted-foreground mt-1">
                  Configure your vehicle monitoring parameters and system preferences
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center space-x-2 text-warning">
                    <Icon name="AlertCircle" size={16} />
                    <span className="text-sm font-medium">Unsaved changes</span>
                  </div>
                )}
                
                {lastSaved && (
                  <div className="text-sm text-muted-foreground">
                    Last saved: {lastSaved?.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              iconSize={16}
              onClick={handleSaveAll}
              disabled={!hasUnsavedChanges}
            >
              Save All Changes
            </Button>
            
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              onClick={handleExportSettings}
            >
              Export Settings
            </Button>
            
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              onClick={handleResetToDefaults}
            >
              Reset to Defaults
            </Button>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4">
            {/* Vehicle Profile Section */}
            <VehicleProfileSection
              vehicleData={settingsData?.vehicle}
              onUpdate={(data) => handleSettingsUpdate('vehicle', data)}
              isExpanded={expandedSections?.profile}
              onToggle={() => handleSectionToggle('profile')}
            />

            {/* Speed Management Section */}
            <SpeedManagementSection
              speedSettings={settingsData?.speed}
              onUpdate={(data) => handleSettingsUpdate('speed', data)}
              isExpanded={expandedSections?.speed}
              onToggle={() => handleSectionToggle('speed')}
            />

            {/* Security Settings Section */}
            <SecuritySettingsSection
              securitySettings={settingsData?.security}
              onUpdate={(data) => handleSettingsUpdate('security', data)}
              isExpanded={expandedSections?.security}
              onToggle={() => handleSectionToggle('security')}
            />

            {/* Fuel Monitoring Section */}
            <FuelMonitoringSection
              fuelSettings={settingsData?.fuel}
              onUpdate={(data) => handleSettingsUpdate('fuel', data)}
              isExpanded={expandedSections?.fuel}
              onToggle={() => handleSectionToggle('fuel')}
            />

            {/* Maintenance Scheduling Section */}
            <MaintenanceSchedulingSection
              maintenanceSettings={settingsData?.maintenance}
              onUpdate={(data) => handleSettingsUpdate('maintenance', data)}
              isExpanded={expandedSections?.maintenance}
              onToggle={() => handleSectionToggle('maintenance')}
            />

            {/* Alert Configuration Section */}
            <AlertConfigurationSection
              alertSettings={settingsData?.alertConfig}
              onUpdate={(data) => handleSettingsUpdate('alertConfig', data)}
              isExpanded={expandedSections?.alerts}
              onToggle={() => handleSectionToggle('alerts')}
            />

            {/* Language Preferences Section */}
            <LanguagePreferencesSection
              languageSettings={settingsData?.language}
              onUpdate={(data) => handleSettingsUpdate('language', data)}
              isExpanded={expandedSections?.language}
              onToggle={() => handleSectionToggle('language')}
            />

            {/* Subscription Management Section */}
            <SubscriptionManagementSection
              subscriptionData={settingsData?.subscription}
              onUpdate={(data) => handleSettingsUpdate('subscription', data)}
              isExpanded={expandedSections?.subscription}
              onToggle={() => handleSectionToggle('subscription')}
            />
          </div>

          {/* Footer Information */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-info mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-info">Settings Information</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Changes are automatically saved and synchronized across all your devices. 
                  Critical security settings require additional verification via SMS.
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span>Last sync: {new Date()?.toLocaleString()}</span>
                  <span>•</span>
                  <span>Version: 2.1.0</span>
                  <span>•</span>
                  <span>© {new Date()?.getFullYear()} SafeDrive Kenya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading && hasUnsavedChanges}
        title="Saving Settings"
        message="Updating your vehicle configuration..."
        connectionStatus="connected"
        loadingSources={["Synchronizing changes", "Updating preferences"]}
      />
      {/* Alert Toast */}
      <AlertToast
        alerts={alerts}
        onDismiss={dismissAlert}
        onDismissAll={dismissAllAlerts}
        maxVisible={3}
      />
    </div>
  );
};

export default VehicleSettings;