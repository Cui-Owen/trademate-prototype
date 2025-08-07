import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Tooltip = ({ term, definition, children, position = 'top', onGreen = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { showTooltip, hideTooltip, ui } = useUser();

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    setTooltipPosition({
      x: rect.left + scrollLeft + rect.width / 2,
      y: rect.top + scrollTop
    });
    
    setIsVisible(true);
    showTooltip({
      term,
      definition,
      position: { x: rect.left + rect.width / 2, y: rect.top }
    });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    hideTooltip();
  };

  return (
    <>
      <span
        className={onGreen ? "jargon-term-on-green" : "jargon-term"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children || term}
      </span>
      
      {isVisible && (
        <div
          className="tooltip animate-fade-in"
          style={{
            position: 'absolute',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 10}px`,
            zIndex: 1000
          }}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-accent-positive rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-primary text-sm mb-1">{term}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{definition}</p>
                <a 
                  href="#" 
                  className="text-accent-positive text-xs font-medium hover:underline mt-2 inline-block"
                  onClick={(e) => e.preventDefault()}
                >
                  Learn more →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Pre-defined financial terms with tooltips
export const FinancialTerms = {
  Spread: ({ children }) => (
    <Tooltip 
      term="Spread" 
      definition="The difference between the buy (ask) and sell (bid) price of an asset. Lower spreads mean lower trading costs."
    >
      {children || "Spread"}
    </Tooltip>
  ),
  
  Leverage: ({ children }) => (
    <Tooltip 
      term="Leverage" 
      definition="A tool that allows you to control a larger position with a smaller amount of capital. For example, 10x leverage means you can control $10,000 worth of assets with just $1,000."
    >
      {children || "Leverage"}
    </Tooltip>
  ),
  
  CFD: ({ children }) => (
    <Tooltip 
      term="CFD" 
      definition="Contract for Difference - A financial derivative that allows you to speculate on price movements without owning the underlying asset."
    >
      {children || "CFD"}
    </Tooltip>
  ),
  
  StopLoss: ({ children, onGreen = false }) => (
    <Tooltip 
      term="Stop Loss" 
      definition="An order that automatically closes your position if the price moves against you by a specified amount, helping to limit your losses."
      onGreen={onGreen}
    >
      {children || "Stop Loss"}
    </Tooltip>
  ),
  
  TakeProfit: ({ children, onGreen = false }) => (
    <Tooltip 
      term="Take Profit" 
      definition="An order that automatically closes your position when the price reaches your target profit level, securing your gains."
      onGreen={onGreen}
    >
      {children || "Take Profit"}
    </Tooltip>
  ),
  
  Margin: ({ children }) => (
    <Tooltip 
      term="Margin" 
      definition="The amount of money required to open a leveraged position. It acts as a security deposit for your trade."
    >
      {children || "Margin"}
    </Tooltip>
  ),
  
  Pip: ({ children }) => (
    <Tooltip 
      term="Pip" 
      definition="The smallest price move in a currency pair or asset, typically the fourth decimal place (0.0001) for most currency pairs."
    >
      {children || "Pip"}
    </Tooltip>
  ),
  
  Volatility: ({ children }) => (
    <Tooltip 
      term="Volatility" 
      definition="A measure of how much an asset's price fluctuates over time. Higher volatility means larger price swings and potentially higher risk and reward."
    >
      {children || "Volatility"}
    </Tooltip>
  )
};

export default Tooltip;
