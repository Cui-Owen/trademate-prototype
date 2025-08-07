import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import OnboardingChecklist from '../components/OnboardingChecklist';
import { useTrading } from '../context/TradingContext';
import { useUser } from '../context/UserContext';

const TradingCockpit = () => {
  const navigate = useNavigate();
  const { selectedAsset, selectAsset, onboardingProgress } = useTrading();
  const { user, setCurrentPage } = useUser();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setCurrentPage('cockpit');
    
    // Simulate real-time chart data
    const interval = setInterval(() => {
      setChartData(prev => {
        const newPoint = {
          time: Date.now(),
          price: selectedAsset.price + (Math.random() - 0.5) * 2,
          volume: Math.random() * 1000000
        };
        return [...prev.slice(-50), newPoint]; // Keep last 50 points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedAsset.price, setCurrentPage]);

  const handleAssetClick = () => {
    navigate('/asset-discovery');
  };

  const handleStartTrading = () => {
    navigate('/order-ticket');
  };

  const mockAssets = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.34, changePercent: 1.35 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.42, change: -1.23, changePercent: -0.88 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 5.67, changePercent: 1.52 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -8.92, changePercent: -3.47 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <span className="text-gray-600">Welcome back, </span>
              <span className="font-semibold text-primary">{user.name}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-center">
                <div className="text-gray-600">Practice Balance</div>
                <div className="font-bold text-accent-positive text-lg">$10,000.00</div>
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Onboarding Checklist */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <OnboardingChecklist />
          
          {/* Quick Stats */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-primary mb-3">Today's Highlights</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Status</span>
                <span className="text-accent-positive font-medium">Open</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Traders</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your Progress</span>
                <span className="font-medium">{Object.values(onboardingProgress).filter(Boolean).length}/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Message */}
            {user.isFirstTime && (
              <div className="bg-gradient-to-r from-accent-positive to-green-400 rounded-lg p-6 mb-6 text-white animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">🎉 Welcome to your Trading Journey!</h2>
                    <p className="text-green-100">
                      Let's start by exploring a popular stock. Click on Apple below to begin your guided experience.
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200">
                      Got it! →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Asset Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {selectedAsset.symbol} - {selectedAsset.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-2xl font-bold text-primary">
                        ${selectedAsset.price.toFixed(2)}
                      </span>
                      <span className={`
                        flex items-center space-x-1 px-2 py-1 rounded text-sm font-medium
                        ${selectedAsset.change >= 0 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-red-700 bg-red-100'
                        }
                      `}>
                        <svg className={`w-4 h-4 ${selectedAsset.change >= 0 ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>
                          {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change.toFixed(2)} 
                          ({selectedAsset.changePercent >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%)
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAssetClick}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all duration-200
                      ${!onboardingProgress.exploreAsset 
                        ? 'bg-accent-positive text-white pulse-glow hover:bg-opacity-90' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {!onboardingProgress.exploreAsset ? 'Explore Asset' : 'View Details'}
                  </button>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="chart-placeholder absolute inset-0"></div>
                  <div className="relative z-10 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <p className="text-gray-500">Interactive chart loading...</p>
                    <p className="text-sm text-gray-400 mt-1">Real-time price data will appear here</p>
                  </div>
                </div>
              </div>

              {/* Asset Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-primary mb-4">Market Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume</span>
                    <span className="font-medium">{selectedAsset.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spread</span>
                    <span className="font-medium">{selectedAsset.spread} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market</span>
                    <span className="font-medium">NASDAQ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sector</span>
                    <span className="font-medium">Technology</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={handleStartTrading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg"
                  >
                    Start Practice Trade
                  </button>
                </div>
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Popular Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockAssets.map((asset) => (
                  <div 
                    key={asset.symbol}
                    onClick={() => selectAsset(asset)}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md
                      ${selectedAsset.symbol === asset.symbol 
                        ? 'border-accent-positive bg-accent-positive bg-opacity-10' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-primary">{asset.symbol}</span>
                      <span className={`
                        text-xs px-2 py-1 rounded
                        ${asset.change >= 0 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-red-700 bg-red-100'
                        }
                      `}>
                        {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{asset.name}</p>
                    <p className="font-bold text-primary">${asset.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingCockpit;
