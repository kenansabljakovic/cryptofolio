'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type StyledHomePageLinkProps = {
  href: string;
  children: string;
};

export default function StyledHomePageLink({ href, children }: StyledHomePageLinkProps) {
  const currentPathname = usePathname();

  // Extract pathname from href, ignoring query parameters
  let linkPathname = '/'; // Default for root
  try {
    // Create a dummy base URL to allow parsing relative hrefs
    const url = new URL(href, 'http://dummybase');
    linkPathname = url.pathname;
  } catch (e) {
    console.error('Error parsing href in StyledHomePageLink:', e);
    // Use the raw href if parsing fails, though this might be less robust
    linkPathname = href.split('?')[0];
  }

  const isActive = currentPathname === linkPathname;

  const baseStyle =
    'w-[167px] lg:w-[199px] xl:w-[244px] h-[45px] flex items-center justify-center rounded-md text-base font-normal focus:outline-none';
  const activeStyle = 'bg-[rgb(120,120,250,0.7)] border border-[#7878FA] text-white shadow-md';
  const inactiveStyle = 'dark:bg-[#232336] dark:text-white text-[#424286] border-none';

  return (
    <Link href={href} className={`${isActive ? activeStyle : inactiveStyle} ${baseStyle}`}>
      {children}
    </Link>
  );
}
