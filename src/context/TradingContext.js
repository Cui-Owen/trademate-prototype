import React, { createContext, useContext, useReducer } from 'react';

// Trading Context for managing trading state
const TradingContext = createContext();

// Initial state
const initialState = {
  selectedAsset: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    spread: 0.02,
    volume: '45.2M'
  },
  leverage: 1,
  tradeDirection: 'buy', // 'buy' or 'sell'
  tradeAmount: 1000,
  stopLoss: null,
  takeProfit: null,
  currentTrade: null,
  tradeHistory: [],
  onboardingProgress: {
    exploreAsset: false,
    understandTerms: false,
    placeTrade: false,
    reviewTrade: false,
    executeTrade: false
  },
  riskTolerance: 'moderate', // 'conservative', 'moderate', 'aggressive'
  userRiskDecisions: {
    hasSeenComplianceAlert: false // Simple flag - only warn once per session
  }
};

// Action types
export const TRADING_ACTIONS = {
  SELECT_ASSET: 'SELECT_ASSET',
  SET_LEVERAGE: 'SET_LEVERAGE',
  SET_TRADE_DIRECTION: 'SET_TRADE_DIRECTION',
  SET_TRADE_AMOUNT: 'SET_TRADE_AMOUNT',
  SET_STOP_LOSS: 'SET_STOP_LOSS',
  SET_TAKE_PROFIT: 'SET_TAKE_PROFIT',
  EXECUTE_TRADE: 'EXECUTE_TRADE',
  CLOSE_TRADE: 'CLOSE_TRADE',
  UPDATE_ONBOARDING_PROGRESS: 'UPDATE_ONBOARDING_PROGRESS',
  SET_USER_RISK_DECISION: 'SET_USER_RISK_DECISION',
  SET_RISK_TOLERANCE: 'SET_RISK_TOLERANCE',
  RESET_TRADE_FORM: 'RESET_TRADE_FORM'
};

// Reducer function
function tradingReducer(state, action) {
  switch (action.type) {
    case TRADING_ACTIONS.SELECT_ASSET:
      return {
        ...state,
        selectedAsset: action.payload,
        onboardingProgress: {
          ...state.onboardingProgress,
          exploreAsset: true
        }
      };
      
    case TRADING_ACTIONS.SET_LEVERAGE:
      return {
        ...state,
        leverage: action.payload
      };
      
    case TRADING_ACTIONS.SET_TRADE_DIRECTION:
      return {
        ...state,
        tradeDirection: action.payload
      };
      
    case TRADING_ACTIONS.SET_TRADE_AMOUNT:
      return {
        ...state,
        tradeAmount: action.payload
      };
      
    case TRADING_ACTIONS.SET_STOP_LOSS:
      return {
        ...state,
        stopLoss: action.payload
      };
      
    case TRADING_ACTIONS.SET_TAKE_PROFIT:
      return {
        ...state,
        takeProfit: action.payload
      };
      
    case TRADING_ACTIONS.EXECUTE_TRADE:
      const newTrade = {
        id: Date.now(),
        asset: state.selectedAsset,
        direction: state.tradeDirection,
        amount: state.tradeAmount,
        leverage: state.leverage,
        entryPrice: state.selectedAsset.price,
        stopLoss: state.stopLoss,
        takeProfit: state.takeProfit,
        timestamp: new Date().toISOString(),
        status: 'open'
      };
      
      return {
        ...state,
        currentTrade: newTrade,
        tradeHistory: [...state.tradeHistory, newTrade],
        onboardingProgress: {
          ...state.onboardingProgress,
          executeTrade: true
        }
      };
      
    case TRADING_ACTIONS.CLOSE_TRADE:
      const closedTrade = {
        ...state.currentTrade,
        exitPrice: action.payload.exitPrice,
        profit: action.payload.profit,
        status: 'closed',
        closedAt: new Date().toISOString()
      };
      
      return {
        ...state,
        currentTrade: null,
        tradeHistory: state.tradeHistory.map(trade => 
          trade.id === closedTrade.id ? closedTrade : trade
        )
      };
      
    case TRADING_ACTIONS.UPDATE_ONBOARDING_PROGRESS:
      return {
        ...state,
        onboardingProgress: {
          ...state.onboardingProgress,
          ...action.payload
        }
      };
      
    case TRADING_ACTIONS.SET_USER_RISK_DECISION:
      return {
        ...state,
        userRiskDecisions: {
          ...state.userRiskDecisions,
          ...action.payload
        }
      };
      
    case TRADING_ACTIONS.SET_RISK_TOLERANCE:
      return {
        ...state,
        riskTolerance: action.payload
      };
      
    case TRADING_ACTIONS.RESET_TRADE_FORM:
      return {
        ...state,
        leverage: 1,
        tradeDirection: 'buy',
        tradeAmount: 1000,
        stopLoss: null,
        takeProfit: null
      };
      
    default:
      return state;
  }
}

// Provider component
export function TradingProvider({ children }) {
  const [state, dispatch] = useReducer(tradingReducer, initialState);

  // Helper functions
  const selectAsset = (asset) => {
    dispatch({ type: TRADING_ACTIONS.SELECT_ASSET, payload: asset });
  };

  const setLeverage = (leverage) => {
    dispatch({ type: TRADING_ACTIONS.SET_LEVERAGE, payload: leverage });
  };

  const setTradeDirection = (direction) => {
    dispatch({ type: TRADING_ACTIONS.SET_TRADE_DIRECTION, payload: direction });
  };

  const setTradeAmount = (amount) => {
    dispatch({ type: TRADING_ACTIONS.SET_TRADE_AMOUNT, payload: amount });
  };

  const executeTrade = () => {
    dispatch({ type: TRADING_ACTIONS.EXECUTE_TRADE });
  };

  const closeTrade = (exitPrice, profit) => {
    dispatch({ 
      type: TRADING_ACTIONS.CLOSE_TRADE, 
      payload: { exitPrice, profit } 
    });
  };

  const updateOnboardingProgress = (progress) => {
    dispatch({ 
      type: TRADING_ACTIONS.UPDATE_ONBOARDING_PROGRESS, 
      payload: progress 
    });
  };

  const setUserRiskDecision = (decision) => {
    dispatch({ 
      type: TRADING_ACTIONS.SET_USER_RISK_DECISION, 
      payload: decision 
    });
  };

  // Calculate potential profit/loss
  const calculatePotentialPnL = (priceChange = 0.01) => {
    const { selectedAsset, leverage, tradeAmount, tradeDirection } = state;
    const positionSize = tradeAmount * leverage;
    const priceChangePercent = priceChange / selectedAsset.price;
    const multiplier = tradeDirection === 'buy' ? 1 : -1;
    return positionSize * priceChangePercent * multiplier;
  };

  // Calculate margin requirement
  const calculateMarginRequirement = () => {
    return state.tradeAmount; // 1:1 margin requirement
  };

  // Calculate risk level based on leverage and amount
  const calculateRiskLevel = () => {
    const { leverage, tradeAmount } = state;
    
    // Risk calculation aligned with compliance alert thresholds
    if (leverage <= 5) return 'low';
    if (leverage <= 15) return 'medium';
    return 'high';
  };

  const value = {
    ...state,
    selectAsset,
    setLeverage,
    setTradeDirection,
    setTradeAmount,
    executeTrade,
    closeTrade,
    updateOnboardingProgress,
    setUserRiskDecision,
    calculatePotentialPnL,
    calculateMarginRequirement,
    calculateRiskLevel,
    dispatch
  };

  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
}

// Custom hook to use trading context
export function useTrading() {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
}
