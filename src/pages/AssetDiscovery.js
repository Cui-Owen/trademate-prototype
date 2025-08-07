import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { FinancialTerms } from '../components/Tooltip';
import { useTrading } from '../context/TradingContext';
import { useUser } from '../context/UserContext';

const AssetDiscovery = () => {
  const navigate = useNavigate();
  const { selectedAsset, updateOnboardingProgress } = useTrading();
  const { setCurrentPage } = useUser();

  useEffect(() => {
    setCurrentPage('asset-discovery');
    // Mark this step as completed
    updateOnboardingProgress({ exploreAsset: true, understandTerms: true });
  }, [setCurrentPage, updateOnboardingProgress]);

  const handleContinueToTrade = () => {
    navigate('/order-ticket');
  };

  const handleBackToCockpit = () => {
    navigate('/cockpit');
  };

  // Asset fundamental data
  const fundamentalData = {
    marketCap: '$2.89T',
    peRatio: '29.42',
    dividend: '0.96%',
    eps: '$6.05',
    revenue: '$394.3B',
    employees: '164,000'
  };

  const recentNews = [
    {
      title: 'Apple Reports Strong Q4 Earnings',
      summary: 'iPhone sales exceeded expectations with 15% growth year-over-year',
      time: '2 hours ago',
      sentiment: 'positive'
    },
    {
      title: 'New Product Launch Expected',
      summary: 'Industry sources suggest major announcement coming next month',
      time: '5 hours ago',
      sentiment: 'positive'
    },
    {
      title: 'Supply Chain Concerns Ease',
      summary: 'Manufacturing partners report improved capacity and reduced delays',
      time: '1 day ago',
      sentiment: 'neutral'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToCockpit}
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
              <div className="text-gray-600">Practice Balance</div>
              <div className="font-bold text-accent-positive text-lg">$10,000.00</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <span>Trading Journey</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-accent-positive font-medium">Asset Discovery</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-accent-positive h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>

        {/* Asset Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">🍎</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  {selectedAsset.symbol} - {selectedAsset.name}
                </h1>
                <p className="text-gray-600">Technology Sector • NASDAQ</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-3xl font-bold text-primary">
                    ${selectedAsset.price.toFixed(2)}
                  </span>
                  <span className={`
                    flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium
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
            </div>
            
            <button 
              onClick={handleContinueToTrade}
              className="bg-accent-positive text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg"
            >
              Configure Trade →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Educational Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                📚 Understanding Your Investment
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Apple Inc. is one of the world's largest technology companies, known for innovative consumer electronics, 
                  software, and services. When you trade <FinancialTerms.CFD>CFDs</FinancialTerms.CFD> on Apple stock, 
                  you're speculating on the price movement without owning the actual shares.
                </p>
                
                <h3 className="text-lg font-semibold text-primary mb-3">Key Trading Concepts</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-accent-positive bg-opacity-10 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">
                      <FinancialTerms.Spread>Spread</FinancialTerms.Spread>
                    </h4>
                    <p className="text-sm text-gray-700">
                      Currently {selectedAsset.spread} points. This is the difference between the buy and sell price - 
                      your cost to enter a trade.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">
                      <FinancialTerms.Leverage>Leverage</FinancialTerms.Leverage>
                    </h4>
                    <p className="text-sm text-gray-700">
                      Amplifies your position size. With 10x leverage, $1,000 controls $10,000 worth of Apple stock.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">
                      <FinancialTerms.Volatility>Volatility</FinancialTerms.Volatility>
                    </h4>
                    <p className="text-sm text-gray-700">
                      Apple typically moves 1-3% daily. Higher volatility means more opportunity but also more risk.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">
                      <FinancialTerms.Margin>Margin</FinancialTerms.Margin>
                    </h4>
                    <p className="text-sm text-gray-700">
                      The deposit required to open your position. Acts as security for your leveraged trade.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">💡 Beginner Tip</h4>
                      <p className="text-blue-700 text-sm">
                        Start with low leverage (1x-2x) to understand how price movements affect your position. 
                        You can always increase leverage as you gain confidence!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* News & Analysis */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">📰 Recent News & Analysis</h2>
              
              <div className="space-y-4">
                {recentNews.map((news, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-primary mb-1">{news.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                        <span className="text-xs text-gray-500">{news.time}</span>
                      </div>
                      <div className={`
                        flex-shrink-0 ml-3 px-2 py-1 rounded text-xs
                        ${news.sentiment === 'positive' 
                          ? 'bg-green-100 text-green-700' 
                          : news.sentiment === 'negative' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-gray-100 text-gray-700'
                        }
                      `}>
                        {news.sentiment === 'positive' ? '📈' : news.sentiment === 'negative' ? '📉' : '📊'} {news.sentiment}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Key Metrics</h3>
              <div className="space-y-3">
                {Object.entries(fundamentalData).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Trading Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current <FinancialTerms.Spread>Spread</FinancialTerms.Spread></span>
                  <span className="font-medium">{selectedAsset.spread} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Position</span>
                  <span className="font-medium">$100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max <FinancialTerms.Leverage>Leverage</FinancialTerms.Leverage></span>
                  <span className="font-medium">30:1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trading Hours</span>
                  <span className="font-medium">24/5</span>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">⚠️ Risk Assessment</h3>
              <div className="space-y-2 text-sm text-amber-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Moderate volatility stock</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>High liquidity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Good for beginners</span>
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-3">
                This assessment is for educational purposes. All trading involves risk.
              </p>
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinueToTrade}
              className="w-full bg-accent-positive text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg pulse-glow"
            >
              Ready to Configure Trade 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDiscovery;
