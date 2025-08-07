import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useTrading } from '../context/TradingContext';
import { useUser } from '../context/UserContext';

const ComplianceAlert = () => {
  const navigate = useNavigate();
  const { leverage, setLeverage, setUserRiskDecision } = useTrading();
  const { getCurrentModal, popModal } = useUser();

  const currentModal = getCurrentModal();
  const isComplianceModal = currentModal && currentModal.type === 'compliance-alert';

  // Remove the problematic useEffect that interferes with user leverage settings
  // const useEffect logic removed to prevent interference with OrderTicket page

  const handleReduceLeverage = () => {
    console.log('Reducing leverage to 15x and closing modal'); // Debug log
    
    // Set leverage to safe level first
    setLeverage(15);
    
    // Close modal
    popModal();
    
    if (window.location.pathname !== '/order-ticket') {
      navigate('/order-ticket');
    }
  };

  const handleContinueWithRisk = () => {
    console.log('Continuing with high leverage and closing modal'); // Debug log
    
    // Just close modal without changing leverage
    popModal();
    
    if (window.location.pathname !== '/order-ticket') {
      navigate('/order-ticket');
    }
  };

  const handleLearnMore = () => {
    console.log('Opening educational content and closing modal'); // Debug log
    
    // TODO: In the future, this should open AI guider conversation
    // For now, just close the modal
    popModal();
    
    if (window.location.pathname !== '/order-ticket') {
      navigate('/order-ticket');
    }
  };

  // If accessed as a standalone page, show demo version
  if (!isComplianceModal) {
    // Only show standalone version if we're actually on the compliance-alert route
    if (window.location.pathname === '/compliance-alert') {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-lg mx-auto">
            <ComplianceAlertContent 
              leverage={25} // Fixed demo leverage for standalone page
              onReduceLeverage={handleReduceLeverage}
              onContinueWithRisk={handleContinueWithRisk}
              onLearnMore={handleLearnMore}
              isStandalone={true}
            />
          </div>
        </div>
      );
    }
    
    // When used in OrderTicket or other pages, don't render anything if no modal is active
    return null;
  }

  // Render as modal when triggered by high leverage
  return (
    <Modal 
      isOpen={isComplianceModal} 
      onClose={popModal}
      title=""
      size="medium"
      type="warning"
      showCloseButton={true}  // Allow users to close modal with X button as backup
      closeOnBackdrop={false}
    >
      <ComplianceAlertContent 
        leverage={currentModal?.leverage || leverage}
        onReduceLeverage={handleReduceLeverage}
        onContinueWithRisk={handleContinueWithRisk}
        onLearnMore={handleLearnMore}
        isStandalone={false}
      />
    </Modal>
  );
};

const ComplianceAlertContent = ({ 
  leverage, 
  onReduceLeverage, 
  onContinueWithRisk, 
  onLearnMore, 
  isStandalone 
}) => {
  const riskLevel = leverage > 25 ? 'Very High' : leverage > 20 ? 'High' : 'Elevated';
  const riskColor = leverage > 25 ? 'text-red-700' : leverage > 20 ? 'text-red-600' : 'text-orange-600';
  const bgColor = leverage > 25 ? 'bg-red-50' : leverage > 20 ? 'bg-red-50' : 'bg-orange-50';
  
  return (
    <div className={`${isStandalone ? 'bg-white rounded-lg shadow-lg border border-orange-200 p-6' : ''}`}>
      {/* Alert Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-amber-800 mb-2">High Leverage Alert</h2>
        <p className="text-amber-700">We've detected a potentially risky trading configuration</p>
      </div>

      {/* Risk Explanation */}
      <div className={`${bgColor} rounded-lg p-4 mb-6`}>
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">
              <span className={riskColor}>Risk Level: {riskLevel}</span>
            </h3>
            <p className="text-amber-700 text-sm leading-relaxed mb-3">
              You've selected <strong>{leverage}x leverage</strong>. While this can amplify profits, 
              it also significantly increases your potential losses. Here's what this means:
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span className="text-amber-700">
                  A <strong>5% price movement</strong> against you could result in a <strong>{(leverage * 5).toFixed(0)}% loss</strong> on your investment
                </span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span className="text-amber-700">
                  High leverage positions can be closed automatically if losses mount quickly
                </span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <span className="text-blue-500 mt-0.5">ℹ</span>
                <span className="text-amber-700">
                  Consider starting with lower leverage (5x-10x) as you learn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Understanding Leverage</h4>
        <p className="text-blue-700 text-sm leading-relaxed mb-3">
          Leverage is like a magnifying glass for your trades. It amplifies both wins and losses equally.
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white rounded p-2">
            <div className="font-medium text-green-700 mb-1">With 10x Leverage:</div>
            <div className="text-gray-600">1% price move = 10% profit/loss</div>
          </div>
          <div className="bg-white rounded p-2">
            <div className="font-medium text-red-700 mb-1">With {leverage}x Leverage:</div>
            <div className="text-gray-600">1% price move = {leverage}% profit/loss</div>
          </div>
        </div>
      </div>

      {/* Compliance Options */}
      <div className="space-y-4">
        <h4 className="font-semibold text-primary">Choose how to proceed:</h4>
        
        <div className="space-y-3">
          <button
            onClick={onReduceLeverage}
            className="w-full p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-left transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-green-800">Recommended: Reduce to 15x Leverage</div>
                <div className="text-sm text-green-700">
                  Safe leverage level that provides good profit potential while reducing risk
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={onLearnMore}
            className="w-full p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-left transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-blue-800">Learn More About Leverage</div>
                <div className="text-sm text-blue-700">
                  Access our interactive guide on leverage and risk management
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={onContinueWithRisk}
            className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-left transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-amber-800">Continue with {leverage}x Leverage</div>
                <div className="text-sm text-amber-700">
                  I understand the risks and want to proceed with high leverage
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Disclaimer:</strong> This alert is provided for educational purposes in practice mode. 
          In live trading, high leverage can result in rapid and substantial losses that may exceed your initial investment. 
          Always consider your risk tolerance and trading experience.
        </p>
      </div>
    </div>
  );
};

export default ComplianceAlert;
