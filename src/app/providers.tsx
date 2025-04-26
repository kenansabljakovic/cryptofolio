'use client';

import { ThemeProvider } from 'next-themes';
import { ReduxProvider } from '../redux/provider';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
