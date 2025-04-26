'use client';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useClickAway } from 'react-use';
import ThemeSwitch from './ThemeSwitch';
import DropDownCurrencies from './DropDownCurrencies';
import { CryptofolioLogoIcon } from '../icons/CryptofolioLogoIcon';
import { Input } from '../../app/components/ui/input';
import StyledNavbarLink from './StyledNavbarLink';
import SearchResultsListSkeleton from './SearchResultsListSkeleton';
import SearchResultsList from './SearchResultsList';

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

// Refined debounce signature using generic argument tuple
function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: void, ...args: Args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Cryptocurrency[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const fetchCryptocurrencies = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/search?query=${searchQuery}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = await response.json();
          setSearchResults(data.coins);
        } catch (error) {
          console.error('Error fetching cryptocurrency data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCryptocurrencies();
    } else {
      setSearchResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearch = debounce((searchValue: string) => {
    setSearchQuery(searchValue);
  }, 300);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCoinClick = (coinId: string) => {
    setSearchResults([]);
    setSearchQuery('');
    setSelectedIndex(-1);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    router.push(`/coin/${coinId}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const displayedResultsLength = Math.min(searchResults.length, MAX_DISPLAYED_RESULTS);

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
  };

  useEffect(() => {
    if (
      resultsRef.current &&
      selectedIndex >= 0 &&
      selectedIndex < Math.min(searchResults.length, MAX_DISPLAYED_RESULTS)
    ) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, searchResults.length]);

  useClickAway(dropdownRef, () => {
    setSearchResults([]);
    setSelectedIndex(-1);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  });

  return (
    <div className="w-full bg-white dark:bg-[#13121A]">
      <nav className="mx-auto flex max-w-[1440px] justify-between px-6 py-4 sm:px-[42px] xl:px-[72px]">
        <div className="flex items-center gap-[10px] font-bold text-white">
          <Link href="/">
            <CryptofolioLogoIcon />
          </Link>
          <Link href="/">
            <span
              className={`${inter.className} hidden py-2 text-[#353570] dark:text-white md:text-lg lg:inline lg:text-xl`}
            >
              Cryptofolio
            </span>
          </Link>
        </div>
        <div className="hidden sm:flex sm:gap-7 lg:gap-14">
          <div className="flex items-center gap-[10px]">
            <div className="rounded-md border border-[#7878FA] bg-[rgb(120,120,250,0.7)] p-1.5 sm:border-none sm:bg-transparent">
              <StyledNavbarLink href="/" icon="home">
                Home
              </StyledNavbarLink>
            </div>
          </div>
          <div className="flex items-center gap-[10px] rounded-md bg-[#CCCCFA]/40 px-3 dark:bg-[#232336] sm:bg-transparent sm:px-0 sm:dark:bg-transparent">
            <StyledNavbarLink href="/portfolio" icon="portfolio">
              Portfolio
            </StyledNavbarLink>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <form onSubmit={handleSubmit} className="group">
            <Input
              ref={inputRef}
              className={`${
                inter.className
              } transition-all duration-300 ease-in-out sm:transition-none ${
                searchResults.length > 0 ? 'rounded-b-none' : 'rounded-b-md'
              } size-[36px] pl-12 text-base placeholder:text-transparent focus:w-[149px] sm:h-10 sm:w-[130px] sm:text-sm sm:placeholder:text-sm sm:placeholder:font-normal sm:placeholder:text-[#424286] sm:placeholder:text-opacity-80 sm:focus:w-[130px] sm:dark:placeholder:text-[#D1D1D1] md:h-11 md:w-[200px] md:focus:w-[200px] lg:h-12 lg:w-[286px] lg:focus:w-[286px] xl:h-12 xl:w-[356px] xl:focus:w-[356px]`}
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchResults.length > 0 && (
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
    </div>
  );
}
