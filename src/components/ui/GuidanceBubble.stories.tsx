import type { Meta, StoryObj } from '@storybook/react';
import { GuidanceBubble } from './GuidanceBubble';

const meta: Meta<typeof GuidanceBubble> = {
  title: 'UI/GuidanceBubble',
  component: GuidanceBubble,
};
export default meta;
type Story = StoryObj<typeof GuidanceBubble>;

export const Basic: Story = {
  args: { message: 'Need help? Hover over elements to learn more.' },
};
