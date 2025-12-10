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

  const navbar = (
    <nav
      data-mobile-navbar
      className="fixed inset-x-0 bottom-0 z-[9999] flex w-full items-center justify-around border-t border-gray-200 bg-white/95 px-4 pt-3 backdrop-blur-xl dark:border-gray-800/50 dark:bg-[#13121A]/95 sm:hidden"
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform',
        height: 'calc(var(--navbar-height, 68px) + env(safe-area-inset-bottom, 0px))',
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
