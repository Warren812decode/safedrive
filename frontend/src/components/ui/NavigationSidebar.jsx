import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationSidebar = ({ 
  isCollapsed = false,
  onToggleCollapse = () => {},
  userRole = 'individual', // 'individual', 'fleet', 'enterprise'
  alertCounts = {},
  className = ''
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      tooltip: 'Real-time vehicle overview and status',
      priority: 1
    },
    {
      label: 'Vehicle Monitoring',
      path: '/vehicle-monitoring',
      icon: 'Car',
      badge: alertCounts?.monitoring || null,
      tooltip: 'Live diagnostics and tracking',
      priority: 2
    },
    {
      label: 'Fleet Management',
      path: '/fleet-management',
      icon: 'Truck',
      badge: alertCounts?.fleet || null,
      tooltip: 'Multi-vehicle coordination center',
      priority: 3,
      roleRequired: ['fleet', 'enterprise']
    },
    {
      label: 'Fuel Analytics',
      path: '/fuel-analytics',
      icon: 'Fuel',
      badge: null,
      tooltip: 'Efficiency insights and optimization',
      priority: 4
    },
    {
      label: 'Alerts & Notifications',
      path: '/alerts-notifications',
      icon: 'Bell',
      badge: alertCounts?.alerts || null,
      tooltip: 'Centralized alert management',
      priority: 5
    },
    {
      label: 'Vehicle Settings',
      path: '/vehicle-settings',
      icon: 'Settings',
      badge: null,
      tooltip: 'Configuration and preferences',
      priority: 6
    }
  ];

  const visibleItems = navigationItems?.filter(item => 
    !item?.roleRequired || item?.roleRequired?.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  const NavItem = ({ item, isMobile = false }) => (
    <button
      onClick={() => handleNavigation(item?.path)}
      className={`
        w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200
        ${isActive(item?.path) 
          ? 'bg-primary text-primary-foreground shadow-sm' 
          : 'text-foreground hover:bg-muted hover:text-primary'
        }
        ${isMobile ? 'justify-center flex-col space-x-0 space-y-1 py-2' : ''}
        ${isCollapsed && !isMobile ? 'justify-center px-2' : ''}
      `}
      title={isCollapsed && !isMobile ? item?.tooltip : undefined}
    >
      <div className="relative flex items-center">
        <Icon 
          name={item?.icon} 
          size={isMobile ? 20 : 20} 
          className={isActive(item?.path) ? 'text-primary-foreground' : 'text-current'}
        />
        {item?.badge && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
            {item?.badge > 99 ? '99+' : item?.badge}
          </span>
        )}
      </div>
      {(!isCollapsed || isMobile) && (
        <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {item?.label}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-card border-r border-border z-900 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-60'}
        hidden lg:flex flex-col
        ${className}
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-lg text-foreground">SafeDrive</h1>
                <p className="text-xs text-muted-foreground">Kenya</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Shield" size={20} className="text-primary-foreground" />
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              iconName="PanelLeftClose"
              iconSize={16}
              onClick={onToggleCollapse}
              className="text-muted-foreground hover:text-foreground"
            />
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {visibleItems?.map((item) => (
            <NavItem key={item?.path} item={item} />
          ))}
        </nav>

        {/* Collapse Toggle for Collapsed State */}
        {isCollapsed && (
          <div className="p-2 border-t border-border">
            <Button
              variant="ghost"
              size="icon"
              iconName="PanelLeftOpen"
              iconSize={16}
              onClick={onToggleCollapse}
              className="w-full text-muted-foreground hover:text-foreground"
            />
          </div>
        )}
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-950">
        <div className="flex items-center justify-around py-2">
          {visibleItems?.slice(0, 4)?.map((item) => (
            <NavItem key={item?.path} item={item} isMobile />
          ))}
          {visibleItems?.length > 4 && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col items-center justify-center py-2 px-3 text-foreground hover:text-primary"
            >
              <Icon name="MoreHorizontal" size={20} />
              <span className="text-xs font-medium mt-1">More</span>
            </button>
          )}
        </div>

        {/* Mobile Overflow Menu */}
        {isMobileMenuOpen && visibleItems?.length > 4 && (
          <div className="absolute bottom-full left-0 right-0 bg-popover border border-border rounded-t-lg shadow-modal">
            <div className="p-2 space-y-1">
              {visibleItems?.slice(4)?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200
                    ${isActive(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-popover-foreground hover:bg-muted'
                    }
                  `}
                >
                  <div className="relative">
                    <Icon name={item?.icon} size={20} />
                    {item?.badge && (
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                        {item?.badge > 99 ? '99+' : item?.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-sm">{item?.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-900"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavigationSidebar;