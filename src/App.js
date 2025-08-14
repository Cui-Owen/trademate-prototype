import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all page components
import Welcome from './pages/Welcome';
import TradingCockpit from './pages/TradingCockpit';
import AssetDiscovery from './pages/AssetDiscovery';
import OrderTicket from './pages/OrderTicket';
import PreTradeConfirmation from './pages/PreTradeConfirmation';
import GuidanceNudge from './pages/GuidanceNudge';
import ComplianceAlert from './pages/ComplianceAlert';
import PostTradeDebrief from './pages/PostTradeDebrief';

// Import context providers
import { TradingProvider } from './context/TradingContext';
import { UserProvider } from './context/UserContext';
import { I18nProvider } from './i18n';
import { ThemeProvider } from './design/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from './services/query/client';
import { ReplayControls } from './components/replay/ReplayControls';
import { ReviewerDemo } from './demo/ReviewerDemo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (from localStorage)
    const authStatus = localStorage.getItem('trademate_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem('trademate_authenticated', status.toString());
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <UserProvider>
        <TradingProvider>
          <ThemeProvider>
            <I18nProvider>
              <QueryClientProvider client={createQueryClient()}>
                <Router>
                  <ReviewerDemo />
                  <Routes>
                    {/* Public route - Welcome/Sign-up */}
                    <Route
                      path="/welcome"
                      element={
                        !isAuthenticated ? (
                          <Welcome onAuthenticate={handleAuthentication} />
                        ) : (
                          <Navigate to="/cockpit" replace />
                        )
                      }
                    />

                    {/* Protected routes - require authentication */}
                    <Route
                      path="/cockpit"
                      element={
                        isAuthenticated ? <TradingCockpit /> : <Navigate to="/welcome" replace />
                      }
                    />

                    <Route
                      path="/asset-discovery"
                      element={
                        isAuthenticated ? <AssetDiscovery /> : <Navigate to="/welcome" replace />
                      }
                    />

                    <Route
                      path="/order-ticket"
                      element={
                        isAuthenticated ? <OrderTicket /> : <Navigate to="/welcome" replace />
                      }
                    />

                    <Route
                      path="/pre-trade-confirmation"
                      element={
                        isAuthenticated ? (
                          <PreTradeConfirmation />
                        ) : (
                          <Navigate to="/welcome" replace />
                        )
                      }
                    />

                    <Route
                      path="/guidance-nudge"
                      element={
                        isAuthenticated ? <GuidanceNudge /> : <Navigate to="/welcome" replace />
                      }
                    />

                    <Route
                      path="/compliance-alert"
                      element={
                        isAuthenticated ? <ComplianceAlert /> : <Navigate to="/welcome" replace />
                      }
                    />

                    <Route
                      path="/post-trade-debrief"
                      element={
                        isAuthenticated ? <PostTradeDebrief /> : <Navigate to="/welcome" replace />
                      }
                    />

                    {/* Default redirect */}
                    <Route
                      path="/"
                      element={<Navigate to={isAuthenticated ? '/cockpit' : '/welcome'} replace />}
                    />

                    {/* Catch all route */}
                    <Route
                      path="*"
                      element={<Navigate to={isAuthenticated ? '/cockpit' : '/welcome'} replace />}
                    />
                  </Routes>
                </Router>
                {new URLSearchParams(window.location.search).get('provider') === 'replay' && (
                  <ReplayControls />
                )}
              </QueryClientProvider>
            </I18nProvider>
          </ThemeProvider>
        </TradingProvider>
      </UserProvider>
    </div>
  );
}

export default App;
