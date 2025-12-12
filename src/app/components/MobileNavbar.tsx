'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useSearchParams } from 'next/navigation';
import { HomeIcon } from '../icons/HomeIcon';
import { PortfolioIcon } from '../icons/PortfolioIcon';
import { ConverterIcon } from '../icons/ConverterIcon';

const getMobileLinkClasses = (isActive: boolean) => {
  const baseClasses =
    'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all';
  const activeClasses =
    'rounded-md border border-[#7878FA] bg-[rgb(120,120,250,0.7)] dark:bg-[#6161D6] text-white';
  const inactiveClasses =
    'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

export default function MobileNavbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currencyParam = searchParams?.get('currency');
  const currencyQueryString = currencyParam ? `?currency=${currencyParam}` : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setOffsets = (offset: number) => {
      document.documentElement.style.setProperty('--mobile-navbar-offset', `${offset}px`);
      // Only add extra padding when the navbar is translated UP (negative offset).
      // When translated down, baseline navbar height padding is enough.
      const paddingOffset = Math.max(0, -offset);
      document.documentElement.style.setProperty(
        '--mobile-navbar-padding-offset',
        `${paddingOffset}px`,
      );
    };

    const computeOffset = () => {
      const vv = window.visualViewport;
      if (!vv) {
        setOffsets(0);
        return;
      }

      const layoutViewportHeight = window.innerHeight || vv.height;
      // Signed delta between visual and layout viewport bottoms.
      // Positive => visual bottom lower (toolbar hidden) => translate DOWN.
      // Negative => visual bottom higher (toolbar shown) => translate UP.
      const delta = Math.round(vv.height + vv.offsetTop - layoutViewportHeight);

      setOffsets(delta);
    };

    let rafId: number | null = null;
    const onViewportChange = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(computeOffset);
    };

    computeOffset();
    window.visualViewport?.addEventListener('resize', onViewportChange);
    window.visualViewport?.addEventListener('scroll', onViewportChange);
    window.addEventListener('orientationchange', computeOffset);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.visualViewport?.removeEventListener('resize', onViewportChange);
      window.visualViewport?.removeEventListener('scroll', onViewportChange);
      window.removeEventListener('orientationchange', computeOffset);
      setOffsets(0);
    };
  }, []);

  const navbar = (
    <nav
      data-mobile-navbar
      className="fixed inset-x-0 bottom-0 z-[9999] flex w-full items-center justify-around border-t border-gray-200 bg-white/95 px-4 pt-3 backdrop-blur-xl dark:border-gray-800/50 dark:bg-[#13121A]/95 sm:hidden"
      style={{
        paddingBottom:
          'max(0.75rem, env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px)))',
        transform: 'translate3d(0, var(--mobile-navbar-offset, 0px), 0)',
        WebkitTransform: 'translate3d(0, var(--mobile-navbar-offset, 0px), 0)',
        willChange: 'transform',
        height:
          'calc(var(--navbar-height, 68px) + env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px)))',
      }}
    >
      <Link href={`/${currencyQueryString}`} className={getMobileLinkClasses(pathname === '/')}>
        <HomeIcon isActive={pathname === '/'} />
        <span className="text-xs font-medium">Overview</span>
      </Link>
      <Link
        href={`/converter${currencyQueryString}`}
        className={getMobileLinkClasses(pathname === '/converter')}
      >
        <ConverterIcon isActive={pathname === '/converter'} />
        <span className="text-xs font-medium">Converter</span>
      </Link>
      <Link
        href={`/portfolio${currencyQueryString}`}
        className={getMobileLinkClasses(pathname === '/portfolio')}
      >
        <PortfolioIcon isActive={pathname === '/portfolio'} />
        <span className="text-xs font-medium">Portfolio</span>
      </Link>
    </nav>
  );

  // Use portal to render directly into document.body, bypassing any
  // parent transforms/overflow from NextUIProvider or other wrappers
  // that break position:fixed on iOS Safari
  if (!mounted) {
    return null;
  }

  return createPortal(navbar, document.body);
}
