import type { Meta, StoryObj } from '@storybook/react';
import { DebugPanel } from './DebugPanel';
import { getAnalytics } from './gateway';

const meta: Meta<typeof DebugPanel> = {
  title: 'Observability/DebugPanel',
  component: DebugPanel,
};
export default meta;
type Story = StoryObj<typeof DebugPanel>;

export const WithEvents: Story = {
  render: () => {
    const a = getAnalytics();
    a.track('onboarding_step', { step: 'welcome', completed: true });
    a.track('leverage_change', { from: 2, to: 5 });
    a.track('order_abandoned', { stage: 'review', dwellMs: 5200 });
    return <DebugPanel />;
  },
};
