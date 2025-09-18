import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SubscriptionManagementSection = ({ 
  subscriptionData = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [currentPlan, setCurrentPlan] = useState(subscriptionData?.currentPlan || 'individual');
  const [paymentMethod, setPaymentMethod] = useState(subscriptionData?.paymentMethod || 'mpesa');
  const [autoRenewal, setAutoRenewal] = useState(subscriptionData?.autoRenewal || true);

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic Monitoring',
      price: 500,
      period: 'month',
      features: [
        'Basic GPS tracking',
        'Speed monitoring',
        'SMS alerts',
        'Monthly reports'
      ],
      recommended: false
    },
    {
      id: 'individual',
      name: 'Individual Driver',
      price: 1200,
      period: 'month',
      features: [
        'Real-time GPS tracking',
        'Speed governor compliance',
        'Fuel monitoring',
        'Security alerts',
        'USSD commands',
        'Battery monitoring'
      ],
      recommended: true
    },
    {
      id: 'fleet',
      name: 'Fleet Management',
      price: 2500,
      period: 'month',
      features: [
        'Multi-vehicle dashboard',
        'Driver behavior analytics',
        'Route optimization',
        'Maintenance scheduling',
        'Comprehensive reporting',
        'Priority support'
      ],
      recommended: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise Solution',
      price: 5000,
      period: 'month',
      features: [
        'Unlimited vehicles',
        'Custom integrations',
        'Advanced analytics',
        'Dedicated support',
        'Custom reporting',
        'API access'
      ],
      recommended: false
    }
  ];

  const paymentMethods = [
    { value: 'mpesa', label: 'M-Pesa', icon: 'CreditCard', description: 'Pay via M-Pesa mobile money' },
    { value: 'airtel', label: 'Airtel Money', icon: 'CreditCard', description: 'Pay via Airtel Money' },
    { value: 'bank', label: 'Bank Transfer', icon: 'Building', description: 'Direct bank transfer' },
    { value: 'card', label: 'Credit/Debit Card', icon: 'CreditCard', description: 'Visa, Mastercard accepted' }
  ];

  const currentSubscription = {
    plan: subscriptionPlans?.find(plan => plan?.id === currentPlan),
    startDate: '2024-07-01',
    nextBilling: '2024-09-01',
    status: 'active',
    daysRemaining: 14
  };

  const usageStats = {
    vehiclesMonitored: currentPlan === 'fleet' || currentPlan === 'enterprise' ? 8 : 1,
    alertsSent: 247,
    reportsGenerated: 12,
    dataUsage: '2.3 GB'
  };

  const handlePlanChange = (planId) => {
    setCurrentPlan(planId);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleUpgrade = () => {
    alert(`Upgrading to ${subscriptionPlans?.find(p => p?.id === currentPlan)?.name}. You will be redirected to M-Pesa payment.`);
  };

  const handleMpesaPayment = () => {
    alert("M-Pesa payment initiated. Please check your phone for the payment prompt.");
  };

  const toggleAutoRenewal = () => {
    setAutoRenewal(!autoRenewal);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'expiring': return 'text-warning';
      case 'expired': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'expiring': return 'AlertTriangle';
      case 'expired': return 'XCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Subscription Management</h3>
            <p className="text-sm text-muted-foreground">Plan details, billing, and M-Pesa integration</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
            <Icon name={getStatusIcon(currentSubscription?.status)} size={12} className={getStatusColor(currentSubscription?.status)} />
            <span className="text-xs font-medium text-success capitalize">{currentSubscription?.status}</span>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="space-y-6 pt-4">
            {/* Current Subscription Status */}
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <h4 className="font-medium text-success">{currentSubscription?.plan?.name}</h4>
                    <p className="text-sm text-muted-foreground">Active subscription</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-semibold text-card-foreground">
                    KES {currentSubscription?.plan?.price?.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">per {currentSubscription?.plan?.period}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Next Billing:</p>
                  <p className="font-medium text-card-foreground">01/09/2024</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Days Remaining:</p>
                  <p className="font-medium text-warning">{currentSubscription?.daysRemaining} days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method:</p>
                  <p className="font-medium text-card-foreground">M-Pesa</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Auto-Renewal:</p>
                  <p className={`font-medium ${autoRenewal ? 'text-success' : 'text-warning'}`}>
                    {autoRenewal ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Current Usage</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <Icon name="Car" size={20} className="text-primary mx-auto mb-2" />
                  <p className="font-mono text-lg font-semibold text-card-foreground">{usageStats?.vehiclesMonitored}</p>
                  <p className="text-xs text-muted-foreground">Vehicles</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <Icon name="Bell" size={20} className="text-primary mx-auto mb-2" />
                  <p className="font-mono text-lg font-semibold text-card-foreground">{usageStats?.alertsSent}</p>
                  <p className="text-xs text-muted-foreground">Alerts Sent</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <Icon name="FileText" size={20} className="text-primary mx-auto mb-2" />
                  <p className="font-mono text-lg font-semibold text-card-foreground">{usageStats?.reportsGenerated}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <Icon name="Database" size={20} className="text-primary mx-auto mb-2" />
                  <p className="font-mono text-lg font-semibold text-card-foreground">{usageStats?.dataUsage}</p>
                  <p className="text-xs text-muted-foreground">Data Used</p>
                </div>
              </div>
            </div>

            {/* Available Plans */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Available Plans</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {subscriptionPlans?.map((plan) => (
                  <div 
                    key={plan?.id}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                      ${currentPlan === plan?.id
                        ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:border-primary/50'
                      }
                      ${plan?.recommended ? 'ring-2 ring-accent/20' : ''}
                    `}
                    onClick={() => handlePlanChange(plan?.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-card-foreground">{plan?.name}</h5>
                          {plan?.recommended && (
                            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="font-mono text-xl font-bold text-card-foreground">
                            KES {plan?.price?.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">/{plan?.period}</span>
                        </div>
                      </div>
                      {currentPlan === plan?.id && (
                        <Icon name="Check" size={20} className="text-primary" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {plan?.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                          <span className="text-sm text-card-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Payment Method</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods?.map((method) => (
                  <button
                    key={method?.value}
                    onClick={() => handlePaymentMethodChange(method?.value)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${paymentMethod === method?.value
                        ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={method?.icon} size={20} className="text-primary" />
                      <div className="flex-1">
                        <h5 className="font-medium text-card-foreground">{method?.label}</h5>
                        <p className="text-sm text-muted-foreground">{method?.description}</p>
                      </div>
                      {paymentMethod === method?.value && (
                        <Icon name="Check" size={20} className="text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-Renewal Settings */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="RefreshCw" size={20} className="text-primary" />
                <div>
                  <h4 className="font-medium text-card-foreground">Auto-Renewal</h4>
                  <p className="text-sm text-muted-foreground">Automatically renew subscription</p>
                </div>
              </div>
              <button
                onClick={toggleAutoRenewal}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${autoRenewal ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${autoRenewal ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* M-Pesa Integration */}
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-start space-x-3">
                <Icon name="CreditCard" size={16} className="text-success mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-success">M-Pesa Integration</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pay securely using M-Pesa mobile money. Payments are processed instantly and receipts are sent via SMS.
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="CreditCard"
                      iconPosition="left"
                      iconSize={16}
                      onClick={handleMpesaPayment}
                    >
                      Pay Now
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      <span>Paybill: 400200</span>
                      <span className="mx-2">•</span>
                      <span>Account: SAFEDRIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                variant="default"
                iconName="ArrowUp"
                iconPosition="left"
                iconSize={16}
                onClick={handleUpgrade}
                className="flex-1"
              >
                {currentPlan === subscriptionPlans?.find(p => p?.id === currentPlan)?.id ? 'Update Plan' : 'Upgrade Plan'}
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Download Invoice
              </Button>
              <Button
                variant="outline"
                iconName="HelpCircle"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Billing Support
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagementSection;