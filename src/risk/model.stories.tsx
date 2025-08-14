import type { Meta, StoryObj } from '@storybook/react';
import { computeRisk } from './model';
import { RiskDistribution } from './vis';

const meta: Meta<typeof RiskDistribution> = {
  title: 'Risk/Distribution',
  component: RiskDistribution,
};
export default meta;
type Story = StoryObj<typeof RiskDistribution>;

export const Basic: Story = {
  render: () => {
    const risk = computeRisk({
      side: 'buy',
      entryPrice: 150,
      leverage: 10,
      amount: 1000,
      sl: 145,
      tp: 160,
    });
    return <RiskDistribution risk={risk} />;
  },
};
