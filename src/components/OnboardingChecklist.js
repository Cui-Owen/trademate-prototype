import React from 'react';
import { useTrading } from '../context/TradingContext';

const OnboardingChecklist = ({ className = "" }) => {
  const { onboardingProgress, updateOnboardingProgress } = useTrading();

  const checklistItems = [
    {
      id: 'exploreAsset',
      title: '1. Explore a Popular Stock',
      description: 'Learn about Apple Inc. and market fundamentals',
      completed: onboardingProgress.exploreAsset,
      active: !onboardingProgress.exploreAsset
    },
    {
      id: 'understandTerms',
      title: '2. Understand Key Terms',
      description: 'Master trading terminology with interactive guides',
      completed: onboardingProgress.understandTerms,
      active: onboardingProgress.exploreAsset && !onboardingProgress.understandTerms
    },
    {
      id: 'placeTrade',
      title: '3. Configure Your First Trade',
      description: 'Set up a practice trade with guidance',
      completed: onboardingProgress.placeTrade,
      active: onboardingProgress.understandTerms && !onboardingProgress.placeTrade
    },
    {
      id: 'reviewTrade',
      title: '4. Review Trade Details',
      description: 'Understand your position before execution',
      completed: onboardingProgress.reviewTrade,
      active: onboardingProgress.placeTrade && !onboardingProgress.reviewTrade
    },
    {
      id: 'executeTrade',
      title: '5. Execute Practice Trade',
      description: 'Complete your first risk-free trade',
      completed: onboardingProgress.executeTrade,
      active: onboardingProgress.reviewTrade && !onboardingProgress.executeTrade
    }
  ];

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklistItems.length) * 100;

  const handleItemClick = (item) => {
    if (!item.completed && item.active) {
      // Handle navigation or activation logic
      console.log(`Activating: ${item.title}`);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">
          Your Trading Journey
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Complete these steps to become a confident trader
        </p>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-accent-positive h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500">
              {completedCount} of {checklistItems.length} completed
            </span>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <ul className="space-y-3">
        {checklistItems.map((item, index) => (
          <li 
            key={item.id}
            className={`
              relative flex items-start p-3 rounded-lg border transition-all duration-200 cursor-pointer
              ${item.completed 
                ? 'bg-green-50 border-green-200' 
                : item.active 
                  ? 'bg-accent-positive bg-opacity-10 border-accent-positive pulse-glow' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }
              ${item.active && !item.completed ? 'hover:shadow-md' : ''}
            `}
            onClick={() => handleItemClick(item)}
          >
            {/* Step Number/Checkmark */}
            <div className={`
              flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5
              ${item.completed 
                ? 'bg-green-500 text-white' 
                : item.active 
                  ? 'bg-accent-positive text-white' 
                  : 'bg-gray-300 text-gray-600'
              }
            `}>
              {item.completed ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className={`
                font-medium text-sm mb-1
                ${item.completed 
                  ? 'text-green-700' 
                  : item.active 
                    ? 'text-primary' 
                    : 'text-gray-500'
                }
              `}>
                {item.title}
              </h4>
              <p className={`
                text-xs leading-relaxed
                ${item.completed 
                  ? 'text-green-600' 
                  : item.active 
                    ? 'text-gray-700' 
                    : 'text-gray-400'
                }
              `}>
                {item.description}
              </p>
            </div>

            {/* Active Indicator */}
            {item.active && !item.completed && (
              <div className="flex-shrink-0 ml-2">
                <div className="w-2 h-2 bg-accent-positive rounded-full animate-pulse"></div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Completion Message */}
      {completedCount === checklistItems.length && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 font-medium text-sm">
              🎉 Congratulations! You've completed your trading journey!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingChecklist;
