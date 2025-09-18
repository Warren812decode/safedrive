import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsToolbar = ({ 
  selectedVehicles = [],
  onLocationRequest,
  onSecurityToggle,
  onMaintenanceSchedule,
  onDriverMessage,
  onClearSelection,
  className = '' 
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleBulkAction = (action, actionName) => {
    setPendingAction({ action, actionName });
    setIsConfirmModalOpen(true);
  };

  const confirmAction = () => {
    if (pendingAction) {
      pendingAction?.action(selectedVehicles);
      setIsConfirmModalOpen(false);
      setPendingAction(null);
    }
  };

  const cancelAction = () => {
    setIsConfirmModalOpen(false);
    setPendingAction(null);
  };

  if (selectedVehicles?.length === 0) {
    return null;
  }

  return (
    <>
      <div className={`
        bg-primary text-primary-foreground rounded-lg p-4 shadow-modal
        ${className}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="CheckSquare" size={20} />
            <div>
              <h3 className="font-medium text-sm">
                {selectedVehicles?.length} vehicle{selectedVehicles?.length !== 1 ? 's' : ''} selected
              </h3>
              <p className="text-xs opacity-90">Choose an action to apply to all selected vehicles</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={16}
            onClick={onClearSelection}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            Clear
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            iconName="MapPin"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleBulkAction(onLocationRequest, 'Request Location')}
          >
            Request Location
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            iconName="Shield"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleBulkAction(onSecurityToggle, 'Toggle Security')}
          >
            Toggle Security
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            iconName="Wrench"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleBulkAction(onMaintenanceSchedule, 'Schedule Maintenance')}
          >
            Schedule Maintenance
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleBulkAction(onDriverMessage, 'Send Message')}
          >
            Message Drivers
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export Data
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
          >
            Generate Report
          </Button>
        </div>
      </div>
      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal max-w-md w-full p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
                  Confirm Bulk Action
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Are you sure you want to perform "{pendingAction?.actionName}" on {selectedVehicles?.length} selected vehicle{selectedVehicles?.length !== 1 ? 's' : ''}?
                  \n\nThis action will be applied to all selected vehicles simultaneously.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-md p-3 mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">Selected Vehicles:</p>
              <p className="text-sm text-card-foreground">
                {selectedVehicles?.slice(0, 3)?.join(', ')}
                {selectedVehicles?.length > 3 && ` and ${selectedVehicles?.length - 3} more`}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={cancelAction}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmAction}
                className="flex-1"
              >
                Confirm Action
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsToolbar;