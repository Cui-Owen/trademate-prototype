import type { ChartAdapter, ChartHandle } from '../Adapter';

// Placeholder adapter to align interface for future TradingView integration
export const TradingViewAdapter: ChartAdapter = {
  async mount(container, opts) {
    const shell = document.createElement('div');
    shell.style.width = '100%';
    shell.style.height = `${opts.height}px`;
    shell.style.display = 'flex';
    shell.style.alignItems = 'center';
    shell.style.justifyContent = 'center';
    shell.style.color = '#6B7280';
    shell.style.border = '1px dashed #E5E7EB';
    shell.textContent = 'TradingView adapter placeholder (interface-aligned)';
    container.appendChild(shell);
    const last: { candles?: unknown; indicator?: unknown } = {};
    const handle: ChartHandle = {
      setCandles(candles) {
        last.candles = candles;
      },
      setIndicator(points) {
        last.indicator = points;
      },
      destroy() {
        container.removeChild(shell);
      },
    };
    return handle;
  },
};
