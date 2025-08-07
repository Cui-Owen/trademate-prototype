import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useTrading } from '../context/TradingContext';
import { useUser } from '../context/UserContext';

const PreTradeConfirmation = () => {
  const navigate = useNavigate();
  const { 
    selectedAsset, 
    leverage, 
    tradeDirection, 
    tradeAmount,
    calculatePotentialPnL,
    calculateMarginRequirement,
    executeTrade,
    updateOnboardingProgress
  } = useTrading();
  const { getCurrentModal, popModal, pushModal } = useUser();

  const [showConfirmation, setShowConfirmation] = useState(true);
  const [hesitationTimer, setHesitationTimer] = useState(null);
  const [showGuidanceNudge, setShowGuidanceNudge] = useState(false);

  useEffect(() => {
    updateOnboardingProgress({ reviewTrade: true });
  }, [updateOnboardingProgress]);

  const marginRequired = calculateMarginRequirement();
  const positionSize = tradeAmount * leverage;
  const estimatedProfit = calculatePotentialPnL(0.02); // 2% move
  const estimatedLoss = calculatePotentialPnL(-0.02); // -2% move

  const handleExecuteClick = () => {
    // Clear any existing timer
    if (hesitationTimer) {
      clearTimeout(hesitationTimer);
      setHesitationTimer(null);
    }
    
    // Execute the trade
    executeTrade();
    setShowConfirmation(false);
    
    // Show success notification and navigate
    setTimeout(() => {
      navigate('/post-trade-debrief');
    }, 1000);
  };

  const handleMouseEnterExecute = () => {
    // Start hesitation timer (5 seconds)
    const timer = setTimeout(() => {
      setShowGuidanceNudge(true);
      pushModal({
        type: 'guidance-nudge',
        message: "Taking a moment to think? That's smart! Remember, this is practice mode - perfect for learning without risk."
      });
    }, 5000);
    
    setHesitationTimer(timer);
  };

  const handleMouseLeaveExecute = () => {
    // Clear timer if user moves away
    if (hesitationTimer) {
      clearTimeout(hesitationTimer);
      setHesitationTimer(null);
    }
  };

  const handleBackToOrder = () => {
    setShowConfirmation(false);
    navigate('/order-ticket');
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
    navigate('/cockpit');
  };

  const currentModal = getCurrentModal();

  return (
    <>
      {showConfirmation && (
        <Modal 
          isOpen={showConfirmation} 
          onClose={handleCloseModal}
          title="Trade Confirmation"
          size="large"
          type="default"
          closeOnBackdrop={false}
        >
          <div className="space-y-6">
            {/* Success Header */}
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-accent-positive rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Ready to Execute Your Trade</h2>
              <p className="text-gray-600">Please review your trade details before proceeding</p>
            </div>

            {/* Trade Summary in Plain English */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Your Trade in Simple Terms</h3>
              
              <div className="prose max-w-none text-gray-700">
                <p className="text-base leading-relaxed mb-4">
                  You're about to place a <strong className="text-primary">{tradeDirection.toUpperCase()}</strong> trade on{' '}
                  <strong className="text-primary">{selectedAsset.name} ({selectedAsset.symbol})</strong> stock.
                </p>
                
                <p className="text-base leading-relaxed mb-4">
                  You're investing <strong className="text-accent-positive">${tradeAmount.toLocaleString()}</strong> of your own money, 
                  but with <strong className="text-primary">{leverage}x leverage</strong>, you're controlling{' '}
                  <strong className="text-primary">${positionSize.toLocaleString()}</strong> worth of {selectedAsset.symbol} stock.
                </p>

                <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                  <h4 className="font-semibold text-primary mb-2">What This Means:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>
                        If {selectedAsset.symbol} goes {tradeDirection === 'buy' ? 'up' : 'down'} by 2%, 
                        you could profit approximately <strong className="text-green-600">${Math.abs(estimatedProfit).toFixed(2)}</strong>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">⚠</span>
                      <span>
                        If {selectedAsset.symbol} goes {tradeDirection === 'buy' ? 'down' : 'up'} by 2%, 
                        you could lose approximately <strong className="text-red-600">${Math.abs(estimatedLoss).toFixed(2)}</strong>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">ℹ</span>
                      <span>
                        Your maximum risk is your investment amount: <strong>${tradeAmount.toLocaleString()}</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <strong>Remember:</strong> This is practice mode! You're using virtual money to learn how trading works. 
                  No real money is at risk.
                </p>
              </div>
            </div>

            {/* Detailed Trade Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Trade Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Asset</span>
                    <span className="font-medium">{selectedAsset.symbol} - {selectedAsset.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Direction</span>
                    <span className={`font-medium capitalize ${
                      tradeDirection === 'buy' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tradeDirection} {tradeDirection === 'buy' ? '(Long)' : '(Short)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entry Price</span>
                    <span className="font-medium">${selectedAsset.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spread Cost</span>
                    <span className="font-medium">{selectedAsset.spread} points</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Position Sizing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Investment</span>
                    <span className="font-medium">${tradeAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leverage</span>
                    <span className="font-medium">{leverage}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Position Size</span>
                    <span className="font-medium">${positionSize.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Margin Required</span>
                    <span className="font-medium">${marginRequired.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Acknowledgment */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Important Reminder</h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    You understand that this is a practice trade using virtual money for educational purposes. 
                    In real trading, leverage amplifies both profits and losses, and you could lose more than your initial investment.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleBackToOrder}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                ← Modify Trade
              </button>
              <button
                onClick={handleExecuteClick}
                onMouseEnter={handleMouseEnterExecute}
                onMouseLeave={handleMouseLeaveExecute}
                className="flex-1 py-3 px-6 bg-accent-positive text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg"
              >
                Execute Practice Trade 🚀
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Guidance Nudge Modal */}
      {currentModal && currentModal.type === 'guidance-nudge' && (
        <div className="chat-bubble animate-fade-in">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-accent-positive rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary text-sm mb-1">TradeMate Mentor</div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {currentModal.message}
              </p>
              <div className="flex space-x-2 mt-3">
                <button 
                  onClick={handleExecuteClick}
                  className="text-xs bg-accent-positive text-white px-3 py-1 rounded hover:bg-opacity-90"
                >
                  Continue with Trade
                </button>
                <button 
                  onClick={popModal}
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreTradeConfirmation;
