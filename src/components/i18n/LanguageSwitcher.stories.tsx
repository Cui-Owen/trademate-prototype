import type { Meta, StoryObj } from '@storybook/react';
import { I18nProvider } from '../../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'I18n/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <I18nProvider>
        <Story />
      </I18nProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Basic: Story = {};
