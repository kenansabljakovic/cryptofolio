import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Navbar from './components/Navbar';
import NavbarSkeleton from './components/NavbarSkeleton';
import MobileNavbar from './components/MobileNavbar';
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
          <div
            id="app-shell"
            className="relative flex h-dvh min-h-dvh flex-col sm:h-screen sm:min-h-screen"
          >
            <div
              id="app-scroll"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[var(--navbar-total-height)] sm:pb-0"
            >
              <header>
                <MarketDataHeader />
                <Suspense fallback={<NavbarSkeleton />}>
                  <Navbar />
                </Suspense>
              </header>
              {children}
            </div>
            <Suspense fallback={null}>
              <MobileNavbar />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
