'use client';
import { useSearchParams } from 'next/navigation';
import StyledHomePageLink from './StyledHomePageLink';

export default function NavHome() {
  const searchParams = useSearchParams();
  const currencyParam = searchParams?.get('currency');
  const currencyQueryString = currencyParam ? `?currency=${currencyParam}` : '';

  return (
    <nav className="mx-auto mt-5 hidden max-w-[1440px] px-6 sm:mt-10 sm:block sm:px-[42px] xl:px-[72px]">
      <div className="flex w-[343px] rounded-md bg-white p-1 dark:bg-[#191925] lg:w-[400px] xl:w-[495px]">
        <StyledHomePageLink href={`/${currencyQueryString}`}>Coins</StyledHomePageLink>
        <StyledHomePageLink href={`/converter${currencyQueryString}`}>Converter</StyledHomePageLink>
      </div>
    </nav>
  );
}
