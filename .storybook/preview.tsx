import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/design/theme';
import { I18nProvider } from '../src/i18n';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <I18nProvider>
          <div style={{ padding: 16 }}>
            <Story />
          </div>
        </I18nProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
