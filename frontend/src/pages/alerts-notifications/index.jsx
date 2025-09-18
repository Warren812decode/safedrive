import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import AlertToast from '../../components/ui/AlertToast';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import AlertCard from './components/AlertCard';
import AlertFilters from './components/AlertFilters';
import NotificationPreferences from './components/NotificationPreferences';
import AlertSummary from './components/AlertSummary';
import BulkActions from './components/BulkActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AlertsNotifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock alerts data
  const [alerts, setAlerts] = useState([
    {
      id: 'ALT-001',
      title: 'Critical Speed Violation Detected',
      message: 'Vehicle KCA-001A exceeded speed limit by 25 km/h on Thika Road. NTSA compliance violation recorded.',
      category: 'compliance',
      severity: 'critical',
      status: 'active',
      vehicleId: 'KCA-001A',
      location: 'Thika Road, Nairobi',
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      details: {
        description: 'Speed governor malfunction detected. Vehicle reached 95 km/h in 70 km/h zone.',
        diagnosticCode: 'SPD-001',
        coordinates: { lat: -1.2921, lng: 36.8219 },
        recommendations: [
          'Immediate speed governor inspection required',
          'Contact certified NTSA technician',
          'Avoid highway driving until resolved'
        ]
      }
    },
    {
      id: 'ALT-002',
      title: 'Unauthorized Vehicle Access Attempt',
      message: 'Motion sensors detected unauthorized access to vehicle KCB-002B while parked at home location.',
      category: 'security',
      severity: 'high',
      status: 'active',
      vehicleId: 'KCB-002B',
      location: 'Kileleshwa, Nairobi',
      timestamp: new Date(Date.now() - 900000),
      isRead: false,
      details: {
        description: 'Multiple door handle attempts detected at 02:15 AM. Vehicle alarm system activated.',
        coordinates: { lat: -1.2833, lng: 36.7833 },
        recommendations: [
          'Check vehicle security immediately',
          'Review CCTV footage if available',
          'Consider relocating vehicle'
        ]
      }
    },
    {
      id: 'ALT-003',
      title: 'Engine Diagnostic Alert',
      message: 'OBD-II scanner detected fault code P0171 in vehicle KCC-003C. System running lean.',
      category: 'maintenance',
      severity: 'medium',
      status: 'acknowledged',
      vehicleId: 'KCC-003C',
      location: 'Westlands, Nairobi',
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
      details: {
        description: 'Fuel system running lean. Possible causes: vacuum leak, faulty MAF sensor, or fuel pump issue.',
        diagnosticCode: 'P0171',
        recommendations: [
          'Schedule diagnostic inspection',
          'Check air filter condition',
          'Monitor fuel consumption'
        ]
      }
    },
    {
      id: 'ALT-004',
      title: 'Battery Voltage Low Warning',
      message: 'Vehicle KCD-004D battery voltage dropped to 11.8V. Charging system may require attention.',
      category: 'maintenance',
      severity: 'medium',
      status: 'active',
      vehicleId: 'KCD-004D',
      location: 'Karen, Nairobi',
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
      details: {
        description: 'Battery voltage consistently below 12V. Alternator output normal at 13.8V when running.',
        recommendations: [
          'Test battery capacity',
          'Check for parasitic drain',
          'Consider battery replacement'
        ]
      }
    },
    {
      id: 'ALT-005',
      title: 'Connectivity Restored',
      message: 'Vehicle KCE-005E has reconnected to SafeDrive network after 45 minutes offline.',
      category: 'system',
      severity: 'low',
      status: 'active',
      vehicleId: 'KCE-005E',
      location: 'Mombasa Road, Nairobi',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    severity: '',
    category: '',
    status: '',
    vehicle: '',
    timeRange: 'today',
    unreadOnly: false,
    criticalOnly: false,
    requiresAction: false
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    inApp: {
      security: true,
      maintenance: true,
      compliance: true,
      system: false
    },
    sms: {
      security: true,
      maintenance: false,
      compliance: true,
      system: false
    },
    ussd: {
      security: true,
      maintenance: false,
      compliance: false,
      system: false
    },
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '06:00'
    },
    phoneNumber: '+254700000000',
    language: 'en',
    emergencyContacts: [
      { name: 'John Kamau', phone: '+254700000001', relation: 'family' }
    ]
  });

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

  // Calculate alert counts
  const alertCounts = alerts?.reduce((counts, alert) => {
    counts[alert.severity] = (counts?.[alert?.severity] || 0) + 1;
    counts[alert.category] = (counts?.[alert?.category] || 0) + 1;
    return counts;
  }, {});

  // Filter alerts
  const filteredAlerts = alerts?.filter(alert => {
    if (filters?.search && !alert?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !alert?.message?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !alert?.vehicleId?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.severity && alert?.severity !== filters?.severity) return false;
    if (filters?.category && alert?.category !== filters?.category) return false;
    if (filters?.status && alert?.status !== filters?.status) return false;
    if (filters?.vehicle && alert?.vehicleId !== filters?.vehicle) return false;
    if (filters?.unreadOnly && alert?.isRead) return false;
    if (filters?.criticalOnly && alert?.severity !== 'critical') return false;
    if (filters?.requiresAction && alert?.status !== 'active') return false;
    
    return true;
  });

  const handleAlertSelect = (alertId, isSelected) => {
    setSelectedAlerts(prev => 
      isSelected 
        ? [...prev, alertId]
        : prev?.filter(id => id !== alertId)
    );
  };

  const handleSelectAll = () => {
    setSelectedAlerts(filteredAlerts?.map(alert => alert?.id));
  };

  const handleClearSelection = () => {
    setSelectedAlerts([]);
  };

  const handleBulkAction = (action, alertIds) => {
    setAlerts(prev => prev?.map(alert => {
      if (alertIds?.includes(alert?.id)) {
        switch (action) {
          case 'acknowledge':
            return { ...alert, status: 'acknowledged', isRead: true };
          case 'dismiss':
            return { ...alert, status: 'dismissed', isRead: true };
          case 'markRead':
            return { ...alert, isRead: true };
          case 'delete':
            return null;
          default:
            return alert;
        }
      }
      return alert;
    })?.filter(Boolean));
    
    setSelectedAlerts([]);
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: 'acknowledged', isRead: true }
        : alert
    ));
  };

  const handleDismiss = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: 'dismissed', isRead: true }
        : alert
    ));
  };

  const handleViewDetails = (alert) => {
    console.log('View details for alert:', alert?.id);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      severity: '',
      category: '',
      status: '',
      vehicle: '',
      timeRange: 'today',
      unreadOnly: false,
      criticalOnly: false,
      requiresAction: false
    });
  };

  const handleSavePreferences = (preferences) => {
    setNotificationPreferences(preferences);
    setShowPreferences(false);
    // In real app, save to backend
  };

  const handleEmergencyContact = () => {
    // Simulate emergency call
    alert('Emergency services contacted. Help is on the way.');
  };

  const handleUSSDCheck = () => {
    // Simulate USSD command
    alert('USSD command sent: *544*1#\nVehicle status check initiated.');
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  const handleUserMenuClick = () => {
    console.log('User menu clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Alerts & Notifications - SafeDrive Kenya</title>
        <meta name="description" content="Comprehensive alert management and notification center for vehicle monitoring and fleet safety" />
      </Helmet>
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole="individual"
        alertCounts={{
          monitoring: 3,
          fleet: 0,
          alerts: filteredAlerts?.filter(a => a?.status === 'active')?.length
        }}
      />
      <GlobalHeader
        user={{ name: 'John Kamau', avatar: null }}
        notificationCount={filteredAlerts?.filter(a => !a?.isRead)?.length}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
        onEmergencyClick={handleEmergencyContact}
      />
      <main className={`
        transition-all duration-300 pt-16 pb-20 lg:pb-6
        ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentLanguage === 'sw' ? 'Tahadhari na Arifa' : 'Alerts & Notifications'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentLanguage === 'sw' ?'Simamia na dhibiti arifa zote za usalama na matengenezo' :'Monitor and manage all safety and maintenance alerts'
                }
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
                iconSize={16}
                onClick={() => setShowPreferences(true)}
              >
                {currentLanguage === 'sw' ? 'Mipangilio' : 'Preferences'}
              </Button>
              <Button
                variant="outline"
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={16}
                onClick={handleUSSDCheck}
              >
                USSD Check
              </Button>
              <Button
                variant="destructive"
                iconName="Phone"
                iconPosition="left"
                iconSize={16}
                onClick={handleEmergencyContact}
              >
                {currentLanguage === 'sw' ? 'Dharura' : 'Emergency'}
              </Button>
            </div>
          </div>

          {/* Alert Summary */}
          <AlertSummary
            alertCounts={alertCounts}
            connectionStatus={connectionStatus}
            lastUpdate={new Date()}
          />

          {/* Filters */}
          <AlertFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            alertCounts={alertCounts}
          />

          {/* Bulk Actions */}
          {selectedAlerts?.length > 0 && (
            <BulkActions
              selectedAlerts={selectedAlerts}
              onBulkAction={handleBulkAction}
              onSelectAll={handleSelectAll}
              onClearSelection={handleClearSelection}
              totalAlerts={filteredAlerts?.length}
            />
          )}

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts?.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {currentLanguage === 'sw' ? 'Hakuna Arifa' : 'No Alerts Found'}
                </h3>
                <p className="text-muted-foreground">
                  {currentLanguage === 'sw' ?'Hakuna arifa zinazolingana na vigezo vyako vya kuchuja' :'No alerts match your current filter criteria'
                  }
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="mt-4"
                >
                  {currentLanguage === 'sw' ? 'Futa Vichujio' : 'Clear Filters'}
                </Button>
              </div>
            ) : (
              filteredAlerts?.map((alert) => (
                <AlertCard
                  key={alert?.id}
                  alert={alert}
                  onAcknowledge={handleAcknowledge}
                  onDismiss={handleDismiss}
                  onViewDetails={handleViewDetails}
                  isSelected={selectedAlerts?.includes(alert?.id)}
                  onSelect={handleAlertSelect}
                />
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredAlerts?.length > 0 && (
            <div className="text-center pt-6">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
                iconSize={16}
              >
                {currentLanguage === 'sw' ? 'Pakia Zaidi' : 'Load More Alerts'}
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Notification Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <NotificationPreferences
              preferences={notificationPreferences}
              onSave={handleSavePreferences}
              onCancel={() => setShowPreferences(false)}
            />
          </div>
        </div>
      )}
      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        title={currentLanguage === 'sw' ? 'Inapakia Arifa...' : 'Loading Alerts...'}
        message={currentLanguage === 'sw' ?'Tafadhali subiri tunapokusanya data ya hivi karibuni' :'Please wait while we fetch the latest alert data'
        }
        connectionStatus={connectionStatus}
        loadingSources={[
          'Vehicle diagnostics',
          'Security sensors',
          'Compliance data',
          'System status'
        ]}
      />
      {/* Toast Notifications */}
      <AlertToast
        alerts={[]}
        onDismiss={() => {}}
        onDismissAll={() => {}}
      />
    </div>
  );
};

export default AlertsNotifications;