import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EcoDrivingCoach = ({ className = '' }) => {
  const [selectedTip, setSelectedTip] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState(['challenge-1', 'challenge-3']);

  const drivingScore = {
    overall: 78,
    categories: {
      acceleration: { score: 82, trend: '+5', level: 'good' },
      braking: { score: 75, trend: '-2', level: 'average' },
      speed: { score: 88, trend: '+8', level: 'excellent' },
      idling: { score: 65, trend: '-3', level: 'needs_improvement' }
    }
  };

  const personalizedTips = [
    {
      id: 'tip-1',
      category: 'Acceleration',
      title: 'Smooth Acceleration Technique',
      description: `Your acceleration patterns show room for improvement. Try the "5-second rule" - take 5 seconds to reach 20 km/h from a complete stop.`,
      impact: 'Can improve fuel efficiency by 8-12%',
      difficulty: 'easy',
      timeToMaster: '1 week',
      icon: 'TrendingUp',
      priority: 'high'
    },
    {
      id: 'tip-2',
      category: 'Braking',
      title: 'Anticipatory Braking',
      description: `Look ahead and anticipate traffic flow. Start braking gently earlier rather than hard braking at the last moment.`,
      impact: 'Reduces fuel consumption by 5-8%',
      difficulty: 'medium',
      timeToMaster: '2 weeks',
      icon: 'Zap',
      priority: 'high'
    },
    {
      id: 'tip-3',
      category: 'Speed',
      title: 'Optimal Speed Maintenance',
      description: `Your speed consistency is excellent! Maintain steady speeds between 50-80 km/h for maximum efficiency.`,
      impact: 'Current efficiency: Excellent',
      difficulty: 'easy',
      timeToMaster: 'mastered',
      icon: 'Target',
      priority: 'low'
    },
    {
      id: 'tip-4',
      category: 'Idling',
      title: 'Reduce Idle Time',
      description: `Turn off your engine when stopped for more than 30 seconds. Your current idle time is 15% above optimal.`,
      impact: 'Can save KES 850 per month',
      difficulty: 'easy',
      timeToMaster: '3 days',
      icon: 'Clock',
      priority: 'medium'
    }
  ];

  const weeklyChallenge = {
    title: 'Smooth Operator Challenge',
    description: 'Maintain consistent acceleration and avoid hard braking for 5 consecutive trips',
    progress: 3,
    target: 5,
    reward: 'KES 50 M-Pesa bonus',
    timeLeft: '4 days',
    difficulty: 'medium'
  };

  const gamificationElements = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    badges: [
      { id: 'eco-warrior', name: 'Eco Warrior', description: 'Saved 100L of fuel', earned: true },
      { id: 'smooth-driver', name: 'Smooth Driver', description: '50 trips without hard braking', earned: true },
      { id: 'efficiency-master', name: 'Efficiency Master', description: 'Achieve 15+ km/l for a week', earned: false },
      { id: 'route-optimizer', name: 'Route Optimizer', description: 'Use 10 optimized routes', earned: false }
    ],
    achievements: {
      totalFuelSaved: 127.5,
      co2Reduced: 298.2,
      moneySaved: 15300,
      tripsCompleted: 234
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error';
      case 'medium': return 'border-warning';
      case 'low': return 'border-success';
      default: return 'border-border';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'average': return 'text-warning';
      case 'needs_improvement': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Eco-Driving Coach
          </h3>
          <p className="text-sm text-muted-foreground">
            Personalized tips and challenges to improve your fuel efficiency
          </p>
        </div>
        
        {/* Level & XP */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-card-foreground">
              Level {gamificationElements?.level}
            </p>
            <p className="text-xs text-muted-foreground">
              {gamificationElements?.xp}/{gamificationElements?.nextLevelXp} XP
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Award" size={24} className="text-primary" />
          </div>
        </div>
      </div>
      {/* Driving Score Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Overall Score */}
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-card-foreground">
              Overall Driving Score
            </h4>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {drivingScore?.overall}
              </p>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {Object.entries(drivingScore?.categories)?.map(([category, data]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-card-foreground capitalize">
                    {category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(data?.level)} bg-current/10`}>
                    {data?.level?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-card-foreground">
                    {data?.score}
                  </span>
                  <span className={`text-xs font-medium ${
                    data?.trend?.startsWith('+') ? 'text-success' : 'text-error'
                  }`}>
                    {data?.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="bg-accent/5 border border-accent/10 rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">
                {weeklyChallenge?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {weeklyChallenge?.description}
              </p>
            </div>
            <Icon name="Trophy" size={20} className="text-accent" />
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-card-foreground">
                {weeklyChallenge?.progress}/{weeklyChallenge?.target}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${(weeklyChallenge?.progress / weeklyChallenge?.target) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-accent">
                {weeklyChallenge?.reward}
              </p>
              <p className="text-xs text-muted-foreground">
                {weeklyChallenge?.timeLeft} remaining
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(weeklyChallenge?.difficulty)}`}>
              {weeklyChallenge?.difficulty}
            </span>
          </div>
        </div>
      </div>
      {/* Personalized Tips */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-card-foreground mb-4">
          Personalized Driving Tips
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {personalizedTips?.map((tip) => (
            <div 
              key={tip?.id} 
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${getPriorityColor(tip?.priority)}`}
              onClick={() => setSelectedTip(selectedTip === tip?.id ? null : tip?.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={tip?.icon} size={16} className="text-primary" />
                  <span className="text-xs font-medium text-primary">
                    {tip?.category}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tip?.difficulty)}`}>
                    {tip?.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tip?.priority === 'high' ? 'bg-error/10 text-error' :
                    tip?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {tip?.priority}
                  </span>
                </div>
              </div>
              
              <h5 className="text-sm font-semibold text-card-foreground mb-2">
                {tip?.title}
              </h5>
              
              {selectedTip === tip?.id ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip?.description}
                  </p>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Impact:</span>
                        <p className="font-medium text-card-foreground">{tip?.impact}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time to master:</span>
                        <p className="font-medium text-card-foreground">{tip?.timeToMaster}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full text-xs"
                  >
                    Start Practice
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {tip?.impact}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Click to learn more
                    </span>
                    <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Achievements & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-4">
            Your Achievements
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
              <Icon name="Fuel" size={20} className="text-success mx-auto mb-1" />
              <p className="text-sm font-bold text-success">
                {gamificationElements?.achievements?.totalFuelSaved}L
              </p>
              <p className="text-xs text-muted-foreground">Fuel Saved</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
              <Icon name="Leaf" size={20} className="text-primary mx-auto mb-1" />
              <p className="text-sm font-bold text-primary">
                {gamificationElements?.achievements?.co2Reduced} kg
              </p>
              <p className="text-xs text-muted-foreground">CO₂ Reduced</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
              <Icon name="PiggyBank" size={20} className="text-accent mx-auto mb-1" />
              <p className="text-sm font-bold text-accent">
                KES {gamificationElements?.achievements?.moneySaved?.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Money Saved</p>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
              <Icon name="MapPin" size={20} className="text-warning mx-auto mb-1" />
              <p className="text-sm font-bold text-warning">
                {gamificationElements?.achievements?.tripsCompleted}
              </p>
              <p className="text-xs text-muted-foreground">Trips Completed</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-4">
            Badges & Rewards
          </h4>
          <div className="space-y-2">
            {gamificationElements?.badges?.map((badge) => (
              <div 
                key={badge?.id} 
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                  badge?.earned 
                    ? 'bg-success/5 border-success/20' :'bg-muted/20 border-border opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  badge?.earned ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name="Award" size={16} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-card-foreground">
                    {badge?.name}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {badge?.description}
                  </p>
                </div>
                {badge?.earned && (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoDrivingCoach;