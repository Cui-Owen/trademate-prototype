import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { OrderTicketMini } from './OrderTicketMini';
import type { OrderDraftMini } from './OrderTicketMini';
import { I18nProvider } from '../../i18n';

const meta: Meta<typeof OrderTicketMini> = {
  title: 'Trade/OrderTicketMini',
  component: OrderTicketMini,
  decorators: [
    (Story) => (
      <I18nProvider>
        <Story />
      </I18nProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof OrderTicketMini>;

const Example: React.FC = () => {
  const [v, setV] = React.useState<OrderDraftMini>({
    symbol: 'AAPL',
    side: 'buy',
    amount: 1000,
    leverage: 5,
  });
  return <OrderTicketMini value={v} onChange={(nv) => setV(nv)} />;
};

export const Basic: Story = { render: () => <Example /> };
