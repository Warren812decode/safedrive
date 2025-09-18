import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedAlerts = [],
  onBulkAction,
  onSelectAll,
  onClearSelection,
  totalAlerts = 0,
  className = '' 
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const bulkActionOptions = [
    { value: 'acknowledge', label: 'Mark as Acknowledged', icon: 'Check' },
    { value: 'dismiss', label: 'Dismiss Alerts', icon: 'X' },
    { value: 'markRead', label: 'Mark as Read', icon: 'Eye' },
    { value: 'export', label: 'Export to CSV', icon: 'Download' },
    { value: 'delete', label: 'Delete Alerts', icon: 'Trash2' }
  ];

  const handleBulkAction = (action) => {
    if (action === 'delete' || action === 'dismiss') {
      setPendingAction(action);
      setShowConfirmDialog(true);
    } else {
      onBulkAction(action, selectedAlerts);
    }
  };

  const confirmAction = () => {
    if (pendingAction) {
      onBulkAction(pendingAction, selectedAlerts);
      setShowConfirmDialog(false);
      setPendingAction(null);
    }
  };

  const cancelAction = () => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const getActionDescription = (action) => {
    switch (action) {
      case 'delete':
        return `permanently delete ${selectedAlerts?.length} alert${selectedAlerts?.length !== 1 ? 's' : ''}`;
      case 'dismiss':
        return `dismiss ${selectedAlerts?.length} alert${selectedAlerts?.length !== 1 ? 's' : ''}`;
      default:
        return `perform this action on ${selectedAlerts?.length} alert${selectedAlerts?.length !== 1 ? 's' : ''}`;
    }
  };

  if (selectedAlerts?.length === 0) {
    return null;
  }

  return (
    <>
      <div className={`
        bg-card border border-border rounded-lg shadow-sm
        ${className}
      `}>
        <div className="flex items-center justify-between p-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="font-medium text-card-foreground">
                {selectedAlerts?.length} of {totalAlerts} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Square"
                iconPosition="left"
                iconSize={16}
                onClick={onSelectAll}
              >
                Select All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconPosition="left"
                iconSize={16}
                onClick={onClearSelection}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            {bulkActionOptions?.map((action) => (
              <Button
                key={action?.value}
                variant={action?.value === 'delete' ? 'destructive' : 'outline'}
                size="sm"
                iconName={action?.icon}
                iconPosition="left"
                iconSize={16}
                onClick={() => handleBulkAction(action?.value)}
                className="hidden sm:flex"
              >
                {action?.label}
              </Button>
            ))}

            {/* Mobile Dropdown */}
            <div className="sm:hidden">
              <Select
                options={bulkActionOptions}
                value=""
                onChange={(value) => handleBulkAction(value)}
                placeholder="Choose action..."
                className="w-40"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar for Bulk Operations */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Quick actions available for selected alerts</span>
            <span>{selectedAlerts?.length} items</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1 mt-2">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${(selectedAlerts?.length / totalAlerts) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Confirm Bulk Action
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-card-foreground">
                  Are you sure you want to {getActionDescription(pendingAction)}?
                </p>
                {pendingAction === 'delete' && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> Deleted alerts cannot be recovered and may affect compliance reporting.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={cancelAction}
                >
                  Cancel
                </Button>
                <Button
                  variant={pendingAction === 'delete' ? 'destructive' : 'default'}
                  onClick={confirmAction}
                >
                  {pendingAction === 'delete' ? 'Delete' : 'Confirm'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;