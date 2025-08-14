import type { Meta, StoryObj } from '@storybook/react';
import { ComplianceNotice } from './ComplianceNotice';

const meta: Meta<typeof ComplianceNotice> = {
  title: 'UI/ComplianceNotice',
  component: ComplianceNotice,
};
export default meta;
type Story = StoryObj<typeof ComplianceNotice>;

export const Allow: Story = { args: { decision: 'allow', reason: 'Within risk thresholds.' } };
export const Notify: Story = {
  args: { decision: 'notify', reason: 'Crypto asset – confirm suitability.' },
};
export const Block: Story = {
  args: { decision: 'block', reason: 'Leverage exceeds regional cap.' },
};
