import React, { createContext, useContext, useReducer } from 'react';

// User Context for managing user state and preferences
const UserContext = createContext();

// Initial state
const initialState = {
  user: {
    email: '',
    name: '',
    isFirstTime: true,
    preferences: {
      theme: 'light',
      notifications: true,
      riskWarnings: true
    },
    progress: {
      completedOnboarding: false,
      firstTradeCompleted: false,
      lessonsViewed: [],
      achievementsUnlocked: []
    }
  },
  ui: {
    currentPage: 'welcome',
    showGuidance: true,
    activeTooltip: null,
    modalStack: [], // Stack to manage multiple modals
    chatVisible: false,
    guidanceMessages: []
  }
};

// Action types
export const USER_ACTIONS = {
  SET_USER: 'SET_USER',
  UPDATE_USER_PREFERENCES: 'UPDATE_USER_PREFERENCES',
  UPDATE_USER_PROGRESS: 'UPDATE_USER_PROGRESS',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  TOGGLE_GUIDANCE: 'TOGGLE_GUIDANCE',
  SHOW_TOOLTIP: 'SHOW_TOOLTIP',
  HIDE_TOOLTIP: 'HIDE_TOOLTIP',
  PUSH_MODAL: 'PUSH_MODAL',
  POP_MODAL: 'POP_MODAL',
  CLEAR_MODALS: 'CLEAR_MODALS',
  TOGGLE_CHAT: 'TOGGLE_CHAT',
  ADD_GUIDANCE_MESSAGE: 'ADD_GUIDANCE_MESSAGE',
  CLEAR_GUIDANCE_MESSAGES: 'CLEAR_GUIDANCE_MESSAGES'
};

// Reducer function
function userReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
      
    case USER_ACTIONS.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload
          }
        }
      };
      
    case USER_ACTIONS.UPDATE_USER_PROGRESS:
      return {
        ...state,
        user: {
          ...state.user,
          progress: {
            ...state.user.progress,
            ...action.payload
          }
        }
      };
      
    case USER_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        ui: {
          ...state.ui,
          currentPage: action.payload
        }
      };
      
    case USER_ACTIONS.TOGGLE_GUIDANCE:
      return {
        ...state,
        ui: {
          ...state.ui,
          showGuidance: !state.ui.showGuidance
        }
      };
      
    case USER_ACTIONS.SHOW_TOOLTIP:
      return {
        ...state,
        ui: {
          ...state.ui,
          activeTooltip: action.payload
        }
      };
      
    case USER_ACTIONS.HIDE_TOOLTIP:
      return {
        ...state,
        ui: {
          ...state.ui,
          activeTooltip: null
        }
      };
      
    case USER_ACTIONS.PUSH_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          modalStack: [...state.ui.modalStack, action.payload]
        }
      };
      
    case USER_ACTIONS.POP_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          modalStack: state.ui.modalStack.slice(0, -1)
        }
      };
      
    case USER_ACTIONS.CLEAR_MODALS:
      return {
        ...state,
        ui: {
          ...state.ui,
          modalStack: []
        }
      };
      
    case USER_ACTIONS.TOGGLE_CHAT:
      return {
        ...state,
        ui: {
          ...state.ui,
          chatVisible: !state.ui.chatVisible
        }
      };
      
    case USER_ACTIONS.ADD_GUIDANCE_MESSAGE:
      return {
        ...state,
        ui: {
          ...state.ui,
          guidanceMessages: [...state.ui.guidanceMessages, action.payload]
        }
      };
      
    case USER_ACTIONS.CLEAR_GUIDANCE_MESSAGES:
      return {
        ...state,
        ui: {
          ...state.ui,
          guidanceMessages: []
        }
      };
      
    default:
      return state;
  }
}

// Provider component
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Helper functions
  const setUser = (userData) => {
    dispatch({ type: USER_ACTIONS.SET_USER, payload: userData });
  };

  const updateUserPreferences = (preferences) => {
    dispatch({ type: USER_ACTIONS.UPDATE_USER_PREFERENCES, payload: preferences });
  };

  const updateUserProgress = (progress) => {
    dispatch({ type: USER_ACTIONS.UPDATE_USER_PROGRESS, payload: progress });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: USER_ACTIONS.SET_CURRENT_PAGE, payload: page });
  };

  const toggleGuidance = () => {
    dispatch({ type: USER_ACTIONS.TOGGLE_GUIDANCE });
  };

  const showTooltip = (tooltipData) => {
    dispatch({ type: USER_ACTIONS.SHOW_TOOLTIP, payload: tooltipData });
  };

  const hideTooltip = () => {
    dispatch({ type: USER_ACTIONS.HIDE_TOOLTIP });
  };

  const pushModal = (modalData) => {
    dispatch({ type: USER_ACTIONS.PUSH_MODAL, payload: modalData });
  };

  const popModal = () => {
    dispatch({ type: USER_ACTIONS.POP_MODAL });
  };

  const clearModals = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_MODALS });
  };

  const toggleChat = () => {
    dispatch({ type: USER_ACTIONS.TOGGLE_CHAT });
  };

  const addGuidanceMessage = (message) => {
    const messageWithTimestamp = {
      ...message,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    dispatch({ type: USER_ACTIONS.ADD_GUIDANCE_MESSAGE, payload: messageWithTimestamp });
  };

  const clearGuidanceMessages = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_GUIDANCE_MESSAGES });
  };

  // Calculate overall progress percentage
  const calculateOverallProgress = () => {
    const { progress } = state.user;
    const totalMilestones = 5; // Adjust based on your onboarding steps
    let completed = 0;
    
    if (progress.completedOnboarding) completed += 2;
    if (progress.firstTradeCompleted) completed += 2;
    if (progress.lessonsViewed.length > 0) completed += 1;
    
    return Math.min((completed / totalMilestones) * 100, 100);
  };

  // Check if user should see guidance
  const shouldShowGuidance = () => {
    return state.ui.showGuidance && state.user.isFirstTime;
  };

  // Get current modal (top of stack)
  const getCurrentModal = () => {
    const { modalStack } = state.ui;
    return modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  };

  const value = {
    ...state,
    setUser,
    updateUserPreferences,
    updateUserProgress,
    setCurrentPage,
    toggleGuidance,
    showTooltip,
    hideTooltip,
    pushModal,
    popModal,
    clearModals,
    toggleChat,
    addGuidanceMessage,
    clearGuidanceMessages,
    calculateOverallProgress,
    shouldShowGuidance,
    getCurrentModal,
    dispatch
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
