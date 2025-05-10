'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Keep usePathname
import { HomeIcon } from '../icons/HomeIcon';
import { PortfolioIcon } from '../icons/PortfolioIcon';

type StyledNavbarLinkProps = {
  href: string;
  children: string;
  icon: 'home' | 'portfolio';
};

export default function StyledNavbarLink({ href, children, icon }: StyledNavbarLinkProps) {
  const pathname = usePathname();

  // Extract pathname from href, ignoring query parameters
  let linkPathname = '/'; // Default for root
  try {
    const url = new URL(href, 'http://dummybase'); // Dummy base for relative paths
    linkPathname = url.pathname;
  } catch (e) {
    console.error('Error parsing href in StyledNavbarLink:', e);
    linkPathname = href.split('?')[0]; // Fallback
  }

  const isActive = pathname === linkPathname;

  const baseStyle = 'hidden sm:inline md:text-sm lg:text-base font-medium';
  // Define styles for light and dark modes
  const activeStyle = 'text-[#353570] dark:text-white';
  const inactiveStyle =
    'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white';

  const Icon = icon === 'home' ? HomeIcon : PortfolioIcon;

  return (
    <Link href={href} className={`${isActive ? activeStyle : inactiveStyle} ${baseStyle}`}>
      <div className="flex items-center gap-2">
        <Icon isActive={isActive} />
        {children}
      </div>
    </Link>
  );
}
