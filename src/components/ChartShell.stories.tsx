import type { Meta, StoryObj } from '@storybook/react';
import { ChartShell } from './ChartShell';

const meta: Meta<typeof ChartShell> = {
  title: 'Data/ChartShell',
  component: ChartShell,
  args: { symbol: 'AAPL', interval: '1m', indicator: 'none' },
  argTypes: {
    interval: { control: { type: 'radio' }, options: ['1m', '5m', '1h'] },
    indicator: { control: { type: 'radio' }, options: ['none', 'ma', 'ema'] },
  },
};

export default meta;
type Story = StoryObj<typeof ChartShell>;

export const Basic: Story = {};
