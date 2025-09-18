import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = ({ 
  user = { name: 'John Doe', avatar: null },
  notificationCount = 0,
  onNotificationClick = () => {},
  onUserMenuClick = () => {},
  onEmergencyClick = () => {},
  className = ''
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    onUserMenuClick();
  };

  const handleEmergencyClick = () => {
    onEmergencyClick();
    // Could trigger SMS/USSD emergency contact
  };

  return (
    <header className={`fixed top-0 right-0 left-0 lg:left-60 h-16 bg-card border-b border-border z-1000 ${className}`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile menu button - only visible on mobile */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            iconName="Menu"
            iconSize={20}
            className="text-foreground"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Emergency Contact Button */}
          <Button
            variant="destructive"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            iconSize={16}
            onClick={handleEmergencyClick}
            className="hidden sm:flex"
          >
            Emergency
          </Button>

          {/* Mobile Emergency Button */}
          <Button
            variant="destructive"
            size="icon"
            iconName="Phone"
            iconSize={16}
            onClick={handleEmergencyClick}
            className="sm:hidden"
          />

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              iconName="Bell"
              iconSize={20}
              onClick={onNotificationClick}
              className="text-foreground hover:text-primary"
            />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUserMenuToggle}
              className="text-foreground hover:text-primary"
            >
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </Button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-sm text-popover-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Vehicle Owner</p>
                </div>
                <div className="py-1">
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-border mt-1 pt-1">
                    <button className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-muted flex items-center space-x-2">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;