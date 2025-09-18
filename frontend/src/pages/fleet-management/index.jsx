import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import AlertToast from '../../components/ui/AlertToast';

import Button from '../../components/ui/Button';

// Import components
import VehicleCard from './components/VehicleCard';
import FleetMap from './components/FleetMap';
import FilterControls from './components/FilterControls';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import DriverPerformanceSection from './components/DriverPerformanceSection';
import ComplianceDashboard from './components/ComplianceDashboard';

const FleetManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'map'
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', type: 'all' });
  const [sortBy, setSortBy] = useState('plateNumber');
  const [alerts, setAlerts] = useState([]);

  // Mock fleet data
  const mockVehicles = [
    {
      id: 'v001',
      plateNumber: 'KCA 123A',
      model: 'Toyota Hiace',
      type: 'matatu',
      status: 'active',
      location: 'Westlands, Nairobi',
      driver: 'John Kamau',
      fuelLevel: 75,
      engineHealth: 92,
      lastUpdate: new Date(Date.now() - 300000),
      alerts: 0,
      securityActive: true,
      vin: 'JT2BV22E0X0123456',
      mileage: 145000,
      currentSpeed: 45,
      batteryVoltage: 12.8,
      tirePressure: 32,
      nextService: '15 Jan 2025'
    },
    {
      id: 'v002',
      plateNumber: 'KBZ 456B',
      model: 'Nissan Matatu',
      type: 'matatu',
      status: 'idle',
      location: 'CBD, Nairobi',
      driver: 'Mary Wanjiku',
      fuelLevel: 45,
      engineHealth: 88,
      lastUpdate: new Date(Date.now() - 900000),
      alerts: 1,
      securityActive: false,
      vin: 'JN1CV6AP8BM123789',
      mileage: 98000,
      currentSpeed: 0,
      batteryVoltage: 12.4,
      tirePressure: 30,
      nextService: '22 Jan 2025'
    },
    {
      id: 'v003',
      plateNumber: 'KCD 789C',
      model: 'Isuzu NPR',
      type: 'truck',
      status: 'maintenance',
      location: 'Industrial Area',
      driver: 'Peter Mwangi',
      fuelLevel: 20,
      engineHealth: 65,
      lastUpdate: new Date(Date.now() - 1800000),
      alerts: 3,
      securityActive: true,
      vin: 'JALC4B16807123456',
      mileage: 210000,
      currentSpeed: 0,
      batteryVoltage: 11.9,
      tirePressure: 28,
      nextService: 'Overdue'
    },
    {
      id: 'v004',
      plateNumber: 'KDA 012D',
      model: 'Toyota Probox',
      type: 'van',
      status: 'alert',
      location: 'Kasarani, Nairobi',
      driver: 'Grace Njeri',
      fuelLevel: 85,
      engineHealth: 45,
      lastUpdate: new Date(Date.now() - 600000),
      alerts: 2,
      securityActive: true,
      vin: 'JTFBV22E000123456',
      mileage: 87000,
      currentSpeed: 60,
      batteryVoltage: 13.2,
      tirePressure: 34,
      nextService: '8 Feb 2025'
    },
    {
      id: 'v005',
      plateNumber: 'KEB 345E',
      model: 'Mitsubishi Canter',
      type: 'truck',
      status: 'active',
      location: 'Thika Road',
      driver: 'Samuel Kiprotich',
      fuelLevel: 60,
      engineHealth: 95,
      lastUpdate: new Date(Date.now() - 120000),
      alerts: 0,
      securityActive: true,
      vin: 'JMFXD23P000123456',
      mileage: 156000,
      currentSpeed: 55,
      batteryVoltage: 13.1,
      tirePressure: 36,
      nextService: '28 Jan 2025'
    },
    {
      id: 'v006',
      plateNumber: 'KFC 678F',
      model: 'Toyota Vitz',
      type: 'sedan',
      status: 'idle',
      location: 'Karen, Nairobi',
      driver: 'Alice Mutua',
      fuelLevel: 90,
      engineHealth: 78,
      lastUpdate: new Date(Date.now() - 450000),
      alerts: 0,
      securityActive: false,
      vin: 'JTDKB20U000123456',
      mileage: 65000,
      currentSpeed: 0,
      batteryVoltage: 12.6,
      tirePressure: 32,
      nextService: '12 Feb 2025'
    }
  ];

  const mockDrivers = [
    {
      id: 'd001',
      name: 'John Kamau',
      vehicle: 'KCA 123A',
      route: 'Westlands - CBD',
      performanceScore: 94,
      violations: 1,
      bonusEligible: 2500
    },
    {
      id: 'd002',
      name: 'Mary Wanjiku',
      vehicle: 'KBZ 456B',
      route: 'Kasarani - CBD',
      performanceScore: 87,
      violations: 2,
      bonusEligible: 1800
    },
    {
      id: 'd003',
      name: 'Peter Mwangi',
      vehicle: 'KCD 789C',
      route: 'Industrial Area',
      performanceScore: 72,
      violations: 4,
      bonusEligible: 0
    },
    {
      id: 'd004',
      name: 'Grace Njeri',
      vehicle: 'KDA 012D',
      route: 'Kasarani - Thika',
      performanceScore: 58,
      violations: 6,
      bonusEligible: 0
    },
    {
      id: 'd005',
      name: 'Samuel Kiprotich',
      vehicle: 'KEB 345E',
      route: 'Thika - Nairobi',
      performanceScore: 96,
      violations: 0,
      bonusEligible: 3200
    },
    {
      id: 'd006',
      name: 'Alice Mutua',
      vehicle: 'KFC 678F',
      route: 'Karen - Westlands',
      performanceScore: 81,
      violations: 3,
      bonusEligible: 1200
    }
  ];

  const mockComplianceData = {
    speedGovernor: { status: 'compliant', percentage: 95, violations: 3 },
    inspection: { status: 'compliant', percentage: 88, violations: 2 },
    licenses: { status: 'compliant', percentage: 92, violations: 1 },
    insurance: { status: 'compliant', percentage: 100, violations: 0 },
    psvBadges: { status: 'warning', percentage: 85, violations: 4 },
    routes: { status: 'warning', percentage: 78, violations: 8 }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredVehicles(mockVehicles);
      
      // Add some sample alerts
      setAlerts([
        {
          id: 'alert1',
          type: 'warning',
          title: 'Low Fuel Alert',
          message: 'Vehicle KCD 789C has low fuel level (20%)',
          timestamp: new Date(),
          actions: [
            { label: 'Locate Vehicle', onClick: () => {}, variant: 'outline' },
            { label: 'Contact Driver', onClick: () => {}, variant: 'default' }
          ]
        }
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = mockVehicles;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(vehicle =>
        vehicle?.plateNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        vehicle?.driver?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        vehicle?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(vehicle => vehicle?.status === filters?.status);
    }

    // Apply type filter
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(vehicle => vehicle?.type === filters?.type);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'plateNumber':
          return a?.plateNumber?.localeCompare(b?.plateNumber);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'driver':
          return a?.driver?.localeCompare(b?.driver);
        case 'location':
          return a?.location?.localeCompare(b?.location);
        case 'fuelLevel':
          return b?.fuelLevel - a?.fuelLevel;
        case 'engineHealth':
          return b?.engineHealth - a?.engineHealth;
        case 'lastUpdate':
          return new Date(b.lastUpdate) - new Date(a.lastUpdate);
        default:
          return 0;
      }
    });

    setFilteredVehicles(filtered);
  }, [searchTerm, filters, sortBy]);

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicles(prev =>
      prev?.includes(vehicleId)
        ? prev?.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVehicles?.length === filteredVehicles?.length) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(filteredVehicles?.map(v => v?.id));
    }
  };

  const handleBulkLocationRequest = (vehicleIds) => {
    console.log('Requesting location for vehicles:', vehicleIds);
    setAlerts(prev => [...prev, {
      id: `alert-${Date.now()}`,
      type: 'info',
      title: 'Location Request Sent',
      message: `Location request sent to ${vehicleIds?.length} vehicle${vehicleIds?.length !== 1 ? 's' : ''}`,
      timestamp: new Date()
    }]);
  };

  const handleBulkSecurityToggle = (vehicleIds) => {
    console.log('Toggling security for vehicles:', vehicleIds);
    setAlerts(prev => [...prev, {
      id: `alert-${Date.now()}`,
      type: 'success',
      title: 'Security Updated',
      message: `Security system updated for ${vehicleIds?.length} vehicle${vehicleIds?.length !== 1 ? 's' : ''}`,
      timestamp: new Date()
    }]);
  };

  const handleBulkMaintenanceSchedule = (vehicleIds) => {
    console.log('Scheduling maintenance for vehicles:', vehicleIds);
    setAlerts(prev => [...prev, {
      id: `alert-${Date.now()}`,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: `Maintenance scheduled for ${vehicleIds?.length} vehicle${vehicleIds?.length !== 1 ? 's' : ''}`,
      timestamp: new Date()
    }]);
  };

  const handleDriverMessage = (vehicleIds) => {
    console.log('Sending message to drivers of vehicles:', vehicleIds);
    setAlerts(prev => [...prev, {
      id: `alert-${Date.now()}`,
      type: 'success',
      title: 'Messages Sent',
      message: `SMS messages sent to ${vehicleIds?.length} driver${vehicleIds?.length !== 1 ? 's' : ''}`,
      timestamp: new Date()
    }]);
  };

  const handleProcessBonus = (driverId) => {
    if (driverId === 'all') {
      const eligibleDrivers = mockDrivers?.filter(d => d?.bonusEligible > 0);
      console.log('Processing M-Pesa bonuses for all eligible drivers:', eligibleDrivers);
      setAlerts(prev => [...prev, {
        id: `alert-${Date.now()}`,
        type: 'success',
        title: 'M-Pesa Bonuses Processed',
        message: `Bonuses sent to ${eligibleDrivers?.length} eligible drivers via M-Pesa`,
        timestamp: new Date()
      }]);
    } else {
      const driver = mockDrivers?.find(d => d?.id === driverId);
      console.log('Processing M-Pesa bonus for driver:', driver);
      setAlerts(prev => [...prev, {
        id: `alert-${Date.now()}`,
        type: 'success',
        title: 'M-Pesa Bonus Sent',
        message: `KES ${driver?.bonusEligible?.toLocaleString()} sent to ${driver?.name} via M-Pesa`,
        timestamp: new Date()
      }]);
    }
  };

  const handleGenerateReport = (reportType, period) => {
    console.log('Generating compliance report:', reportType, period);
    setAlerts(prev => [...prev, {
      id: `alert-${Date.now()}`,
      type: 'info',
      title: 'Report Generated',
      message: `${reportType} compliance report for ${period} has been generated and saved`,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Fleet Management - SafeDrive Kenya</title>
        <meta name="description" content="Comprehensive fleet management dashboard for multi-vehicle oversight, driver performance monitoring, and NTSA compliance tracking." />
      </Helmet>
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={setIsSidebarCollapsed}
        userRole="fleet"
        alertCounts={{
          monitoring: 2,
          fleet: 5,
          alerts: 8
        }}
      />
      <GlobalHeader
        user={{ name: 'Fleet Manager', avatar: null }}
        notificationCount={alerts?.length}
        onNotificationClick={() => {}}
        onUserMenuClick={() => {}}
        onEmergencyClick={() => {}}
      />
      <main className={`
        transition-all duration-300 pt-16 pb-20 lg:pb-8
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">Fleet Management</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive oversight for {mockVehicles?.length} vehicles across your fleet
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  iconSize={16}
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Map"
                  iconSize={16}
                  onClick={() => setViewMode('map')}
                  className="rounded-l-none border-l border-border"
                >
                  Map
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconSize={16}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            onFilterChange={setFilters}
            onSortChange={setSortBy}
            onSearch={setSearchTerm}
            totalVehicles={mockVehicles?.length}
            filteredCount={filteredVehicles?.length}
            className="mb-6"
          />

          {/* Bulk Actions Toolbar */}
          <BulkActionsToolbar
            selectedVehicles={selectedVehicles}
            onLocationRequest={handleBulkLocationRequest}
            onSecurityToggle={handleBulkSecurityToggle}
            onMaintenanceSchedule={handleBulkMaintenanceSchedule}
            onDriverMessage={handleDriverMessage}
            onClearSelection={() => setSelectedVehicles([])}
            className="mb-6"
          />

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Vehicle Grid/Map */}
            <div className="xl:col-span-2">
              {viewMode === 'grid' ? (
                <div className="bg-card border border-border rounded-lg">
                  {/* Grid Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-heading font-semibold text-lg text-card-foreground">
                        Vehicle Fleet
                      </h3>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedVehicles?.length === filteredVehicles?.length && filteredVehicles?.length > 0}
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground">Select All</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {selectedVehicles?.length > 0 && `${selectedVehicles?.length} selected • `}
                      {filteredVehicles?.length} vehicles
                    </div>
                  </div>
                  
                  {/* Vehicle Cards */}
                  <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                    {filteredVehicles?.map((vehicle) => (
                      <VehicleCard
                        key={vehicle?.id}
                        vehicle={vehicle}
                        onSelect={handleVehicleSelect}
                        onViewDetails={(id) => console.log('View details:', id)}
                        onLocationRequest={(id) => handleBulkLocationRequest([id])}
                        onSecurityToggle={(id) => handleBulkSecurityToggle([id])}
                        onMaintenanceSchedule={(id) => handleBulkMaintenanceSchedule([id])}
                        isSelected={selectedVehicles?.includes(vehicle?.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <FleetMap
                  vehicles={filteredVehicles}
                  selectedVehicles={selectedVehicles}
                  onVehicleSelect={handleVehicleSelect}
                  onVehicleClick={(id) => console.log('Vehicle clicked:', id)}
                />
              )}
            </div>

            {/* Driver Performance */}
            <div>
              <DriverPerformanceSection
                drivers={mockDrivers}
                onViewDriverDetails={(id) => console.log('View driver details:', id)}
                onProcessBonus={handleProcessBonus}
              />
            </div>
          </div>

          {/* Compliance Dashboard */}
          <ComplianceDashboard
            complianceData={mockComplianceData}
            onGenerateReport={handleGenerateReport}
            onViewDetails={(id) => console.log('View compliance details:', id)}
          />
        </div>
      </main>
      <LoadingOverlay
        isLoading={isLoading}
        title="Loading Fleet Data"
        message="Connecting to vehicle systems and fetching real-time data..."
        connectionStatus="connected"
        loadingSources={[
          'Vehicle locations and status',
          'Driver performance metrics',
          'Compliance data',
          'Real-time diagnostics'
        ]}
        progress={null}
      />
      <AlertToast
        alerts={alerts}
        onDismiss={(id) => setAlerts(prev => prev?.filter(alert => alert?.id !== id))}
        onDismissAll={() => setAlerts([])}
        maxVisible={3}
      />
    </div>
  );
};

export default FleetManagement;