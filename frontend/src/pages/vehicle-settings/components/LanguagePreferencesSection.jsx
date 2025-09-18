import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const LanguagePreferencesSection = ({ 
  languageSettings = {},
  onUpdate = () => {},
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('safedrive_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const languages = [
    { 
      value: "en", 
      label: "English", 
      nativeLabel: "English",
      flag: "🇬🇧",
      description: "Default interface language"
    },
    { 
      value: "sw", 
      label: "Swahili", 
      nativeLabel: "Kiswahili",
      flag: "🇰🇪",
      description: "Lugha ya Kiswahili"
    }
  ];

  const sampleTranslations = {
    en: {
      dashboard: "Dashboard",
      vehicleMonitoring: "Vehicle Monitoring",
      fuelAnalytics: "Fuel Analytics",
      alerts: "Alerts & Notifications",
      settings: "Vehicle Settings",
      speed: "Speed",
      fuel: "Fuel",
      battery: "Battery",
      engine: "Engine",
      location: "Location",
      maintenance: "Maintenance"
    },
    sw: {
      dashboard: "Dashibodi",
      vehicleMonitoring: "Ufuatiliaji wa Gari",
      fuelAnalytics: "Uchambuzi wa Mafuta",
      alerts: "Arifa na Taarifa",
      settings: "Mipangilio ya Gari",
      speed: "Kasi",
      fuel: "Mafuta",
      battery: "Betri",
      engine: "Injini",
      location: "Mahali",
      maintenance: "Matengenezo"
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    
    // Save to localStorage
    localStorage.setItem('safedrive_language', newLanguage);
    
    // Update parent component
    onUpdate({ currentLanguage: newLanguage });
    
    // Show confirmation message
    const message = newLanguage === 'sw' 
      ? "Lugha imebadilishwa kuwa Kiswahili" :"Language changed to English";
    
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-modal z-1100 transition-all duration-300';
    toast.textContent = message;
    document.body?.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body?.removeChild(toast), 300);
    }, 3000);
  };

  const getCurrentLanguageData = () => {
    return languages?.find(lang => lang?.value === currentLanguage) || languages?.[0];
  };

  const getTranslations = () => {
    return sampleTranslations?.[currentLanguage] || sampleTranslations?.en;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Globe" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">Language Preferences</h3>
            <p className="text-sm text-muted-foreground">Interface language and localization settings</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full">
            <span className="text-sm">{getCurrentLanguageData()?.flag}</span>
            <span className="text-xs font-medium text-primary">{getCurrentLanguageData()?.nativeLabel}</span>
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
            {/* Language Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Interface Language</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {languages?.map((language) => (
                  <button
                    key={language?.value}
                    onClick={() => handleLanguageChange(language?.value)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${currentLanguage === language?.value
                        ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{language?.flag}</span>
                      <div className="flex-1">
                        <h5 className="font-medium text-card-foreground">{language?.label}</h5>
                        <p className="text-sm text-muted-foreground">{language?.nativeLabel}</p>
                        <p className="text-xs text-muted-foreground mt-1">{language?.description}</p>
                      </div>
                      {currentLanguage === language?.value && (
                        <Icon name="Check" size={20} className="text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Preview */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">
                {currentLanguage === 'sw' ? 'Muhtasari wa Lugha' : 'Language Preview'}
              </h4>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-sm text-card-foreground mb-3">
                  {currentLanguage === 'sw' ? 'Mifano ya Maneno' : 'Sample Interface Terms'}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  {Object.entries(getTranslations())?.map(([key, translation]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Icon name="ArrowRight" size={12} className="text-primary" />
                      <span className="text-card-foreground">{translation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Regional Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">
                {currentLanguage === 'sw' ? 'Mipangilio ya Kikanda' : 'Regional Settings'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-info/5 rounded-lg border border-info/20">
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={16} className="text-info" />
                    <div>
                      <h5 className="font-medium text-sm text-info">
                        {currentLanguage === 'sw' ? 'Eneo' : 'Region'}
                      </h5>
                      <p className="text-xs text-muted-foreground">Kenya, East Africa</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                  <div className="flex items-center space-x-3">
                    <Icon name="DollarSign" size={16} className="text-success" />
                    <div>
                      <h5 className="font-medium text-sm text-success">
                        {currentLanguage === 'sw' ? 'Sarafu' : 'Currency'}
                      </h5>
                      <p className="text-xs text-muted-foreground">Kenyan Shilling (KES)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time Format */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">
                {currentLanguage === 'sw' ? 'Muundo wa Tarehe na Wakati' : 'Date & Time Format'}
              </h4>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">
                      {currentLanguage === 'sw' ? 'Muundo wa Tarehe:' : 'Date Format:'}
                    </p>
                    <p className="font-mono text-card-foreground">DD/MM/YYYY</p>
                    <p className="text-xs text-muted-foreground">18/08/2025</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      {currentLanguage === 'sw' ? 'Muundo wa Wakati:' : 'Time Format:'}
                    </p>
                    <p className="font-mono text-card-foreground">24-hour</p>
                    <p className="text-xs text-muted-foreground">13:56</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Integration */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">
                {currentLanguage === 'sw' ? 'Muunganisho wa Mitandao' : 'Network Integration'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-card border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="MessageSquare" size={16} className="text-primary" />
                    <div>
                      <p className="font-medium text-xs text-card-foreground">SMS</p>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === 'sw' ? 'Kiswahili/English' : 'Bilingual Support'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-card border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <div>
                      <p className="font-medium text-xs text-card-foreground">USSD</p>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === 'sw' ? 'Lugha ya Kiswahili' : 'Swahili Commands'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-card border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="CreditCard" size={16} className="text-primary" />
                    <div>
                      <p className="font-medium text-xs text-card-foreground">M-Pesa</p>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === 'sw' ? 'Muunganisho wa Kiswahili' : 'Native Integration'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Change Confirmation */}
            <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-warning mt-0.5" />
                <div>
                  <h5 className="font-medium text-sm text-warning">
                    {currentLanguage === 'sw' ? 'Taarifa Muhimu' : 'Important Note'}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentLanguage === 'sw' ?'Mabadiliko ya lugha yataathiri kiolesura chote na vitaokoka mara moja. Arifa za SMS na USSD pia zitabadilishwa.' :'Language changes will affect the entire interface and take effect immediately. SMS and USSD alerts will also be updated.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-border">
              <Button
                variant="default"
                iconName="Save"
                iconPosition="left"
                iconSize={16}
                onClick={() => onUpdate({ currentLanguage })}
              >
                {currentLanguage === 'sw' ? 'Hifadhi Mipangilio' : 'Save Language Settings'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagePreferencesSection;