'use client';
import { useState, useEffect, useRef, useMemo, useCallback, KeyboardEvent } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useClickAway } from 'react-use';
import ThemeSwitch from './ThemeSwitch';
import DropDownCurrencies from './DropDownCurrencies';
import { CryptofolioLogoIcon } from '../icons/CryptofolioLogoIcon';
import { HomeIcon } from '../icons/HomeIcon';
import { PortfolioIcon } from '../icons/PortfolioIcon';
import { ConverterIcon } from '../icons/ConverterIcon';
import { Input } from './ui/input';
import StyledNavbarLink from './StyledNavbarLink';
import SearchResultsListSkeleton from './SearchResultsListSkeleton';
import SearchResultsList from './SearchResultsList';
import { toast } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const MAX_DISPLAYED_RESULTS = 10;

type Cryptocurrency = {
  id: string;
  name: string;
};

function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number
): {
  (...args: Args): void;
  cancel: () => void;
} {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = function (this: void, ...args: Args) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };

  debouncedFunction.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debouncedFunction;
}

const getMobileLinkClasses = (isActive: boolean) => {
  const baseClasses =
    'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all';
  const activeClasses = 'bg-[rgb(120,120,250,0.7)] dark:bg-[#6161D6] text-white';
  const inactiveClasses =
    'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

export default function Navbar() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Cryptocurrency[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currencyParam = searchParams?.get('currency');
  const currencyQueryString = currencyParam ? `?currency=${currencyParam}` : '';

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetch(`/api/crypto/search?query=${encodeURIComponent(searchQuery)}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const errorMessage = errorData.error || 'Failed to fetch search results';

          if (res.status === 429) {
            toast.error('Rate limit exceeded', {
              description: 'Please wait a moment and try again.',
              duration: 5000,
            });
          } else if (res.status === 500) {
            toast.error('Server error', {
              description: errorMessage,
              duration: 5000,
            });
          } else {
            toast.error('Search error', {
              description: errorMessage,
              duration: 5000,
            });
          }

          throw new Error(errorMessage);
        }
        return res.json();
      })
      .then((data) => {
        setSearchResults(data.coins ?? []);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Error fetching cryptocurrency data:', err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  const handleSearch = useMemo(
    () =>
      debounce((searchValue: string) => {
        setSearchQuery(searchValue);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      handleSearch(value);
    },
    [handleSearch]
  );

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const handleCoinClick = useCallback(
    (coinId: string) => {
      setSearchResults([]);
      setSearchQuery('');
      setInputValue('');
      setSelectedIndex(-1);
      router.push(`/coin/${coinId}`);
    },
    [router]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const displayedResultsLength = Math.min(searchResults.length, MAX_DISPLAYED_RESULTS);

      if (e.key === 'Escape') {
        e.preventDefault();
        handleSearch.cancel();
        setSearchResults([]);
        setInputValue('');
        setSelectedIndex(-1);
        return;
      }

      if (searchResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prevIndex) =>
            prevIndex < displayedResultsLength - 1 ? prevIndex + 1 : 0
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : displayedResultsLength - 1
          );
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
          e.preventDefault();
          const selectedCoin = searchResults[selectedIndex];
          if (selectedCoin) {
            handleCoinClick(selectedCoin.id);
          }
        }
      }
    },
    [searchResults, selectedIndex, handleCoinClick, handleSearch]
  );

  const handleClickAway = useCallback(() => {
    handleSearch.cancel();
    setSearchResults([]);
    setInputValue('');
    setSelectedIndex(-1);
  }, [handleSearch]);

  useClickAway(dropdownRef, handleClickAway);

  return (
    <div className="w-full bg-white dark:bg-[#13121A]">
      <nav className="mx-auto flex max-w-[1440px] justify-between px-6 py-4 sm:px-[42px] xl:px-[72px]">
        <Link
          href={`/${currencyQueryString}`}
          className="flex items-center gap-[10px] font-bold text-white"
        >
          <CryptofolioLogoIcon />
          <span
            className={`${inter.className} hidden py-2 text-[#353570] dark:text-white md:text-lg lg:inline lg:text-xl`}
          >
            Cryptofolio
          </span>
        </Link>
        <div className="hidden sm:flex sm:gap-7 lg:gap-14">
          <div className="flex items-center gap-[10px]">
            <div className="rounded-md border border-[#7878FA] bg-[rgb(120,120,250,0.7)] p-1.5 sm:border-none sm:bg-transparent">
              <StyledNavbarLink href={`/${currencyQueryString}`} icon="home">
                Home
              </StyledNavbarLink>
            </div>
          </div>
          <div className="flex items-center gap-[10px] rounded-md bg-[#CCCCFA]/40 px-3 dark:bg-[#232336] sm:bg-transparent sm:px-0 sm:dark:bg-transparent">
            <StyledNavbarLink href={`/portfolio${currencyQueryString}`} icon="portfolio">
              Portfolio
            </StyledNavbarLink>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <form onSubmit={handleSubmit} className="group">
            <Input
              value={inputValue}
              className={`${
                inter.className
              } transition-all duration-300 ease-in-out sm:transition-none ${
                isLoading || searchResults.length > 0 ? 'rounded-b-none' : 'rounded-b-md'
              } size-[36px] pl-12 text-base placeholder:text-transparent focus:w-[149px] sm:h-10 sm:w-[130px] sm:text-sm sm:placeholder:text-sm sm:placeholder:font-normal sm:placeholder:text-[#424286] sm:placeholder:text-opacity-80 sm:focus:w-[130px] sm:dark:placeholder:text-[#D1D1D1] md:h-11 md:w-[200px] md:focus:w-[200px] lg:h-12 lg:w-[286px] lg:focus:w-[286px] xl:h-12 xl:w-[356px] xl:focus:w-[356px]`}
              placeholder="Search..."
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {(isLoading || searchResults.length > 0) && (
              <div
                ref={dropdownRef}
                className="absolute z-10 w-[149px] rounded-b-md border-x border-b border-white/10 bg-white p-2 dark:bg-[#191925] sm:w-[130px] md:w-[200px] lg:w-[286px] xl:w-[356px]"
              >
                {isLoading ? (
                  <SearchResultsListSkeleton />
                ) : (
                  <SearchResultsList
                    results={searchResults.slice(0, MAX_DISPLAYED_RESULTS)}
                    selectedIndex={selectedIndex}
                    onCoinClick={handleCoinClick}
                  />
                )}
              </div>
            )}
          </form>
          <DropDownCurrencies />
          <ThemeSwitch />
        </div>
      </nav>
      <div className="fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-around border-t border-gray-200 bg-white/80 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl dark:border-transparent dark:bg-[#1A1A2E]/30 sm:hidden">
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
      </div>
    </div>
  );
}
