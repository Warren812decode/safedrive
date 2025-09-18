import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LoadingOverlay = ({ 
  isLoading = false,
  title = 'Loading...',
  message = 'Please wait while we fetch your data',
  showRefresh = false,
  onRefresh = () => {},
  connectionStatus = 'connected', // 'connected', 'reconnecting', 'offline'
  loadingSources = [], // Array of data sources being loaded
  progress = null, // Progress percentage (0-100)
  fullScreen = false,
  className = ''
}) => {
  if (!isLoading) return null;

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'reconnecting':
        return 'RefreshCw';
      case 'offline':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'reconnecting':
        return 'text-warning';
      case 'offline':
        return 'text-error';
      default:
        return 'text-success';
    }
  };

  const getConnectionMessage = () => {
    switch (connectionStatus) {
      case 'reconnecting':
        return 'Reconnecting to vehicle...';
      case 'offline':
        return 'Connection lost - using cached data';
      default:
        return 'Connected to vehicle systems';
    }
  };

  return (
    <div className={`
      ${fullScreen ? 'fixed inset-0' : 'absolute inset-0'} 
      bg-background/80 backdrop-blur-sm z-1200 flex items-center justify-center
      ${className}
    `}>
      <div className="bg-card border border-border rounded-lg shadow-modal p-6 max-w-sm w-full mx-4">
        {/* Loading Spinner */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-muted rounded-full animate-spin border-t-primary"></div>
            {progress !== null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-mono font-medium text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Title and Message */}
        <div className="text-center mb-4">
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-center space-x-2 mb-4 p-2 bg-muted rounded-md">
          <Icon 
            name={getConnectionIcon()} 
            size={16} 
            className={`${getConnectionColor()} ${connectionStatus === 'reconnecting' ? 'animate-spin' : ''}`}
          />
          <span className="text-xs font-medium text-muted-foreground">
            {getConnectionMessage()}
          </span>
        </div>

        {/* Loading Sources */}
        {loadingSources?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Loading:</p>
            <div className="space-y-1">
              {loadingSources?.map((source, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">{source}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {progress !== null && (
          <div className="mb-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Refresh Button */}
        {showRefresh && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
              onClick={onRefresh}
              disabled={connectionStatus === 'reconnecting'}
            >
              Refresh Data
            </Button>
          </div>
        )}

        {/* Offline Mode Notice */}
        {connectionStatus === 'offline' && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-warning mb-1">Offline Mode</p>
                <p className="text-xs text-muted-foreground">
                  Some features may be limited. Data will sync when connection is restored.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;