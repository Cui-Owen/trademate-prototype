import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuidanceNudge = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This component is typically rendered as a modal/popup
    // The actual guidance logic is handled in PreTradeConfirmation
    // This is a standalone page for testing purposes
    const timer = setTimeout(() => {
      navigate('/pre-trade-confirmation');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        {/* Guidance Nudge Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 animate-slide-up">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent-positive rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-primary">TradeMate Mentor</h3>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Taking a moment to think? That's smart! Remember, this is practice mode - 
                perfect for learning without risk. Here are some quick tips:
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-start space-x-2 text-sm">
                  <svg className="w-4 h-4 text-accent-positive mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Your virtual balance is safe - no real money at risk</span>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <svg className="w-4 h-4 text-accent-positive mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">You can close the position anytime after opening</span>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <svg className="w-4 h-4 text-accent-positive mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">We'll guide you through the entire process</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => navigate('/pre-trade-confirmation')}
                  className="flex-1 bg-accent-positive text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200"
                >
                  Continue with Trade
                </button>
                <button 
                  onClick={() => navigate('/order-ticket')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>💡 This guidance appears when we detect hesitation - helping you learn with confidence</p>
        </div>
      </div>
    </div>
  );
};

export default GuidanceNudge;
