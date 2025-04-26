'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type StyledHomePageLinkProps = {
  href: string;
  children: string;
};

export default function StyledHomePageLink({ href, children }: StyledHomePageLinkProps) {
  const pathname = usePathname();

  const baseStyle =
    'w-[167px] lg:w-[199px] xl:w-[244px] h-[45px] flex items-center justify-center rounded-md text-base font-normal focus:outline-none';
  const activeStyle = 'bg-[rgb(120,120,250,0.7)] border border-[#7878FA] text-white shadow-md';
  const inactiveStyle = 'dark:bg-[#232336] dark:text-white text-[#424286] border-none';

  return (
    <Link href={href} className={`${pathname === href ? activeStyle : inactiveStyle} ${baseStyle}`}>
      {children}
    </Link>
  );
}
