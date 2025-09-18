import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DriverPerformanceSection = ({ 
  drivers = [],
  onViewDriverDetails,
  onProcessBonus,
  className = '' 
}) => {
  const [sortBy, setSortBy] = useState('score');
  const [filterPeriod, setFilterPeriod] = useState('week');

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 75) return 'text-warning bg-warning/10';
    if (score >= 60) return 'text-secondary bg-secondary/10';
    return 'text-error bg-error/10';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return 'Trophy';
    if (score >= 75) return 'Star';
    if (score >= 60) return 'ThumbsUp';
    return 'AlertTriangle';
  };

  const sortedDrivers = [...drivers]?.sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b?.performanceScore - a?.performanceScore;
      case 'violations':
        return a?.violations - b?.violations;
      case 'bonus':
        return b?.bonusEligible - a?.bonusEligible;
      case 'name':
        return a?.name?.localeCompare(b?.name);
      default:
        return 0;
    }
  });

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-heading font-semibold text-lg text-card-foreground">Driver Performance</h3>
          <p className="text-sm text-muted-foreground">Performance metrics and M-Pesa bonus eligibility</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
          >
            <option value="score">Performance Score</option>
            <option value="violations">Violations</option>
            <option value="bonus">Bonus Amount</option>
            <option value="name">Driver Name</option>
          </select>
        </div>
      </div>
      {/* Performance Summary Cards */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="Trophy" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Top Performers</span>
            </div>
            <p className="text-lg font-bold text-success">
              {drivers?.filter(d => d?.performanceScore >= 90)?.length}
            </p>
          </div>
          
          <div className="text-center p-3 bg-warning/10 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Need Improvement</span>
            </div>
            <p className="text-lg font-bold text-warning">
              {drivers?.filter(d => d?.performanceScore < 60)?.length}
            </p>
          </div>
          
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Bonus Eligible</span>
            </div>
            <p className="text-lg font-bold text-primary">
              {drivers?.filter(d => d?.bonusEligible > 0)?.length}
            </p>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Total Drivers</span>
            </div>
            <p className="text-lg font-bold text-card-foreground">{drivers?.length}</p>
          </div>
        </div>
      </div>
      {/* Driver List */}
      <div className="max-h-96 overflow-y-auto">
        {sortedDrivers?.map((driver) => (
          <div key={driver?.id} className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/30">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {driver?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getScoreColor(driver?.performanceScore)}`}>
                  <Icon name={getScoreIcon(driver?.performanceScore)} size={12} />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-card-foreground">{driver?.name}</h4>
                <p className="text-xs text-muted-foreground">{driver?.vehicle} • {driver?.route}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className={`text-sm font-bold ${getScoreColor(driver?.performanceScore)?.split(' ')?.[0]}`}>
                  {driver?.performanceScore}%
                </p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-medium text-card-foreground">{driver?.violations}</p>
                <p className="text-xs text-muted-foreground">Violations</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-medium text-success">
                  KES {driver?.bonusEligible?.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Bonus</p>
              </div>
              
              <div className="flex space-x-2">
                {driver?.bonusEligible > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Smartphone"
                    iconSize={14}
                    onClick={() => onProcessBonus(driver?.id)}
                    className="text-success border-success hover:bg-success/10"
                  >
                    M-Pesa
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}
                  onClick={() => onViewDriverDetails(driver?.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer Actions */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
        <div className="text-sm text-muted-foreground">
          Total bonus pool: KES {drivers?.reduce((sum, d) => sum + d?.bonusEligible, 0)?.toLocaleString()}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export Report
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="Smartphone"
            iconPosition="left"
            iconSize={14}
            onClick={() => onProcessBonus('all')}
            disabled={drivers?.filter(d => d?.bonusEligible > 0)?.length === 0}
          >
            Process All Bonuses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriverPerformanceSection;