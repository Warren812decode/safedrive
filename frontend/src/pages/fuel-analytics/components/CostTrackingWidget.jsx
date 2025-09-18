import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostTrackingWidget = ({ className = '' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [showBudgetAlert, setShowBudgetAlert] = useState(true);

  const costData = {
    monthly: [
      { period: 'Jan', actual: 18500, budget: 20000, fuelPrice: 165 },
      { period: 'Feb', actual: 17200, budget: 20000, fuelPrice: 168 },
      { period: 'Mar', actual: 19800, budget: 20000, fuelPrice: 172 },
      { period: 'Apr', actual: 16900, budget: 20000, fuelPrice: 170 },
      { period: 'May', actual: 15600, budget: 20000, fuelPrice: 167 },
      { period: 'Jun', actual: 14800, budget: 20000, fuelPrice: 165 }
    ],
    weekly: [
      { period: 'Week 1', actual: 4200, budget: 5000, fuelPrice: 165 },
      { period: 'Week 2', actual: 3800, budget: 5000, fuelPrice: 167 },
      { period: 'Week 3', actual: 3600, budget: 5000, fuelPrice: 165 },
      { period: 'Week 4', actual: 3200, budget: 5000, fuelPrice: 163 }
    ]
  };

  const currentData = costData?.[selectedPeriod];
  const totalActual = currentData?.reduce((sum, item) => sum + item?.actual, 0);
  const totalBudget = currentData?.reduce((sum, item) => sum + item?.budget, 0);
  const savings = totalBudget - totalActual;
  const savingsPercentage = ((savings / totalBudget) * 100)?.toFixed(1);

  const fuelPriceHistory = [
    { station: 'Shell Westlands', price: 165.50, distance: 2.1, updated: '2 hours ago' },
    { station: 'Total Kilimani', price: 164.80, distance: 3.5, updated: '4 hours ago' },
    { station: 'Kenol CBD', price: 166.20, distance: 1.8, updated: '1 hour ago' },
    { station: 'Kobil Parklands', price: 163.90, distance: 4.2, updated: '6 hours ago' }
  ];

  const upcomingExpenses = [
    { type: 'Fuel Budget', amount: 5000, date: '2025-01-25', status: 'upcoming' },
    { type: 'Service Maintenance', amount: 8500, date: '2025-02-01', status: 'scheduled' },
    { type: 'Insurance Premium', amount: 12000, date: '2025-02-15', status: 'due' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">
                KES {entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Cost Tracking & Budget
          </h3>
          <p className="text-sm text-muted-foreground">
            Monitor fuel expenses and budget performance
          </p>
        </div>
        
        {/* Period Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          {[
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' }
          ]?.map((period) => (
            <button
              key={period?.id}
              onClick={() => setSelectedPeriod(period?.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedPeriod === period?.id
                  ? 'bg-card text-card-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {period?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">
            KES {totalActual?.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            This {selectedPeriod?.slice(0, -2)}
          </p>
        </div>

        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="PiggyBank" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Savings</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">
            KES {savings?.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            {savingsPercentage}% under budget
          </p>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Budget</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">
            KES {totalBudget?.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Allocated budget
          </p>
        </div>
      </div>
      {/* Budget Alert */}
      {showBudgetAlert && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-success mb-1">
                  Great Job! You're Under Budget
                </h5>
                <p className="text-sm text-muted-foreground">
                  You've saved KES {savings?.toLocaleString()} this {selectedPeriod?.slice(0, -2)}. 
                  Keep up the efficient driving!
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              iconSize={16}
              onClick={() => setShowBudgetAlert(false)}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      )}
      {/* Cost Trend Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-card-foreground mb-3">
          Expense vs Budget Trend
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="period" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="budget"
                stroke="var(--color-muted-foreground)"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
                name="Budget"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Fuel Prices & Upcoming Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Fuel Prices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-card-foreground">
              Nearby Fuel Prices
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              iconSize={14}
              className="text-xs"
            >
              Refresh
            </Button>
          </div>
          <div className="space-y-2">
            {fuelPriceHistory?.map((station, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {station?.station}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {station?.distance} km away • {station?.updated}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-card-foreground">
                    KES {station?.price}
                  </p>
                  <p className="text-xs text-muted-foreground">per litre</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Expenses */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">
            Upcoming Expenses
          </h4>
          <div className="space-y-2">
            {upcomingExpenses?.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    expense?.status === 'due' ? 'bg-error' :
                    expense?.status === 'scheduled' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      {expense?.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {expense?.date}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-card-foreground">
                  KES {expense?.amount?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostTrackingWidget;