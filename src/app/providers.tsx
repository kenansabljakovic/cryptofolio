'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { ReduxProvider } from '../redux/provider';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';

function ToasterProvider() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      theme={resolvedTheme as 'light' | 'dark' | 'system'}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider>
          {children}
          <ToasterProvider />
        </NextUIProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
