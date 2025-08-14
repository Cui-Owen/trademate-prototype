import type { Meta, StoryObj } from '@storybook/react';
import { RiskPanel } from './RiskPanel';
import { I18nProvider } from '../../i18n';

const meta: Meta<typeof RiskPanel> = {
  title: 'Trade/RiskPanel',
  component: RiskPanel,
  decorators: [
    (Story) => (
      <I18nProvider>
        <Story />
      </I18nProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof RiskPanel>;

export const Basic: Story = {
  args: {
    input: { side: 'buy', entryPrice: 150, leverage: 10, amount: 1000, sl: 145, tp: 160 },
  },
};
