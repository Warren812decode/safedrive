import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AlertToast = ({ 
  alerts = [],
  onDismiss = () => {},
  onDismissAll = () => {},
  autoDismissTime = 5000,
  maxVisible = 3,
  className = ''
}) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);

  useEffect(() => {
    setVisibleAlerts(alerts?.slice(0, maxVisible));
  }, [alerts, maxVisible]);

  const handleDismiss = (alertId) => {
    setVisibleAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
    onDismiss(alertId);
  };

  const handleDismissAll = () => {
    setVisibleAlerts([]);
    onDismissAll();
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error': case'critical':
        return 'AlertCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success text-success-foreground border-success';
      case 'warning':
        return 'bg-warning text-warning-foreground border-warning';
      case 'error': case'critical':
        return 'bg-error text-error-foreground border-error';
      case 'info':
      default:
        return 'bg-card text-card-foreground border-border';
    }
  };

  const AlertItem = ({ alert }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
      if (alert?.autoDismiss !== false && autoDismissTime > 0) {
        const timer = setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            handleDismiss(alert?.id);
          }, 300);
        }, autoDismissTime);

        return () => clearTimeout(timer);
      }
    }, [alert?.id, alert?.autoDismiss]);

    const handleClose = () => {
      setIsExiting(true);
      setTimeout(() => {
        handleDismiss(alert?.id);
      }, 300);
    };

    if (!isVisible) return null;

    return (
      <div className={`
        transform transition-all duration-300 ease-out
        ${isExiting ? 'animate-slide-out-right opacity-0' : 'animate-slide-in-right opacity-100'}
      `}>
        <div className={`
          w-full sm:w-80 p-4 rounded-lg border shadow-modal mb-3
          ${getAlertStyles(alert?.type)}
        `}>
          <div className="flex items-start space-x-3">
            <Icon 
              name={getAlertIcon(alert?.type)} 
              size={20} 
              className="flex-shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1">{alert?.title}</h4>
              <p className="text-sm opacity-90 leading-relaxed">{alert?.message}</p>
              {alert?.timestamp && (
                <p className="text-xs opacity-75 mt-2">
                  {new Date(alert.timestamp)?.toLocaleTimeString()}
                </p>
              )}
              {alert?.actions && alert?.actions?.length > 0 && (
                <div className="flex space-x-2 mt-3">
                  {alert?.actions?.map((action, index) => (
                    <Button
                      key={index}
                      variant={action?.variant || 'outline'}
                      size="sm"
                      onClick={() => {
                        action?.onClick();
                        if (action?.dismissOnClick !== false) {
                          handleClose();
                        }
                      }}
                      className="text-xs"
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              iconSize={16}
              onClick={handleClose}
              className="flex-shrink-0 opacity-75 hover:opacity-100 -mt-1 -mr-1"
            />
          </div>
        </div>
      </div>
    );
  };

  if (visibleAlerts?.length === 0) return null;

  return (
    <div className={`
      fixed top-20 right-4 z-1100 max-w-sm w-full
      sm:max-w-none sm:w-auto
      ${className}
    `}>
      {/* Dismiss All Button */}
      {visibleAlerts?.length > 1 && (
        <div className="mb-3 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            iconSize={14}
            onClick={handleDismissAll}
            className="text-xs bg-card"
          >
            Dismiss All
          </Button>
        </div>
      )}
      {/* Alert Items */}
      <div className="space-y-0">
        {visibleAlerts?.map((alert) => (
          <AlertItem key={alert?.id} alert={alert} />
        ))}
      </div>
      {/* More Alerts Indicator */}
      {alerts?.length > maxVisible && (
        <div className="bg-muted text-muted-foreground p-3 rounded-lg border border-border text-center">
          <p className="text-sm font-medium">
            +{alerts?.length - maxVisible} more alert{alerts?.length - maxVisible !== 1 ? 's' : ''}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {/* Navigate to alerts page */}}
            className="text-xs mt-1"
          >
            View All Alerts
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertToast;