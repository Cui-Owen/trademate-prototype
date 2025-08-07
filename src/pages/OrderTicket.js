import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { FinancialTerms } from '../components/Tooltip';
import ComplianceAlert from './ComplianceAlert';
import { useTrading } from '../context/TradingContext';
import { useUser } from '../context/UserContext';

const OrderTicket = () => {
  const navigate = useNavigate();
  const { 
    selectedAsset, 
    leverage, 
    setLeverage, 
    tradeDirection, 
    setTradeDirection, 
    tradeAmount, 
    setTradeAmount,
    calculatePotentialPnL,
    calculateMarginRequirement,
    calculateRiskLevel,
    updateOnboardingProgress,
    userRiskDecisions,
    setUserRiskDecision
  } = useTrading();
  const { setCurrentPage, pushModal } = useUser();

  useEffect(() => {
    setCurrentPage('order-ticket');
    updateOnboardingProgress({ placeTrade: true });
  }, [setCurrentPage, updateOnboardingProgress]);

  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorValues, setSimulatorValues] = useState({
    priceChange: 1, // percentage
    timeframe: '1 day'
  });

  const handleLeverageChange = (e) => {
    const newLeverage = parseFloat(e.target.value);
    setLeverage(newLeverage);
    
    // Only trigger compliance alert once per session for high leverage (16x and above)
    const shouldShowAlert = newLeverage >= 16 && !userRiskDecisions.hasSeenComplianceAlert;
    
    if (shouldShowAlert) {
      // Mark that user has seen the compliance alert
      setUserRiskDecision({
        hasSeenComplianceAlert: true
      });
      
      setTimeout(() => {
        pushModal({
          type: 'compliance-alert',
          leverage: newLeverage
        });
      }, 500); // Small delay to ensure state update
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = parseFloat(e.target.value) || 0;
    setTradeAmount(newAmount);
  };

  const handleReviewTrade = () => {
    updateOnboardingProgress({ reviewTrade: true });
    navigate('/pre-trade-confirmation');
  };

  const handleBackToAsset = () => {
    navigate('/asset-discovery');
  };

  // Calculate real-time values
  const marginRequired = calculateMarginRequirement();
  const riskLevel = calculateRiskLevel();
  const potentialProfit = calculatePotentialPnL(simulatorValues.priceChange / 100);
  const potentialLoss = calculatePotentialPnL(-simulatorValues.priceChange / 100);

  const toggleSimulator = () => {
    setShowSimulator(!showSimulator);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToAsset}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Logo />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-center">
              <div className="text-gray-600">Available Balance</div>
              <div className="font-bold text-accent-positive text-lg">$10,000.00</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <span>Trading Journey</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-accent-positive font-medium">Configure Trade</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-accent-positive h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Ticket */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-primary">Configure Your Trade</h1>
                <div className="text-sm text-gray-600">
                  Step 3 of 5
                </div>
              </div>

              {/* Asset Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🍎</span>
                    <div>
                      <h3 className="font-semibold text-primary">
                        {selectedAsset.symbol} - {selectedAsset.name}
                      </h3>
                      <p className="text-sm text-gray-600">Current Price: ${selectedAsset.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-lg text-sm font-medium
                    ${selectedAsset.change >= 0 
                      ? 'text-green-700 bg-green-100' 
                      : 'text-red-700 bg-red-100'
                    }
                  `}>
                    {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Trade Direction */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-primary mb-3">
                  Trade Direction
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTradeDirection('buy')}
                    className={`
                      p-4 border-2 rounded-lg transition-all duration-200 text-center
                      ${tradeDirection === 'buy' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">📈</div>
                    <div className="font-semibold">BUY (Long)</div>
                    <div className="text-sm text-gray-600">Profit if price goes up</div>
                  </button>
                  <button
                    onClick={() => setTradeDirection('sell')}
                    className={`
                      p-4 border-2 rounded-lg transition-all duration-200 text-center
                      ${tradeDirection === 'sell' 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">📉</div>
                    <div className="font-semibold">SELL (Short)</div>
                    <div className="text-sm text-gray-600">Profit if price goes down</div>
                  </button>
                </div>
              </div>

              {/* Trade Amount */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-primary mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="100"
                    max="10000"
                    step="100"
                    value={tradeAmount}
                    onChange={handleAmountChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-positive focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">Minimum: $100 • Maximum: $10,000</p>
              </div>

              {/* Leverage */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-primary">
                    <FinancialTerms.Leverage>Leverage</FinancialTerms.Leverage>
                  </label>
                  <span className="text-sm font-medium text-primary">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={leverage}
                  onChange={handleLeverageChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1x (Conservative)</span>
                  <span>15x (Moderate)</span>
                  <span>30x (Aggressive)</span>
                </div>
                
                {/* Risk Level Indicator */}
                <div className="mt-3">
                  <div className={`
                    inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
                    ${riskLevel === 'low' ? 'bg-green-100 text-green-700' : 
                      riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'}
                  `}>
                    <div className={`w-2 h-2 rounded-full ${
                      riskLevel === 'low' ? 'bg-green-500' : 
                      riskLevel === 'medium' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}></div>
                    <span>Risk Level: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}</span>
                  </div>
                </div>
              </div>

              {/* Risk/Reward Simulator */}
              <div className="mb-6">
                <button
                  onClick={toggleSimulator}
                  className="flex items-center justify-between w-full p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-blue-800">Risk/Reward Simulator</div>
                      <div className="text-sm text-blue-600">See potential outcomes before you trade</div>
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${showSimulator ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showSimulator && (
                  <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg animate-slide-up">
                    <h4 className="font-semibold text-primary mb-3">Scenario Analysis</h4>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Movement Scenario
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="10"
                        step="0.5"
                        value={simulatorValues.priceChange}
                        onChange={(e) => setSimulatorValues(prev => ({ 
                          ...prev, 
                          priceChange: parseFloat(e.target.value) 
                        }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0.5%</span>
                        <span className="font-medium text-primary">{simulatorValues.priceChange}%</span>
                        <span>10%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-green-700 mb-1">If price rises {simulatorValues.priceChange}%</div>
                        <div className="font-bold text-green-800 text-lg">
                          +${Math.abs(potentialProfit).toFixed(2)}
                        </div>
                        <div className="text-xs text-green-600">
                          New price: ${(selectedAsset.price * (1 + simulatorValues.priceChange / 100)).toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="text-sm text-red-700 mb-1">If price falls {simulatorValues.priceChange}%</div>
                        <div className="font-bold text-red-800 text-lg">
                          -${Math.abs(potentialLoss).toFixed(2)}
                        </div>
                        <div className="text-xs text-red-600">
                          New price: ${(selectedAsset.price * (1 - simulatorValues.priceChange / 100)).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-gray-50 rounded text-center">
                      <div className="text-sm text-gray-600">
                        Your {leverage}x leverage amplifies both profits and losses
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleBackToAsset}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  ← Back to Asset
                </button>
                <button
                  onClick={handleReviewTrade}
                  className="flex-1 py-3 px-6 bg-accent-positive text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg"
                >
                  Review Trade →
                </button>
              </div>
            </div>
          </div>

          {/* Trade Summary Sidebar */}
          <div className="space-y-6">
            {/* Trade Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Trade Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Direction</span>
                  <span className={`font-medium capitalize ${
                    tradeDirection === 'buy' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tradeDirection} {tradeDirection === 'buy' ? '📈' : '📉'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment</span>
                  <span className="font-medium">${tradeAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Leverage</span>
                  <span className="font-medium">{leverage}x</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Position Size</span>
                  <span className="font-medium">${(tradeAmount * leverage).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Entry Price</span>
                  <span className="font-medium">${selectedAsset.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600"><FinancialTerms.Spread>Spread</FinancialTerms.Spread></span>
                  <span className="font-medium">{selectedAsset.spread} pts</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800">Margin Required</span>
                  <span className="text-primary">${marginRequired.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Educational Tip */}
            <div className="bg-gradient-to-br from-accent-positive to-green-400 rounded-lg p-6 text-white">
              <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-green-100 leading-relaxed">
                Use <FinancialTerms.StopLoss onGreen={true}>stop losses</FinancialTerms.StopLoss> and <FinancialTerms.TakeProfit onGreen={true}>take profits</FinancialTerms.TakeProfit> to manage your risk automatically. 
                We'll show you how in the next step!
              </p>
            </div>

            {/* Risk Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">Practice Mode Active</h4>
                  <p className="text-xs text-amber-700">
                    This is a risk-free environment. All trades use virtual money for learning purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Compliance Alert Modal */}
      <ComplianceAlert />
    </div>
  );
};

export default OrderTicket;
