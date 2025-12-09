import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Navbar from './components/Navbar';
import NavbarSkeleton from './components/NavbarSkeleton';
import MarketDataHeader from './components/MarketDataHeader';
import { Providers } from './providers';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cryptofolio - Cryptocurrency Tracker',
  description: 'Track cryptocurrency prices, market caps, and portfolio performance',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} bg-[#F3F5F9] dark:bg-[#13121A]`}>
        <Providers>
          <header>
            <MarketDataHeader />
            <Suspense fallback={<NavbarSkeleton />}>
              <Navbar />
            </Suspense>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
