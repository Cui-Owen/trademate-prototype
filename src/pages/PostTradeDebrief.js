import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useTrading } from '../context/TradingContext';
import { useUser } from '../context/UserContext';

const PostTradeDebrief = () => {
  const navigate = useNavigate();
  const { currentTrade, selectedAsset, closeTrade } = useTrading();
  const { setCurrentPage, updateUserProgress } = useUser();
  
  // Get trade data with fallbacks
  const tradeAmount = currentTrade?.amount || 1000;
  const tradeLeverage = currentTrade?.leverage || 1;
  const tradeDirection = currentTrade?.direction || 'buy';
  const entryPrice = currentTrade?.entryPrice || selectedAsset?.price || 175.43;
  
  const [tradeOutcome, setTradeOutcome] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isTradeProcessed, setIsTradeProcessed] = useState(false);

  useEffect(() => {
    setCurrentPage('post-trade-debrief');
    updateUserProgress({ firstTradeCompleted: true });

    // Only simulate trade outcome once
    if (!isTradeProcessed && currentTrade && selectedAsset) {
      const simulateTradeResult = () => {
        // Generate a consistent random seed based on trade details to avoid flickering
        const seed = String(currentTrade.id || `${currentTrade.direction}-${currentTrade.amount}-${Date.now()}`);
        const seedNumber = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const seededRandom = (seedNumber % 1000) / 1000; // Pseudo-random between 0-1
        
        // Random price movement between -3% to +3% using seeded random
        const movement = (seededRandom - 0.5) * 6;
        
        const exitPrice = selectedAsset.price * (1 + movement / 100);
        const isProfit = (tradeDirection === 'buy' && movement > 0) || 
                         (tradeDirection === 'sell' && movement < 0);
        
        // Calculate P&L based on position size and movement
        const positionSize = tradeAmount * tradeLeverage;
        const profitLoss = positionSize * (Math.abs(movement) / 100) * (isProfit ? 1 : -1);
        
        const outcome = {
          exitPrice: exitPrice,
          profit: profitLoss,
          isProfit: isProfit,
          movement: movement,
          duration: '2 minutes 34 seconds', // Simulated duration
          spread_cost: 2.50 // Simulated spread cost
        };

        setTradeOutcome(outcome);
        setIsTradeProcessed(true);
        
        // Close the trade in context
        if (currentTrade) {
          closeTrade(exitPrice, profitLoss);
        }

        // Show analysis after a brief delay
        setTimeout(() => setShowAnalysis(true), 1000);
      };

      simulateTradeResult();
    }
  }, [currentTrade, selectedAsset, closeTrade, setCurrentPage, updateUserProgress, isTradeProcessed]);

  const handleStartNewTrade = () => {
    navigate('/cockpit');
  };

  const handleViewPortfolio = () => {
    // In a real app, this would navigate to portfolio page
    console.log('Navigating to portfolio...');
    navigate('/cockpit');
  };

  if (!tradeOutcome || !isTradeProcessed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-positive border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your trade...</p>
        </div>
      </div>
    );
  }

  const outcomeColor = tradeOutcome.isProfit ? 'text-green-600' : 'text-red-600';
  const outcomeTextColor = tradeOutcome.isProfit ? 'text-green-700' : 'text-red-700';
  const outcomeBgColor = tradeOutcome.isProfit ? 'bg-green-50' : 'bg-red-50';
  const outcomeBorderColor = tradeOutcome.isProfit ? 'border-green-200' : 'border-red-200';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-center">
              <div className="text-gray-600">Practice Balance</div>
              <div className={`font-bold text-lg ${tradeOutcome.isProfit ? 'text-accent-positive' : 'text-red-500'}`}>
                ${(10000 + tradeOutcome.profit).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Trade Result Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
            ${tradeOutcome.isProfit ? 'bg-green-100' : 'bg-red-100'}
          `}>
            {tradeOutcome.isProfit ? (
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            )}
          </div>
          
          <h1 className={`text-3xl font-bold mb-2 ${outcomeColor}`}>
            Trade Closed: {tradeOutcome.isProfit ? '+' : ''}${Math.abs(tradeOutcome.profit).toFixed(2)} {tradeOutcome.isProfit ? 'Profit' : 'Loss'}
          </h1>
          
          <p className="text-gray-600 text-lg">
            Your {tradeDirection.toUpperCase()} position on {selectedAsset.symbol} has been closed
          </p>
        </div>

        {/* Trade Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Summary */}
          <div className="lg:col-span-2">
            <div className={`bg-white rounded-lg shadow-sm border ${outcomeBorderColor} p-6`}>
              <h2 className="text-xl font-semibold text-primary mb-4">Trade Summary</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Asset</span>
                    <span className="font-medium">{selectedAsset.symbol} - {selectedAsset.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Direction</span>
                    <span className={`font-medium capitalize ${
                      tradeDirection === 'buy' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tradeDirection} {tradeDirection === 'buy' ? '📈' : '📉'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Entry Price</span>
                    <span className="font-medium">${entryPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Exit Price</span>
                    <span className="font-medium">${tradeOutcome.exitPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Investment</span>
                    <span className="font-medium">${tradeAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Leverage</span>
                    <span className="font-medium">{tradeLeverage}x</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Position Size</span>
                    <span className="font-medium">${(tradeAmount * tradeLeverage).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trade Duration</span>
                    <span className="font-medium">{tradeOutcome.duration}</span>
                  </div>
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {tradeOutcome.movement > 0 ? '+' : ''}{tradeOutcome.movement.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600">Price Movement</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${outcomeColor}`}>
                    {tradeOutcome.isProfit ? '+' : ''}${tradeOutcome.profit.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Net P&L</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-600">
                    -${tradeOutcome.spread_cost.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Spread Cost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          <div className={`${outcomeBgColor} ${outcomeBorderColor} border rounded-lg p-6`}>
            <h3 className="text-lg font-semibold text-primary mb-4">Performance</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${outcomeColor} mb-2`}>
                  {tradeOutcome.isProfit ? '+' : ''}{((tradeOutcome.profit / tradeAmount) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Return on Investment</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trades Completed</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Hold Time</span>
                  <span className="font-medium">2m 34s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Analysis */}
        {showAnalysis && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 animate-slide-up">
            <h2 className="text-xl font-semibold text-primary mb-4">📚 What Happened & Why</h2>
            
            <div className="prose max-w-none">
              <div className={`p-4 rounded-lg border-l-4 mb-4 ${
                tradeOutcome.isProfit 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-red-50 border-red-400'
              }`}>
                <h3 className={`font-semibold mb-2 ${outcomeTextColor}`}>
                  {tradeOutcome.isProfit ? '🎉 Congratulations!' : '📉 Learning Opportunity'}
                </h3>
                <p className={`text-sm ${outcomeTextColor} leading-relaxed`}>
                  {tradeOutcome.isProfit ? (
                    <>
                      Your analysis was correct! {selectedAsset.symbol} moved in your favor by {Math.abs(tradeOutcome.movement).toFixed(2)}%, 
                      and your {tradeLeverage}x leverage amplified this movement to generate a {((tradeOutcome.profit / tradeAmount) * 100).toFixed(1)}% return.
                    </>
                  ) : (
                    <>
                      The market moved against your position by {Math.abs(tradeOutcome.movement).toFixed(2)}%. 
                      Your {tradeLeverage}x leverage amplified this movement, resulting in a {Math.abs((tradeOutcome.profit / tradeAmount) * 100).toFixed(1)}% loss. 
                      This is a normal part of trading - even experienced traders have losing trades.
                    </>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Key Insights</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Leverage amplified your {Math.abs(tradeOutcome.movement).toFixed(2)}% price move to {Math.abs((tradeOutcome.profit / tradeAmount) * 100).toFixed(1)}%</li>
                    <li>• The spread cost was ${tradeOutcome.spread_cost.toFixed(2)} on this trade</li>
                    <li>• Your trade duration was {tradeOutcome.duration}</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🔄 Next Steps</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• {tradeOutcome.isProfit ? 'Consider taking partial profits' : 'Review your analysis process'}</li>
                    <li>• Practice with different leverage levels</li>
                    <li>• Try setting stop-loss orders next time</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📊 Market Context</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedAsset.symbol} is known for {Math.abs(tradeOutcome.movement) > 2 ? 'high' : 'moderate'} volatility. 
                  A {Math.abs(tradeOutcome.movement).toFixed(2)}% move in {tradeOutcome.duration} is {
                    Math.abs(tradeOutcome.movement) > 2 ? 'above average' : 'typical'
                  } for this asset. 
                  {tradeOutcome.isProfit 
                    ? ' Your timing caught a favorable market movement.' 
                    : ' Market movements like this are why risk management is crucial.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartNewTrade}
            className="bg-accent-positive text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg"
          >
            Start New Practice Trade
          </button>
          
          <button
            onClick={handleViewPortfolio}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            View Portfolio
          </button>
        </div>

        {/* Completion Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-positive to-green-400 text-white px-6 py-3 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">🎉 First Trade Completed!</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            You've successfully completed your first practice trade with TradeMate
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostTradeDebrief;
