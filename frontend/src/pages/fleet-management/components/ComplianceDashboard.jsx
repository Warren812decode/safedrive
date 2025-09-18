import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceDashboard = ({ 
  complianceData = {},
  onGenerateReport,
  onViewDetails,
  className = '' 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reportType, setReportType] = useState('comprehensive');

  const complianceItems = [
    {
      id: 'speed_governor',
      title: 'Speed Governor Compliance',
      description: 'NTSA speed limit adherence monitoring',
      status: complianceData?.speedGovernor?.status || 'compliant',
      percentage: complianceData?.speedGovernor?.percentage || 95,
      violations: complianceData?.speedGovernor?.violations || 3,
      icon: 'Gauge',
      color: complianceData?.speedGovernor?.percentage >= 90 ? 'success' : 'warning'
    },
    {
      id: 'vehicle_inspection',
      title: 'Vehicle Inspection Certificates',
      description: 'Valid inspection certificates for all vehicles',
      status: complianceData?.inspection?.status || 'compliant',
      percentage: complianceData?.inspection?.percentage || 88,
      violations: complianceData?.inspection?.violations || 2,
      icon: 'FileCheck',
      color: complianceData?.inspection?.percentage >= 90 ? 'success' : 'warning'
    },
    {
      id: 'driver_licenses',
      title: 'Driver License Validity',
      description: 'Current and valid driving licenses',
      status: complianceData?.licenses?.status || 'compliant',
      percentage: complianceData?.licenses?.percentage || 92,
      violations: complianceData?.licenses?.violations || 1,
      icon: 'CreditCard',
      color: complianceData?.licenses?.percentage >= 90 ? 'success' : 'warning'
    },
    {
      id: 'insurance',
      title: 'Insurance Coverage',
      description: 'Valid comprehensive insurance policies',
      status: complianceData?.insurance?.status || 'compliant',
      percentage: complianceData?.insurance?.percentage || 100,
      violations: complianceData?.insurance?.violations || 0,
      icon: 'Shield',
      color: complianceData?.insurance?.percentage >= 90 ? 'success' : 'warning'
    },
    {
      id: 'psv_badges',
      title: 'PSV Badges & Permits',
      description: 'Valid PSV operating licenses and badges',
      status: complianceData?.psvBadges?.status || 'compliant',
      percentage: complianceData?.psvBadges?.percentage || 85,
      violations: complianceData?.psvBadges?.violations || 4,
      icon: 'Badge',
      color: complianceData?.psvBadges?.percentage >= 90 ? 'success' : 'error'
    },
    {
      id: 'route_compliance',
      title: 'Route Compliance',
      description: 'Adherence to designated routes and schedules',
      status: complianceData?.routes?.status || 'compliant',
      percentage: complianceData?.routes?.percentage || 78,
      violations: complianceData?.routes?.violations || 8,
      icon: 'Route',
      color: complianceData?.routes?.percentage >= 90 ? 'success' : 'error'
    }
  ];

  const getStatusColor = (color) => {
    switch (color) {
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const overallCompliance = Math.round(
    complianceItems?.reduce((sum, item) => sum + item?.percentage, 0) / complianceItems?.length
  );

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-heading font-semibold text-lg text-card-foreground">NTSA Compliance Dashboard</h3>
          <p className="text-sm text-muted-foreground">Regulatory compliance monitoring and reporting</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
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
      {/* Overall Compliance Score */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground">Overall Compliance Score</h4>
            <p className="text-sm text-muted-foreground">Fleet-wide regulatory compliance status</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${overallCompliance >= 90 ? 'text-success' : overallCompliance >= 75 ? 'text-warning' : 'text-error'}`}>
              {overallCompliance}%
            </div>
            <p className="text-xs text-muted-foreground">
              {overallCompliance >= 90 ? 'Excellent' : overallCompliance >= 75 ? 'Good' : 'Needs Attention'}
            </p>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              overallCompliance >= 90 ? 'bg-success' : overallCompliance >= 75 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${overallCompliance}%` }}
          />
        </div>
      </div>
      {/* Compliance Items */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceItems?.map((item) => (
            <div key={item?.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(item?.color)}`}>
                    <Icon name={item?.icon} size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-card-foreground">{item?.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item?.description}</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconSize={14}
                  onClick={() => onViewDetails(item?.id)}
                />
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-card-foreground">{item?.percentage}%</span>
                {item?.violations > 0 && (
                  <span className="text-xs text-error">
                    {item?.violations} violation{item?.violations !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    item?.color === 'success' ? 'bg-success' : 
                    item?.color === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Report Generation */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
            >
              <option value="comprehensive">Comprehensive Report</option>
              <option value="violations">Violations Only</option>
              <option value="summary">Executive Summary</option>
              <option value="ntsa">NTSA Submission Format</option>
            </select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Last generated: {new Date()?.toLocaleDateString()}</p>
            <p>Next due: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            iconSize={14}
          >
            Schedule Auto-Report
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
            onClick={() => onGenerateReport(reportType, selectedPeriod)}
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;