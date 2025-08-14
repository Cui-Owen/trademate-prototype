import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTrading } from '../context/TradingContext';
import { useUser } from '../context/UserContext';

export const ReviewerDemo: React.FC = () => {
  const { search, pathname } = useLocation();
  const nav = useNavigate();
  const trading = useTrading();
  const user = useUser();

  React.useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get('demo') !== 'reviewer') return;
    let step = 0;
    const run = () => {
      step++;
      switch (step) {
        case 1:
          nav('/asset-discovery');
          break;
        case 2:
          nav('/order-ticket');
          break;
        case 3:
          trading.setTradeAmount(2000);
          trading.setLeverage(30);
          break;
        case 4:
          // trigger compliance alert via existing logic
          user.pushModal?.({ type: 'compliance-alert', leverage: 30 });
          break;
        case 5:
          nav('/pre-trade-confirmation');
          break;
        default:
          break;
      }
      if (step < 5) setTimeout(run, 1200);
    };
    setTimeout(run, 800);
  }, [search, nav, trading, user, pathname]);
  return null;
};
