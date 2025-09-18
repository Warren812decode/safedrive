import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ 
  alert, 
  onAcknowledge, 
  onDismiss, 
  onViewDetails,
  isSelected = false,
  onSelect,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'Bell';
      default:
        return 'Bell';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'security':
        return 'Shield';
      case 'maintenance':
        return 'Wrench';
      case 'compliance':
        return 'FileCheck';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return alertTime?.toLocaleDateString('en-GB');
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`
      bg-card border border-border rounded-lg shadow-sm transition-all duration-200
      ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'}
      ${className}
    `}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start space-x-3">
          {/* Selection Checkbox */}
          <div className="flex items-center pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(alert?.id, e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
          </div>

          {/* Alert Icon */}
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full border
            ${getSeverityColor(alert?.severity)}
          `}>
            <Icon name={getSeverityIcon(alert?.severity)} size={20} />
          </div>

          {/* Alert Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={getCategoryIcon(alert?.category)} size={16} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {alert?.category}
                  </span>
                  <span className={`
                    px-2 py-0.5 text-xs font-medium rounded-full
                    ${getSeverityColor(alert?.severity)}
                  `}>
                    {alert?.severity}
                  </span>
                </div>
                <h3 className="font-semibold text-card-foreground mb-1 leading-tight">
                  {alert?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                  {alert?.message}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Car" size={12} />
                    <span>{alert?.vehicleId}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatTimestamp(alert?.timestamp)}</span>
                  </span>
                  {alert?.location && (
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{alert?.location}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-end space-y-2">
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${alert?.status === 'acknowledged' ?'bg-green-100 text-green-800' 
                    : alert?.status === 'dismissed' ?'bg-gray-100 text-gray-800' :'bg-red-100 text-red-800'
                  }
                `}>
                  {alert?.status}
                </span>
                {!alert?.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && alert?.details && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="space-y-3">
                  {alert?.details?.description && (
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground mb-1">Details</h4>
                      <p className="text-sm text-muted-foreground">{alert?.details?.description}</p>
                    </div>
                  )}
                  
                  {alert?.details?.diagnosticCode && (
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground mb-1">Diagnostic Code</h4>
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                        {alert?.details?.diagnosticCode}
                      </code>
                    </div>
                  )}

                  {alert?.details?.coordinates && (
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground mb-1">Location</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>Lat: {alert?.details?.coordinates?.lat}</p>
                        <p>Lng: {alert?.details?.coordinates?.lng}</p>
                      </div>
                    </div>
                  )}

                  {alert?.details?.recommendations && (
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground mb-1">Recommendations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {alert?.details?.recommendations?.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleExpand}
                >
                  {isExpanded ? 'Less' : 'More'}
                </Button>
                {alert?.details && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => onViewDetails(alert)}
                  >
                    Details
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {alert?.status === 'active' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Check"
                      iconPosition="left"
                      iconSize={16}
                      onClick={() => onAcknowledge(alert?.id)}
                    >
                      Acknowledge
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      iconPosition="left"
                      iconSize={16}
                      onClick={() => onDismiss(alert?.id)}
                    >
                      Dismiss
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;