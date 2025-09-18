import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VehicleSettings from './pages/vehicle-settings';
import FleetManagement from './pages/fleet-management';
import Dashboard from './pages/dashboard';
import FuelAnalytics from './pages/fuel-analytics';
import VehicleMonitoring from './pages/vehicle-monitoring';
import AlertsNotifications from './pages/alerts-notifications';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlertsNotifications />} />
        <Route path="/vehicle-settings" element={<VehicleSettings />} />
        <Route path="/fleet-management" element={<FleetManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fuel-analytics" element={<FuelAnalytics />} />
        <Route path="/vehicle-monitoring" element={<VehicleMonitoring />} />
        <Route path="/alerts-notifications" element={<AlertsNotifications />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
